CodeMirror.defineSimpleMode("pg", {
  start: [
    {regex: /->|--/, token: "keyword", next: 'dest'},
    {regex: /\s:\s*[^\s:]+/, token: "def"},
    {regex: /#.*/, token: "comment" },
    {
        regex: /"(?:[^\\]|\\.)*?"|[^\s:]+/, token: "string"
    },
    {regex: /(\s)([^\s:"]+)(\s*)(:)(\s*)("(?:[^\\]|\\.)*?"|[^\s]+)?/, 
      token: [null, "variable-2", null, "atom", null, "property"]},
  ],
  dest: [
    {regex: /"(?:[^\\]|\\.)*?"|[^\s:]+/, token: "string", next: 'start'},
  ],
  meta: {
    lineComment: "#"
  },
});
