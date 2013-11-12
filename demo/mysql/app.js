var dbModule = require('./connect/app-pooling.js');
var db = dbModule.getDBAcess();

var async = require('async');


// test for db
db.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);
});

// test for async
var sqls = {
    'insertSQL': 'insert into t_user(name) values("conan"),("fens.me")',
    'selectSQL': 'select * from t_user limit 10',
    'deleteSQL': 'delete from t_user',
    'updateSQL': 'update t_user set name="conan update"  where name="conan"'
};

var tasks = ['deleteSQL', 'insertSQL', 'selectSQL', 'updateSQL', 'selectSQL'];
async.eachSeries(tasks, function (item, callback) {
    console.log(item + " ==> " + sqls[item]);
    db.query(sqls[item], function (err, res) {
        console.log(res);
        callback(err, res);
    });
}, function (err) {
    console.log("err: " + err);
});