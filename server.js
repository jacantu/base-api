'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const uriUtil = require('mongodb-uri');

const mongodbUri = 'mongodb://mikedavinci:pythonMaster1@ds147777.mlab.com:47777/node-mongo'
const mongooseUri = uriUtil.formatMongoose(mongodbUri);
const dbOptions = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/contacts', require('./api/contacts/routes/post_contact'));
app.use('/api/contacts', require('./api/contacts/routes/get_contacts'));
app.use('/api/contacts', require('./api/contacts/routes/get_contact'));
app.use('/api/contacts', require('./api/contacts/routes/delete_contact'));
app.use('/api/contacts', require('./api/contacts/routes/put_contact'));

let contacts = require('./data');

const hostname = 'localhost';
const port = 3001;

const server = app.listen(port, hostname, () => {

    mongoose.connect(mongooseUri, dbOptions, (err) => {
        if (err) {
            console.log(err);
        }
        console.log(`Server running at http://${hostname}:${port}/`);
    });
});
