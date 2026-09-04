import path from 'node:path';
import Report from '../models/Report.js';
import Product from '../models/Product.js';
import ProductAnalysis from '../models/ProductAnalysis.js';
import { formatReport } from './report.formatter.js';
import { generatePdf } from './pdf.generator.js';

export async function createReport({ owner, productId, analysisId, type, status = 'Completed', makePdf = false }) {
  const [product, analysis] = await Promise.all([Product.findOne({ _id: productId, owner }), ProductAnalysis.findOne({ _id: analysisId, owner })]);
  if (!product || !analysis) throw Object.assign(new Error('Product or analysis not found'), { status: 404 });
  const content = formatReport({ product, analysis, type });
  const report = await Report.create({ owner, product: product._id, analysis: analysis._id, name: content.title, type, generatedOn: new Date().toLocaleDateString('en-IN'), status, confidence: `${analysis.confidence * 100}%`, score: content.score, content });
  if (makePdf) {
    const output = path.resolve('uploads', `report-${report._id}.pdf`);
    await generatePdf(content, output);
    report.pdfPath = `/uploads/report-${report._id}.pdf`;
    await report.save();
  }
  return report;
}
