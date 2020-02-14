"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
const imports = __importStar(require("./imports"));
const diag = __importStar(require("../diagnostics"));
const statements = __importStar(require("./statements"));
const p = __importStar(require("../printer"));
const util = __importStar(require("../utilities"));
class Function {
    constructor(type, name, body) {
        this.type = type;
        this.name = name;
        this.body = body;
    }
}
exports.Function = Function;
class visitor {
    constructor(printer, checker) {
        this.tasks = [];
        this.taskNames = [];
        this.functions = [];
        this.useMessageBox = [];
        this.useLineBuffer = false;
        this.useNetwork = false;
        this.nowProcessingTaskIndex = 0;
        this.includes = [];
        this.environmentStack = [new Map()];
        this.useGC = false;
        this.visit = (node) => {
            if (node.kind == typescript_1.default.SyntaxKind.EndOfFileToken) {
                return;
            }
            if (typescript_1.default.isImportDeclaration(node)) {
                this.includes = this.includes.concat(imports.importsToIncludes(node, this));
                return;
            }
            if (typescript_1.default.isClassDeclaration(node)) {
                return statements.visitClassDeclaration(node, this);
            }
            if (statements.isStatement(node)) {
                return statements.visitStatement(node, this);
            }
            if (typescript_1.default.isFunctionDeclaration(node)) {
                console.log("FunctionDeclaration: " + node.body);
                console.log();
                return;
            }
            //TODO: allow only constant task declaration
            diag.emitDiagnostic(node, "visit: don't know how to handle " + typescript_1.default.SyntaxKind[node.kind]);
            process.exit(1);
        };
        this.visitProgram = (program) => {
            for (const sourceFile of program.getSourceFiles()) {
                if (!sourceFile.isDeclarationFile &&
                    !sourceFile.fileName.endsWith("tkernel.ts") &&
                    !sourceFile.fileName.endsWith("mqtt.ts")) {
                    // Walk the tree to search source code.
                    typescript_1.default.forEachChild(sourceFile, this.visit);
                }
            }
        };
        this.printFucntions = () => {
            if (this.functions.length == 0) {
                return;
            }
            let tmpPrinter = this.printer;
            this.printer = new p.BufferedPrinter;
            this.printer.unindent();
            this.functions.forEach((f) => {
                if (util.isPrimitiveType(f.type)) {
                    this.printer.print(`${util.mapPrimitiveType(f.type)} ${f.name}() `);
                }
                else {
                    if (f.type == 'MQTTClient') {
                        this.printer.print(`MQTTCtx* ${f.name}() `);
                    }
                    else {
                        this.printer.print(`${f.type}* ${f.name}() `);
                    }
                }
                this.visit(f.body);
                this.printer.printLn("");
            });
            this.printer.outputBuffer();
            this.printer = tmpPrinter;
        };
        this.printTasks = () => {
            if (this.tasks.length == 0) {
                return;
            }
            let tmpPrinter = this.printer;
            this.printer = new p.BufferedPrinter;
            this.printer.unindent();
            this.taskNames = this.tasks.map((m) => {
                return util.getTypeStringInSnakeCase(m.parent, this.checker);
            });
            this.printer.printLn("typedef enum { "
                + this.taskNames.map((name, index) => name.toUpperCase() + ", "
                    + (this.useMessageBox[index] ? "MBUF_" + name.toUpperCase() + ", " : "")).join('')
                + "OBJ_KIND_NUM } OBJ_KIND;");
            this.printer.printLn("EXPORT ID ObjID[OBJ_KIND_NUM];");
            this.printer.printLn("");
            this.tasks.forEach((m, index) => {
                this.nowProcessingTaskIndex = index;
                // Define buffer for the message buffer
                if (this.useMessageBox[index]) {
                    this.printer.printLn("UB __" + this.taskNames[index] + "_buffer;");
                }
                const taskSig = "EXPORT void " + util.getTypeStringInSnakeCase(m.parent, this.checker) + "(INT stacd, VP exinf)";
                this.printer.printLn(taskSig + ';');
                this.printer.print(taskSig + " ");
                if (!m.body) {
                    diag.emitDiagnostic(m, "no task body!");
                    process.exit(1);
                }
                // Add tk_ext_tsk to the end of task
                // This code looks redundant becase the ts compiler api crashes when some conditions are not fulfilled
                let ident = typescript_1.default.createIdentifier("tk_ext_tsk");
                ident.pos = m.body.statements.end;
                ident.end = ident.pos + 11;
                let call = typescript_1.default.createCall(ident, [], []);
                ident.parent = call;
                let exprSt = typescript_1.default.createExpressionStatement(call);
                call.parent = exprSt;
                let nArr = typescript_1.default.createNodeArray([...m.body.statements, exprSt]);
                exprSt.parent = m.body;
                m.body.statements = nArr;
                this.visit(m.body);
                this.printer.printLn("");
            });
            if (this.useLineBuffer) {
                const psp = new p.StdOutPrinter;
                psp.printLn("char line[16];");
                psp.printLn("");
            }
            this.printer.outputBuffer();
            this.printer = tmpPrinter;
        };
        this.printIncludes = () => {
            if (this.includes.length == 0) {
                return;
            }
            let tmpPrinter = this.printer;
            this.printer = new p.StdOutPrinter;
            this.includes.forEach((include) => {
                this.printer.printLn(include);
            });
            this.printer.printLn("");
            this.printer = tmpPrinter;
        };
        this.printer = printer;
        this.checker = checker;
    }
}
exports.visitor = visitor;
//# sourceMappingURL=visitor.js.map