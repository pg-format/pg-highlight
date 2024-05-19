default: valid test

valid:
	@xmllint --noout --schema language.xsd pg.xml

test:
	@./test.sh

pg-format.pg.html: pg-format.pg
	./highlight -f html $< > $@

#pg-format.pg.dark.html: pg-format.pg
#	./highlight -f html -t "Breeze Dark" $< > $@

install: pg-format.pg.html pg-format.pg.dark.html
	cp pg.xml syntax-highlighting/data/syntax
	cp pg-format.pg syntax-highlighting/autotests/input
	cp pg-format.pg.html syntax-highlighting/autotests/html
	cp pg-format.pg.dark.html syntax-highlighting/autotests/html
	cp pg-format.pg.ref syntax-highlighting/autotests/reference
	cp pg-format.pg.fold syntax-highlighting/autotests/folding

build: install
	cd syntax-highlighting/build && cmake .. &&	make && make test

deps:
	sudo apt install extra-cmake-modules clang-format libkf5syntaxhighlighting-tools

