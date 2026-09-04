import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ip_sakti_sahayak',
  jwtSecret: process.env.JWT_SECRET || 'development-only-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  bhashiniUlcaUrl: process.env.BHASHINI_ULCA_URL || 'https://meity-auth.ulcacontrib.org',
  bhashiniPipelineId: process.env.BHASHINI_PIPELINE_ID || '64392f96daac500b55c543cd',
  bhashiniUserId: process.env.BHASHINI_USER_ID || '',
  bhashiniApiKey: process.env.BHASHINI_API_KEY || '',
  bhashiniInferenceUrl: process.env.BHASHINI_INFERENCE_URL || '',
  bhashiniInferenceAuth: process.env.BHASHINI_INFERENCE_AUTH || '',
  ragUrl: process.env.RAG_URL || 'http://127.0.0.1:8000'
};
