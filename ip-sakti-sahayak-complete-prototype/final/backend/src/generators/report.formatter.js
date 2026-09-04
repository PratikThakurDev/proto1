export function formatReport({ product, analysis, type }) {
  return {
    title: `${type} Report – ${product.name}`,
    type,
    product: { id: product._id, name: product.name, category: product.category },
    summary: `Structured ${type.toLowerCase()} findings for ${product.name}.`,
    score: type === 'IP Readiness' ? analysis.ip.score : type === 'Regulatory' ? analysis.regulatory.score : type === 'TK / ABS' ? analysis.tkAbs.score : type === 'Global Markets' ? analysis.markets.India : Math.round(analysis.confidence * 100),
    findings: { classification: analysis.classification, ip: analysis.ip, regulatory: analysis.regulatory, tkAbs: analysis.tkAbs, markets: analysis.markets },
    recommendations: analysis.recommendations,
    evidence: analysis.evidence
  };
}
