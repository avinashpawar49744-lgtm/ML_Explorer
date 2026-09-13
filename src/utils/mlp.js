export function sigmoid(value) {
  return 1 / (1 + Math.exp(-value));
}

export function trainXorEpoch(weights, learningRate = 0.35) {
  const samples = [[0, 0, 0], [0, 1, 1], [1, 0, 1], [1, 1, 0]];
  let loss = 0;
  let correct = 0;
  const next = weights.map((layer) => layer.map((row) => [...row]));

  samples.forEach(([x1, x2, target]) => {
    const hidden = next[0].map(([w1, w2, bias]) => sigmoid(x1 * w1 + x2 * w2 + bias));
    const output = sigmoid(hidden[0] * next[1][0][0] + hidden[1] * next[1][0][1] + next[1][0][2]);
    const error = target - output;
    loss += error ** 2;
    if ((output >= 0.5) === Boolean(target)) correct += 1;
    const outputDelta = error * output * (1 - output);
    hidden.forEach((activation, index) => {
      next[1][0][index] += learningRate * outputDelta * activation;
      next[0][index][0] += learningRate * outputDelta * next[1][0][index] * activation * (1 - activation) * x1;
      next[0][index][1] += learningRate * outputDelta * next[1][0][index] * activation * (1 - activation) * x2;
      next[0][index][2] += learningRate * outputDelta * next[1][0][index] * activation * (1 - activation);
    });
    next[1][0][2] += learningRate * outputDelta;
  });

  return { weights: next, loss: loss / samples.length, accuracy: (correct / samples.length) * 100 };
}

export const initialMlpWeights = [
  [[0.8, -0.6, 0.2], [-0.7, 0.9, -0.1]],
  [[0.6, 0.5, -0.3]],
];
