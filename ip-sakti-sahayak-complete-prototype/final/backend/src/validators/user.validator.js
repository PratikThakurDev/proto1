export const validateProfile = (body) => { const errors = []; if (body.name !== undefined && !String(body.name).trim()) errors.push('name cannot be empty'); return errors; };
