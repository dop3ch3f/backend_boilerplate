
run npm install

//features
Joi for validation of request data,
knex orm,
postgres db,
express and all that follows,
custom error handling,
bcrypt for hashing,
cors for http headers,
lodash for object and array manipulation,
morgan/helmet for error logging,
cluster for creating multiple instances on cores of the pc,
redis,
eslint,
body parser,
json web token,
crypto for unique id generation ..
see package for json for more

//file structure and explanation

/api subfolders of the versions of the api with deeper subversions of controllers per route,
  routes and an index.js file to group all the routes in one

/config configuration files for middlewares and dbs

/helpers list of sample usage files per request on the project e.g jsonwebtoken, mailgun,fileupload

/migrations for knex only

/seeds for knex only

/util for utilities e.g error handling scripts 

/validation for joi validation schema and more if you like

. server.js heart of the application
. dockerfile 
. knexfile for knex-cli abilities

