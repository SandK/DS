var mongoose = require('mongoose');
var config = require('../config');
var fs = require('fs');
var logger = require('../utils/log.js').logger;

mongoose.connect(config.connectionstring);

var db = mongoose.connection;
db.on('error', function(err){
    logger.trace('connect to %s error: ', config.connectionstring, err.message);
    //process.exit(1);
});
db.once('open', function () {
    logger.trace('%s has been connected.', config.connectionstring);
});

var models_path = __dirname + '/../model/mapping'
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path + '/' + file);
    var modelName = file.replace('Model.js', '');
    exports[modelName] = mongoose.model(modelName);
    logger.trace("exports %s success", modelName);
});