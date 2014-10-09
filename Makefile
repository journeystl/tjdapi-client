TESTS = $(shell find . -name "*.spec.js" -not -path "node_modules")
test:
	mocha --timeout 5000 --reporter spec $(TESTS)

test-w:
	mocha -w --timeout 5000 --reporter spec $(TESTS)

.PHONY: test test-w
