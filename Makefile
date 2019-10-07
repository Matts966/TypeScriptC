run: test-bin index.ts
	ts-node index.ts ../1_T-Kernel2.0/sample/sample_usermain.ts 
test-bin:
	@type ts-node
