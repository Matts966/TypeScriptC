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
const expressions = __importStar(require("./expressions"));
const diag = __importStar(require("../diagnostics"));
const util = __importStar(require("../utilities"));
exports.isStatement = (node) => {
    if (typescript_1.default.isExpressionStatement(node) || typescript_1.default.isIfStatement(node) || typescript_1.default.isWhileStatement(node) || typescript_1.default.isForStatement || typescript_1.default.isVariableStatement(node) || typescript_1.default.isReturnStatement(node) || typescript_1.default.isBlock(node)) {
        return true;
    }
    return false;
};
exports.visitExpressionStatement = (expressionStatement, v) => {
    expressions.visitExpression(expressionStatement.expression, v);
    v.printer.printWithoutSpace(";\n");
};
exports.visitVariableStatement = (variableStatement, v) => {
    typescript_1.default.isPropertyAssignment;
    exports.visitVariableDeclarationList(variableStatement.declarationList, v);
};
exports.visitVariableDeclarationList = (variableDeclarationList, v) => {
    for (const d of variableDeclarationList.declarations) {
        if (!d.initializer) {
            diag.emitDiagnostic(d, "lack of initialization");
            process.exit(1);
        }
        const expr = d.initializer;
        if (typescript_1.default.isNumericLiteral(expr)) {
            // TODO: check if it is int
            v.printer.printWithoutSpace("int " + d.name.getText() + " = " + expr.getText());
            return;
        }
        if (typescript_1.default.isNewExpression(expr)) {
            if (typescript_1.default.isClassExpression(expr.expression)) {
                if (isTask(expr.expression.name, v)) {
                    expressions.handleClassMembers(expr.expression.members, v);
                    if (!expr.expression.name) {
                        diag.emitDiagnostic(expr.expression, "task should have name");
                        process.exit(1);
                    }
                    handleTaskInitialization(expr, expr.expression.name, v);
                    continue;
                }
            }
            if (typescript_1.default.isIdentifier(expr.expression)) {
                if (isTask(expr.expression, v)) {
                    handleTaskInitialization(expr, expr.expression, v);
                    continue;
                }
            }
            if (isMQTTClient(expr.expression, v)) {
                handleMQTTClientDeclaration(d, v);
                continue;
            }
        }
    }
};
const isMQTTClient = (location, v) => {
    const sym = v.checker.getSymbolAtLocation(location);
    const type = v.checker.getDeclaredTypeOfSymbol(sym);
    if (v.checker.typeToString(type) != "MQTTClient") {
        return false;
    }
    return true;
};
const isTask = (location, v) => {
    if (!location)
        return false;
    const sym = v.checker.getSymbolAtLocation(location);
    const type = v.checker.getDeclaredTypeOfSymbol(sym);
    const baseTypes = type.getBaseTypes();
    if (!baseTypes || baseTypes.length != 1) {
        return false;
    }
    if (v.checker.typeToString(baseTypes[0]) != "Task") {
        return false;
    }
    return true;
};
// TODO: Fix bugs about collision of identifier caused by ignored identifier
// and formatting identifier
const handleTaskInitialization = (newExpr, taskIdent, v) => {
    let messageBoxCount = 0;
    if (!newExpr.arguments) {
        v.printer.printLn("t_ctsk.stksz = 1024;");
        v.printer.printLn("t_ctsk.itskpri = 1;");
    }
    else {
        let argNum = 0;
        for (const arg of newExpr.arguments) {
            if (argNum == 0) {
                v.printer.print("t_ctsk.itskpri = ");
                expressions.visitExpression(arg, v);
                v.printer.printWithoutSpace(";\n");
            }
            else if (argNum == 1) {
                if (+arg.getText() == 0)
                    continue;
                if (+arg.getText() > 0) {
                    messageBoxCount = +arg.getText();
                    continue;
                }
                diag.emitDiagnostic(arg, "mailbox count should be zero or positive");
                process.exit(1);
            }
            else if (argNum == 2) {
                v.printer.print("t_ctsk.stksz = ");
                expressions.visitExpression(arg, v);
                v.printer.printLn(";");
            }
            else {
                diag.emitDiagnostic(newExpr.expression, "invalid arguments");
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
    if (!taskIdent) {
        diag.emitDiagnostic(newExpr.expression, "invalid task");
        process.exit(1);
    }
    const taskName = util.camelToSnake(taskIdent.text);
    v.printer.printLn("STRCPY( (char *)t_ctsk.dsname, \"" + taskName + "\");");
    v.printer.printLn("t_ctsk.task = " + taskName + ";");
    v.printer.printLn("if ( (objid = tk_cre_tsk( &t_ctsk )) <= E_OK ) {");
    v.printer.indent().printLn("tm_putstring(\" *** Failed in the creation of " + taskName + ".\\n\");");
    v.printer.printLn("return 1;");
    v.printer.unindent().printLn("}");
    v.printer.printLn("ObjID[" + taskName.toUpperCase() + "] = objid;");
    if (messageBoxCount > 0) {
        v.useMessageBox.push(true);
        v.printer.printLn("cmbf.maxmsz = " + messageBoxCount.toString() + ";");
        v.printer.printLn("if ( (objid = tk_cre_mbf( &cmbf )) <= E_OK ) {");
        v.printer.indent().printLn("tm_putstring(\" *** Failed in the creation of messsage box of" + taskName + ".\\n\");");
        v.printer.printLn("return 1;");
        v.printer.unindent().printLn("}");
        v.printer.printLn("ObjID[MBUF_" + taskName.toUpperCase() + "] = objid;");
    }
    else {
        v.useMessageBox.push(false);
    }
};
const handleMQTTClientDeclaration = (d, v) => {
    v.printer.printLn("MQTTCtx " + d.name.getText() + ";");
    v.printer.printLn("mqtt_init_ctx(&" + d.name.getText() + ");");
};
exports.visitStatement = (statement, v) => {
    if (typescript_1.default.isExpressionStatement(statement)) {
        exports.visitExpressionStatement(statement, v);
        return;
    }
    if (typescript_1.default.isVariableStatement(statement)) {
        exports.visitVariableStatement(statement, v);
        return;
    }
    if (typescript_1.default.isIfStatement(statement)) {
        v.printer.print("if ( ");
        expressions.visitExpression(statement.expression, v);
        v.printer.printWithoutSpace(" )");
        if (typescript_1.default.isBlock(statement.thenStatement)) {
            v.printer.printWithoutSpace(" ");
        }
        else {
            v.printer.printWithoutSpace("\n");
            v.printer.indent();
        }
        exports.visitStatement(statement.thenStatement, v);
        if (!typescript_1.default.isBlock(statement.thenStatement)) {
            v.printer.unindent();
        }
        // TODO: handle else if
        if (statement.elseStatement) {
            v.printer.printWithoutSpace(" else ");
            if (!typescript_1.default.isBlock(statement.elseStatement)) {
                v.printer.printWithoutSpace("\n");
                v.printer.indent();
            }
            exports.visitStatement(statement.elseStatement, v);
            if (!typescript_1.default.isBlock(statement.elseStatement)) {
                v.printer.unindent();
            }
        }
        return;
    }
    if (typescript_1.default.isWhileStatement(statement)) {
        v.printer.print("while ( ");
        expressions.visitExpression(statement.expression, v);
        v.printer.printWithoutSpace(" ) ");
        exports.visitStatement(statement.statement, v);
        return;
    }
    if (typescript_1.default.isForStatement(statement)) {
        v.printer.print("for ( ");
        const ini = statement.initializer;
        if (ini) {
            if (typescript_1.default.isVariableDeclarationList(ini)) {
                exports.visitVariableDeclarationList(ini, v);
            }
            else {
                expressions.visitExpression(ini, v);
            }
        }
        v.printer.printWithoutSpace("; ");
        const cond = statement.condition;
        if (cond) {
            expressions.visitExpression(cond, v);
        }
        v.printer.printWithoutSpace("; ");
        const incre = statement.incrementor;
        if (incre) {
            expressions.visitExpression(incre, v);
        }
        v.printer.printWithoutSpace(" ) ");
        exports.visitStatement(statement.statement, v);
        return;
    }
    if (typescript_1.default.isBlock(statement)) {
        v.printer.printLn("{", { indentLevel: 0 });
        v.printer.indent();
        statement.statements.forEach((e) => {
            exports.visitStatement(e, v);
        });
        v.printer.unindent();
        v.printer.printLn("}");
        return;
    }
    diag.emitDiagnostic(statement, "visitStatement: don't know how to handle " + typescript_1.default.SyntaxKind[statement.kind]);
    process.exit(1);
};
exports.visitClassDeclaration = (classDeclaration, v) => {
    if (!util.isGlobal(classDeclaration))
        diag.emitDiagnostic(classDeclaration, "ClassDeclarations is only allowed in global scope");
    let notAllowedDiagnostic = () => diag.emitDiagnostic(classDeclaration, "ClassDeclarations other than tasks are not allowed");
    const heritage = classDeclaration.heritageClauses;
    if (!heritage || heritage.length != 1 && heritage[0].types.length != 1) {
        notAllowedDiagnostic();
        return;
    }
    if (heritage[0].types[0].getText() != "tkernel.Task") {
        notAllowedDiagnostic();
        return;
    }
    notAllowedDiagnostic = () => diag.emitDiagnostic(classDeclaration, "Task Declaration should be only with task function");
    if (classDeclaration.members.length != 1) {
        notAllowedDiagnostic();
        return;
    }
    const m = classDeclaration.members[0];
    if (!m || !m.name || m.name.getText() != "task") {
        notAllowedDiagnostic();
    }
    expressions.handleClassMembers(classDeclaration.members, v);
};
//# sourceMappingURL=statements.js.map