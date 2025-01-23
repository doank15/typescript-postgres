check-pg:
	sudo systemctl postgresql status
stop-pg:
	sudo service postgresql stop

start-pg:
    sudo service postgresql start

compose-up:
	docker-compose up -d

create-app:
	npx typeorm init --name MyProject --database postgres