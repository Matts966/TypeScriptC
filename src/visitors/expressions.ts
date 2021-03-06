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
    // TODO: Should handle char type but literal has its own type
    if (ts.isStringLiteral(expression)) {
        v.printer.printWithoutSpace(expression.getText())
        return
    }
    if (ts.isIdentifier(expression)) {
        v.printer.printWithoutSpace(expression.text)
        return
    }
    if (ts.isCallExpression(expression)) {
        switch (expression.expression.getText()) {
            case "console.log":
                // TODO: safer handling
                v.printer.printWithoutSpace("tm_putstring(\"" + expression.arguments.map((e) => {
                    if (ts.isLiteralExpression(e))
                        return e.text.split('').map((c) => {
                            const cc = c.charCodeAt(0)
                            if (31 < cc && 127 > cc) {
                                return c
                            }
                            diag.emitDiagnostic(e, "control sequence " + cc + " is not allowed now")
                            process.exit(1)
                        }).join('')
                    else {
                        diag.emitDiagnostic(e, "not literal")
                        process.exit(1)
                    }
                }) + "\\n\")")
                return
            case "process.exit":
                v.printer.printWithoutSpace("return " + expression.arguments[0].getText())
                return
            case "tkernel.ask":
                v.printer.printWithoutSpace("tm_putstring((UB*)" + expression.arguments[0].getText() + ");\n")
                v.printer.print("tm_getchar(-1)")
                return
            // TODO: check if not in task (in other words the context is entry task)
            case "tkernel.sleep":
                v.printer.printWithoutSpace("tk_slp_tsk( ")
                visitExpression(expression.arguments[0], v)
                v.printer.printWithoutSpace(" )")
                return
            // TODO: handle arguements
            default:
                if (ts.isPropertyAccessExpression(expression.expression)) {

                    if (util.getTypeString(expression.expression.expression, v.checker) == "MQTTClient") {
                        let pointer = false
                        for (const e of v.environmentStack) {
                            if (e[expression.expression.expression.getText()] == 'pointer') {
                                pointer = true
                            }
                        }
                        handleMQTTClientMethod(expression.expression, v, pointer)
                        return
                    }

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
                        handleTaskMethod(expression.expression,
                            expression.arguments,
                            v.checker.typeToString(type),
                            v
                        )
                    } else {
                        diag.emitDiagnostic(expression, "PropertyAccessExpression: don't know how to handle " + v.checker.typeToString(type))
                        process.exit(1)
                    }
                    return
                }

                // TODO: check this is needed
                // Maybe for the nodes without pos because of syntesis such as tk_ext_tsk.
                if (ts.isIdentifier(expression.expression)) {
                    v.printer.printWithoutSpace(expression.expression.text + "()")
                    return
                }

                v.printer.printWithoutSpace(expression.expression.getText() + "()")
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
    if (expression.getText() == "mqtt.result.success") {
        v.printer.printWithoutSpace("MQTT_CODE_SUCCESS")
        return
    }
    if (ts.isPropertyAccessExpression(expression)) {
        let pointer = false
        for (const e of v.environmentStack) {
            if (e[expression.expression.getText()] == 'pointer') {
                v.printer.printWithoutSpace(expression.expression.getText() + "->")
                pointer = true
                break
            }
        }
        if (!pointer) {
            v.printer.printWithoutSpace(expression.expression.getText() + ".")
        }
        if (util.getTypeString(expression.expression, v.checker) == 'MQTTClient') {
            if (expression.name.getText() == 'message') {
                v.printer.printWithoutSpace("publish.buffer")
                return
            }
        }
        v.printer.printWithoutSpace(expression.name.getText())
        return
    }
    if (ts.isPostfixUnaryExpression(expression)) {
        v.printer.printWithoutSpace(expression.getText())
        return
    }
    diag.emitDiagnostic(expression, "don't know how to handle the expression " + expression.getText() +
        "\nSyntax kind: " + ts.SyntaxKind[expression.kind])
    process.exit(1)
}

const handleMQTTClientMethod = (method : ts.PropertyAccessExpression, v : visitor, pointer : boolean) => {
    const prefix = pointer ? "" : "&"
    switch (method.name.getText()) {
        case "connect": {
            v.printer.printWithoutSpace(`mqttclient_connect(${prefix}${method.expression.getText()})`)
            break
        }
        case "publish": {
            v.printer.printWithoutSpace(`mqttclient_publish(${prefix}${method.expression.getText()})`)
            break
        }
        case "subscribe": {
            v.printer.printWithoutSpace(`mqttclient_subscribe(${prefix}${method.expression.getText()})`)
            break
        }
        case "wait": {
            v.printer.printWithoutSpace(`mqttclient_wait(${prefix}${method.expression.getText()})`)
            break
        }
        case "ping": {
            v.printer.printWithoutSpace(`mqttclient_ping(${prefix}${method.expression.getText()})`)
            break
        }
        default: {
            diag.emitDiagnostic(method, "don't know how to handle MQTTClient method" + method.name.getText())
            process.exit(1)
        }
    }
}

const handleTaskMethod = (method : ts.PropertyAccessExpression,
    args : ts.NodeArray<ts.Expression>,
    typeName : string, v : visitor) => {
    switch (method.name.getText()) {
        case "start": {
            v.printer.printWithoutSpace("tk_sta_tsk( ObjID[" + util.camelToSnake(typeName, true) + "], ")
            let argNum = 0
            for (const arg of args) {
                if (argNum != 0) {
                    diag.emitDiagnostic(arg, "invalid argument in task.start")
                    process.exit(1)
                }
                visitExpression(arg, v)
                ++argNum
            }
            v.printer.printWithoutSpace(" )")
            break
        }
        case "wakeUp": {
            if (typeName == "EntryTask") {
                v.printer.printWithoutSpace("tk_wup_tsk( 1 )")
                break
            }
            v.printer.printWithoutSpace("tk_wup_tsk( ObjID[" + util.camelToSnake(typeName, true) + "] )")
            break
        }
        case "sleep": {
            v.printer.printWithoutSpace("tk_slp_tsk( ")
            let argNum = 0
            for (const arg of args) {
                if (argNum != 0) {
                    diag.emitDiagnostic(arg, "invalid argument in task.start")
                    process.exit(1)
                }
                visitExpression(arg, v)
                ++argNum
            }
            v.printer.printWithoutSpace(" )")
            break
        }
        case "receive": {
            const taskName = v.taskNames[v.nowProcessingTaskIndex]
            const bufferName = "__" + taskName
                + "_buffer"
            v.printer.printWithoutSpace("tk_rcv_mbf( ObjID[MBUF_"
                + util.camelToSnake(typeName, true)
                + "], &" + bufferName
                + ", ")
            let argNum = 0
            for (const arg of args) {
                if (argNum > 0) {
                    diag.emitDiagnostic(arg, "invalid argument in task.start")
                    process.exit(1)
                }
                visitExpression(arg, v)
                ++argNum
            }
            v.printer.printWithoutSpace(" )")
            break
        }
        case "send": {
            // receiver type name
            const taskName = v.taskNames[v.nowProcessingTaskIndex]
            const bufferName = "__" + taskName
                + "_buffer"
            v.printer.printWithoutSpace("tk_snd_mbf( ObjID[MBUF_"
                + util.camelToSnake(typeName, true)
                + "], &" + bufferName + ", sizeof " + bufferName + ", ")
            let argNum = 0
            for (const arg of args) {
                if (argNum > 0) {
                    diag.emitDiagnostic(arg, "invalid argument in task.start")
                    process.exit(1)
                }
                visitExpression(arg, v)
                ++argNum
            }
            v.printer.printWithoutSpace(" )")
            break
        }
        default: {
            diag.emitDiagnostic(method, "don't know how to handle task method" + method.name.getText())
            process.exit(1)
        }
    }
}

export const handleTaskMembers = (members : ts.NodeArray<ts.ClassElement>, v : visitor) => {
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
