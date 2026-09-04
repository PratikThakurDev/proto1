import MarketRecord from '../models/MarketRecord.js';
export const list = () => MarketRecord.find().sort({ readinessScore: -1 });
export const getByCountry = (country) => MarketRecord.findOne({ country });
