import sys

import clang.cindex
from clang.cindex import Index
from clang.cindex import Config

def print_node_tree(node):
    print("%s : %s" % (node.kind.name, node.displayname))
    for child in node.get_children():
        print_node_tree(child)

index = Index.create()
tu = index.parse("test.cpp")
print_node_tree(tu.cursor)