const mongoose = require('mongoose');
const course_schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('courses', course_schema);