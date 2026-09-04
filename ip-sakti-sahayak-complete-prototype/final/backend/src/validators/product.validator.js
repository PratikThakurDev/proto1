export const validateProduct = (body) => { const errors = []; if (!body.name) errors.push('name is required'); return errors; };
