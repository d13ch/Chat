install:
	npm ci
build:
	npm run build
start-backend:
	npx start-server -s ./frontend/build
start-frontend:
	make -C frontend start
start:
	make start-backend & make start-frontend
lint:
	npx eslint .