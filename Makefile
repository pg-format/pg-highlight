default: valid test

valid:
	@xmllint --noout --schema language.xsd pg.xml

test:
	@./test.sh
