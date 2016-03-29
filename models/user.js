var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('user', new Schema({
    username: {
        type: String,
        required: 'miss username',
        unique: true,
    },
    password: {
        type: String,
        required: 'miss password',
    },
    name: {
        type: String,
        required: 'miss real name',
    },
    student: {
        studentId: {
            type: String,
            unique: true,
        },
        grade: {
            type: Number,
        },
        major: {
            type: String,
        },
    },
    teacher: {
        teacherId: {
            type: String,
            unique: true,
        },
    },
    school: {
        type: String,
        required: 'miss school',
    },
    onlineTime: {
        type: Number,
        default: 0,
    }
}));