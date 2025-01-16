import React from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

export async function generatePortfolioReport(data) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  // Add header
  page.drawText('Portfolio Performance Report', {
    x: 50,
    y: page.getHeight() - 50,
    size: 20
  });

  // Add performance metrics
  let yOffset = page.getHeight() - 100;
  const metrics = [
    { label: 'Total Value', value: `$${data.totalValue.toLocaleString()}` },
    { label: 'Returns YTD', value: `${data.ytdReturns}%` },
    { label: 'Risk Level', value: data.riskLevel },
    { label: 'Sharpe Ratio', value: data.sharpeRatio.toFixed(2) }
  ];

  metrics.forEach(metric => {
    page.drawText(`${metric.label}: ${metric.value}`, {
      x: 50,
      y: yOffset,
      size: 12
    });
    yOffset -= 20;
  });

  // Add allocation table
  yOffset -= 40;
  page.drawText('Asset Allocation', {
    x: 50,
    y: yOffset,
    size: 16
  });

  yOffset -= 20;
  data.allocation.forEach(item => {
    page.drawText(`${item.asset}: ${item.percentage}%`, {
      x: 50,
      y: yOffset,
      size: 12
    });
    yOffset -= 15;
  });

  // Add recommendations
  yOffset -= 40;
  page.drawText('Recommendations', {
    x: 50,
    y: yOffset,
    size: 16
  });

  yOffset -= 20;
  data.recommendations.forEach(rec => {
    page.drawText(`• ${rec}`, {
      x: 50,
      y: yOffset,
      size: 12
    });
    yOffset -= 15;
  });

  return await pdfDoc.save();
}
