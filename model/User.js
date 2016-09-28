/**
 * Created by Esimorp on 16/9/22.
 */
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name: String,
    watching: [mongoose.Schema.Types.ObjectId],
    joining: [mongoose.Schema.Types.ObjectId]
});

UserSchema.statics.createUserByName = function (name) {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.create({name: name}, function (err, doc) {
            if (err) {
                reject(err);
            }
            resolve(doc);
        });
    });
};

UserSchema.statics.findUserById = function (userId) {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.findOne({_id: userId}, function (err, doc) {
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

module.exports = mongoose.model('user', UserSchema);
