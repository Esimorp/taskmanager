/**
 * Created by Esimorp on 16/9/22.
 */
var express = require('express');
var router = express.Router();
var ProjectController = require('../controller/ProjectController');
router.get('/', function (req, res) {
    var index = req.query.index;
    var count = req.query.count;
    ProjectController.findProjectsByIndexAndCount(index, count).then(function (projects) {
        console.dir(projects);
        res.render('projects', {projects: projects});
    }).catch(function (error) {
        console.dir(error);
        res.render('projects', {error: error});
    });
});

router.get('/new', function (req, res) {
    res.render('projects_create');
});

router.post('/new', function (req, res) {
    var userId = req.session.user._id;
    var projectName = req.body.projectName;
    var projectCode = req.body.projectCode;
    var productionName = req.body.productionName;
    var productionCode = req.body.productionCode;
    var productionVersion = req.body.productionVersion;
    var description = req.body.description;
    ProjectController.createProject(userId, projectName, projectCode, productionName,
        productionCode, productionVersion, description)
        .then(function (doc) {
            res.redirect('/projects/' + doc._id);
        })
        .catch(function (error) {
                console.dir(error);
                res.render('projects_create', {error: error});
            }
        );
});

router.get('/:id', function (req, res) {
    var projectId = req.params.id;
    ProjectController.findProjectById(projectId).then(function (project) {
        res.render('project_info', {project: project});
    }).catch(function (err) {
        res.render('error', {error: err});
    });
});
module.exports = router;
