var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var schema = new Schema({
  username: String,
  nickname: String,
  age: Number
}); 

schema.plugin(passportLocalMongoose);
mongoose.model('User', schema);