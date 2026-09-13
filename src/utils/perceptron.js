export function predictPerceptron(features, weights, bias) {
  const sum = features.reduce((acc, value, index) => acc + value * weights[index], 0) + bias;
  return sum >= 0 ? 1 : 0;
}

export function trainPerceptron(data, learningRate = 0.1, epochs = 10) {
  const weights = new Array(data[0].features.length).fill(0);
  let bias = 0;
  const history = [];

  for (let epoch = 1; epoch <= epochs; epoch += 1) {
    let errors = 0;

    data.forEach((sample) => {
      const prediction = predictPerceptron(sample.features, weights, bias);
      const error = sample.label - prediction;
      if (error !== 0) {
        errors += 1;
        sample.features.forEach((value, index) => {
          weights[index] += learningRate * error * value;
        });
        bias += learningRate * error;
      }
    });

    history.push({
      epoch,
      weights: [...weights],
      bias,
      errorRate: errors / data.length,
      accuracy: (data.filter((sample) => predictPerceptron(sample.features, weights, bias) === sample.label).length / data.length) * 100,
    });
  }

  return { weights, bias, history };
}
