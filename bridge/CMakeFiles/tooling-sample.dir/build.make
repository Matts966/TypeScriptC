# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.10

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:


#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:


# Remove some rules from gmake that .SUFFIXES does not remove.
SUFFIXES =

.SUFFIXES: .hpux_make_needs_suffix_list


# Suppress display of executed commands.
$(VERBOSE).SILENT:


# A target that is always out of date.
cmake_force:

.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E remove -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /workdir

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /workdir

# Include any dependencies generated for this target.
include CMakeFiles/tooling-sample.dir/depend.make

# Include the progress variables for this target.
include CMakeFiles/tooling-sample.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/tooling-sample.dir/flags.make

CMakeFiles/tooling-sample.dir/ToolingSample.cpp.o: CMakeFiles/tooling-sample.dir/flags.make
CMakeFiles/tooling-sample.dir/ToolingSample.cpp.o: ToolingSample.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/workdir/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object CMakeFiles/tooling-sample.dir/ToolingSample.cpp.o"
	/usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/tooling-sample.dir/ToolingSample.cpp.o -c /workdir/ToolingSample.cpp

CMakeFiles/tooling-sample.dir/ToolingSample.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/tooling-sample.dir/ToolingSample.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /workdir/ToolingSample.cpp > CMakeFiles/tooling-sample.dir/ToolingSample.cpp.i

CMakeFiles/tooling-sample.dir/ToolingSample.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/tooling-sample.dir/ToolingSample.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /workdir/ToolingSample.cpp -o CMakeFiles/tooling-sample.dir/ToolingSample.cpp.s

CMakeFiles/tooling-sample.dir/ToolingSample.cpp.o.requires:

.PHONY : CMakeFiles/tooling-sample.dir/ToolingSample.cpp.o.requires

CMakeFiles/tooling-sample.dir/ToolingSample.cpp.o.provides: CMakeFiles/tooling-sample.dir/ToolingSample.cpp.o.requires
	$(MAKE) -f CMakeFiles/tooling-sample.dir/build.make CMakeFiles/tooling-sample.dir/ToolingSample.cpp.o.provides.build
.PHONY : CMakeFiles/tooling-sample.dir/ToolingSample.cpp.o.provides

CMakeFiles/tooling-sample.dir/ToolingSample.cpp.o.provides.build: CMakeFiles/tooling-sample.dir/ToolingSample.cpp.o


# Object files for target tooling-sample
tooling__sample_OBJECTS = \
"CMakeFiles/tooling-sample.dir/ToolingSample.cpp.o"

# External object files for target tooling-sample
tooling__sample_EXTERNAL_OBJECTS =

tooling-sample: CMakeFiles/tooling-sample.dir/ToolingSample.cpp.o
tooling-sample: CMakeFiles/tooling-sample.dir/build.make
tooling-sample: /usr/local/lib/libclangTooling.a
tooling-sample: /usr/local/lib/libclangFrontend.a
tooling-sample: /usr/local/lib/libclangSerialization.a
tooling-sample: /usr/local/lib/libclangDriver.a
tooling-sample: /usr/local/lib/libclangParse.a
tooling-sample: /usr/local/lib/libclangSema.a
tooling-sample: /usr/local/lib/libclangAnalysis.a
tooling-sample: /usr/local/lib/libclangEdit.a
tooling-sample: /usr/local/lib/libclangAST.a
tooling-sample: /usr/local/lib/libclangLex.a
tooling-sample: /usr/local/lib/libclangBasic.a
tooling-sample: CMakeFiles/tooling-sample.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/workdir/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable tooling-sample"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/tooling-sample.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/tooling-sample.dir/build: tooling-sample

.PHONY : CMakeFiles/tooling-sample.dir/build

CMakeFiles/tooling-sample.dir/requires: CMakeFiles/tooling-sample.dir/ToolingSample.cpp.o.requires

.PHONY : CMakeFiles/tooling-sample.dir/requires

CMakeFiles/tooling-sample.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/tooling-sample.dir/cmake_clean.cmake
.PHONY : CMakeFiles/tooling-sample.dir/clean

CMakeFiles/tooling-sample.dir/depend:
	cd /workdir && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /workdir /workdir /workdir /workdir /workdir/CMakeFiles/tooling-sample.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : CMakeFiles/tooling-sample.dir/depend

