export const irisDataset = [
  { sepalLength: 5.1, sepalWidth: 3.5, petalLength: 1.4, petalWidth: 0.2, label: 'setosa' },
  { sepalLength: 4.9, sepalWidth: 3.0, petalLength: 1.4, petalWidth: 0.2, label: 'setosa' },
  { sepalLength: 6.3, sepalWidth: 3.3, petalLength: 6.0, petalWidth: 2.5, label: 'virginica' },
  { sepalLength: 5.8, sepalWidth: 2.7, petalLength: 5.1, petalWidth: 1.9, label: 'virginica' },
  { sepalLength: 5.7, sepalWidth: 2.8, petalLength: 4.1, petalWidth: 1.3, label: 'versicolor' },
  { sepalLength: 6.0, sepalWidth: 2.9, petalLength: 4.5, petalWidth: 1.5, label: 'versicolor' },
];

export const studentPerformance = [
  { hours: 1, score: 45 },
  { hours: 2, score: 52 },
  { hours: 3, score: 61 },
  { hours: 4, score: 72 },
  { hours: 5, score: 78 },
  { hours: 6, score: 84 },
  { hours: 7, score: 89 },
];

export const housePrice = [
  { area: 1200, price: 180000 },
  { area: 1500, price: 220000 },
  { area: 1700, price: 250000 },
  { area: 2000, price: 310000 },
  { area: 2200, price: 350000 },
  { area: 2500, price: 390000 },
  { area: 2800, price: 440000 },
];

export const demoAnd = [
  { x1: 0, x2: 0, label: 0 },
  { x1: 0, x2: 1, label: 0 },
  { x1: 1, x2: 0, label: 0 },
  { x1: 1, x2: 1, label: 1 },
];

export const demoOr = [
  { x1: 0, x2: 0, label: 0 },
  { x1: 0, x2: 1, label: 1 },
  { x1: 1, x2: 0, label: 1 },
  { x1: 1, x2: 1, label: 1 },
];

export const knnDemoData = [
  { x: 1.2, y: 2.1, label: 'A' },
  { x: 1.6, y: 2.7, label: 'A' },
  { x: 2.1, y: 1.4, label: 'B' },
  { x: 2.7, y: 1.8, label: 'B' },
  { x: 3.2, y: 3.1, label: 'A' },
  { x: 3.5, y: 2.5, label: 'B' },
  { x: 2.4, y: 2.6, label: 'A' },
  { x: 2.9, y: 1.2, label: 'B' },
];

export const regressionDemoData = [
  { x: 1, y: 2.2 },
  { x: 2, y: 3.0 },
  { x: 3, y: 4.1 },
  { x: 4, y: 5.3 },
  { x: 5, y: 7.4 },
  { x: 6, y: 8.5 },
  { x: 7, y: 9.7 },
];

export const candidateExampleData = [
  { Sky: 'Sunny', AirTemp: 'Warm', Humidity: 'Normal', Wind: 'Strong', Water: 'Warm', Forecast: 'Same', EnjoySport: 'Yes' },
  { Sky: 'Sunny', AirTemp: 'Warm', Humidity: 'High', Wind: 'Strong', Water: 'Warm', Forecast: 'Same', EnjoySport: 'Yes' },
  { Sky: 'Rainy', AirTemp: 'Cold', Humidity: 'High', Wind: 'Strong', Water: 'Warm', Forecast: 'Change', EnjoySport: 'No' },
  { Sky: 'Sunny', AirTemp: 'Warm', Humidity: 'High', Wind: 'Strong', Water: 'Cool', Forecast: 'Change', EnjoySport: 'Yes' },
];

export const practicals = [
  { title: 'Learning Types', description: 'Explore supervised, unsupervised, and semi-supervised paradigms.', category: 'Core Theory', difficulty: 'Beginner', path: '/learning-types' },
  { title: 'Candidate Elimination', description: 'Track specific and general hypothesis boundaries in version space.', category: 'Concept Learning', difficulty: 'Intermediate', path: '/candidate-elimination' },
  { title: 'Supervised ML', description: 'Train model pipelines and inspect real performance metrics.', category: 'Models', difficulty: 'Intermediate', path: '/supervised-ml' },
  { title: 'Regression', description: 'Fit linear and polynomial curves with clear error analysis.', category: 'Prediction', difficulty: 'Intermediate', path: '/regression' },
  { title: 'KNN Classification', description: 'Classify by proximity and visualize local neighborhood influence.', category: 'Instance Learning', difficulty: 'Intermediate', path: '/knn' },
  { title: 'VC Dimension', description: 'Measure hypothesis complexity and sample requirements.', category: 'Theory', difficulty: 'Advanced', path: '/vc-dimension' },
  { title: 'RBF Network', description: 'Model local receptive fields with Gaussian basis functions.', category: 'Neural Nets', difficulty: 'Advanced', path: '/rbf-network' },
  { title: 'Perceptron', description: 'Train a linear threshold neuron over labeled examples.', category: 'Neural Nets', difficulty: 'Intermediate', path: '/perceptron' },
];
