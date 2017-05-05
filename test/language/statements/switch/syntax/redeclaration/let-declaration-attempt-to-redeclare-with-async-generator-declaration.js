// This file was procedurally generated from the following sources:
// - src/declarations/redeclare-with-async-generator-declaration.case
// - src/declarations/redeclare/switch-attempt-to-redeclare-let-declaration.template
/*---
description: redeclaration with AsyncGeneratorDeclaration (LexicalDeclaration (let) in SwitchStatement)
esid: sec-switch-statement-static-semantics-early-errors
flags: [generated, async-iteration]
negative:
  phase: early
  type: SyntaxError
info: |
    SwitchStatement : switch ( Expression ) CaseBlock

    It is a Syntax Error if the LexicallyDeclaredNames of CaseBlock contains any
    duplicate entries.

---*/


switch (0) { case 1: let f; default: async function* f() {} }
