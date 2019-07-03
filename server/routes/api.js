const express = require('express');
const router = express.Router();
const async = require('async');
const UserController = require('./../controller/userController');

router.use((req, res, next) => {
    // console.log(req.url);
    // res.status(500).json({description: "sending from middleware only"});
    next();
})

router.post('/user/authenticate', (request, response) => {
    const   username = request.body.username,
            password = request.body.password,
            usernameEmailMatch = { $or: [{username: username}, {email: username}] };
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
            response.json({error: 'username/email is not available.'});
        }
    })
    .catch(userError => response.json({error: userError}) )
})

router.post('/user/register', (request, response) => {
    const user = request.body;
    if (Object.keys(user).length && user.username) {
        const usernameEmailMatch = { $or: [{username: user.username}, {email: user.email}] };
        UserController.findUser(null, usernameEmailMatch, {_id: 1})
        .then(isExist => {
            if (!isExist) {
                UserController.createUser(user)
                .then(createResponse => response.json({userId: createResponse.userId}) )
                .catch(errorAtCreate => response.json({error: errorAtCreate}))
            } else {
                response.json({error: 'username/email already exist.'});
            }
        })
        .catch(userError => response.json({error: userError}) )
    } else {
        response.json({description: 'params/body are not valid'});
    }
});

module.exports = router;