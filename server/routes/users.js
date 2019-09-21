const express = require('express');
const router = express.Router();
const dummy = require('./../controller/dummy-controller');
const async = require('async');
const fetch = require('node-fetch');

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

const fetchUserDataFromFakeServer = (request, response, next) => {
    const userID = request.params.userID;
    async.parallel([
        (callback) => {
            fetch(`https://jsonplaceholder.typicode.com/users/${userID}`)
            .then(response => response.json())
            .then(userData => {
                callback(null, userData)
            })
            .catch(error => {
                callback(error)
            })
        },
        (callback) => {
            fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userID}`)
            .then(response => response.json())
            .then(postData => {
                callback(null, postData)
            })
            .catch(error => {
                callback(error)
            })
        }
    ], (error, result) => {
        if(error) {
            response.status(500).send(error);
        }
        request.userData = result;
        next()
    })
};

const formatUserData = (request, response) => {
    const [UserDetails, UserPosts] = request.userData;
    const {id, name, email, website} = UserDetails;
    const user = {id, name, email, website};
    user.posts = UserPosts.map(post => {
        delete post.userId;
        return post;
    });
    response.json(user);
};

const fetchCommentsFromFakeServer = (request, response) => {
    async.waterfall([
        callback => {
            const postID = request.params.postID;
            callback(null, postID);
        },
        (postID, callback) => {
            fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postID}`)
            .then(response => response.json())
            .then(comments => {
                callback(null, comments)
            })
            .catch(error => {
                callback(error)
            })
        }
    ], (error, result) => {
        if(error) {
            response.status(500).send(error);
        }
        response.json(result);
    })
}

router.get('/fetch/async-package/parallel/:userID', fetchUserDataFromFakeServer, formatUserData)

router.get('/fetch/async-package/waterfall/:postID', fetchCommentsFromFakeServer)

module.exports = router;
