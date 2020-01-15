test-mqtt: fmt
	./test.sh ./tests/mqtt_shell.ts
test: build
	./test.sh
run: src/index.ts build
	node ./dist/index.js sample_usermain.ts
build: tsconfig.json
	npx tsc -p tsconfig.json
run-node: build
	npx ts-node ./src/index.ts sample_usermain.ts
clean: dist
	rm dist/*
	rm *.js
fmt: build
	npx tsfmt -r src/*.ts src/**/*.ts
install-pre-commit-hook:
	sudo ln -sf $(PWD)/config/hooks/pre-commit $(PWD)/.git/hooks/pre-commit
t: build
	./test.sh ./tests/sample_usermain.ts
test-sample: fmt
	./test.sh ./sample_usermain.ts

.PHONY: run-node build run clean fmt install-pre-commit-hook test t test-mqtt
