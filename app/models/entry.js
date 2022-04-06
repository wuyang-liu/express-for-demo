'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;
const Question = new Schema({
    qid :Number,
    scale:Number,
})

const Entry = new Schema({
    id: { type: Number, unique: true, sparse: true },
    username: { type: String, required: true, max: 60 },
    questions: [{}]
});

module.exports = mongoose.model('Entry', Entry);
// module.exports = mongoose.model('Question', Question);
