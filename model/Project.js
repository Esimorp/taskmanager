/**
 * Created by Esimorp on 16/9/22.
 */
var mongoose = require('mongoose');
var ProjectSchema = mongoose.Schema({
    project_name: String,
    project_code: String,
    production_name: String,
    production_code: String,
    production_version: String,
    production_drawing_code: String,
    flows: Array,
    step: 0,
    remarks: [String],
    create_by: mongoose.Schema.Types.ObjectId,
    create_date: Date,
    verify_by: mongoose.Schema.Types.ObjectId,
    verify_date: Date,
    description: String,
    members: [mongoose.Schema.Types.ObjectId]
});

ProjectSchema.statics.createProject = function (userId, projectName, projectCode, productionName, productionCode, productionVersion, description) {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.create({
            project_name: productionName,
            project_code: projectCode,
            production_name: productionName,
            production_code: projectCode,
            production_version: productionVersion,
            flows: [{type: 0, name: '编制规划表'}],
            step: 0,
            members: [userId],
            description: description
        }, function (err, doc) {
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

ProjectSchema.statics.findProjectById = function (projectId) {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.findOne({_id: projectId}, function (err, doc) {
            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
        })
    });
};

ProjectSchema.statics.findProjectsByIndexAndCount = function (index, count) {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.find({}, function (err, docs) {
            if (err) {
                reject(err);
            }
            var result = [];
            for (var i = 0; i < docs.length; i++) {
                result.push(docs[i].toObject());
            }
            resolve(result);
        }).limit(count).skip(index * count);
    })
};

module.exports = mongoose.model('projects', ProjectSchema);
