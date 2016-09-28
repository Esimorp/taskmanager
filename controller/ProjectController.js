/**
 * Created by Esimorp on 16/9/22.
 */
var ProjectModel = require('../model/Project');

var ProjectController = {};

ProjectController.createProject = function (userId, projectName, projectCode, productionName, productionCode, productionVersion, description) {
    return new Promise(function (resolve, reject) {
        ProjectModel.createProject(userId, projectName, projectCode,
            productionName, productionCode, productionVersion)
            .then(function (doc) {
                resolve(doc.toObject());
            }).catch(function (err) {
            reject(err);
        })
    });
};

ProjectController.findProjectById = function (projectId) {
    return new Promise(function (resolve, reject) {
        ProjectModel.findProjectById(projectId).then(function (doc) {
            resolve(doc.toObject());
        }).catch(function (err) {
            reject(err);
        });
    })
};

ProjectController.findProjectsByIndexAndCount = function (index, count) {
    return new Promise(function (resolve, reject) {
        ProjectModel.findProjectsByIndexAndCount(index, count).then(function (projects) {
            resolve(projects);
        }).catch(function (error) {
            reject(error);
        })
    });
};

module.exports = ProjectController;
