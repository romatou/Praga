db:
	docker run -d --rm -p 5432:5432 --env-file .env --name Postgres -v Praga:/var/lib/postgresql/data postgres:latest
start:
	docker compose up -d
