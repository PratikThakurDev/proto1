import { getPipelineConfig, computePipeline } from './bhashini.client.js';
export async function speechToText({ audioContent, sourceLanguage, audioFormat = 'wav', samplingRate = 16000 }) {
  const config = await getPipelineConfig([{ taskType: 'asr', config: { language: { sourceLanguage } } }]);
  const serviceId = config?.pipelineResponseConfig?.find((x) => x.taskType === 'asr')?.config?.find((x) => x.language?.sourceLanguage === sourceLanguage)?.serviceId;
  if (!serviceId) throw Object.assign(new Error(`No Bhashini ASR service for ${sourceLanguage}`), { status: 422 });
  return computePipeline({ pipelineTasks: [{ taskType: 'asr', config: { language: { sourceLanguage }, serviceId, audioFormat, samplingRate } }], inputData: { audio: [{ audioContent }] } }, config);
}
