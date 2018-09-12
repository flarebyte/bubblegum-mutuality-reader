.PHONY: reset test

reset:
	rm -rf node_modules
	rm -rf build
	rm -rf test
	rm -rf coverage

install: reset
	yarn install

fix:
	yarn run fix

test: fix
	yarn run cov

test-ci:
	yarn run test	

watch:
	yarn run watch

doc:
	yarn run doc:json
	yarn run doc:html
		