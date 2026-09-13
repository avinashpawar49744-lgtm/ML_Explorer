export function candidateElimination(dataset) {
  let specific = dataset[0] ? { ...dataset[0] } : null;
  let general = Array.from({ length: dataset[0] ? Object.keys(dataset[0]).length - 1 : 0 }, () => '?');

  const steps = [{ specific: specific ? { ...specific } : null, general: [...general], status: 'Initial' }];

  dataset.forEach((row) => {
    if (row.EnjoySport === 'Yes') {
      specific = Object.keys(row).reduce((acc, key) => {
        if (key === 'EnjoySport') return acc;
        const current = specific?.[key];
        acc[key] = current === row[key] ? current : (current === '?' ? row[key] : '?');
        return acc;
      }, { ...specific });

      const updatedGeneral = general.map((value, idx) => {
        const key = Object.keys(row)[idx];
        if (key === 'EnjoySport') return value;
        if (row[key] === specific[key]) return value;
        return value === '?' ? '?' : '?';
      });

      general = updatedGeneral;
      steps.push({ specific: { ...specific }, general: [...general], status: 'Accept' });
    }
  });

  return { specific, general, steps };
}
