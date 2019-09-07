const express = require('express');
const router = express.Router();
const topics = require('../database/schemas/topic');
const questions = require('./questions');
const users = require('./users');

router.use('/questions', questions);
router.use('/user', users);

/* router.get('/user/register', (request, response) => {
    console.log(request.body);
    response.json({...request.body, token: "IamTokenFromServer"});
});

router.post('/user/authenticate', (request, response) => {
    console.log(request.body);
    response.json({...request.body, token: "IamTokenFromServer"});
});
*/


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

