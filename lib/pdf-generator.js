import PDFDocument from 'pdfkit';

export async function generatePDF({ type, data, user }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const chunks = [];

    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // Add header
    doc.fontSize(20).text('Buckalew Financial Services', { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`${type} Report`, { align: 'center' });
    doc.moveDown();

    // Add client info
    doc.fontSize(12).text(`Client: ${user.name}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);
    doc.moveDown();

    // Add portfolio summary
    if (data.summary) {
      doc.fontSize(14).text('Portfolio Summary');
      doc.moveDown();
      Object.entries(data.summary).forEach(([key, value]) => {
        doc.text(`${key}: ${value}`);
      });
    }

    // Add performance metrics
    if (data.performance) {
      doc.moveDown();
      doc.fontSize(14).text('Performance Metrics');
      doc.moveDown();
      Object.entries(data.performance).forEach(([key, value]) => {
        doc.text(`${key}: ${value}`);
      });
    }

    // Add charts if available
    if (data.charts) {
      data.charts.forEach(chart => {
        doc.addPage();
        doc.image(chart.buffer, { fit: [500, 400], align: 'center' });
        doc.moveDown();
        doc.text(chart.title, { align: 'center' });
      });
    }

    doc.end();
  });
}
