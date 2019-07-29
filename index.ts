import * as ts from 'typescript'

let source = `
 class Sample{

 }

 class Sample2{

 }
`;

let sourceFile = ts.createSourceFile('sample.ts', source, ts.ScriptTarget.ES2015, /*setParentNodes */ true);

ts.forEachChild(sourceFile, each);

function each(node: ts.Node) {
    // let outKind = (node: ts.Node): void => console.log(ts.SyntaxKind[node.kind]);
    switch (node.kind) {
        default:
            console.log(ts.SyntaxKind[node.kind]);
    }
    let next = () => ts.forEachChild(node, each);
}

// let outKind = (node: ts.Node): void => console.log(node.kind);

// function outKind(node: ts.Node) {
//     console.log(ts.SyntaxKind[node.kind]);
// }
