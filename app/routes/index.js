'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => res.sendFile('index.html'));
router.get('/test', (req, res) => res.send('asdasdsd'));

router.use('/entries', require('./entries'));

module.exports = router;
