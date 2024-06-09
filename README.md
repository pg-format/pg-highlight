# PG highlight

> Syntax highlighting definitions for [PG format](https://pg-format.github.io/specification/#pg-format).

This repository contains syntax definition files for several syntax highlighting engines.

## Installation and Usage

For **Kate** and KDE applications copy or symlink file [kate/pg.xml](kate/pg.xml) to [your location of KDE syntax definition files](https://api.kde.org/frameworks/syntax-highlighting/html/#autotoc_md4) (e.g. `$HOME/.local/share/org.kde.syntax-highlighting/syntax/`).

For **Pandoc** and **Quarto** reference a local copy of the file [via option `syntax-definition`](https://pandoc.org/MANUAL.html#option--syntax-definition).

For CodeMirror 5 use highlighting mode file [codemirror5/pg.js](codemirror5/pg.js).

## Development

Directory `examples` contains unit tests PG format files and corresponding syntax highlighting.

### Kate syntax definition file

The Kate Syntax Highlighting Engine ([KSyntaxHighlighting](https://invent.kde.org/frameworks/syntax-highlighting))
written in C++ is used by Kate, KDevelop, and other KDE applications. Its syntax definition file format is also
used by the [skylighting](https://github.com/jgm/skylighting) engine written in Hasekll and used by Pandoc and Quarto.

See [kate/README.md](kate/README.md) for technical details.

### CodeMirror 5

See file `pg.js` in directory `codemirror5` for a draft.

### TextMade / Ace

TextMate grammar files are also used by Ace editor, also used by GitHub.

### Other engines

- Pygments used by Jupyter Notebooks
- Highlight.js
- Prism
- GeSHi (Generic Syntax Highlighter) used by MediaWiki
- Rouge used by GitLab
- Language Server Protocol (LSP)

