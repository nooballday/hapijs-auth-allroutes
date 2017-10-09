'use strict';

const Hapi = require('hapi');
const routes = require('./routes');
const JWT = require('jsonwebtoken');

var validate = require ('./validate.js');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8020 
});

var secretKey = 'VeryVerySecureSecretKey';
var obj = { id:911, 'username':'Michael Jordan'};
var token = JWT.sign(obj, secretKey);

console.log(token);

//registering route to hapi auth jwt
server.register(require('hapi-auth-jwt2'), (err)=>{

    if(err){
        console.log(err);
    }

    server.auth.strategy('jwt', 'jwt',{
        key: secretKey,
        validateFunc: validate,
        verifyOptions: { ignoreExpiration: true }
    });

    server.auth.default('jwt');

    server.route(routes);

});

// Add the route
server.route(    {
    method:'GET',
    path : '/',
    handler: function (req, rep){
        return rep('Welcome to my server');
    }
});

// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});