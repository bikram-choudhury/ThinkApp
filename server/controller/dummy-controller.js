const url = require('url');
const queryString = require('querystring');
const fetch = require('node-fetch');

exports.generateRandomString = function (length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.parseURL = function(requestURL) {
    const query = url.parse(requestURL).query;
    return queryString.parse(query);
}
exports.fetchFakeUserData = function(userID) {
    return new Promise((resolve, reject) => {
        if(!userID) {
            reject ('user id is required !');
        }
        fetch(`//jsonplaceholder.typicode.com/users/${userID}`)
        .then(userData => resolve(userData.json()))
        .catch(error => {
            reject(new Error(error))
        })
    })
    
}
