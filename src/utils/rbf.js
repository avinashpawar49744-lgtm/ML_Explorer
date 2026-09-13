export function gaussianBasis(value, center, sigma) {
  const safeSigma = Math.max(Number(sigma) || 1, 0.01);
  return Math.exp(-((value - center) ** 2) / (2 * safeSigma ** 2));
}

export function radialActivations(values, centers, sigma) {
  return values.map((value) => centers.map((center) => gaussianBasis(value, center, sigma)));
}
