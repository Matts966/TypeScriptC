FROM alpine:3.7

RUN apk add make cmake gcc g++ python libtool zlib-dev subversion libc-dev && \
    mkdir llvm && cd llvm && \
    svn co http://llvm.org/svn/llvm-project/llvm/trunk llvm && \
    cd /llvm/llvm/tools && \
    svn co http://llvm.org/svn/llvm-project/cfe/trunk clang && \
    cd /llvm/llvm/tools/clang/tools && \
    svn co http://llvm.org/svn/llvm-project/clang-tools-extra/trunk extra && \
    cd /llvm/llvm/projects && \
    svn co http://llvm.org/svn/llvm-project/compiler-rt/trunk compiler-rt && \
    cd /llvm && \
    mkdir build && \
    cd build && \
    cmake -G "Unix Makefiles" ../llvm/ -DCMAKE_INSTALL_PREFIX=/usr/local -DCMAKE_BUILD_TYPE=Release && \
    make -j$(grep processor /proc/cpuinfo | wc -l) REQUIRES_RTTI=1 && \
    make install

COPY FindClassDecls.cpp ./
COPY CMakeLists.txt ./

ENTRYPOINT [ "/bin/sh" ]