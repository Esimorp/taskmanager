/**
 * Created by Esimorp on 16/9/22.
 */
var mongoose = require('mongoose');
var Promise = require('bluebird');

var AuthSchema = mongoose.Schema({
    email: String,
    password: String,
    userId: mongoose.Schema.Types.ObjectId,
    role: Number // 0 normal 1 admin
});

AuthSchema.statics.authByEmailAndPassword = function (email, password) {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.findOne({email: email, password: password}, function (err, doc) {
            if (err) {
                reject(err);
            }
            if (doc) {
                resolve(doc);
            }
            reject(null);
        });
    })
};

AuthSchema.statics.createAuthByEmailAndPasswordAndUserId = function (email, password, userId) {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.create({email: email, password: password, userId: userId}, function (err, doc) {
            if (err) {
                reject(err);
            }
            resolve(doc);
        })
    });
};
var AuthModel = mongoose.model('auth', AuthSchema);
module.exports = AuthModel;

