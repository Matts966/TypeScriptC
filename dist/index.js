"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var typescript_1 = __importDefault(require("typescript"));
var c_1 = require("./c");
var typescriptc;
(function (typescriptc) {
    // Initial file settings
    var fileNames = process.argv.slice(2);
    var program = typescript_1["default"].createProgram(fileNames, {
        target: typescript_1["default"].ScriptTarget.ESNext,
        module: typescript_1["default"].ModuleKind.ESNext,
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
        console.log(typescript_1["default"].formatDiagnosticsWithColorAndContext(diagnostics, diagHost));
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
        emitDiagnostics([new Diagnostic(typescript_1["default"].DiagnosticCategory.Error, node.getSourceFile(), node.getStart(), node.getWidth(), messageText)]);
        process.exit(1);
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
                withNewLine: true
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
        };
        StdOutPrinter.prototype.indent = function () {
            ++this.options.indentLevel;
        };
        StdOutPrinter.prototype.unindent = function () {
            --this.options.indentLevel;
        };
        return StdOutPrinter;
    }());
    var printer = new StdOutPrinter();
    // Utility
    var isGlobal = function (node) {
        if (typescript_1["default"].isSourceFile(node.parent))
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
        if (typescript_1["default"].isImportDeclaration(node)) {
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
        if (typescript_1["default"].isCallExpression(expression)) {
            if (expression.expression.getText() == "console.log") {
                printer.print("tm_putstring(\"" + expression.arguments.map(function (e) {
                    if (typescript_1["default"].isLiteralExpression(e))
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
        if (typescript_1["default"].isExpressionStatement(node) || typescript_1["default"].isIfStatement(node) || typescript_1["default"].isWhileStatement(node) || typescript_1["default"].isVariableStatement(node) || typescript_1["default"].isReturnStatement(node) || typescript_1["default"].isBlock(node)) {
            return true;
        }
        return false;
    };
    var visitExpressionStatement = function (expressionStatement) {
        visitExpression(expressionStatement.expression);
        console.log();
    };
    var visitVariableStatement = function (variableStatement) {
        for (var _i = 0, _a = variableStatement.declarationList.declarations; _i < _a.length; _i++) {
            var d = _a[_i];
            var type = checker.getTypeAtLocation(d.type);
            // const typeArg = type.typeArguments![0];
            console.log(type.getDefault());
        }
        process.stdout.write(variableStatement.getText());
    };
    var visitStatement = function (statement) {
        if (typescript_1["default"].isExpressionStatement(statement)) {
            visitExpressionStatement(statement);
            return;
        }
        if (typescript_1["default"].isVariableStatement(statement)) {
            console.log("VariableStatement: ");
            visitVariableStatement(statement);
            console.log();
            return;
        }
        if (typescript_1["default"].isIfStatement(statement)) {
            process.stdout.write("if (");
            visitExpression(statement.expression);
            process.stdout.write(") ");
            visitStatement(statement.thenStatement);
            if (statement.elseStatement) {
                visitStatement(statement.elseStatement);
            }
            console.log();
            return;
        }
        if (typescript_1["default"].isWhileStatement(statement)) {
            process.stdout.write("while (");
            visitExpression(statement.expression);
            process.stdout.write(") ");
            visitStatement(statement.statement);
            return;
        }
        if (typescript_1["default"].isBlock(statement)) {
            printer.print("{", { indentLevel: 0 });
            printer.indent();
            statement.statements.forEach(function (e) {
                visitStatement(e);
            });
            printer.unindent();
            printer.print("}");
            return;
        }
        emitDiagnostic(statement, "visitStatement: don't know how to handle" + typescript_1["default"].SyntaxKind[statement.kind]);
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
        if (handleImport(node))
            return;
        if (isStatement(node)) {
            return visitStatement(node);
        }
        if (typescript_1["default"].isFunctionDeclaration(node)) {
            console.log("FunctionDeclaration: " + node.body);
            console.log();
            return;
        }
        if (typescript_1["default"].isClassDeclaration(node)) {
            return visitClassDeclaration(node);
        }
        if (node.kind == typescript_1["default"].SyntaxKind.EndOfFileToken) {
            return;
        }
        //TODO: allow only constant task declaration
        emitDiagnostic(node, "visit: don't know how to handle" + typescript_1["default"].SyntaxKind[node.kind]);
        process.exit(1);
    };
    typescriptc.main = function () {
        var cnp = new c_1.c.Program();
        cnp.includes.push();
        // Apply type check
        var allDiagnostics = typescript_1["default"].getPreEmitDiagnostics(program)
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
                if (typescript_1["default"].isSourceFile(src)) {
                    src;
                }
                // Walk the tree to search for classes
                typescript_1["default"].forEachChild(sourceFile, visit);
            }
        }
        console.log("}\n");
    };
})(typescriptc || (typescriptc = {}));
typescriptc.main();
//# sourceMappingURL=index.js.map