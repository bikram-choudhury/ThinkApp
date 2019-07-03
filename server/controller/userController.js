const User = require('./../database/schemas/user');
const bcrypt = require('bcrypt');

const UserController = {
    authenticate: (authInfo) => {
        return new Promise((resolve, reject) => {
            if (authInfo && bcrypt.compareSync(authInfo.password, authInfo.hash)) {
                resolve({
                    token: generateRandomString(20)
                })
            } else {
                reject({error: 'Password authentication failed'});
            }
        })
    },
    findUser: (source = null, match = null, fetch = null) => {
        return new Promise((resolve, reject) => {
            const conditions = match || {};
            User.findOne(conditions, fetch, { lean: true }, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        })
    },
    createUser: (userInfo) => {
        return new Promise((resolve, reject) => {
            if (userInfo.password) {
                userInfo.hash = bcrypt.hashSync(userInfo.password, 10);
                delete userInfo.password;
    
                const user = new User(userInfo);
                user.save((err, userDoc) => {
                    if (err) {
                        reject(error);
                    } else {
                        resolve({userId: userDoc._id});
                    }
                })
            } else {
                reject({error: 'Invalid Password'})
            }
        })
    }
};

module.exports = UserController;

function generateRandomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }