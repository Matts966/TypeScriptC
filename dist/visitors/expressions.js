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
var diag = __importStar(require("../diagnostics"));
var util = __importStar(require("../utilities"));
exports.visitExpression = function (expression, v) {
    if (typescript_1["default"].isBinaryExpression(expression)) {
        var tmpOptions = v.printer.removeSpaces();
        exports.visitExpression(expression.left, v);
        v.printer.printWithoutSpace(" " + expression.operatorToken.getText() + " ");
        exports.visitExpression(expression.right, v);
        v.printer.setOptions(tmpOptions);
        return;
    }
    if (typescript_1["default"].isNumericLiteral(expression)) {
        v.printer.printWithoutSpace(expression.text);
        return;
    }
    if (typescript_1["default"].isCallExpression(expression)) {
        switch (expression.expression.getText()) {
            case "console.log":
                // TODO: safer handling
                v.printer.print("tm_putstring(\"" + expression.arguments.map(function (e) {
                    if (typescript_1["default"].isLiteralExpression(e))
                        return e.text.split('').map(function (c) {
                            var cc = c.charCodeAt(0);
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
                v.printer.print("return " + expression.arguments[0].getText());
                return;
            case "tkernel.ask":
                v.printer.printLn("tm_putstring((UB*)" + expression.arguments[0].getText() + ");");
                v.printer.print("tm_getchar(-1)");
                return;
            // TODO: handle arguements
            default:
                if (typescript_1["default"].isPropertyAccessExpression(expression.expression)) {
                    // TODO: add util for type checker
                    var type = v.checker.getTypeAtLocation(expression.expression.expression);
                    if (!type.getBaseTypes()) {
                        // handle `this`
                        type = v.checker.getDeclaredTypeOfSymbol(type.symbol);
                    }
                    if (v.checker.typeToString(type.getBaseTypes()[0]) == "Task") {
                        if (expression.expression.name.getText() == "start") {
                            var typeName = v.checker.typeToString(type);
                            v.printer.print("tk_sta_tsk( ObjID[" + util.camelToSnake(typeName, true) + "], ");
                            var argNum = 0;
                            for (var _i = 0, _a = expression.arguments; _i < _a.length; _i++) {
                                var arg = _a[_i];
                                if (argNum != 0) {
                                    diag.emitDiagnostic(expression, "invalid argument in task.start");
                                    process.exit(1);
                                }
                                exports.visitExpression(arg, v);
                                ++argNum;
                            }
                            v.printer.printWithoutSpace(" )");
                        }
                        else if (expression.expression.name.getText() == "wakeUp") {
                            var typeName = v.checker.typeToString(type);
                            v.printer.print("tk_wup_tsk( ObjID[" + util.camelToSnake(typeName, true) + "] )");
                        }
                        else if (expression.expression.name.getText() == "sleep") {
                            v.printer.print("tk_slp_tsk( ");
                            var argNum = 0;
                            for (var _b = 0, _c = expression.arguments; _b < _c.length; _b++) {
                                var arg = _c[_b];
                                if (argNum != 0) {
                                    diag.emitDiagnostic(expression, "invalid argument in task.start");
                                    process.exit(1);
                                }
                                exports.visitExpression(arg, v);
                                ++argNum;
                            }
                            v.printer.printWithoutSpace(" )");
                        }
                        else {
                            diag.emitDiagnostic(expression, "PropertyAccessExpression: don't know how to handle " + expression.expression.name.getText());
                            process.exit(1);
                        }
                    }
                    else {
                        diag.emitDiagnostic(expression, "don't know how to handle " + v.checker.typeToString(type));
                        process.exit(1);
                    }
                    return;
                }
                // TODO: check this is needed
                // Maybe for the nodes without pos because of syntesis such as tk_ext_tsk.
                if (typescript_1["default"].isIdentifier(expression.expression)) {
                    v.printer.print(expression.expression.text + "()");
                    return;
                }
                v.printer.print(expression.expression.getText() + "()");
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
    v.printer.printWithoutSpace(expression.getText());
};
exports.handleClassMembers = function (members, v) {
    for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
        var member = members_1[_i];
        var invalidOverrideMessage = "please override only task with protected keyword";
        if (typescript_1["default"].isMethodDeclaration(member)) {
            if (!member.modifiers) {
                diag.emitDiagnostic(member, invalidOverrideMessage);
                process.exit(1);
            }
            for (var _a = 0, _b = member.modifiers; _a < _b.length; _a++) {
                var mod = _b[_a];
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