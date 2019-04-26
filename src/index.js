require('libsvm-js').then(svm => {
  const SVM = new svm();
});

const bayes = require('bayes');
const NB = bayes();

module.exports = function tiny(string) {
  if (typeof string !== "string") throw new TypeError("Tiny wants a string!");
  return string.replace(/\s/g, "");
};