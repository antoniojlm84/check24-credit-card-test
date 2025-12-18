## Check24 credit cards TEST
-- Antonio de Lucas --

### About the project

- Symfony 7.4 over a docker image with a LAMP enviroment (debian, php 8.3, mysql 8.x).
- Hexagonal architecture with DDD and SOLID good practices.
- API request and responses with JWT auth validation.
- Make FILE to install docker images and install symfony dependences easily with some fixtures.
- Make FILE to run some test PhpUnit tests.
- Instructions to build and make the fronted run.

### Download project



### Configuring project

###### Backend

We have to edit our hosts file to add the following mapping to it (Linux → /ect/hosts):

127.0.0.1       check24-backend-test.local

Install project (get docker running and install symfony vendors)

We have to move to the root project dir and type this commands in the console:

```shell
make up
make install-check24-backend-test
```

1 - make up: starts our docker containers system

2 - make install-check24-backend: load vendors, configure symfony and load some fixtures to the DB

###### Frontend

Prerequisites

1. Check Node.js

As React runs over Node.js we need to check the version we have:

```shell
node -v
npm -v
```

2. Install Node.js (LTS)

If you do not have it installed:

```shell
sudo apt update
sudo apt install -y nodejs npm
```

3. Build the project

Go to the root of the fronted project,install node modules and starts the app:

```shell
cd check24-front-test
npm install
npm run dev
```

4. Run the app

Run it:

```shell
npm run dev
```

You can now open your browser:

```
http://localhost:3000
```

### Endpoints

###### Credit card list

The enpoint api/credit-cards has a public access so we can request as many times as we want.

http://check24-backend-test.local/api/credit-cards

Method: GET

This endpoint will give us the list of credit cards in our DB

###### Credit card details

http://check24-backend-test.local/api/credit-cards/ea798907-bcae-431a-b44d-86e718d562bf

Method: GET

This endpoint will give us the details about a singular hotel by given its ID in the request

###### Import credit cards from external API financeads.net

http://check24-backend-test.local/api/credit-cards/import

Method: POST

This endpoint will import all the credit cards we get from th API. We also respect previous edited data of 
a credit card store in DB. Finally we make some fixes looking for wrong html tags in the text given in each 
field 'anmerkungen' of the credit cards.

### Tests

