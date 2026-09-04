import axios from 'axios';
import { env } from '../../config/env.js';

export async function getPipelineConfig(tasks) {
  if (!env.bhashiniUserId || !env.bhashiniApiKey) throw Object.assign(new Error('Bhashini credentials are not configured. Add BHASHINI_USER_ID and BHASHINI_API_KEY to .env'), { status: 503 });
  const response = await axios.post(`${env.bhashiniUlcaUrl}/ulca/apis/v0/model/getModelsPipeline`, { pipelineTasks: tasks, pipelineRequestConfig: { pipelineId: env.bhashiniPipelineId } }, { headers: { userID: env.bhashiniUserId, ulcaApiKey: env.bhashiniApiKey }, timeout: 30000 });
  return response.data;
}

export async function computePipeline(payload, config) {
  const endpoint = config?.pipelineInferenceAPIEndPoint?.callbackUrl || env.bhashiniInferenceUrl;
  const authName = config?.pipelineInferenceAPIEndPoint?.inferenceApiKey?.name || 'Authorization';
  const authValue = config?.pipelineInferenceAPIEndPoint?.inferenceApiKey?.value || env.bhashiniInferenceAuth;
  if (!endpoint || !authValue) throw Object.assign(new Error('Bhashini inference endpoint/authorization is not configured'), { status: 503 });
  const response = await axios.post(endpoint, payload, { headers: { 'Content-Type': 'application/json', [authName]: authValue }, timeout: 60000 });
  return response.data;
}
