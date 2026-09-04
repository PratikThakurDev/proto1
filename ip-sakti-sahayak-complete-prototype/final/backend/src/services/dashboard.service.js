import Product from '../models/Product.js';
import Report from '../models/Report.js';
import ActivityLog from '../models/ActivityLog.js';
export async function overview(owner) {
  const [products, reports, activities] = await Promise.all([
    Product.find({ owner }).sort({ updatedAt: -1 }).limit(5),
    Report.find({ owner }).sort({ createdAt: -1 }).limit(5),
    ActivityLog.find({ owner }).sort({ createdAt: -1 }).limit(8)
  ]);
  return { metrics: { products: await Product.countDocuments({ owner }), reports: await Report.countDocuments({ owner }), ipOpportunities: 24, regulatoryUpdates: 12, watchlistAlerts: 5 }, products, reports, activities };
}
