const svm = require('libsvm-js/asm');

const bayes = require('bayes');
const BAYES = bayes();

module.exports = function userPrediction(trainData, predictionData, settings) {

  let svm_training = {
    features: [],
    labels: []
  }
  const SVM = new svm({
    kernel: svm.KERNEL_TYPES.RBF, // The type of kernel
    type: svm.SVM_TYPES.C_SVC, // The type of SVM
    gamma: settings.gamma || 1, // RBF kernel gamma parameter
    cost: settings.cost || 1 // C_SVC constant parameter
  });
  
  if(trainData && predictionData) {
    let index = 0;
    let color_bayes = '';
    let color_svm = '';
    let result_bayes = '';
    let result_svm = '';
    let buyer_bayes = '';
    let buyer_svm = '';

    for (var property in trainData) {
      BAYES.learn(trainData[property].bayes_data.search_queries, trainData[property].bayes_data.label)
      BAYES.learn(trainData[property].bayes_data.user_details, trainData[property].bayes_data.label)
      svm_training.features.push(trainData[property].svm_data.features);
      svm_training.labels.push(trainData[property].svm_data.label);
    }
    SVM.train(svm_training.features, svm_training.labels);
    console.log('\x1b[0m', '\n', '\x1b[45m\x1b[1m', 'Did the customer make any transaction?', '\x1b[0m', '\n');
    const runPrediction = () => {
      let predictedSvm = SVM.predictOne(predictionData[index].svm_data);
      let predictedBayes = BAYES.categorize(predictionData[index].bayes_data)
      
      if((predictedSvm == 1 && predictionData[index].purchased) || (predictedSvm == 0 && !predictionData[index].purchased)) {
        color_svm = "\x1b[32m"
        result_svm = ' ✓';
      } else {
        color_svm = "\x1b[31m"
        result_svm = ' x';
      }
      if((predictedBayes == 'positive' && predictionData[index].purchased) || (predictedBayes == 'negative' && !predictionData[index].purchased)) {
        color_bayes = "\x1b[32m"
        result_bayes = ' ✓';
      } else {
        color_bayes = "\x1b[31m"
        result_bayes = ' x';
      }
      if(predictedSvm == 1) {
        buyer_svm = 'YES'
      } else {
        buyer_svm = 'NO '
      }
      if(predictedBayes == 'positive') {
        buyer_bayes = 'YES'
      } else {
        buyer_bayes = 'NO '
      }
      console.log(color_svm, 'svm: ' + buyer_svm + result_svm, color_bayes, '\t\tbayes: ' + buyer_bayes + result_bayes);
      index++;
      if(index < predictionData.length){
        setTimeout(runPrediction, 250)
      }
    }
    runPrediction();
  } else {
    return "Train data or prediction data are missing"
  }
};
