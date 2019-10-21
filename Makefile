run: index.ts
	npx ts-node index.ts sample_usermain.ts
fmt:
	npx tsfmt -r *.ts
rm:
	rm *.js
install-pre-commit-hook:
	sudo ln -sf $(PWD)/config/hooks/pre-commit $(PWD)/.git/hooks/pre-commit
test:
	./test.sh
test-task:
	./test.sh ./tests/task.ts
test-sample:
	./test.sh ./sample_usermain.ts
