const express = require('express');
const router = express.Router();
const dummy = require('./../controller/dummy-controller');

router.get('/fetch', (request, response) => {
    response.json({
        url: request.url,
        basURL: request.baseUrl,
        originalURL: request.originalUrl,
        host: request.hostname,
        token: dummy.generateRandomString(20),
        parsedURL: dummy.parseURL(request.url)
    });
});
router.get('/fetch/:userID?', (request, response) => {
    dummy.fetchFakeUserData(request.params.userID)
    .then(userdata => response.json(userdata))
    .catch(error => response.status(500).send(error))
});

router.get('/fetch/async/:userID?', async (request, response) => {
    try {
        const fakeUserData = await dummy.fetchFakeUserData(request.params.userID);
        response.json(fakeUserData);
    } catch(error) {
        response.status(500).send(error.message);
    }
});

module.exports = router;
