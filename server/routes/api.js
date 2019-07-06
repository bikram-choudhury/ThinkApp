const express = require('express');
const router = express.Router();
const UserController = require('./../controller/userController');
const topics = require('../database/schemas/topic');
const questions = require('./questions');

router.use((req, res, next) => {
    // console.log(req.url);
    // res.status(500).json({description: "sending from middleware only"});
    next();
});
router.use('/questions', questions);

router.post('/user/authenticate', (request, response) => {
    const username = request.body.username,
        password = request.body.password,
        usernameEmailMatch = { $or: [{ username: username }, { email: username }] };
    UserController.findUser(null, usernameEmailMatch)
        .then(userResponse => {
            if (userResponse) {
                const authInfo = {
                    _id: userResponse._id,
                    hash: userResponse.hash,
                    password: password
                }
                UserController.authenticate(authInfo)
                    .then(authResponse => {
                        response.json({
                            name: userResponse.name,
                            username: userResponse.username,
                            email: userResponse.email,
                            token: authResponse.token
                        })
                    })
                    .catch(authError => response.json(authError))
            } else {
                response.json({ error: 'username/email is not available.' });
            }
        })
        .catch(userError => response.json({ error: userError }))
});

router.post('/user/register', (request, response) => {
    const user = request.body;
    if (Object.keys(user).length && user.username) {
        const usernameEmailMatch = { $or: [{ username: user.username }, { email: user.email }] };
        UserController.findUser(null, usernameEmailMatch, { _id: 1 })
            .then(isExist => {
                if (!isExist) {
                    UserController.createUser(user)
                        .then(createResponse => response.json({ userId: createResponse.userId }))
                        .catch(errorAtCreate => response.json({ error: errorAtCreate }))
                } else {
                    response.json({ error: 'username/email already exist.' });
                }
            })
            .catch(userError => response.json({ error: userError }))
    } else {
        response.json({ description: 'params/body are not valid' });
    }
});

router.route('/topics')
    .get((req, res, next) => {
        topics.find({}, null, { lean: true }, (err, courseList) => {
            if (err) {
                res.status(500).send(err);
            } else {
                req.mongoObj = courseList;
                next();
            }
        });
    }, format_service_data)
    .post((req, res, next) => {
        const data = req.body;
        findTopic(data)
            .then(isExist => {
                if (!isExist) {
                    next();
                } else {
                    res.status(500).send({ error: 'Topic name is already present' });
                }
            }).catch(errorResponse => res.status(500).send(errorResponse));

    }, (req, res, next) => {
        const data = req.body;
        const topic = new topics(data);
        topic.save((err, doc) => {
            if (err) {
                res.status(500).send(err);
            } else {
                req.mongoObj = doc;
                next();
            }
        });
    }, format_service_data);

router.route('/topics/:tpSlug')
    .delete((req, res, next) => {
        const tpSlug = req.params && req.params.tpSlug || '';
        let query;
        if (tpSlug) {
            if (tpSlug !== 'all') {
                query = { slug: tpSlug };
            }
            if (tpSlug === 'all') {
                query = {};
            }
            req.dQry = query;
            next();
        } else {
            res.json({ description: 'params are not valid' });
        }
    }, (req, res) => {
        const query = req.dQry || ''
        query && topics.deleteOne(query, (err, doc) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({
                action: req.params.sId === 'all' ? 'DELETED ALL RECORDS' : 'DELETED'
            });
        }) || res.json({ description: 'params are not valid' });
    });

module.exports = router;


function format_service_data(req, res, next) {
    const serviceData = req.mongoObj || '';
    const proceedToNext = req.proceedToNext || false;
    let result;

    if (serviceData) {
        if (typeof serviceData === 'object' && Array.isArray(serviceData) && serviceData.length) {
            const list = serviceData.map((obj) => {
                delete obj.__v;
                return obj;
            });
            result = list;
        } else {
            delete serviceData.__v;
            result = serviceData;
        }
    }

    if (proceedToNext) {
        req.mongoObj = result;
        next();
    } else if (result) {
        res.json(result);
    } else {
        res.status(500).send("Something went wrong !");
    }
}

function findTopic(data) {
    return new Promise((resolve, reject) => {
        const regex = "^" + data.name + "$";
        topics.findOne({ name: { $regex: regex, $options: "i" } }, null, { lean: true }, (err, course) => {
            if (err) {
                reject(err);
            } else {
                resolve(course);
            }
        });
    })
}

