/**
 * Created by Esimorp on 16/9/22.
 */
var AuthModel = require('../model/Auth');
var UserModel = require('../model/User');

var UserController = {};
UserController.registerUser = function (name, email, password) {
    UserModel.createUserByName(name).then(function (doc) {
        var userId = doc.toObject()._id;
        return AuthModel.createAuthByEmailAndPasswordAndUserId(email, password, userId);
    }).then(function (doc) {
        console.dir(doc.toObject());
    }).catch(function (err) {
        console.dir(err);
    });
};

UserController.signUserByEmailAndPassword = function (email, password) {
    return new Promise(function (resolve, reject) {
        console.log(1);
        AuthModel.authByEmailAndPassword(email, password).then(function (doc) {
            console.log(2);
            var userId = doc.toObject().userId;
            return UserModel.findUserById(userId);
        }).then(function (doc) {
            console.log(3);
            resolve(doc.toObject())
        }).catch(function (err) {
            console.log(4);
            reject(new Error());
        })
    })

};

module.exports = UserController;