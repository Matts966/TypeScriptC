run: test-bin index.ts
	ts-node index.ts sample_usermain.ts
test-bin:
	@type ts-node
rm:
	rm *.js
