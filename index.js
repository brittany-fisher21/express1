'use strict';

const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');
const app = express();

const server = http.createServer(app);
const db = require('./db');

server.listen(port, hostname, function () {
    console.log(`server is running at http://${hostname}:${port}`);
});
const rootController = function (request, response) {
    // console.log('REQUEST IS: ', request);
    const snippet = `<h1>Hello from the Roote Route!</h1>`;
    response
        .status(200)
        .send(snippet)
        .end();
}
const friendsController = function (request, response) {
    let snippet = `<h1>Friends Route</h1>`;

    console.log(request.params);
    if (request.params.handle === undefined) {
        db.map(function (friend) {
            snippet += `<p><a href='./friends/${friend.handle}'>${friend.name}</a></p>`;

        })
    }
    if (request.params.handle !== undefined) {
            db.map(function (friend) {
                if (request.params.handle === friend.handle) {
                    snippet += `<p>${friend.name} likes ${ friend.skill } !</p>`;
            }else {
                return null;
            }
    });
}
   response.status(200).send(snippet).end();
};

app.get('/', rootController);
app.get('/friends/:handle?', friendsController);