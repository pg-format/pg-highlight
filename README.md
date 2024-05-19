# PG highlight

> Syntax highlighting definitions for [PG format](https://pg-format.github.io/specification/#pg-format).

This repository contains syntax definition files for several syntax highlighting engines.

## Installation and Usage

For **Kate** and KDE applications copy or symlink file [kate/pg.xml](kate/pg.xml) to [your location of KDE syntax definition files](https://api.kde.org/frameworks/syntax-highlighting/html/#autotoc_md4) (e.g. `$HOME/.local/share/org.kde.syntax-highlighting/syntax/`).

For **Pandoc** and **Quarto** reference a local copy of the file [via option `syntax-definition`](https://pandoc.org/MANUAL.html#option--syntax-definition).

## Development

Directory `examples` contains unit tests PG format files and corresponding syntax highlighting.

### Kate syntax definition file

The Kate Syntax Highlighting Engine ([KSyntaxHighlighting](https://invent.kde.org/frameworks/syntax-highlighting))
written in C++ is used by Kate, KDevelop, and other KDE applications. Its syntax definition file format is also
used by the [skylighting](https://github.com/jgm/skylighting) engine written in Hasekll and used by Pandoc and Quarto.

Directory [kate](kate) contains:

- PG format syntax definition file [kate/pg.xml](pg.xml)
- Makefile to validate and test syntax definition (requires `xmllint`)
- Unit test file `pg-format.pg`
- `test.sh` Script to run unit tests with [skylighting](https://github.com/jgm/skylighting) 
- `skylight` Script to highlight with [skylighting](https://github.com/jgm/skylighting) 
- `highlight` Script to highlight with [kate-syntax-highlighting](https://github.com/KDE/syntax-highlighting)
  Use option `--syntax-trace` with `katelight` to display additional information, e.g.

### CodeMirror

Planned. See <https://github.com/pg-format/pg-formatter> for a first version.

### Other engines

- Pygments used by Jupyter Notebooks
- Highlight.js
- Prism
- GeSHi (Generic Syntax Highlighter) used by MediaWiki
- TextMate grammar files used by GitHub
- Rouge used by GitLab
- Language Server Protocol (LSP)

