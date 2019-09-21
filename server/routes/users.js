const express = require('express');
const router = express.Router();
const UserController = require('./../controller/userController');
const atob = require("atob");

router.post('/register', (request, response) => {
    const user = request.body || null;
    if (Object.keys(user).length && user.username) {
        const usernameEmailMatch = { $or: [{ username: user.username }, { email: user.email }] };
        UserController.findUser(null, usernameEmailMatch, { _id: 1 })
            .then(isExist => {
                if (!isExist) {
                    user.password = atob(user.password);
                    UserController.createUser(user)
                        .then(createResponse => response.json({ userId: `user saved with ${user.username}.` }))
                        .catch(errorAtCreate => response.json({ error: errorAtCreate }))
                } else {
                    response.json({ error: 'username/email already exist.' });
                }
            })
            .catch(userError => response.json({ error: userError }))
    } else {
        response.status(400).send('Invalid user data!');
    }
});

router.post('/authenticate', (request, response) => {
    const user = request.body || null;
    if (Object.keys(user).length && user.username) {
        const username = user.username,
            password = user.password,
            usernameEmailMatch = { $or: [{ username: username }, { email: username }] };
        UserController.findUser(null, usernameEmailMatch)
            .then(userResponse => {
                if (userResponse) {
                    const authInfo = {
                        _id: userResponse._id,
                        hash: userResponse.hash,
                        password: atob(password),
                    };
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
    }
})

module.exports = router;
