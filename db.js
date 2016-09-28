/**
 * Created by Esimorp on 16/9/22.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/task_manager');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('connected');
});