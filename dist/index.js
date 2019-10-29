"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        strict: true,
        strictNullChecks: true,
        noImplicitAny: true
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
            var opt = __assign({}, this.options);
            this.options = p;
            this.options.withNewLine = true;
            this.print(s, this.options);
            this.options = opt;
            return this;
        };
        StdOutPrinter.prototype.printWithoutSpace = function (s) {
            process.stdout.write(s);
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
    // Camel to snake
    var camelToSnake = function (s, big) {
        if (big === void 0) { big = false; }
        s = s.slice(0, 1).toLowerCase() + s.slice(1);
        var snake = s.replace(/[A-Z]/g, function (letter) { return "_" + letter.toLowerCase(); });
        if (big) {
            return snake.toUpperCase();
        }
        return snake;
    };
    // Expression
    var visitExpression = function (expression) {
        if (expression.getText() == "true") {
            printer.printWithoutSpace("1");
            return;
        }
        if (ts.isNumericLiteral(expression)) {
            printer.printWithoutSpace(expression.text);
            return;
        }
        if (ts.isCallExpression(expression)) {
            switch (expression.expression.getText()) {
                case "console.log":
                    printer.print("tm_putstring(\"" + expression.arguments.map(function (e) {
                        if (ts.isLiteralExpression(e))
                            return e.text;
                        else
                            process.exit(1);
                    }) + "\\n\");");
                    return;
                case "process.exit":
                    printer.print("return " + expression.arguments[0].getText() + ";");
                    return;
                // TODO: handle arguements
                default:
                    if (ts.isPropertyAccessExpression(expression.expression)) {
                        // TODO: add util for type checker
                        var type = checker.getTypeAtLocation(expression.expression.expression);
                        if (checker.typeToString(type.getBaseTypes()[0]) == "Task") {
                            if (expression.expression.name.getText() == "start") {
                                var typeName = checker.typeToString(type);
                                printer.print("tk_sta_tsk( ObjID[" + camelToSnake(typeName, true) + "], ");
                                var argNum = 0;
                                for (var _i = 0, _a = expression.arguments; _i < _a.length; _i++) {
                                    var arg = _a[_i];
                                    if (argNum != 0) {
                                        emitDiagnostic(expression, "invalid argument in task.start");
                                        process.exit(1);
                                    }
                                    visitExpression(arg);
                                    ++argNum;
                                }
                                printer.printWithoutSpace(" );");
                            }
                            else {
                                emitDiagnostic(expression, "don't know how to handle " + expression.expression.name.getText());
                                process.exit(1);
                            }
                        }
                        else {
                            emitDiagnostic(expression, "don't know how to handle " + checker.typeToString(type));
                            process.exit(1);
                        }
                        return;
                    }
                    printer.print(expression.expression.getText() + "();");
            }
            // TODO: Add type map
            // for (const arg of expression.arguments) {
            //     process.stdout.write(checker.typeToString(checker.getTypeAtLocation(node)) + " ")
            //     printer.print(arg.getText(), { indentLevel: 0 })
            //     console.log(arg.getText())
            // }
            // printer.printLn(");")
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
            if (!d.initializer) {
                emitDiagnostic(d, "lack of initialization");
                process.exit(1);
            }
            var expr = d.initializer;
            if (ts.isNewExpression(expr)) {
                if (ts.isClassExpression(expr.expression)) {
                    var sym = checker.getSymbolAtLocation(expr.expression.name);
                    var type = checker.getDeclaredTypeOfSymbol(sym);
                    // console.log(checker.typeToString(type))
                    // console.log(type.isClass())
                    var onlyTaskAllowedMessage = "classes that extends only Task are allowed";
                    var baseTypes = type.getBaseTypes();
                    if (!baseTypes || baseTypes.length != 1) {
                        emitDiagnostic(d, onlyTaskAllowedMessage);
                        process.exit(1);
                    }
                    if (checker.typeToString(baseTypes[0]) != "Task") {
                        emitDiagnostic(d, onlyTaskAllowedMessage);
                        process.exit(1);
                    }
                    if (!expr.arguments) {
                        printer.printLn("t_ctsk.stksz = 1024;");
                        printer.printLn("t_ctsk.itskpri = 1;");
                    }
                    else {
                        var argNum = 0;
                        for (var _b = 0, _c = expr.arguments; _b < _c.length; _b++) {
                            var arg = _c[_b];
                            if (argNum == 0) {
                                printer.print("t_ctsk.itskpri = ");
                                visitExpression(arg);
                                printer.printLn(";");
                            }
                            else if (argNum == 1) {
                                printer.print("t_ctsk.stksz = ");
                                visitExpression(arg);
                                printer.printLn(";");
                            }
                            else {
                                emitDiagnostic(expr.expression, "invalid arguments");
                                process.exit(1);
                            }
                            ++argNum;
                        }
                        if (argNum == 0) {
                            printer.printLn("t_ctsk.stksz = 1024;");
                            printer.printLn("t_ctsk.itskpri = 1;");
                        }
                        if (argNum == 1) {
                            printer.printLn("t_ctsk.stksz = 1024;");
                        }
                    }
                    var taskIdent = expr.expression.name;
                    if (!taskIdent) {
                        emitDiagnostic(expr.expression, "invalid task");
                        process.exit(1);
                    }
                    var taskName = camelToSnake(taskIdent.text);
                    printer.printLn("STRCPY( (char *)t_ctsk.dsname, \"" + taskName + "\");");
                    printer.printLn("t_ctsk.task = " + taskName + ";");
                    printer.printLn("if ( (objid = tk_cre_tsk( &t_ctsk )) <= E_OK ) {");
                    printer.indent().printLn("tm_putstring(\" *** Failed in the creation of " + taskName + ".\\n\");");
                    printer.printLn("return 1;");
                    printer.unindent().printLn("}");
                    printer.printLn("ObjID[" + taskName.toUpperCase() + "] = objid;");
                    continue;
                }
            }
            emitDiagnostic(d, "don't know how to handle this initializer " + d.initializer);
            process.exit(1);
            // const sym = checker.getSymbolAtLocation(d.name)
            // const type = checker.getDeclaredTypeOfSymbol(sym!)
            // console.log(checker.typeToString(type))
            // const sym = checker.getSymbolAtLocation(d)
            // const type = checker.getDeclaredTypeOfSymbol(sym!)
            // const type = checker.getTypeAtLocation(d) as ts.TypeReference;
            // const typeArg = type.typeArguments![0];
        }
    };
    var visitStatement = function (statement) {
        if (ts.isExpressionStatement(statement)) {
            visitExpressionStatement(statement);
            return;
        }
        if (ts.isVariableStatement(statement)) {
            visitVariableStatement(statement);
            return;
        }
        if (ts.isIfStatement(statement)) {
            printer.print("if (");
            visitExpression(statement.expression);
            printer.printWithoutSpace(") ");
            visitStatement(statement.thenStatement);
            // TODO: handle else if
            if (statement.elseStatement) {
                printer.print(" else ");
                visitStatement(statement.elseStatement);
            }
            return;
        }
        if (ts.isWhileStatement(statement)) {
            printer.print("while(");
            visitExpression(statement.expression);
            printer.printWithoutSpace(") ");
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
            printer.printWithoutSpace(") ");
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
        console.log("}");
    };
})(typescriptc || (typescriptc = {}));
typescriptc.main();
//# sourceMappingURL=index.js.map