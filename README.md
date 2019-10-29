# TypeScriptC

This project transpiles TypeScript into C in order to reduce binary size and use real-time os API.
This repository is still under development, and the result of transpilation is emitted to stdout.
For now, the API of tkernel2.0 is primary target.

## Test

To run tests,

```
make test
```

## Transpile

```
npx ts-node src/index.ts source_file.ts
```
