var express = require('express');
var router = express.Router();
var UserController = require('../controller/UserController');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/sign-in', function (req, res, next) {
    res.render('sign-in');
});

router.post('/sign-in', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    UserController.signUserByEmailAndPassword(email, password).then(function (resolve) {
        req.session.user = resolve;
        res.redirect('/');
    }).catch(function (error) {
        res.render('sign-in', {error: error});
    });
});


module.exports = router;
