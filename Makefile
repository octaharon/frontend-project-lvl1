install:
	npm install
brain-games:
	node bin/brain-games
lint:
	npx eslint .
publish:
	npm publish --dry-run