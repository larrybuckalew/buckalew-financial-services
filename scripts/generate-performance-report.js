const fs = require('fs');
const path = require('path');

function generatePerformanceReport() {
  // Read test results
  const results = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, '../test-results/performance.json'),
      'utf8'
    )
  );

  // Calculate metrics
  const metrics = {
    averageResponseTime: calculateAverageResponseTime(results),
    p95ResponseTime: calculatePercentileResponseTime(results, 95),
    p99ResponseTime: calculatePercentileResponseTime(results, 99),
    errorRate: calculateErrorRate(results),
    throughput: calculateThroughput(results),
    resourceUtilization: calculateResourceUtilization(results)
  };

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    metrics,
    details: results,
    recommendations: generateRecommendations(metrics)
  };

  // Save report
  const reportDir = path.join(__dirname, '../performance-report');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
  }

  fs.writeFileSync(
    path.join(reportDir, 'report.json'),
    JSON.stringify(report, null, 2)
  );

  generateHtmlReport(report);
}

function calculateAverageResponseTime(results) {
  const times = results.map(r => r.duration);
  return times.reduce((a, b) => a + b, 0) / times.length;
}

function calculatePercentileResponseTime(results, percentile) {
  const times = results.map(r => r.duration).sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * times.length) - 1;
  return times[index];
}

function calculateErrorRate(results) {
  const errors = results.filter(r => r.error);
  return (errors.length / results.length) * 100;
}

function calculateThroughput(results) {
  const duration = results[results.length - 1].timestamp - results[0].timestamp;
  return (results.length / duration) * 1000; // requests per second
}

function calculateResourceUtilization(results) {
  return {
    cpu: results.reduce((acc, r) => acc + r.cpuUsage, 0) / results.length,
    memory: results.reduce((acc, r) => acc + r.memoryUsage, 0) / results.length
  };
}

function generateRecommendations(metrics) {
  const recommendations = [];

  if (metrics.p95ResponseTime > 3000) {
    recommendations.push({
      type: 'PERFORMANCE',
      severity: 'HIGH',
      message: 'Response times are above acceptable threshold',
      action: 'Consider optimizing database queries and implementing caching'
    });
  }

  if (metrics.errorRate > 1) {
    recommendations.push({
      type: 'RELIABILITY',
      severity: 'HIGH',
      message: 'Error rate is above acceptable threshold',
      action: 'Investigate error patterns and implement better error handling'
    });
  }

  if (metrics.resourceUtilization.cpu > 70) {
    recommendations.push({
      type: 'RESOURCE',
      severity: 'MEDIUM',
      message: 'CPU utilization is high',
      action: 'Consider scaling up or optimizing compute-intensive operations'
    });
  }

  return recommendations;
}

function generateHtmlReport(report) {
  // Generate HTML report with charts and visualizations
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Performance Report - ${new Date().toLocaleDateString()}</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </head>
      <body>
        <h1>Performance Report</h1>
        <div id="metrics">
          <h2>Key Metrics</h2>
          <p>Average Response Time: ${report.metrics.averageResponseTime.toFixed(2)}ms</p>
          <p>95th Percentile: ${report.metrics.p95ResponseTime.toFixed(2)}ms</p>
          <p>Error Rate: ${report.metrics.errorRate.toFixed(2)}%</p>
          <p>Throughput: ${report.metrics.throughput.toFixed(2)} req/s</p>
        </div>
        <div id="recommendations">
          <h2>Recommendations</h2>
          ${report.recommendations.map(rec => `
            <div class="recommendation ${rec.severity.toLowerCase()}">
              <h3>${rec.type}</h3>
              <p>${rec.message}</p>
              <p><strong>Action:</strong> ${rec.action}</p>
            </div>
          `).join('')}
        </div>
        <canvas id="responseTimeChart"></canvas>
        <script>
          // Add charts and visualizations
        </script>
      </body>
    </html>
  `;

  fs.writeFileSync(
    path.join(__dirname, '../performance-report/report.html'),
    html
  );
}

generatePerformanceReport();