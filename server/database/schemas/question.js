const mongoose = require('mongoose');
const question_schema = mongoose.Schema({
    qTitle: {
        type: String,
        required: true
    },
    qSlug: {
        type: String,
        required: true
    },
    tpSlug: {
        type: String,
        required: true
    },
    qType: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: {
        type: [Object],
        required: false
    },
    subjectiveAnswer: {
        type: String,
        required: false
    }
});
module.exports = mongoose.model('questions', question_schema);