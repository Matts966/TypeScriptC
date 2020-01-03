FROM ubuntu:18.04

# RUN apk add make cmake gcc g++ python libtool zlib-dev subversion libc-dev linux-headers

RUN apt-get update && \
    apt-get install -y make cmake gcc g++ python libtool zlib1g zlib1g-dev subversion && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN svn co http://llvm.org/svn/llvm-project/llvm/trunk llvm
RUN cd /llvm/tools && \
    svn co http://llvm.org/svn/llvm-project/cfe/trunk clang
RUN cd /llvm/tools/clang/tools && \
    svn co http://llvm.org/svn/llvm-project/clang-tools-extra/trunk extra
RUN cd /llvm/projects && \
    svn co http://llvm.org/svn/llvm-project/compiler-rt/trunk compiler-rt
RUN mkdir build
WORKDIR /build
RUN cmake -G "Unix Makefiles" /llvm/ -DCMAKE_INSTALL_PREFIX=/usr/local -DCMAKE_BUILD_TYPE=Release

# RUN echo "@testing http://dl-cdn.alpinelinux.org/alpine/edge/testing" \
#     >> /etc/apk/repositories
# RUN apk --update add kpmcore-dev@testing && \
#     rm -rf /var/lib/apt/lists/* && \
#     rm -rf /var/cache/apk/*

RUN make -j$(grep processor /proc/cpuinfo | wc -l) REQUIRES_RTTI=1
RUN make install

COPY FindClassDecls.cpp ./
COPY CMakeLists.txt ./

ENTRYPOINT [ "/bin/sh" ]