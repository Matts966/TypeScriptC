bridge: build
	(cd .. && docker run -it --rm -v"$(PWD)/..":/workdir tc-clang)
build:
	(cd .. && docker build -t tc-clang -f ./docker/Dockerfile .)
.PHONY: bridge build
