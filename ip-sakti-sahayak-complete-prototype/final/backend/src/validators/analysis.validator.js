export const validateAnalysis = (body) => { const errors = []; if (!body.productId && !body.name) errors.push('productId or name is required'); return errors; };
