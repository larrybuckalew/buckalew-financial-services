export function calculateMA(data, period) {
  const prices = data.map(d => d.close);
  const mas = [];

  for (let i = period - 1; i < prices.length; i++) {
    const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
    mas.push(sum / period);
  }

  return mas;
}

export function calculateRSI(data, period) {
  const changes = [];
  for (let i = 1; i < data.length; i++) {
    changes.push(data[i].close - data[i - 1].close);
  }

  let gains = changes.map(c => c > 0 ? c : 0);
  let losses = changes.map(c => c < 0 ? -c : 0);

  let avgGain = gains.slice(0, period).reduce((a, b) => a + b) / period;
  let avgLoss = losses.slice(0, period).reduce((a, b) => a + b) / period;

  const rsis = [];
  for (let i = period; i < changes.length; i++) {
    avgGain = ((avgGain * (period - 1)) + gains[i]) / period;
    avgLoss = ((avgLoss * (period - 1)) + losses[i]) / period;

    const rs = avgGain / avgLoss;
    rsis.push(100 - (100 / (1 + rs)));
  }

  return rsis[rsis.length - 1];
}

export function calculateMACD(data) {
  const ema12 = calculateEMA(data.map(d => d.close), 12);
  const ema26 = calculateEMA(data.map(d => d.close), 26);
  const macdLine = ema12[ema12.length - 1] - ema26[ema26.length - 1];
  const signalLine = calculateEMA([macdLine], 9)[0];

  return {
    macdLine,
    signalLine,
    histogram: macdLine - signalLine,
    signal: macdLine > signalLine ? 'buy' : 'sell'
  };
}

function calculateEMA(data, period) {
  const multiplier = 2 / (period + 1);
  const emas = [data[0]];

  for (let i = 1; i < data.length; i++) {
    emas.push(
      (data[i] - emas[i - 1]) * multiplier + emas[i - 1]
    );
  }

  return emas;
}

export function detectPatterns(data) {
  const patterns = [];
  
  // Head and Shoulders
  if (isHeadAndShoulders(data)) {
    patterns.push({
      name: 'Head and Shoulders',
      type: 'bearish',
      reliability: 'high'
    });
  }

  // Double Top/Bottom
  const doublePattern = findDoublePattern(data);
  if (doublePattern) {
    patterns.push(doublePattern);
  }

  // Support/Resistance Levels
  const levels = findKeyLevels(data);
  if (levels.length > 0) {
    patterns.push({
      name: 'Key Levels',
      levels,
      type: 'informational'
    });
  }

  return patterns;
}

function isHeadAndShoulders(data) {
  // Implementation of head and shoulders pattern detection
  return false;
}

function findDoublePattern(data) {
  // Implementation of double top/bottom pattern detection
  return null;
}

function findKeyLevels(data) {
  // Implementation of support/resistance level detection
  return [];
}
