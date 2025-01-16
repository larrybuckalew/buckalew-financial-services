async function checkMarketSentiment() {
  const alerts = [];
  const sentiment = await getMarketSentiment();

  if (sentiment.fearGreedIndex < 20) {
    alerts.push({
      type: 'EXTREME_FEAR',
      severity: 'HIGH',
      title: 'Extreme Market Fear Detected',
      description: `Fear & Greed Index at ${sentiment.fearGreedIndex}`,
      action: 'CONSIDER_CONTRARIAN_OPPORTUNITIES'
    });
  } else if (sentiment.fearGreedIndex > 80) {
    alerts.push({
      type: 'EXTREME_GREED',
      severity: 'HIGH',
      title: 'Extreme Market Greed Detected',
      description: `Fear & Greed Index at ${sentiment.fearGreedIndex}`,
      action: 'REVIEW_RISK_MANAGEMENT'
    });
  }

  // Check technical indicators
  const technicalSignals = await getTechnicalSignals();
  if (technicalSignals.strongSignals.length > 0) {
    alerts.push({
      type: 'TECHNICAL_SIGNALS',
      severity: 'MEDIUM',
      title: 'Strong Technical Signals Detected',
      description: `${technicalSignals.strongSignals.join(', ')}`,
      action: 'REVIEW_TRADING_STRATEGY'
    });
  }

  return alerts;
}

async function getTechnicalSignals() {
  const marketData = await getMarketData('SPX');
  const signals = [];

  // Check Moving Average Crossovers
  const ma50 = calculateMA(marketData, 50);
  const ma200 = calculateMA(marketData, 200);
  
  if (crossover(ma50, ma200)) {
    signals.push('Golden Cross');
  } else if (crossunder(ma50, ma200)) {
    signals.push('Death Cross');
  }

  // Check RSI
  const rsi = calculateRSI(marketData, 14);
  if (rsi > 70) {
    signals.push('Overbought (RSI)');
  } else if (rsi < 30) {
    signals.push('Oversold (RSI)');
  }

  // Check MACD
  const macd = calculateMACD(marketData);
  if (macd.signal === 'buy') {
    signals.push('MACD Buy Signal');
  } else if (macd.signal === 'sell') {
    signals.push('MACD Sell Signal');
  }

  return {
    strongSignals: signals
  };
}
