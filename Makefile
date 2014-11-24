TESTS = $(shell find . -name "*.spec.js" -not -path "node_modules")
test:
	NODE_ENV=testing mocha --timeout 5000 --reporter spec $(TESTS)

test-w:
	NODE_ENV=testing mocha -w --timeout 5000 --reporter spec $(TESTS)

.PHONY: test test-w
