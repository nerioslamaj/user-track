const svm = require('libsvm-js/asm');

const bayes = require('bayes');
const BAYES = bayes();

module.exports = function userPrediction(trainData, predictionData, settings) {

  let svm_training = {
    features: [],
    labels: []
  }
  const SVM = new svm({
    kernel: settings.kernel || svm.KERNEL_TYPES.RBF, // The type of kernel I want to use
    type: settings.type || svm.SVM_TYPES.C_SVC, // The type of SVM I want to run
    gamma: settings.gamma || 1, // RBF kernel gamma parameter
    cost: settings.cost || 1 // C_SVC cost parameter
  });
  
  if(trainData && predictionData) {
    for (var property in data) {
      BAYES.learn(data[property].bayes_data.search_queries, data[property].bayes_data.label)
      BAYES.learn(data[property].bayes_data.user_details, data[property].bayes_data.label)
      svm_training.features.push(data[property].svm_data.features);
      svm_training.labels.push(data[property].svm_data.label);
    }
    SVM.train(svm_training.features, svm_training.labels);

    setInterval(() => {
      let index = 0;
      let predictedSvm = SVM.predictOneProbability(predictionData[index].svm_data);
      let predictedBayes = BAYES.categorize('awesome, cool, amazing!! Yay.')
      console.log('\x1b[36m%s\x1b[0m', predictionData[index].user, '\tSVM: ' + predictedSvm, '\tBayes: ' + predictedBayes);
      index++;
    }, 300)
  } else {
    return "Train data or prediction data are missing"
  }
};
