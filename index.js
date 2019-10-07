"use strict";
exports.__esModule = true;
var ts = require("typescript");
var fs_1 = require("fs");
var fileName = process.argv[0];
var sourceFile = ts.createSourceFile(fileName, fs_1["default"].readFileSync(fileName, 'utf8'), ts.ScriptTarget.ES2015, /*setParentNodes */ true);
var each = function (node) {
    switch (node.kind) {
        default:
            console.log(ts.SyntaxKind[node.kind]);
    }
    // let next = () => ts.forEachChild(node, each);
};
ts.forEachChild(sourceFile, each);
