import ts from 'typescript'
import * as diag from '../diagnostics'
import * as printer from '../printer'
import * as util from '../utilities'
import { visitor } from './visitor'

export const visitExpression = (expression : ts.Expression, v : visitor) => {
    if (ts.isBinaryExpression(expression)) {

        const tmpOptions = v.printer.removeSpaces()

        visitExpression(expression.left, v)
        v.printer.printWithoutSpace(" " + expression.operatorToken.getText() + " ")
        visitExpression(expression.right, v)

        v.printer.setOptions(tmpOptions)

        return
    }
    if (ts.isNumericLiteral(expression)) {
        v.printer.printWithoutSpace(expression.text)
        return
    }
    if (ts.isCallExpression(expression)) {
        switch (expression.expression.getText()) {
            case "console.log":
                // TODO: safer handling
                v.printer.print("tm_putstring(\"" + expression.arguments.map((e) => {
                    if (ts.isLiteralExpression(e))
                        return e.text.split('').map((c) => {
                            const cc = c.charCodeAt(0)
                            if (31 < cc && 127 > cc) {
                                return c
                            }
                            diag.emitDiagnostic(e, "control sequence " + cc + " is not allowed now")
                            process.exit(1)
                        }).join('')
                    else process.exit(1)
                }) + "\\n\")")
                return
            case "process.exit":
                v.printer.print("return " + expression.arguments[0].getText())
                return
            case "tkernel.ask":
                v.printer.printLn("tm_putstring((UB*)" + expression.arguments[0].getText() + ");")
                v.printer.print("tm_getchar(-1)")
                return
            // TODO: check if not in task (in other words the context is entry task)
            case "tkernel.sleep":
                v.printer.printLn("tk_slp_tsk(" + visitExpression(expression.arguments[0], v) + ");")
                return
            // TODO: handle arguements
            default:
                if (ts.isPropertyAccessExpression(expression.expression)) {
                    // TODO: add util for type checker
                    let type = v.checker.getTypeAtLocation(expression.expression.expression)

                    if (!type.getBaseTypes()) {
                        // handle `this`
                        type = v.checker.getDeclaredTypeOfSymbol(type.symbol)
                    }

                    const baseType = type.getBaseTypes()
                    if (baseType == undefined) {
                        diag.emitDiagnostic(expression, "no base type")
                        process.exit(1)
                    }
                    if (v.checker.typeToString(baseType![0]) == "Task") {
                        if (expression.expression.name.getText() == "start") {
                            const typeName = v.checker.typeToString(type)
                            v.printer.print("tk_sta_tsk( ObjID[" + util.camelToSnake(typeName, true) + "], ")
                            let argNum = 0
                            for (const arg of expression.arguments) {
                                if (argNum != 0) {
                                    diag.emitDiagnostic(expression, "invalid argument in task.start")
                                    process.exit(1)
                                }
                                visitExpression(arg, v)
                                ++argNum
                            }
                            v.printer.printWithoutSpace(" )")
                        } else if (expression.expression.name.getText() == "wakeUp") {
                            const typeName = v.checker.typeToString(type)
                            v.printer.print("tk_wup_tsk( ObjID[" + util.camelToSnake(typeName, true) + "] )")
                        } else if (expression.expression.name.getText() == "sleep") {
                            v.printer.print("tk_slp_tsk( ")
                            let argNum = 0
                            for (const arg of expression.arguments) {
                                if (argNum != 0) {
                                    diag.emitDiagnostic(expression, "invalid argument in task.start")
                                    process.exit(1)
                                }
                                visitExpression(arg, v)
                                ++argNum
                            }
                            v.printer.printWithoutSpace(" )")
                        } else if (expression.expression.name.getText() == "receive") {
                            // receiver type name
                            const typeName = v.checker.typeToString(type)
                            const taskName = v.taskNames[v.nowProcessingTaskIndex]
                            const bufferName = "__" + taskName
                                + "_buffer"
                            v.printer.print("tk_rcv_mbf( ObjID[MBUF_"
                                + util.camelToSnake(typeName, true)
                                + "], &" + bufferName
                                + ", ")
                            let argNum = 0
                            for (const arg of expression.arguments) {
                                if (argNum > 0) {
                                    diag.emitDiagnostic(expression, "invalid argument in task.start")
                                    process.exit(1)
                                }
                                visitExpression(arg, v)
                                ++argNum
                            }
                            v.printer.printWithoutSpace(" )")
                        } else if (expression.expression.name.getText() == "send") {
                            // receiver type name
                            const typeName = v.checker.typeToString(type)
                            const taskName = v.taskNames[v.nowProcessingTaskIndex]
                            const bufferName = "__" + taskName
                                + "_buffer"
                            v.printer.print("tk_snd_mbf( ObjID[MBUF_"
                                + util.camelToSnake(typeName, true)
                                + "], &" + bufferName + ", sizeof " + bufferName + ", ")
                            let argNum = 0
                            for (const arg of expression.arguments) {
                                if (argNum > 0) {
                                    diag.emitDiagnostic(expression, "invalid argument in task.start")
                                    process.exit(1)
                                }
                                visitExpression(arg, v)
                                ++argNum
                            }
                            v.printer.printWithoutSpace(" )")
                        } else {
                            diag.emitDiagnostic(expression, "PropertyAccessExpression: don't know how to handle " + expression.expression.name.getText())
                            process.exit(1)
                        }
                    } else {
                        diag.emitDiagnostic(expression, "don't know how to handle " + v.checker.typeToString(type))
                        process.exit(1)
                    }
                    return
                }

                // TODO: check this is needed
                // Maybe for the nodes without pos because of syntesis such as tk_ext_tsk.
                if (ts.isIdentifier(expression.expression)) {
                    v.printer.print(expression.expression.text + "()")
                    return
                }

                v.printer.print(expression.expression.getText() + "()")
        }

        // TODO: Add type map
        // for (const arg of expression.arguments) {
        //     process.stdout.write(checker.typeToString(checker.getTypeAtLocation(node)) + " ")
        //     printer.print(arg.getText(), { indentLevel: 0 })
        //     console.log(arg.getText())
        // }
        // printer.printLn(");")

        return
    }
    if (expression.getText() == "true") {
        v.printer.printWithoutSpace("1")
        return
    }
    if (expression.getText() == "tkernel.result.ok") {
        v.printer.printWithoutSpace("E_OK")
        return
    }
    if (expression.getText() == "tkernel.waitType.forever") {
        v.printer.printWithoutSpace("TMO_FEVR")
        return
    }
    v.printer.printWithoutSpace(expression.getText())
}

export const handleClassMembers = (members : ts.NodeArray<ts.ClassElement>, v : visitor) => {
    for (const member of members) {
        const invalidOverrideMessage = "please override only task with protected keyword"
        if (ts.isMethodDeclaration(member)) {
            if (!member.modifiers) {
                diag.emitDiagnostic(member, invalidOverrideMessage)
                process.exit(1)
            }
            for (const mod of member.modifiers!) {
                if (mod.getText() == "protected") {
                    continue
                }
                diag.emitDiagnostic(member, invalidOverrideMessage)
                process.exit(1)
            }

            // console.log(member.name.getText())

            if (member.name.getText() == "task") {
                v.tasks.push(member as ts.MethodDeclaration)
                continue
            }
            diag.emitDiagnostic(member, invalidOverrideMessage)
            process.exit(1)
        }
        diag.emitDiagnostic(member, invalidOverrideMessage)
        process.exit(1)
    }
}
