cmake_minimum_required(VERSION 3.6)

add_clang_executable(find-class-decls FindClassDecls.cpp)

target_link_libraries(find-class-decls clangTooling)