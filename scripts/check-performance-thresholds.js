const fs = require('fs');
const path = require('path');

function checkPerformanceThresholds() {
  const report = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, '../performance-report/report.json'),
      'utf8'
    )
  );

  const thresholds = {
    responseTime: parseInt(process.env.MAX_RESPONSE_TIME) || 3000,
    cpuUsage: parseInt(process.env.MAX_CPU_USAGE) || 70,
    memoryUsage: parseInt(process.env.MAX_MEMORY_USAGE) || 1024,
    errorRate: 1 // 1%
  };

  const violations = [];

  // Check response time
  if (report.metrics.p95ResponseTime > thresholds.responseTime) {
    violations.push(
      `Response time (${report.metrics.p95ResponseTime}ms) exceeds threshold (${thresholds.responseTime}ms)`
    );
  }

  // Check CPU usage
  if (report.metrics.resourceUtilization.cpu > thresholds.cpuUsage) {
    violations.push(
      `CPU usage (${report.metrics.resourceUtilization.cpu}%) exceeds threshold (${thresholds.cpuUsage}%)`
    );
  }

  // Check memory usage
  if (report.metrics.resourceUtilization.memory > thresholds.memoryUsage) {
    violations.push(
      `Memory usage (${report.metrics.resourceUtilization.memory}MB) exceeds threshold (${thresholds.memoryUsage}MB)`
    );
  }

  // Check error rate
  if (report.metrics.errorRate > thresholds.errorRate) {
    violations.push(
      `Error rate (${report.metrics.errorRate}%) exceeds threshold (${thresholds.errorRate}%)`
    );
  }

  if (violations.length > 0) {
    console.error('Performance threshold violations:');
    violations.forEach(v => console.error(`- ${v}`));
    process.exit(1);
  } else {
    console.log('All performance metrics within acceptable thresholds');
    process.exit(0);
  }
}

checkPerformanceThresholds();