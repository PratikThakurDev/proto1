export const validateReport = (body) => { const errors = []; if (!body.productId) errors.push('productId is required'); if (!body.type) errors.push('type is required'); return errors; };
