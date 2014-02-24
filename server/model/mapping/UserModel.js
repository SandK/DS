var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var schema = new Schema({
  username: { type:String }, // 用户名,不能重复
  nickname: { type:String, default: ""},
  age: { type:Number, default: 0 },
  avatar: {type:String, default: ""} // 用户头像文件名,如pic.png
}); 

schema.plugin(passportLocalMongoose);
mongoose.model('User', schema);