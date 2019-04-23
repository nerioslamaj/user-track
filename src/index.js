require('libsvm-js').then(SVM => {
  const SVM = new SVM(); // ...
});

var bayes = require('bayes')
var NB = bayes()

module.exports = function tiny(string) {
  if (typeof string !== "string") throw new TypeError("Tiny wants a string!");
  return string.replace(/\s/g, "");
};