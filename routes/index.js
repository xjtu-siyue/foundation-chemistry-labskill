var User = require('../models/user');
function allowUser(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.json({
            code: 403,
            msg: 'not login yet',
            body: {},
        });
    }
}
function allowTeacher(req, res, next) {
    if (req.session.user.teacher) {
        next();
    } else {
        res.json({
            code: 403,
            msg: 'only teacher can view',
            body: {},
        })
    }
}
module.exports = require('express').Router()
    .post('/login', function(req, res, next) {
        User.findOne({
            username: req.body.username,
        }, function(err, user) {
            if (err) {
                res.json({
                    code: -1,
                    msg: 'error',
                    body: {},
                });
                console.log(new Date(), err);
            } else if (user) {
                if (user.password == req.body.password) {
                    req.session.user = user;
                    req.session.loginTime = Date.now();
                    req.session.lastOnlineTime = user.onlineTime;
                    res.json({
                        code: 0,
                        msg: 'ok',
                        body: {}
                    });
                }
                else
                    res.json({
                        code: 1,
                        msg: 'wrong username or password',
                        body: {},
                    });
            } else {
                res.json({
                    code: 2,
                    msg: 'no such user',
                    body: {},
                });
            }
        });
    })
    .post('/regist', function(req, res, next) {
        var newUser = {
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            school: req.body.school,
        };
        if (req.body.group == 'student') {
            newUser.student = {
                studentId: req.body.studentId,
                grade: req.body.grade,
                major: req.body.major,
            };
        } else if (req.body.group == 'teacher') {
            if (req.body.code == req.body.theCode) {
                newUser.teacher = {
                    teacherId: req.body.teacherId,
                };
            } else {
                res.json({
                    code: 1,
                    msg: 'wrong code',
                    body: {},
                });
            }
        }
        new User(newUser).save(function(err, user) {
            if (err) {
                res.json({
                    code: -1,
                    msg: 'error',
                    body: {},
                });
                console.log(err);
            } else {
                req.session.user = user;
                req.session.loginTime = Date.now();
                res.json({
                    code: 0,
                    msg: 'ok',
                    body: {},
                });
            }
        })
    })
    .get('/user', allowUser)
    .get('/user', function(req, res, next) {
        res.json({
            code: 0,
            msg: 'ok',
            body: {
                name: req.session.user.name,
            }
        });
    })
    .get('/logout', function(req, res, next) {
        req.session.user = null;
        res.json({
            code: 0,
            msg: 'ok',
            body: {},
        });
    })
    .get('/check', allowUser)
    .get('/check', function(req, res, next) {
        User.findByIdAndUpdate(req.session.user._id, { $set: { onlineTime: req.session.lastOnlineTime + Date.now() - req.session.loginTime } }, function(err) {
            if (err) {
                res.json({
                    code: -1,
                    msg: 'error',
                    body: {}
                });
                console.log(err);
            } else {
                res.json({
                    code: 0,
                    msg: 'ok',
                    body: {},
                })
            }
        })
    })
    .get('/player/*', allowUser)
    .get('/data/*', allowUser)
    .get('/teacher/*', allowTeacher)
    .get('/schools', function(req, res, next) {
        res.redirect('/school-list.json');
    })
    .get('/majors', function(req, res, next) {
        res.redirect('/major-list.json');
    })

