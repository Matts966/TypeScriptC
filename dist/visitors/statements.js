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
exports.__esModule = true;
var typescript_1 = __importDefault(require("typescript"));
var expressions = __importStar(require("./expressions"));
var diag = __importStar(require("../diagnostics"));
var util = __importStar(require("../utilities"));
exports.isStatement = function (node) {
    if (typescript_1["default"].isExpressionStatement(node) || typescript_1["default"].isIfStatement(node) || typescript_1["default"].isWhileStatement(node) || typescript_1["default"].isForStatement || typescript_1["default"].isVariableStatement(node) || typescript_1["default"].isReturnStatement(node) || typescript_1["default"].isBlock(node)) {
        return true;
    }
    return false;
};
exports.visitExpressionStatement = function (expressionStatement, v) {
    expressions.visitExpression(expressionStatement.expression, v);
    v.printer.printWithoutSpace(";\n");
};
exports.visitVariableStatement = function (variableStatement, v) {
    exports.visitVariableDeclarationList(variableStatement.declarationList, v);
};
exports.visitVariableDeclarationList = function (variableDeclarationList, v) {
    for (var _i = 0, _a = variableDeclarationList.declarations; _i < _a.length; _i++) {
        var d = _a[_i];
        if (!d.initializer) {
            diag.emitDiagnostic(d, "lack of initialization");
            process.exit(1);
        }
        var expr = d.initializer;
        if (typescript_1["default"].isNumericLiteral(expr)) {
            // TODO: check if it is int
            v.printer.printWithoutSpace("int " + d.name.getText() + " = " + expr.getText());
            return;
        }
        if (typescript_1["default"].isNewExpression(expr)) {
            if (typescript_1["default"].isClassExpression(expr.expression)) {
                var sym = v.checker.getSymbolAtLocation(expr.expression.name);
                var type = v.checker.getDeclaredTypeOfSymbol(sym);
                // console.log(checker.typeToString(type))
                // console.log(type.isClass())
                var onlyTaskAllowedMessage = "classes that extends only Task are allowed";
                var baseTypes = type.getBaseTypes();
                if (!baseTypes || baseTypes.length != 1) {
                    diag.emitDiagnostic(d, onlyTaskAllowedMessage);
                    process.exit(1);
                }
                if (v.checker.typeToString(baseTypes[0]) != "Task") {
                    diag.emitDiagnostic(d, onlyTaskAllowedMessage);
                    process.exit(1);
                }
                expressions.handleClassMembers(expr.expression.members, v);
                if (!expr.arguments) {
                    v.printer.printLn("t_ctsk.stksz = 1024;");
                    v.printer.printLn("t_ctsk.itskpri = 1;");
                }
                else {
                    var argNum = 0;
                    for (var _b = 0, _c = expr.arguments; _b < _c.length; _b++) {
                        var arg = _c[_b];
                        if (argNum == 0) {
                            v.printer.print("t_ctsk.itskpri = ");
                            expressions.visitExpression(arg, v);
                            v.printer.printWithoutSpace(";\n");
                        }
                        else if (argNum == 1) {
                            v.printer.print("t_ctsk.stksz = ");
                            expressions.visitExpression(arg, v);
                            v.printer.printLn(";");
                        }
                        else {
                            diag.emitDiagnostic(expr.expression, "invalid arguments");
                            process.exit(1);
                        }
                        ++argNum;
                    }
                    if (argNum == 0) {
                        v.printer.printLn("t_ctsk.stksz = 1024;");
                        v.printer.printLn("t_ctsk.itskpri = 1;");
                    }
                    if (argNum == 1) {
                        v.printer.printLn("t_ctsk.stksz = 1024;");
                    }
                }
                var taskIdent = expr.expression.name;
                if (!taskIdent) {
                    diag.emitDiagnostic(expr.expression, "invalid task");
                    process.exit(1);
                }
                var taskName = util.camelToSnake(taskIdent.text);
                v.printer.printLn("STRCPY( (char *)t_ctsk.dsname, \"" + taskName + "\");");
                v.printer.printLn("t_ctsk.task = " + taskName + ";");
                v.printer.printLn("if ( (objid = tk_cre_tsk( &t_ctsk )) <= E_OK ) {");
                v.printer.indent().printLn("tm_putstring(\" *** Failed in the creation of " + taskName + ".\\n\");");
                v.printer.printLn("return 1;");
                v.printer.unindent().printLn("}");
                v.printer.printLn("ObjID[" + taskName.toUpperCase() + "] = objid;");
                continue;
            }
            // TODO: merge handling with ClassExpression by makeing function
            if (typescript_1["default"].isIdentifier(expr.expression)) {
                var sym = v.checker.getSymbolAtLocation(expr.expression);
                var type = v.checker.getDeclaredTypeOfSymbol(sym);
                // console.log(checker.typeToString(type))
                // console.log(type.isClass())
                var onlyTaskAllowedMessage = "classes that extends only Task are allowed";
                var baseTypes = type.getBaseTypes();
                if (!baseTypes || baseTypes.length != 1) {
                    diag.emitDiagnostic(d, onlyTaskAllowedMessage);
                    process.exit(1);
                }
                if (v.checker.typeToString(baseTypes[0]) != "Task") {
                    diag.emitDiagnostic(d, onlyTaskAllowedMessage);
                    process.exit(1);
                }
                if (!expr.arguments) {
                    v.printer.printLn("t_ctsk.stksz = 1024;");
                    v.printer.printLn("t_ctsk.itskpri = 1;");
                }
                else {
                    var argNum = 0;
                    for (var _d = 0, _e = expr.arguments; _d < _e.length; _d++) {
                        var arg = _e[_d];
                        if (argNum == 0) {
                            v.printer.print("t_ctsk.itskpri = ");
                            expressions.visitExpression(arg, v);
                            v.printer.printLn(";");
                        }
                        else if (argNum == 1) {
                            v.printer.print("t_ctsk.stksz = ");
                            expressions.visitExpression(arg, v);
                            v.printer.printLn(";");
                        }
                        else {
                            diag.emitDiagnostic(expr.expression, "invalid arguments");
                            process.exit(1);
                        }
                        ++argNum;
                    }
                    if (argNum == 0) {
                        v.printer.printLn("t_ctsk.stksz = 1024;");
                        v.printer.printLn("t_ctsk.itskpri = 1;");
                    }
                    if (argNum == 1) {
                        v.printer.printLn("t_ctsk.stksz = 1024;");
                    }
                }
                var taskIdent = expr.expression;
                if (!taskIdent) {
                    diag.emitDiagnostic(expr.expression, "invalid task");
                    process.exit(1);
                }
                var taskName = util.camelToSnake(taskIdent.text);
                v.printer.printLn("STRCPY( (char *)t_ctsk.dsname, \"" + taskName + "\");");
                v.printer.printLn("t_ctsk.task = " + taskName + ";");
                v.printer.printLn("if ( (objid = tk_cre_tsk( &t_ctsk )) <= E_OK ) {");
                v.printer.indent().printLn("tm_putstring(\" *** Failed in the creation of " + taskName + ".\\n\");");
                v.printer.printLn("return 1;");
                v.printer.unindent().printLn("}");
                v.printer.printLn("ObjID[" + taskName.toUpperCase() + "] = objid;");
                continue;
            }
        }
        diag.emitDiagnostic(d, "don't know how to handle this initializer " + d.initializer);
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
exports.visitStatement = function (statement, v) {
    if (typescript_1["default"].isExpressionStatement(statement)) {
        exports.visitExpressionStatement(statement, v);
        return;
    }
    if (typescript_1["default"].isVariableStatement(statement)) {
        exports.visitVariableStatement(statement, v);
        return;
    }
    if (typescript_1["default"].isIfStatement(statement)) {
        v.printer.print("if ( ");
        expressions.visitExpression(statement.expression, v);
        v.printer.printWithoutSpace(" )");
        if (typescript_1["default"].isBlock(statement.thenStatement)) {
            v.printer.printWithoutSpace(" ");
        }
        else {
            v.printer.printWithoutSpace("\n");
            v.printer.indent();
        }
        exports.visitStatement(statement.thenStatement, v);
        if (!typescript_1["default"].isBlock(statement.thenStatement)) {
            v.printer.unindent();
        }
        // TODO: handle else if
        if (statement.elseStatement) {
            v.printer.printWithoutSpace(" else ");
            if (!typescript_1["default"].isBlock(statement.elseStatement)) {
                v.printer.printWithoutSpace("\n");
                v.printer.indent();
            }
            exports.visitStatement(statement.elseStatement, v);
            if (!typescript_1["default"].isBlock(statement.elseStatement)) {
                v.printer.unindent();
            }
        }
        return;
    }
    if (typescript_1["default"].isWhileStatement(statement)) {
        v.printer.print("while ( ");
        expressions.visitExpression(statement.expression, v);
        v.printer.printWithoutSpace(" ) ");
        exports.visitStatement(statement.statement, v);
        return;
    }
    if (typescript_1["default"].isForStatement(statement)) {
        v.printer.print("for ( ");
        var ini = statement.initializer;
        if (ini) {
            if (typescript_1["default"].isVariableDeclarationList(ini)) {
                exports.visitVariableDeclarationList(ini, v);
            }
            else {
                expressions.visitExpression(ini, v);
            }
        }
        v.printer.printWithoutSpace("; ");
        var cond = statement.condition;
        if (cond) {
            expressions.visitExpression(cond, v);
        }
        v.printer.printWithoutSpace("; ");
        var incre = statement.incrementor;
        if (incre) {
            expressions.visitExpression(incre, v);
        }
        v.printer.printWithoutSpace(" ) ");
        exports.visitStatement(statement.statement, v);
        return;
    }
    if (typescript_1["default"].isBlock(statement)) {
        v.printer.printLn("{", { indentLevel: 0 });
        v.printer.indent();
        statement.statements.forEach(function (e) {
            exports.visitStatement(e, v);
        });
        v.printer.unindent();
        v.printer.printLn("}");
        return;
    }
    diag.emitDiagnostic(statement, "visitStatement: don't know how to handle " + typescript_1["default"].SyntaxKind[statement.kind]);
    process.exit(1);
};
exports.visitClassDeclaration = function (classDeclaration, v) {
    if (!util.isGlobal(classDeclaration))
        diag.emitDiagnostic(classDeclaration, "ClassDeclarations is only allowed in global scope");
    var notAllowedDiagnostic = function () { return diag.emitDiagnostic(classDeclaration, "ClassDeclarations other than tasks are not allowed"); };
    var heritage = classDeclaration.heritageClauses;
    if (!heritage || heritage.length != 1 && heritage[0].types.length != 1) {
        notAllowedDiagnostic();
        return;
    }
    if (heritage[0].types[0].getText() != "tkernel.Task") {
        notAllowedDiagnostic();
        return;
    }
    notAllowedDiagnostic = function () { return diag.emitDiagnostic(classDeclaration, "Task Declaration should be only with task function"); };
    if (classDeclaration.members.length != 1) {
        notAllowedDiagnostic();
        return;
    }
    var m = classDeclaration.members[0];
    if (!m || !m.name || m.name.getText() != "task") {
        notAllowedDiagnostic();
    }
    expressions.handleClassMembers(classDeclaration.members, v);
};
//# sourceMappingURL=statements.js.map