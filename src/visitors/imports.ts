import ts from 'typescript'
import * as diag from '../diagnostics'

let tKernelImported = false

const getNameOfImport = (i : ts.ImportDeclaration) => {
    const ic = i.importClause
    if (!ic) return null
    let namedImport = ic.namedBindings as ts.NamespaceImport
    return namedImport.name.text
}

const checkImport = (node : ts.ImportDeclaration) => {
    const name = getNameOfImport(node)
    // TODO: check contents
    if (name == 'tkernel' || name == 'mqtt') {
        return
    }
    diag.emitDiagnostic(node, 'please import only tkernel or mqtt \
        by `import * as tkernel from "./tkernel"` or \
        by `import * as mqtt from "./mqtt"`.')
    process.exit(1)
}

export const importsToIncludes = (node : ts.ImportDeclaration) : string[] => {
    let includesMap = new Map<string, string[]>(
        [
            ['tkernel', [
                `#include <tk/tkernel.h>`,
                `#include <tm/tmonitor.h>`,
                `#include <libstr.h>`
            ]],
            ['mqtt', [
                `#include "wolfmqtt/mqtt_client.h"`,
                `#include "examples/mqttnet.h"`,
                `#include "examples/mqttclient/mqttclient.h"`
            ]]
        ]
    )
    checkImport(node)
    const name = getNameOfImport(node)
    if (name == null) return []
    if (includesMap.get(name) == null) return []
    return includesMap.get(name)!
}
