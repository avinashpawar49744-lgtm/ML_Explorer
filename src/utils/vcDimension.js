export function getVCDimension(hypothesisClass) {
  const map = { line: 3, interval: 2, circle: 3 };
  return map[hypothesisClass] ?? 0;
}

export function calculateSampleComplexity(vcDimension, epsilon, confidence) {
  if (!vcDimension || epsilon <= 0 || epsilon >= 1 || confidence <= 0 || confidence >= 1) {
    return 0;
  }
  const delta = 1 - confidence;
  return Math.ceil((4 / epsilon) * (vcDimension * Math.log2(2 / epsilon) + Math.log(1 / delta)));
}
