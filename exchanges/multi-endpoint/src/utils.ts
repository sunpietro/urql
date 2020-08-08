import { visit, DirectiveNode, ASTNode } from 'graphql';

export function getApiDirective(root: ASTNode): DirectiveNode {
  let hasApiDirective;
  visit(root, {
    Directive(node: DirectiveNode) {
      if (node.name.value === 'api') {
        hasApiDirective = node;
      }
    },
  });
  return hasApiDirective;
}

// TODO: remove api directive helper
