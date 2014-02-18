module.exports.add = function (num1, num2) {
  return num1 +num2;
};

exports.async = function (callback) {
  setTimeout(function () {
    callback(1);
  }, 1);
};