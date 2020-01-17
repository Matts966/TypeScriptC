import ts, { Expression } from 'typescript'
import * as expressions from './expressions'
import * as diag from '../diagnostics'
import * as util from '../utilities'
import { visitor } from './visitor'

export const isStatement = (node : ts.Node) : node is ts.Statement => {
    if (ts.isExpressionStatement(node) || ts.isIfStatement(node) || ts.isWhileStatement(node) || ts.isForStatement || ts.isVariableStatement(node) || ts.isReturnStatement(node) || ts.isBlock(node)) {
        return true
    }
    return false
}
export const visitExpressionStatement = (expressionStatement : ts.ExpressionStatement, v : visitor) => {
    expressions.visitExpression(expressionStatement.expression, v)
    v.printer.printWithoutSpace(";\n")
}

export const visitVariableStatement = (variableStatement : ts.VariableStatement, v : visitor) => {
    visitVariableDeclarationList(variableStatement.declarationList, v)
}

export const visitVariableDeclarationList = (variableDeclarationList : ts.VariableDeclarationList, v : visitor) => {
    for (const d of variableDeclarationList.declarations) {
        if (!d.initializer) {
            diag.emitDiagnostic(d, "lack of initialization")
            process.exit(1)
        }

        const expr = d.initializer!

        if (ts.isNumericLiteral(expr)) {
            // TODO: check if it is int
            v.printer.printWithoutSpace("int " + d.name.getText() + " = " + expr.getText())
            return
        }

        if (ts.isNewExpression(expr)) {
            if (ts.isClassExpression(expr.expression)) {
                if (isTask(expr.expression.name, v)) {
                    expressions.handleClassMembers(expr.expression.members, v)
                    if (!expr.expression.name) {
                        diag.emitDiagnostic(expr.expression, "task should have name")
                        process.exit(1)
                    }
                    handleTaskInitialization(expr, expr.expression.name!, v)
                    continue
                }
            }
            if (ts.isIdentifier(expr.expression)) {
                if (isTask(expr.expression, v)) {
                    handleTaskInitialization(expr, expr.expression, v)
                    continue
                }
            }
            if (isMQTTClient(expr.expression, v)) {
                handleMQTTClientDeclaration(d, v)
                continue
            }
        }
    }
}
const isMQTTClient = (location : ts.Node, v : visitor) => {
    const sym = v.checker.getSymbolAtLocation(location)
    const type = v.checker.getDeclaredTypeOfSymbol(sym!)
    if (v.checker.typeToString(type) != "MQTTClient") {
        return false;
    }
    return true
}
const isTask = (location : ts.Node | undefined, v : visitor) => {
    if (!location) return false
    const sym = v.checker.getSymbolAtLocation(location)
    const type = v.checker.getDeclaredTypeOfSymbol(sym!)
    const baseTypes = type.getBaseTypes()
    if (!baseTypes || baseTypes.length != 1) {
        return false;
    }
    if (v.checker.typeToString(baseTypes![0]) != "Task") {
        return false;
    }
    return true
}
// TODO: Fix bugs about collision of identifier caused by ignored identifier
// and formatting identifier
const handleTaskInitialization = (newExpr : ts.NewExpression,
    taskIdent : ts.Identifier, v : visitor) => {
    let messageBoxCount = 0
    if (!newExpr.arguments) {
        v.printer.printLn("t_ctsk.stksz = 1024;")
        v.printer.printLn("t_ctsk.itskpri = 1;")
    } else {
        let argNum = 0
        for (const arg of newExpr.arguments) {
            if (argNum == 0) {
                v.printer.print("t_ctsk.itskpri = ")
                expressions.visitExpression(arg, v)
                v.printer.printWithoutSpace(";\n")
            } else if (argNum == 1) {
                if (+arg.getText() == 0) continue
                if (+arg.getText() > 0) {
                    messageBoxCount = +arg.getText()
                    continue
                }
                diag.emitDiagnostic(arg, "mailbox count should be zero or positive")
                process.exit(1)
            } else if (argNum == 2) {
                v.printer.print("t_ctsk.stksz = ")
                expressions.visitExpression(arg, v)
                v.printer.printLn(";")
            } else {
                diag.emitDiagnostic(newExpr.expression, "invalid arguments")
                process.exit(1)
            }
            ++argNum
        }
        if (argNum == 0) {
            v.printer.printLn("t_ctsk.stksz = 1024;")
            v.printer.printLn("t_ctsk.itskpri = 1;")
        }
        if (argNum == 1) {
            v.printer.printLn("t_ctsk.stksz = 1024;")
        }
    }

    if (!taskIdent) {
        diag.emitDiagnostic(newExpr.expression, "invalid task")
        process.exit(1)
    }
    const taskName = util.camelToSnake(taskIdent!.text)
    v.printer.printLn("STRCPY( (char *)t_ctsk.dsname, \"" + taskName + "\");")
    v.printer.printLn("t_ctsk.task = " + taskName + ";")
    v.printer.printLn("if ( (objid = tk_cre_tsk( &t_ctsk )) <= E_OK ) {")
    v.printer.indent().printLn("tm_putstring(\" *** Failed in the creation of " + taskName + ".\\n\");")
    v.printer.printLn("return 1;")
    v.printer.unindent().printLn("}")
    v.printer.printLn("ObjID[" + taskName.toUpperCase() + "] = objid;")
    if (messageBoxCount > 0) {
        v.useMessageBox.push(true)
        v.printer.printLn("cmbf.maxmsz = " + messageBoxCount.toString() + ";")
        v.printer.printLn("if ( (objid = tk_cre_mbf( &cmbf )) <= E_OK ) {")
        v.printer.indent().printLn("tm_putstring(\" *** Failed in the creation of messsage box of" + taskName + ".\\n\");")
        v.printer.printLn("return 1;")
        v.printer.unindent().printLn("}")
        v.printer.printLn("ObjID[MBUF_" + taskName.toUpperCase() + "] = objid;")
    } else {
        v.useMessageBox.push(false)
    }
}
const handleMQTTClientDeclaration = (d : ts.VariableDeclaration, v : visitor) => {

}
export const visitStatement = (statement : ts.Statement, v : visitor) => {
    if (ts.isExpressionStatement(statement)) {
        visitExpressionStatement(statement, v)
        return
    }
    if (ts.isVariableStatement(statement)) {
        visitVariableStatement(statement, v)
        return
    }
    if (ts.isIfStatement(statement)) {
        v.printer.print("if ( ")
        expressions.visitExpression(statement.expression, v)
        v.printer.printWithoutSpace(" )")
        if (ts.isBlock(statement.thenStatement)) {
            v.printer.printWithoutSpace(" ")
        } else {
            v.printer.printWithoutSpace("\n")
            v.printer.indent()
        }
        visitStatement(statement.thenStatement, v)
        if (!ts.isBlock(statement.thenStatement)) {
            v.printer.unindent()
        }
        // TODO: handle else if
        if (statement.elseStatement) {
            v.printer.printWithoutSpace(" else ")
            if (!ts.isBlock(statement.elseStatement)) {
                v.printer.printWithoutSpace("\n")
                v.printer.indent()
            }
            visitStatement(statement.elseStatement, v)
            if (!ts.isBlock(statement.elseStatement)) {
                v.printer.unindent()
            }
        }
        return
    }
    if (ts.isWhileStatement(statement)) {
        v.printer.print("while ( ")
        expressions.visitExpression(statement.expression, v)
        v.printer.printWithoutSpace(" ) ")
        visitStatement(statement.statement, v)
        return
    }
    if (ts.isForStatement(statement)) {
        v.printer.print("for ( ")
        const ini = statement.initializer
        if (ini) {
            if (ts.isVariableDeclarationList(ini)) {
                visitVariableDeclarationList(ini, v)
            } else {
                expressions.visitExpression(ini, v)
            }
        }
        v.printer.printWithoutSpace("; ")
        const cond = statement.condition
        if (cond) {
            expressions.visitExpression(cond, v)
        }
        v.printer.printWithoutSpace("; ")
        const incre = statement.incrementor
        if (incre) {
            expressions.visitExpression(incre, v)
        }
        v.printer.printWithoutSpace(" ) ")
        visitStatement(statement.statement, v)
        return
    }
    if (ts.isBlock(statement)) {
        v.printer.printLn("{", { indentLevel: 0 })
        v.printer.indent()
        statement.statements.forEach((e) => {
            visitStatement(e, v)
        })
        v.printer.unindent()
        v.printer.printLn("}")
        return
    }
    diag.emitDiagnostic(statement, "visitStatement: don't know how to handle " + ts.SyntaxKind[statement.kind])
    process.exit(1)
}

export const visitClassDeclaration = (classDeclaration : ts.ClassDeclaration, v : visitor) => {
    if (!util.isGlobal(classDeclaration)) diag.emitDiagnostic(classDeclaration, "ClassDeclarations is only allowed in global scope")
    let notAllowedDiagnostic = () => diag.emitDiagnostic(classDeclaration, "ClassDeclarations other than tasks are not allowed")
    const heritage = classDeclaration.heritageClauses
    if (!heritage || heritage.length != 1 && heritage[0].types.length != 1) {
        notAllowedDiagnostic()
        return
    }
    if (heritage[0].types[0].getText() != "tkernel.Task") {
        notAllowedDiagnostic()
        return
    }
    notAllowedDiagnostic = () => diag.emitDiagnostic(classDeclaration, "Task Declaration should be only with task function")
    if (classDeclaration.members.length != 1) {
        notAllowedDiagnostic()
        return
    }
    const m = classDeclaration.members[0]
    if (!m || !m.name || m.name.getText() != "task") {
        notAllowedDiagnostic()
    }
    expressions.handleClassMembers(classDeclaration.members, v)
}