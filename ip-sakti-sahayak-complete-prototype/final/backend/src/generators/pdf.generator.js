import PDFDocument from 'pdfkit';
import fs from 'node:fs';
import path from 'node:path';

export function generatePdf(report, outputPath) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(outputPath);
    stream.on('finish', () => resolve(outputPath));
    stream.on('error', reject);
    doc.pipe(stream);
    doc.fontSize(20).text(report.title);
    doc.moveDown();
    doc.fontSize(11).text(`Product: ${report.product.name}`);
    doc.text(`Report Type: ${report.type}`);
    doc.text(`Score: ${report.score}%`);
    doc.moveDown();
    doc.fontSize(14).text('Summary');
    doc.fontSize(10).text(report.summary);
    doc.moveDown();
    doc.fontSize(14).text('Recommendations');
    report.recommendations.forEach((r) => doc.fontSize(10).text(`• ${r}`));
    doc.moveDown();
    doc.fontSize(14).text('Evidence');
    report.evidence.forEach((e) => doc.fontSize(10).text(`• ${e.title || e.name || 'Source'} — ${e.type || 'Evidence'}`));
    doc.end();
  });
}
