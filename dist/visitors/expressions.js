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
const diag = __importStar(require("../diagnostics"));
const util = __importStar(require("../utilities"));
exports.visitExpression = (expression, v) => {
    if (typescript_1.default.isBinaryExpression(expression)) {
        const tmpOptions = v.printer.removeSpaces();
        exports.visitExpression(expression.left, v);
        v.printer.printWithoutSpace(" " + expression.operatorToken.getText() + " ");
        exports.visitExpression(expression.right, v);
        v.printer.setOptions(tmpOptions);
        return;
    }
    if (typescript_1.default.isNumericLiteral(expression)) {
        v.printer.printWithoutSpace(expression.text);
        return;
    }
    // TODO: Should handle char type but literal has its own type
    if (typescript_1.default.isStringLiteral(expression)) {
        v.printer.printWithoutSpace(expression.getText());
        return;
    }
    if (typescript_1.default.isIdentifier(expression)) {
        v.printer.printWithoutSpace(expression.text);
        return;
    }
    if (typescript_1.default.isCallExpression(expression)) {
        switch (expression.expression.getText()) {
            case "console.log":
                // TODO: safer handling
                v.printer.printWithoutSpace("tm_putstring(\"" + expression.arguments.map((e) => {
                    if (typescript_1.default.isLiteralExpression(e))
                        return e.text.split('').map((c) => {
                            const cc = c.charCodeAt(0);
                            if (31 < cc && 127 > cc) {
                                return c;
                            }
                            diag.emitDiagnostic(e, "control sequence " + cc + " is not allowed now");
                            process.exit(1);
                        }).join('');
                    else
                        process.exit(1);
                }) + "\\n\")");
                return;
            case "process.exit":
                v.printer.printWithoutSpace("return " + expression.arguments[0].getText());
                return;
            case "tkernel.ask":
                v.printer.printWithoutSpace("tm_putstring((UB*)" + expression.arguments[0].getText() + ");\n");
                v.printer.print("tm_getchar(-1)");
                return;
            // TODO: check if not in task (in other words the context is entry task)
            case "tkernel.sleep":
                v.printer.printWithoutSpace("tk_slp_tsk(");
                exports.visitExpression(expression.arguments[0], v);
                v.printer.printWithoutSpace(")");
                return;
            // TODO: handle arguements
            default:
                if (typescript_1.default.isPropertyAccessExpression(expression.expression)) {
                    if (util.getTypeString(expression.expression.expression, v.checker) == "MQTTClient") {
                        handleMQTTClientMethod(expression.expression, v);
                        return;
                    }
                    // TODO: add util for type checker
                    let type = v.checker.getTypeAtLocation(expression.expression.expression);
                    if (!type.getBaseTypes()) {
                        // handle `this`
                        type = v.checker.getDeclaredTypeOfSymbol(type.symbol);
                    }
                    const baseType = type.getBaseTypes();
                    if (baseType == undefined) {
                        diag.emitDiagnostic(expression, "no base type");
                        process.exit(1);
                    }
                    if (v.checker.typeToString(baseType[0]) == "Task") {
                        handleTaskMethod(expression.expression, expression.arguments, v.checker.typeToString(type), v);
                    }
                    else {
                        diag.emitDiagnostic(expression, "PropertyAccessExpression: don't know how to handle " + v.checker.typeToString(type));
                        process.exit(1);
                    }
                    return;
                }
                // TODO: check this is needed
                // Maybe for the nodes without pos because of syntesis such as tk_ext_tsk.
                if (typescript_1.default.isIdentifier(expression.expression)) {
                    v.printer.printWithoutSpace(expression.expression.text + "()");
                    return;
                }
                v.printer.printWithoutSpace(expression.expression.getText() + "()");
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
        v.printer.printWithoutSpace("1");
        return;
    }
    if (expression.getText() == "tkernel.result.ok") {
        v.printer.printWithoutSpace("E_OK");
        return;
    }
    if (expression.getText() == "tkernel.waitType.forever") {
        v.printer.printWithoutSpace("TMO_FEVR");
        return;
    }
    if (expression.getText() == "mqtt.result.success") {
        v.printer.printWithoutSpace("MQTT_CODE_SUCCESS");
        return;
    }
    if (typescript_1.default.isPropertyAccessExpression(expression)
        || typescript_1.default.isPostfixUnaryExpression(expression)) {
        switch (expression.getText()) {
            case "client.message":
                {
                    v.printer.printWithoutSpace("client.publish.buffer");
                }
                return;
        }
        v.printer.printWithoutSpace(expression.getText());
        return;
    }
    diag.emitDiagnostic(expression, "don't know how to handle the expression " + expression.getText());
    diag.emitDiagnostic(expression, "Syntax kind: " + typescript_1.default.SyntaxKind[expression.kind]);
    process.exit(1);
};
const handleMQTTClientMethod = (method, v) => {
    switch (method.name.getText()) {
        case "connect": {
            v.printer.printWithoutSpace("mqttclient_connect(&" + method.expression.getText() + ");");
            break;
        }
        case "publish": {
            v.printer.printWithoutSpace("mqttclient_publish(&" + method.expression.getText() + ");");
            break;
        }
        case "subscribe": {
            v.printer.printWithoutSpace("mqttclient_subscribe(&" + method.expression.getText() + ");");
            break;
        }
        case "wait": {
            v.printer.printWithoutSpace("mqttclient_wait(&" + method.expression.getText() + ");");
            break;
        }
        case "ping": {
            v.printer.printWithoutSpace("mqttclient_ping(&" + method.expression.getText() + ");");
            break;
        }
        default: {
            diag.emitDiagnostic(method, "don't know how to handle MQTTClient method" + method.name.getText());
            process.exit(1);
        }
    }
};
const handleTaskMethod = (method, args, typeName, v) => {
    switch (method.name.getText()) {
        case "start": {
            v.printer.printWithoutSpace("tk_sta_tsk( ObjID[" + util.camelToSnake(typeName, true) + "], ");
            let argNum = 0;
            for (const arg of args) {
                if (argNum != 0) {
                    diag.emitDiagnostic(arg, "invalid argument in task.start");
                    process.exit(1);
                }
                exports.visitExpression(arg, v);
                ++argNum;
            }
            v.printer.printWithoutSpace(" )");
            break;
        }
        case "wakeUp": {
            if (typeName == "EntryTask") {
                v.printer.printWithoutSpace("tk_wup_tsk( 1 )");
                break;
            }
            v.printer.printWithoutSpace("tk_wup_tsk( ObjID[" + util.camelToSnake(typeName, true) + "] )");
            break;
        }
        case "sleep": {
            v.printer.printWithoutSpace("tk_slp_tsk( ");
            let argNum = 0;
            for (const arg of args) {
                if (argNum != 0) {
                    diag.emitDiagnostic(arg, "invalid argument in task.start");
                    process.exit(1);
                }
                exports.visitExpression(arg, v);
                ++argNum;
            }
            v.printer.printWithoutSpace(" )");
            break;
        }
        case "receive": {
            const taskName = v.taskNames[v.nowProcessingTaskIndex];
            const bufferName = "__" + taskName
                + "_buffer";
            v.printer.printWithoutSpace("tk_rcv_mbf( ObjID[MBUF_"
                + util.camelToSnake(typeName, true)
                + "], &" + bufferName
                + ", ");
            let argNum = 0;
            for (const arg of args) {
                if (argNum > 0) {
                    diag.emitDiagnostic(arg, "invalid argument in task.start");
                    process.exit(1);
                }
                exports.visitExpression(arg, v);
                ++argNum;
            }
            v.printer.printWithoutSpace(" )");
            break;
        }
        case "send": {
            // receiver type name
            const taskName = v.taskNames[v.nowProcessingTaskIndex];
            const bufferName = "__" + taskName
                + "_buffer";
            v.printer.printWithoutSpace("tk_snd_mbf( ObjID[MBUF_"
                + util.camelToSnake(typeName, true)
                + "], &" + bufferName + ", sizeof " + bufferName + ", ");
            let argNum = 0;
            for (const arg of args) {
                if (argNum > 0) {
                    diag.emitDiagnostic(arg, "invalid argument in task.start");
                    process.exit(1);
                }
                exports.visitExpression(arg, v);
                ++argNum;
            }
            v.printer.printWithoutSpace(" )");
            break;
        }
        default: {
            diag.emitDiagnostic(method, "don't know how to handle task method" + method.name.getText());
            process.exit(1);
        }
    }
};
exports.handleClassMembers = (members, v) => {
    for (const member of members) {
        const invalidOverrideMessage = "please override only task with protected keyword";
        if (typescript_1.default.isMethodDeclaration(member)) {
            if (!member.modifiers) {
                diag.emitDiagnostic(member, invalidOverrideMessage);
                process.exit(1);
            }
            for (const mod of member.modifiers) {
                if (mod.getText() == "protected") {
                    continue;
                }
                diag.emitDiagnostic(member, invalidOverrideMessage);
                process.exit(1);
            }
            // console.log(member.name.getText())
            if (member.name.getText() == "task") {
                v.tasks.push(member);
                continue;
            }
            diag.emitDiagnostic(member, invalidOverrideMessage);
            process.exit(1);
        }
        diag.emitDiagnostic(member, invalidOverrideMessage);
        process.exit(1);
    }
};
//# sourceMappingURL=expressions.js.map