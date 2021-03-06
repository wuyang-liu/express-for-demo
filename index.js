'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { port, mongoUrl } = require('./app/config');

const app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(require('./app/routes'));

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const db = mongoose.connection;
db.on('error', (err) => console.error('MongoDB connection error:', err));
db.once('open', () => app.listen(port, () => console.log(`Listening on port: ${port}`)));
