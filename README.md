# PG highlight

> Syntax highlighting definitions for [PG format](https://pg-format.github.io/specification/#pg-format).

This repository contains syntax definition files for several syntax highlighting engines.

## Overview

- `pg.xml` [Kate syntax highlighting file](https://api.kde.org/frameworks/syntax-highlighting/html/) of PG format
- `examples` Unit tests PG format files and corresponding syntax highlighting

- `test.sh` Script to run unit tests with [skylighting](https://github.com/jgm/skylighting) 
- `skylight` Script to highlight with [skylighting](https://github.com/jgm/skylighting) 
- `katelight` Script to highlight with [kate-syntax-highlighting](https://github.com/KDE/syntax-highlighting)

## Usage

For Kate and KDE applications copy file [pg.xml](pg.xml) to [your location of KDE syntax definition files](https://api.kde.org/frameworks/syntax-highlighting/html/#autotoc_md4).

For Pandoc and Quarto copy file [pg.xml](pg.xml) and reference it [via option
`syntax-definition`](https://pandoc.org/MANUAL.html#option--syntax-definition).

## Development

### KSyntaxHighlighting

KSyntaxHighlighting is used by Kate, KWrite, KDevelop, and other KDE applications and by Pandoc and Quarto.

The [syntax definition file](pg.xml) is tested with two independent implementations:

- kate-syntax-highlighting (install with `sudo apt install libkf5syntaxhighlighting-tools`)
- [skylighting](https://github.com/jgm/skylighting)

To validate the syntax definition file, install `xmllint` and run `make valid`.
 
Symlink your `pg.xml` from [your location of syntax definition files](https://api.kde.org/frameworks/syntax-highlighting/html/#autotoc_md4), e.g from `$HOME/.local/share/org.kde.syntax-highlighting/syntax/pg.xml`.

Use option `--syntax-trace` with `katelight` to display additional information, e.g.

~~~sh
./katelight --syntax-trace=format examples/style.pg 
~~~

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

