# PDX PROJECT BACKEND

Welcome, We are Isaac, Alvaro and Moises, we belong to the XVIII edition of Web Development Full Stack + IA by CodeSpace Academy.
We work in a collaborative project from middle course to apply skills and knowledge and work altogether as a team.

This is the Backend for the PDX Project, that consist in recreate a Pokedex from the Pokemon universe.

This pokedex will be a sort of encyclopedia and collection for "pokemon trainers".

### Tools used for Backend

We will start creating a server that will listen for the petitions made by the front, and connect with the Database, validate and collect the data, and answer the petitions back to the front.

## User Guide

Its very important to install nodeJS and with npm for the needed modules to run the server:
make sure to install the following dependencies as stated in file package.json...

`npm i`


the .gitignore will make sure node_modules directory stays in local.

Keep in mind you need MongoDB installed and running at localhost:27017;
run this with:

`mongod`

or connecting at the MongoDB extension from VScode

The next step will be running the server at http://localhost:3000

I set it to run this with nodemon in development, and express for production.
run this:

`npm run dev`
for development

`npm run start`
for production

### DataBase info
```
PDXDB
├── admin
├── pokemon
└── tests
```
We will use a local Database with MongoDB to use data for admins, some tests, and freshly new created pokemons.

at shell located root run this:

`node ./src/models/seed.js`

This will create the 3 admins and the pokemon 152 (from second edition) as an example, check your local DB after running the seeder, if your DB is working properly, you should have the intial admin and pokemons.


PLEASE BE PATIENT, POKE API NEEDS SOME DELAY BETWEEN PETITIONS, IT WILL TAKES LIKE 1 MINUTE TO BRING 151 POKEMON

### ROUTES

The server will answer to the following requests (with base URL http://localhost:3000):

#### TESTS

`/testing/serverTest`

Returns a message with a get petition

`/testing/MongoCrear-test`

inserts a test document in PDXDB

`/info`

Returns some credits

#### ADMIN

`/admin/login`

post petition to validate an admin, will get an user ID and user PASS and then try to validate it in mongo

#### POKEMON

`/pokemon/`
when using GET will return a full list of every pokemon in mongo
when using POST and send object in body, will create a new pokemon, returns the new pokemon

`/pokemon/:pokeID`
GET to receive one specified pokemon
DELETE petition by pokeID
PATCH with parameters to modify in body will modify an existing pokemon

`/collection/:pokeID`
POST with userID(email) in body and pokeID number in params will toggle that pokemon and include o exclude from adminCollection. There is a limit of 6.


## More info

#### Tools and skills employed

* Workflow organization with Trello
* Collaborative project management by Git and GitHub
* Visual Studio Code
* NodeJS
* Express for a server, and Nodemon for development
* JavaScript


You can follow our work through our GitHub accounts:

* Isaac - many1970
* Alvaro - palmera11
* Moises - moiseslopez1014