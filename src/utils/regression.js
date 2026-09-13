export function linearRegression(data) {
  if (!data.length) return { slope: 0, intercept: 0, predictions: [], r2: 0 };

  const n = data.length;
  const xMean = data.reduce((sum, item) => sum + item.x, 0) / n;
  const yMean = data.reduce((sum, item) => sum + item.y, 0) / n;
  let numerator = 0;
  let denominator = 0;

  data.forEach((item) => {
    numerator += (item.x - xMean) * (item.y - yMean);
    denominator += (item.x - xMean) ** 2;
  });

  const slope = denominator ? numerator / denominator : 0;
  const intercept = yMean - slope * xMean;
  const predictions = data.map((item) => ({ ...item, predicted: slope * item.x + intercept }));
  const ssTot = data.reduce((sum, item) => sum + (item.y - yMean) ** 2, 0);
  const ssRes = predictions.reduce((sum, item) => sum + (item.y - item.predicted) ** 2, 0);
  const r2 = ssTot ? 1 - ssRes / ssTot : 0;

  return { slope, intercept, predictions, r2 };
}

export function polynomialRegression(data, degree = 2) {
  const xs = data.map((item) => item.x);
  const ys = data.map((item) => item.y);
  const powers = Array.from({ length: degree + 1 }, (_, idx) => idx);
  const matrix = powers.map((powerI) => 
    powers.map((powerJ) => xs.reduce((sum, x, i) => sum + x ** (powerI + powerJ), 0))
  );

  const vector = powers.map((power) => ys.reduce((sum, y, i) => sum + y * xs[i] ** power, 0));

  const solveSystem = (A, b) => {
    const n = A.length;
    const aug = A.map((row, i) => [...row, b[i]]);

    for (let i = 0; i < n; i += 1) {
      let pivot = i;
      for (let j = i + 1; j < n; j += 1) {
        if (Math.abs(aug[j][i]) > Math.abs(aug[pivot][i])) pivot = j;
      }
      [aug[i], aug[pivot]] = [aug[pivot], aug[i]];

      const pivotValue = aug[i][i] || 1;
      for (let j = i; j <= n; j += 1) aug[i][j] /= pivotValue;

      for (let j = 0; j < n; j += 1) {
        if (i === j) continue;
        const factor = aug[j][i];
        for (let k = i; k <= n; k += 1) aug[j][k] -= factor * aug[i][k];
      }
    }

    return aug.map((row) => row[n]);
  };

  const coefficients = solveSystem(matrix, vector);
  const predictions = data.map((item) => {
    let value = 0;
    coefficients.forEach((coef, index) => {
      value += coef * item.x ** index;
    });
    return { ...item, predicted: value };
  });

  const yMean = ys.reduce((sum, y) => sum + y, 0) / ys.length;
  const ssTot = ys.reduce((sum, y) => sum + (y - yMean) ** 2, 0);
  const ssRes = predictions.reduce((sum, item) => sum + (item.y - item.predicted) ** 2, 0);

  return { coefficients, predictions, r2: ssTot ? 1 - ssRes / ssTot : 0 };
}

export function calculateMAE(actual, predicted) {
  return actual.reduce((sum, value, index) => sum + Math.abs(value - predicted[index]), 0) / actual.length;
}

export function calculateMSE(actual, predicted) {
  return actual.reduce((sum, value, index) => sum + (value - predicted[index]) ** 2, 0) / actual.length;
}

export function calculateRMSE(actual, predicted) {
  return Math.sqrt(calculateMSE(actual, predicted));
}

export function calculateR2(actual, predicted) {
  const mean = actual.reduce((sum, value) => sum + value, 0) / actual.length;
  const ssRes = actual.reduce((sum, value, index) => sum + (value - predicted[index]) ** 2, 0);
  const ssTot = actual.reduce((sum, value) => sum + (value - mean) ** 2, 0);
  return ssTot ? 1 - ssRes / ssTot : 0;
}
