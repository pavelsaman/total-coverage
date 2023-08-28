SHELL := bash

COLOR_START = \e[91m\e[1m
COLOR_END   = \e[0m
SAY         = @printf "$(COLOR_START)%s\n$(COLOR_END)"


.PHONY: install install-git-hooks format format-check lint lint-check format-lint format-lint-check test build all clean clean-all

install-git-hooks:
	$(SAY) "Installing git hooks..."
	@npm run $@

install: install-git-hooks
	$(SAY) "Installing dependencies..."
	@npm $@

format:
	$(SAY) "Formatting..."
	@npm run $@

format-check:
	$(SAY) "Checking formatting..."
	@npm run $@

lint:
	$(SAY) "Linting..."
	@npm run $@

lint-check:
	$(SAY) "Checking linting..."
	@npm run $@

format-lint: format lint

format-lint-check:
	$(SAY) "Format and lint check in progress..."
	@npm run lint-check
	@npm run format-check

test:
	$(SAY) "Testing..."
	@npm run $@

build: format lint test
	$(SAY) "Building..."
	@npm run $@

all: format lint test build

clean:
	$(SAY) "Cleaning dist/ ..."
	@npm run $@

clean-all:
	$(SAY) "Removing node modules and compiled code..."
	@npm run $@
