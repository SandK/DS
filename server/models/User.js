var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
  username: String,
  nickname: String,
  age: Number
}); 

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);