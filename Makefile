up:
	@docker-compose up -d webserver

up-install: up install-back

stop:
	@docker-compose stop

down:
	@docker-compose down

first-install: up install-back

install-check24-backend-test: PROJECT := check24-backend-test
install-check24-backend-test:
	@docker-compose exec -u application webserver bash -c  "cd /var/www/$(PROJECT);rm -f .env.local.php"
	@docker-compose exec -u application webserver bash -c  "cd /var/www/$(PROJECT);rm -f .env"
	@docker-compose exec -u application webserver bash -c  "cd /var/www/$(PROJECT);composer install --no-interaction --no-scripts"
	@docker-compose exec -u application webserver bash -c  "cd /var/www/$(PROJECT);composer dump-env dev"
	@docker-compose exec -u application webserver bash -c  "cd /var/www/$(PROJECT);php bin/console doctrine:database:drop --force --if-exists"
	@docker-compose exec -u application webserver bash -c  "cd /var/www/$(PROJECT);php bin/console doctrine:database:create --if-not-exists"
	@docker-compose exec -u application webserver bash -c  "cd /var/www/$(PROJECT);php bin/console doctrine:schema:update --force"
	@docker-compose exec -u application webserver bash -c  "cd /var/www/$(PROJECT);php bin/console doctrine:fixtures:load --no-interaction"

install-back: up install-check24-backend-test

status:
	@docker-compose ps -a

into-container:
	@docker-compose exec -u application webserver bash

cs: PROJECT := check24-backend-test
cs:
	@docker-compose exec -u application webserver bash -c "cd /var/www/$(PROJECT);php vendor/bin/php-cs-fixer fix -vv --allow-risky=yes"

test-phpunit: PROJECT := check24-backend-test
test-phpunit:
	@docker-compose exec -u application webserver bash -c  "cd /var/www/$(PROJECT);vendor/bin/phpunit"