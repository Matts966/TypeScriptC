all: test-bin index.ts
	ts-node index.ts
test-bin:
	@type ts-node
