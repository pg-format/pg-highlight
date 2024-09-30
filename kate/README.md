# PG Format Kate syntax definition file

This directory contains:

- PG format syntax definition file [pg.xml](pg.xml)
- Makefile to validate and test syntax definition (requires `xmllint`)
- Unit test file `pg-format.pg`
- `test.sh` Script to run unit tests with [skylighting](https://github.com/jgm/skylighting) 
- `skylight` Script to highlight with [skylighting](https://github.com/jgm/skylighting) 
- `highlight` Script to highlight with [kate-syntax-highlighting](https://github.com/KDE/syntax-highlighting)
  Use option `--syntax-trace` with `katelight` to display additional information.

Run `make build` to compile kate syntax highlighter and test with pg highlighting definition. Errors are listed in
`./syntax-highlighting/build/Testing/Temporary/LastTest.log`.

