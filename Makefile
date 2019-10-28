run-node:
	npx ts-node ./src/index.ts sample_usermain.ts
build: tsconfig.json
	npx tsc -p tsconfig.json
run: src/index.ts
	node ./dist/index.js sample_usermain.ts
clean: dist
	rm dist/*
	rm *.js
fmt:
	npx tsfmt -r src/*.ts
install-pre-commit-hook:
	sudo ln -sf $(PWD)/config/hooks/pre-commit $(PWD)/.git/hooks/pre-commit
test:
	./test.sh
t:
	./test.sh ./tests/task.ts
test-sample:
	./test.sh ./sample_usermain.ts

.PHONY: run-node build run clean fmt install-pre-commit-hook test t
