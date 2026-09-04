import { getPipelineConfig, computePipeline } from './bhashini.client.js';

export async function translate({ text, sourceLanguage, targetLanguage }) {
  if (sourceLanguage === targetLanguage) return { source: text, target: text, sourceLanguage, targetLanguage, provider: 'local-noop' };
  const config = await getPipelineConfig([{ taskType: 'translation', config: { language: { sourceLanguage, targetLanguage } } }]);
  const serviceId = config?.pipelineResponseConfig?.find((x) => x.taskType === 'translation')?.config?.find((x) => x.language?.sourceLanguage === sourceLanguage && x.language?.targetLanguage === targetLanguage)?.serviceId;
  if (!serviceId) throw Object.assign(new Error(`Bhashini has no configured translation service for ${sourceLanguage} → ${targetLanguage}`), { status: 422 });
  const result = await computePipeline({ pipelineTasks: [{ taskType: 'translation', config: { language: { sourceLanguage, targetLanguage }, serviceId } }], inputData: { input: [{ source: text }] } }, config);
  const output = result?.pipelineResponse?.[0]?.output?.[0];
  return { source: output?.source || text, target: output?.target || '', sourceLanguage, targetLanguage, provider: 'bhashini' };
}
