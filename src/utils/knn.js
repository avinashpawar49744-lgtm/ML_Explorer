export function euclideanDistance(a, b) {
  return Math.sqrt(a.reduce((sum, value, index) => sum + (value - b[index]) ** 2, 0));
}

export function manhattanDistance(a, b) {
  return a.reduce((sum, value, index) => sum + Math.abs(value - b[index]), 0);
}

export function predictKNN(dataset, point, k = 3, metric = 'euclidean') {
  const distances = dataset.map((item) => {
    const features = [item.x, item.y];
    const distance = metric === 'manhattan' ? manhattanDistance(features, point) : euclideanDistance(features, point);
    return { ...item, distance };
  });

  const nearest = [...distances].sort((a, b) => a.distance - b.distance).slice(0, k);
  const counts = nearest.reduce((acc, item) => {
    acc[item.label] = (acc[item.label] || 0) + 1;
    return acc;
  }, {});

  return {
    nearest,
    predictedClass: Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown',
  };
}

export function calculateClassificationMetrics(labels, predictions) {
  const total = labels.length;
  let tp = 0;
  let fp = 0;
  let fn = 0;

  labels.forEach((label, index) => {
    const prediction = predictions[index];
    if (label === prediction && label === 'A') tp += 1;
    if (label !== prediction && prediction === 'A') fp += 1;
    if (label !== prediction && label === 'A') fn += 1;
  });

  const accuracy = total ? labels.filter((value, index) => value === predictions[index]).length / total : 0;
  const precision = tp + fp ? tp / (tp + fp) : 0;
  const recall = tp + fn ? tp / (tp + fn) : 0;
  const f1 = precision + recall ? (2 * precision * recall) / (precision + recall) : 0;

  return { accuracy, precision, recall, f1 };
}
