import ts from 'typescript'
import * as diag from '../diagnostics'
import { visitor } from './visitor'

let tKernelImported = false

const getNameOfImport = (i : ts.ImportDeclaration) => {
    const ic = i.importClause
    if (!ic) return null
    let namedImport = ic.namedBindings as ts.NamespaceImport
    return namedImport.name.text
}

const checkImport = (node : ts.ImportDeclaration, v : visitor) => {
    const name = getNameOfImport(node)
    // TODO: check contents
    if (name == 'tkernel') {
        return
    }
    if (name == 'mqtt') {
        v.useNetwork = true
        return
    }
    diag.emitDiagnostic(node, 'please import only tkernel or mqtt \
        by `import * as tkernel from "./tkernel"` or \
        by `import * as mqtt from "./mqtt"`.')
    process.exit(1)
}

export const importsToIncludes = (node : ts.ImportDeclaration, v : visitor) : string[] => {
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
    checkImport(node, v)
    const name = getNameOfImport(node)
    if (name == null) return []
    if (includesMap.get(name) == null) return []
    return includesMap.get(name)!
}
