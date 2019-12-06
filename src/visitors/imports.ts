import ts from 'typescript'
import * as diag from '../diagnostics'

let tKernelImported = false

export const isImportTKernel = (i : ts.ImportDeclaration) => {
    const ic = i.importClause
    if (!ic) return
    let namedImport = ic.namedBindings as ts.NamespaceImport
    if (namedImport.name.text != "tkernel") {
        return false
    }
    tKernelImported = true
    return true
}

export const handleImport = (node : ts.Node) => {
    if (ts.isImportDeclaration(node)) {
        if (!isImportTKernel(node)) {
            diag.emitDiagnostic(node, 'please import only tkernel by `import * as tkernel from "./tkernel"`')
            process.exit(1)
        }
        return true
    }
    if (!tKernelImported) {
        diag.emitDiagnostic(node, 'please import only tkernel by `import * as tkernel from "./tkernel"`')
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
