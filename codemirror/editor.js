import { basicSetup } from "codemirror"
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

import { pg } from "./lang-pg.js"

export function createEditor(doc, parent) {
  let extensions = [
    basicSetup,
    pg(),
  ];
  const state = EditorState.create({ doc, extensions })
  return new EditorView({ state, parent });
}
