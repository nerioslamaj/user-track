const svm = require('libsvm-js/asm');
const SVM = new svm();

const bayes = require('bayes');
const BAYES = bayes();

module.exports = function trainData(data) {
  if(data) {
    trainBayes(data.bayes_data).then(x => {
      return "Bayes finished training"
    });
    trainSVM(data.svm_data).then(x => {
      return "SVM finished training"
    });
  } else {
    return "No data is loaded"
  }
};

function trainBayes(data) {
  if(data) {
    data.map(session => {
      let features = '';
      const label = session.purchase ? 'positive' : 'negative';
      delete session.purchase;
      const values = Object.values(data.bayes_data);
      values.map(dimension => {
        features.concat(dimension + ' ')
      })
      return BAYES.learn(features, label);
    })
  } else {
    return "No data for Bayes is loaded"
  }
}

function trainSVM(data) {
  if(data) {
    let features = [];
    let labels = [];
    data.map((session, index) => {
      const label = session.purchase;
      delete session.purchase;
      const values = Object.values(data.svm_data);
      values.map(dimension => {
        features[index] = [];
        features[index].push(dimension);
      })
      const label = session.purchase ? 1 : 0;
      labels.push(label);
    })
    return SVM.train(features, labels);
  } else {
    return "No data for SVM is loaded"
  }
}

module.exports = function predictData(data) {
  if(data) {
    return [predictBayes(data.bayes_data), predictSVM(data.svm_data)];
  } else {
    return "No data is loaded"
  }
}

function predictSVM(data) {
  let features = [];
  const values = Object.values(data);
  values.map(dimension => {
    features[index] = [];
    features[index].push(dimension);
  })
  return SVM.predict(features);
}

function predictBayes(data) {
  let features = [];
  const values = Object.values(data);
  values.map(dimension => {
    features.concat(dimension + ' ')
  })
  return BAYES.categorize(features);
}