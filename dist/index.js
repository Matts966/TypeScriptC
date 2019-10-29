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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
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
                indentLevel: 0,
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
    var BufferedPrinter = /** @class */ (function () {
        function BufferedPrinter() {
            this.options = {
                indentLevel: 1,
                indentType: IndentType.tab,
                withNewLine: false
            };
            this.buffer = "";
        }
        BufferedPrinter.prototype.print = function (s, p) {
            if (p === void 0) { p = this.options; }
            if (p.indentLevel && p.indentLevel > 0) {
                var t = p.indentType || IndentType.tab;
                s = t.repeat(p.indentLevel) + s;
            }
            if (p.withNewLine) {
                this.buffer += s + '\n';
            }
            else {
                this.buffer += s;
            }
            return this;
        };
        BufferedPrinter.prototype.printLn = function (s, p) {
            if (p === void 0) { p = this.options; }
            var opt = __assign({}, this.options);
            this.options = p;
            this.options.withNewLine = true;
            this.print(s, this.options);
            this.options = opt;
            return this;
        };
        BufferedPrinter.prototype.printWithoutSpace = function (s) {
            this.buffer += s;
        };
        BufferedPrinter.prototype.outputBuffer = function () {
            process.stdout.write(this.buffer);
        };
        BufferedPrinter.prototype.indent = function () {
            ++this.options.indentLevel;
            return this;
        };
        BufferedPrinter.prototype.unindent = function () {
            --this.options.indentLevel;
            return this;
        };
        return BufferedPrinter;
    }());
    var printer = new BufferedPrinter();
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
        if (ts.isNumericLiteral(expression)) {
            printer.printWithoutSpace(expression.text);
            return;
        }
        if (ts.isCallExpression(expression)) {
            switch (expression.expression.getText()) {
                case "console.log":
                    // TODO: safer handling
                    printer.print("tm_putstring(\"" + expression.arguments.map(function (e) {
                        if (ts.isLiteralExpression(e))
                            return e.text.split('').map(function (c) {
                                var cc = c.charCodeAt(0);
                                if (31 < cc && 127 > cc) {
                                    return c;
                                }
                                emitDiagnostic(e, "control sequence " + cc + " is not allowed now");
                                process.exit(1);
                            }).join('');
                        else
                            process.exit(1);
                    }) + "\\n\");");
                    return;
                case "process.exit":
                    printer.print("return " + expression.arguments[0].getText() + ";");
                    return;
                case "tkernel.ask":
                    printer.printLn("tm_putstring((UB*)" + expression.arguments[0].getText() + ");");
                    printer.print("tm_getchar(-1);");
                    return;
                // TODO: handle arguements
                default:
                    if (ts.isPropertyAccessExpression(expression.expression)) {
                        // TODO: add util for type checker
                        var type = checker.getTypeAtLocation(expression.expression.expression);
                        // TODO: handle this
                        if (!type.getBaseTypes()) {
                            console.log(checker.typeToString(type));
                            return;
                        }
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
                    if (ts.isIdentifier(expression.expression)) {
                        printer.print(expression.expression.text + "();");
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
        if (expression.getText() == "true") {
            printer.printWithoutSpace("1");
            return;
        }
        printer.printWithoutSpace(expression.getText());
    };
    var handleClassMembers = function (members) {
        for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
            var member = members_1[_i];
            var invalidOverrideMessage = "please override only task with protected keyword";
            if (ts.isMethodDeclaration(member)) {
                if (!member.modifiers) {
                    emitDiagnostic(member, invalidOverrideMessage);
                    process.exit(1);
                }
                for (var _a = 0, _b = member.modifiers; _a < _b.length; _a++) {
                    var mod = _b[_a];
                    if (mod.getText() == "protected") {
                        continue;
                    }
                    emitDiagnostic(member, invalidOverrideMessage);
                    process.exit(1);
                }
                // console.log(member.name.getText())
                if (member.name.getText() == "task") {
                    addTask(member);
                    continue;
                }
                emitDiagnostic(member, invalidOverrideMessage);
                process.exit(1);
            }
            emitDiagnostic(member, invalidOverrideMessage);
            process.exit(1);
        }
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
        printer.printWithoutSpace("\n");
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
            if (ts.isNumericLiteral(expr)) {
                // TODO: check if it is int
                printer.printWithoutSpace("int " + d.name.getText() + " = " + expr.getText());
                return;
            }
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
                    handleClassMembers(expr.expression.members);
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
                // TODO: merge handling with ClassExpression by makeing function
                if (ts.isIdentifier(expr.expression)) {
                    var sym = checker.getSymbolAtLocation(expr.expression);
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
                        for (var _d = 0, _e = expr.arguments; _d < _e.length; _d++) {
                            var arg = _e[_d];
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
                    var taskIdent = expr.expression;
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
            printer.print("if ( ");
            visitExpression(statement.expression);
            printer.printWithoutSpace(" ) ");
            visitStatement(statement.thenStatement);
            // TODO: handle else if
            if (statement.elseStatement) {
                printer.printWithoutSpace(" else ");
                visitStatement(statement.elseStatement);
            }
            return;
        }
        if (ts.isWhileStatement(statement)) {
            printer.print("while ( ");
            visitExpression(statement.expression);
            printer.printWithoutSpace(" ) ");
            visitStatement(statement.statement);
            return;
        }
        if (ts.isForStatement(statement)) {
            printer.print("for ( ");
            var ini = statement.initializer;
            if (ini) {
                if (ts.isVariableDeclarationList(ini)) {
                    visitVariableDeclarationList(ini);
                }
                else {
                    visitExpression(ini);
                }
            }
            printer.printWithoutSpace("; ");
            var cond = statement.condition;
            if (cond) {
                visitExpression(cond);
            }
            printer.printWithoutSpace("; ");
            var incre = statement.incrementor;
            if (incre) {
                visitExpression(incre);
            }
            printer.printWithoutSpace(" ) ");
            visitStatement(statement.statement);
            return;
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
        handleClassMembers(classDeclaration.members);
    };
    // General visit function
    var visit = function (node) {
        if (node.kind == ts.SyntaxKind.EndOfFileToken) {
            return;
        }
        if (handleImport(node))
            return;
        if (ts.isClassDeclaration(node)) {
            return visitClassDeclaration(node);
        }
        if (isStatement(node)) {
            return visitStatement(node);
        }
        if (ts.isFunctionDeclaration(node)) {
            console.log("FunctionDeclaration: " + node.body);
            console.log();
            return;
        }
        //TODO: allow only constant task declaration
        emitDiagnostic(node, "visit: don't know how to handle " + ts.SyntaxKind[node.kind]);
        process.exit(1);
    };
    var tasks = [];
    var addTask = function (method) {
        tasks.push(method);
    };
    var getTypeString = function (node) {
        var type = checker.getTypeAtLocation(node);
        var typeName = checker.typeToString(type);
        var splited = typeName.split(" ");
        if (splited.length != 1) {
            return camelToSnake(splited[1]);
        }
        return camelToSnake(typeName);
    };
    var printTasks = function () {
        if (tasks.length == 0) {
            return;
        }
        var tmpPrinter = printer;
        printer = new StdOutPrinter;
        var taskNames = tasks.map(function (m) {
            return getTypeString(m.parent);
        });
        printer.printLn("typedef enum { " + taskNames.map(function (name) { return name.toUpperCase() + ', '; }) + "OBJ_KIND_NUM } OBJ_KIND;");
        printer.printLn("EXPORT ID ObjID[OBJ_KIND_NUM];");
        printer.printLn("");
        tasks.forEach(function (m) {
            var taskSig = "EXPORT void " + getTypeString(m.parent) + "(INT stacd, VP exinf)";
            printer.printLn(taskSig + ';');
            printer.print(taskSig + " ");
            if (!m.body) {
                emitDiagnostic(m, "no task body!");
                process.exit(1);
            }
            // Add tk_ext_tsk to the end of task
            // This code looks redundant becase the ts compiler api crashes when some conditions are not fulfilled
            var ident = ts.createIdentifier("tk_ext_tsk");
            ident.pos = m.body.statements.end;
            ident.end = ident.pos + 11;
            var call = ts.createCall(ident, [], []);
            ident.parent = call;
            var exprSt = ts.createExpressionStatement(call);
            call.parent = exprSt;
            var nArr = ts.createNodeArray(__spreadArrays(m.body.statements, [exprSt]));
            exprSt.parent = m.body;
            m.body.statements = nArr;
            visit(m.body);
        });
        printer.printLn("");
        printer = tmpPrinter;
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
        printTasks();
        console.log("EXPORT INT usermain( void ) {");
        if (tasks.length != 0) {
            console.log("\tT_CTSK t_ctsk;\n\tID objid;\n\tt_ctsk.tskatr = TA_HLNG | TA_DSNAME;\n");
        }
        printer.outputBuffer();
        console.log("}");
    };
})(typescriptc || (typescriptc = {}));
typescriptc.main();
//# sourceMappingURL=index.js.map