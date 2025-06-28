.PHONY: freeze
freeze:
	pip freeze > requirements.txt

.PHONY: db-up
db-up:
	docker compose -f database/docker-compose.yml up -d postgres

.PHONY: db-down
db-down:
	docker compose -f database/docker-compose.yml down

.PHONY: install-req
install-req:
	pip install -r requirements.txt

