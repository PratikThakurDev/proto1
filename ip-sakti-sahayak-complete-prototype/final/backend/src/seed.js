import { connectDB } from './config/db.js';
import User from './models/User.js';
import Product from './models/Product.js';
import Evidence from './models/Evidence.js';
import Report from './models/Report.js';
import ReportTemplate from './models/ReportTemplate.js';
import IPRecord from './models/IPRecord.js';
import RegulatoryRecord from './models/RegulatoryRecord.js';
import TKABSRecord from './models/TKABSRecord.js';
import MarketRecord from './models/MarketRecord.js';
import { hashPassword } from './utils/password.js';

await connectDB();
const password = await hashPassword('Demo@123');
let user = await User.findOne({ email: 'demo@ipsakti.local' });
if (!user) user = await User.create({ name: 'Ananya Sharma', email: 'demo@ipsakti.local', password, preferredLanguage: 'en' });
else { user.name = 'Ananya Sharma'; user.password = password; await user.save(); }

await Promise.all([
  Product.deleteMany({ owner: user._id }), Evidence.deleteMany({}), Report.deleteMany({ owner: user._id }), ReportTemplate.deleteMany({}), IPRecord.deleteMany({}), RegulatoryRecord.deleteMany({}), TKABSRecord.deleteMany({}), MarketRecord.deleteMany({})
]);

const products = await Product.insertMany([
  { owner:user._id, name:'Herbal Digestive Formula', category:'Ayurvedic Medicine', stage:'Testing', status:'Analyzed', updatedLabel:'2 hrs ago' },
  { owner:user._id, name:'Triphala Capsule', category:'Herbal Product', stage:'Prototype', status:'In Progress', updatedLabel:'1 day ago' },
  { owner:user._id, name:'Pain Relief Oil', category:'Ayurvedic Medicine', stage:'Manufacturing', status:'Analyzed', updatedLabel:'2 days ago' },
  { owner:user._id, name:'Ashwagandha Capsules', category:'Nutraceutical', stage:'Research', status:'Draft', updatedLabel:'5 days ago' }
]);

await Evidence.insertMany([
  { title:'Charaka Samhita', type:'Traditional Text', relevance:'95%', language:'Sanskrit', category:'Ayurvedic', description:'Traditional Ayurvedic source.' },
  { title:'Ayurvedic Formulary of India', type:'Government Source', relevance:'91%', language:'English', category:'Ayurvedic', description:'Government reference for Ayurvedic formulations.' },
  { title:'Traditional Knowledge Digital Library (TKDL)', type:'TKDL Reference', relevance:'88%', language:'English', category:'Ayurvedic', description:'Traditional knowledge reference.' },
  { title:'Indian Patent Advanced Search System (InPASS)', type:'Patent Database', relevance:'85%', language:'English', category:'IP', description:'Indian patent search reference.' },
  { title:'WIPO PATENTSCOPE', type:'Patent Database', relevance:'78%', language:'English', category:'IP', description:'International patent search reference.' },
  { title:'Biological Diversity Act, 2002 – Guidance', type:'Government Source', relevance:'75%', language:'English', category:'Regulatory', description:'Biodiversity and ABS guidance.' },
  { title:'US FDA Dietary Supplement Guidance', type:'Regulatory Source', relevance:'72%', language:'English', category:'Regulatory', description:'US dietary supplement regulatory reference.' }
]);
await ReportTemplate.insertMany([
  { name:'IP Readiness Report', description:'Comprehensive IP landscape & readiness', type:'IP Readiness' },
  { name:'Regulatory Checklist Summary', description:'Compliance status across markets', type:'Regulatory' },
  { name:'TK / ABS Compliance Report', description:'Traditional knowledge & ABS compliance', type:'TK / ABS' },
  { name:'Global Market Readiness Report', description:'Market entry readiness by region', type:'Global Markets' },
  { name:'Full Product Analysis Report', description:'360° product intelligence report', type:'Full Analysis' }
]);
await IPRecord.insertMany([
  { title:'Herbal Digestive Formula — Patent Landscape', type:'Patent', jurisdiction:'India', status:'Review', reference:'IN-PAT-DEMO-001', description:'Demo patent landscape record.', source:'InPASS' },
  { title:'Ashwagandha Brand Clearance', type:'Trademark', jurisdiction:'India', status:'Potential Conflict', reference:'IN-TM-DEMO-002', description:'Demo trademark clearance record.', source:'IP India' },
  { title:'Turmeric Curcumin Extract', type:'Patent', jurisdiction:'International', status:'Active Search', reference:'WIPO-DEMO-003', description:'Demo international record.', source:'WIPO PATENTSCOPE' }
]);
await RegulatoryRecord.insertMany([
  { title:'Ayurvedic Product Classification', authority:'AYUSH', category:'Classification', jurisdiction:'India', status:'Applicable', requirements:['Product category','Formulation details','Intended use'], source:'Government guidance' },
  { title:'Labelling & Claims Review', authority:'Regulatory Authority', category:'Labelling', jurisdiction:'India', status:'Review Required', requirements:['Ingredients','Directions','Claims'], source:'Government guidance' },
  { title:'Dietary Supplement Guidance', authority:'US FDA', category:'Supplements', jurisdiction:'USA', status:'Reference', requirements:['Labelling','Claims','Manufacturing controls'], source:'US FDA guidance' }
]);
await TKABSRecord.insertMany([
  { title:'Traditional Knowledge Relevance Check', resource:'Ashwagandha', knowledgeType:'Traditional use', status:'Potentially Relevant', jurisdiction:'India', requirements:['Document source','Assess TK overlap'], source:'TKDL' },
  { title:'Biological Resource Assessment', resource:'Neem', knowledgeType:'Biological resource', status:'Review Required', jurisdiction:'India', requirements:['Resource provenance','ABS assessment'], source:'Biological Diversity Act guidance' }
]);
await MarketRecord.insertMany([
  { country:'India', opportunity:'High', regulatoryDifficulty:'Low', ipImportance:'High', labelingComplexity:'Low', launchTime:'3–6 months', readinessScore:87, requirements:['Product documentation','IP protection','Regulatory pathway'] },
  { country:'USA', opportunity:'High', regulatoryDifficulty:'Medium', ipImportance:'High', labelingComplexity:'Medium', launchTime:'6–12 months', readinessScore:72, requirements:['Claims review','Labeling','Market pathway'] },
  { country:'UK', opportunity:'Medium', regulatoryDifficulty:'High', ipImportance:'High', labelingComplexity:'High', launchTime:'9–15 months', readinessScore:61, requirements:['Local requirements','Labelling','IP review'] },
  { country:'Japan', opportunity:'Medium', regulatoryDifficulty:'High', ipImportance:'Medium', labelingComplexity:'High', launchTime:'12–18 months', readinessScore:48, requirements:['Local pathway','Labeling','Partner assessment'] }
]);

const reportRows = [
  ['IP Readiness Report – Herbal Digestive Formula','IP Readiness','May 14, 2024','Completed','87%'],
  ['Regulatory Checklist Summary – Immunity Booster Tonic','Regulatory','May 12, 2024','Completed','72%'],
  ['TK / ABS Compliance Report – Neem Skin Gel','TK / ABS','May 10, 2024','Completed','65%'],
  ['Global Market Readiness Report – Ashwagandha Capsules','Global Markets','May 09, 2024','Shared','91%'],
  ['Full Product Analysis Report – Turmeric Curcumin Extract','Full Analysis','May 05, 2024','Draft','48%']
];
for (const [name,type,generatedOn,status,confidence] of reportRows) await Report.create({ owner:user._id, product:products[0]._id, name, type, generatedOn, status, confidence, score:Number(confidence.replace('%','')) });

console.log('\nSeed complete. Demo login: demo@ipsakti.local / Demo@123');
process.exit(0);
