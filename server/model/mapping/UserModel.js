var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var schema = new Schema({
  username: { type:String },
  nickname: { type:String, default: ""},
  age: { type:Number, default: 0 }
}); 

schema.plugin(passportLocalMongoose);
mongoose.model('User', schema);