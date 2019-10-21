run: test-ts-node index.ts
	ts-node index.ts sample_usermain.ts
test-ts-node:
	@type ts-node
fmt: test-tsfmt
	tsfmt -r *.ts
test-tsfmt:
	@type tsfmt
rm:
	rm *.js
install-pre-commit-hook:
	sudo ln -sf $(PWD)/config/hooks/pre-commit $(PWD)/.git/hooks/pre-commit
test:
	./test.sh

