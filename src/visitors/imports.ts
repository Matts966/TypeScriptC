import ts from 'typescript'
import * as diag from '../diagnostics'
import { visitor } from './visitor'

let tKernelImported = false

const isImportKnown = (i : ts.ImportDeclaration) => {
    const ic = i.importClause
    if (!ic) return
    let namedImport = ic.namedBindings as ts.NamespaceImport
    if (namedImport.name.text != "tkernel") {
        return false
    }
    tKernelImported = true
    return true
}

export const handleImport = (node : ts.Node, visitor : visitor) => {
    if (ts.isImportDeclaration(node)) {
        if (!isImportKnown(node)) {
            diag.emitDiagnostic(node, 'please import only tkernel or mqtt \
                by `import * as tkernel from "./tkernel"` \
                or `import * as mqtt from "./mqtt"`')
            process.exit(1)
        }
        return true
    }
    if (!tKernelImported) {
        diag.emitDiagnostic(node, 'please import only tkernel or mqtt \
            by `import * as tkernel from "./tkernel"` \
            or `import * as mqtt from "./mqtt"`')
        process.exit(1)
    }
}

export const importsToIncludes = (imports : string[]) => {
    return [
        `#include <tk/tkernel.h>`,
        `#include <tm/tmonitor.h>`,
        `#include <libstr.h>`
    ]
}
