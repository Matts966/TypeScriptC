"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var ts = __importStar(require("typescript"));
var c_1 = require("./c");
var typescriptc;
(function (typescriptc) {
    // Initial file settings
    var fileNames = process.argv.slice(2);
    var program = ts.createProgram(fileNames, {
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.ESNext,
        strict: true
    });
    // Type Checker initialization
    var checker = program.getTypeChecker();
    // Diagnostics
    var emitDiagnostics = function (diagnostics) {
        var diagHost = {
            getCanonicalFileName: function (f) { return f; },
            getCurrentDirectory: function () { return "."; },
            getNewLine: function () { return "\n"; }
        };
        console.log(ts.formatDiagnosticsWithColorAndContext(diagnostics, diagHost));
    };
    var Diagnostic = /** @class */ (function () {
        function Diagnostic(category, file, start, length, messageText) {
            this.category = category;
            this.code = 0;
            this.file = file;
            this.start = start;
            this.length = length;
            this.messageText = messageText;
        }
        return Diagnostic;
    }());
    var emitDiagnostic = function (node, messageText) {
        emitDiagnostics([new Diagnostic(ts.DiagnosticCategory.Error, node.getSourceFile(), node.getStart(), node.getWidth(), messageText)]);
        process.exit(1);
    };
    var getDiagnostic = function (node, messageText) {
        return new Diagnostic(ts.DiagnosticCategory.Error, node.getSourceFile(), node.getStart(), node.getWidth(), messageText);
    };
    // Printer
    var IndentType;
    (function (IndentType) {
        IndentType["tab"] = "\t";
        IndentType["space"] = "s";
    })(IndentType || (IndentType = {}));
    var StdOutPrinter = /** @class */ (function () {
        function StdOutPrinter() {
            this.options = {
                indentLevel: 1,
                indentType: IndentType.tab,
                withNewLine: false
            };
        }
        StdOutPrinter.prototype.print = function (s, p) {
            if (p === void 0) { p = this.options; }
            if (p.indentLevel && p.indentLevel > 0) {
                var t = p.indentType || IndentType.tab;
                s = t.repeat(p.indentLevel) + s;
            }
            if (p.withNewLine) {
                console.log(s);
            }
            else {
                process.stdout.write(s);
            }
            return this;
        };
        StdOutPrinter.prototype.printLn = function (s, p) {
            if (p === void 0) { p = this.options; }
            var opt = this.options;
            this.options = p;
            this.options.withNewLine = true;
            this.print(s, this.options);
            this.options = opt;
            return this;
        };
        StdOutPrinter.prototype.indent = function () {
            ++this.options.indentLevel;
            return this;
        };
        StdOutPrinter.prototype.unindent = function () {
            --this.options.indentLevel;
            return this;
        };
        return StdOutPrinter;
    }());
    var printer = new StdOutPrinter();
    // Utility
    var isGlobal = function (node) {
        if (ts.isSourceFile(node.parent))
            return true;
        return false;
    };
    // Import Statement
    var tKernelImported = false;
    var isImportTKernel = function (i) {
        var ic = i.importClause;
        if (!ic)
            return;
        var namedImport = ic.namedBindings;
        if (namedImport.name.text != "tkernel") {
            return false;
        }
        tKernelImported = true;
        return true;
    };
    var handleImport = function (node) {
        if (ts.isImportDeclaration(node)) {
            if (!isImportTKernel(node)) {
                emitDiagnostic(node, 'please import only tkernel by `import * as tkernel from "./tkernel"`');
                process.exit(1);
            }
            return true;
        }
        if (!tKernelImported) {
            emitDiagnostic(node, 'please import only tkernel by `import * as tkernel from "./tkernel"`');
            process.exit(1);
        }
    };
    // Expression
    var visitExpression = function (expression) {
        if (ts.isCallExpression(expression)) {
            if (expression.expression.getText() == "console.log") {
                printer.print("tm_putstring(\"" + expression.arguments.map(function (e) {
                    if (ts.isLiteralExpression(e))
                        return e.text;
                    else
                        process.exit(1);
                }) + "\\n\");", { withNewLine: false });
                return;
            }
            for (var _i = 0, _a = expression.arguments; _i < _a.length; _i++) {
                var node = _a[_i];
                process.stdout.write(checker.typeToString(checker.getTypeAtLocation(node)) + " ");
            }
            console.log(");");
            return;
        }
        process.stdout.write(expression.getText());
    };
    // Statement
    var isStatement = function (node) {
        if (ts.isExpressionStatement(node) || ts.isIfStatement(node) || ts.isWhileStatement(node) || ts.isForStatement || ts.isVariableStatement(node) || ts.isReturnStatement(node) || ts.isBlock(node)) {
            return true;
        }
        return false;
    };
    var visitExpressionStatement = function (expressionStatement) {
        visitExpression(expressionStatement.expression);
        console.log();
    };
    var visitVariableStatement = function (variableStatement) {
        visitVariableDeclarationList(variableStatement.declarationList);
    };
    var visitVariableDeclarationList = function (variableDeclarationList) {
        for (var _i = 0, _a = variableDeclarationList.declarations; _i < _a.length; _i++) {
            var d = _a[_i];
            var type = checker.getTypeAtLocation(d.type);
            // const typeArg = type.typeArguments![0];
            console.log(type.getDefault());
        }
    };
    var visitStatement = function (statement) {
        if (ts.isExpressionStatement(statement)) {
            visitExpressionStatement(statement);
            return;
        }
        if (ts.isVariableStatement(statement)) {
            console.log("VariableStatement: ");
            visitVariableStatement(statement);
            return;
        }
        if (ts.isIfStatement(statement)) {
            printer.print("if (");
            visitExpression(statement.expression);
            printer.print(") ");
            visitStatement(statement.thenStatement);
            // TODO: handle else if
            if (statement.elseStatement) {
                printer.print(" else ");
                visitStatement(statement.elseStatement);
            }
            return;
        }
        if (ts.isWhileStatement(statement)) {
            printer.print("while (");
            visitExpression(statement.expression);
            printer.print(") ");
            visitStatement(statement.statement);
            return;
        }
        if (ts.isForStatement(statement)) {
            printer.print("for (");
            var ini = statement.initializer;
            if (ini) {
                if (ts.isVariableDeclarationList(ini)) {
                    visitVariableDeclarationList(ini);
                }
                else {
                    visitExpression(ini);
                }
            }
            printer.print("; ");
            var cond = statement.condition;
            if (cond) {
                visitExpression(cond);
            }
            printer.print("; ");
            var incre = statement.incrementor;
            if (incre) {
                visitExpression(incre);
            }
            printer.print(") ");
            visitStatement(statement.statement);
        }
        if (ts.isBlock(statement)) {
            printer.printLn("{", { indentLevel: 0 });
            printer.indent();
            statement.statements.forEach(function (e) {
                visitStatement(e);
            });
            printer.unindent();
            printer.printLn("}");
            return;
        }
        emitDiagnostic(statement, "visitStatement: don't know how to handle " + ts.SyntaxKind[statement.kind]);
        process.exit(1);
    };
    var visitClassDeclaration = function (classDeclaration) {
        if (!isGlobal(classDeclaration))
            emitDiagnostic(classDeclaration, "ClassDeclarations is only allowed in global scope");
        var notAllowedDiagnostic = function () { return emitDiagnostic(classDeclaration, "ClassDeclarations other than tasks are not allowed"); };
        var heritage = classDeclaration.heritageClauses;
        if (!heritage || heritage.length != 1 && heritage[0].types.length != 1) {
            notAllowedDiagnostic();
            return;
        }
        if (heritage[0].types[0].getText() != "tkernel.Task") {
            notAllowedDiagnostic();
            return;
        }
        notAllowedDiagnostic = function () { return emitDiagnostic(classDeclaration, "Task Declaration should be only with task function"); };
        if (classDeclaration.members.length != 1) {
            notAllowedDiagnostic();
            return;
        }
        var m = classDeclaration.members[0];
        if (!m || !m.name || m.name.getText() != "task") {
            notAllowedDiagnostic();
        }
        console.log(classDeclaration.members[0].getText());
    };
    // General visit function
    var visit = function (node) {
        if (node.kind == ts.SyntaxKind.EndOfFileToken) {
            return;
        }
        if (handleImport(node))
            return;
        if (isStatement(node)) {
            return visitStatement(node);
        }
        if (ts.isFunctionDeclaration(node)) {
            console.log("FunctionDeclaration: " + node.body);
            console.log();
            return;
        }
        if (ts.isClassDeclaration(node)) {
            return visitClassDeclaration(node);
        }
        //TODO: allow only constant task declaration
        emitDiagnostic(node, "visit: don't know how to handle " + ts.SyntaxKind[node.kind]);
        process.exit(1);
    };
    typescriptc.main = function () {
        var cnp = new c_1.c.Program();
        cnp.includes.push();
        // Apply type check
        var allDiagnostics = ts.getPreEmitDiagnostics(program)
            .concat();
        if (allDiagnostics.length > 0) {
            emitDiagnostics(allDiagnostics);
            process.exit(1);
        }
        console.log("#include <tk/tkernel.h>\n#include <tm/tmonitor.h>\n#include <libstr.h>\n");
        console.log("EXPORT INT usermain( void ) {\n\tT_CTSK t_ctsk;\n\tID objid;\n\tt_ctsk.tskatr = TA_HLNG | TA_DSNAME;\n");
        // Main loop
        for (var _i = 0, _a = program.getSourceFiles(); _i < _a.length; _i++) {
            var sourceFile = _a[_i];
            if (!sourceFile.isDeclarationFile && !sourceFile.fileName.endsWith("tkernel.ts")) {
                // using checker sample
                var symbol = checker.getSymbolAtLocation(sourceFile);
                var src = symbol.valueDeclaration;
                if (ts.isSourceFile(src)) {
                    for (var _b = 0, _c = src.statements; _b < _c.length; _b++) {
                        var node = _c[_b];
                        // TODO: handle declarations for later use
                        if (ts.isClassDeclaration(node)) {
                        }
                        if (ts.isVariableStatement(node)) {
                        }
                    }
                }
                // Walk the tree to search source code.
                ts.forEachChild(sourceFile, visit);
            }
        }
        console.log("}\n");
    };
})(typescriptc || (typescriptc = {}));
typescriptc.main();
//# sourceMappingURL=index.js.map