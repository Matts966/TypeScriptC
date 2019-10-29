# TypeScriptC

![github-action](https://github.com/Matts966/TypeScriptC/workflows/test/badge.svg)

This project transpiles TypeScript into C in order to reduce the binary size and use real-time os API. 
This repository is still under development, and the result of transpilation is emitted to stdout. 
For now, the API of tkernel2.0 is the primary target.

## Test

To run tests,

```
make test
```

## Transpile

```
npx ts-node src/index.ts source_file.ts
```
