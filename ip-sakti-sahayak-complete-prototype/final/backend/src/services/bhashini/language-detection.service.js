import { getPipelineConfig, computePipeline } from './bhashini.client.js';
export async function detectLanguage(text) {
  const config = await getPipelineConfig([{ taskType: 'tld' }]);
  const serviceId = config?.pipelineResponseConfig?.find((x) => x.taskType === 'tld')?.config?.[0]?.serviceId;
  if (!serviceId) throw Object.assign(new Error('No Bhashini language-detection service found'), { status: 422 });
  const result = await computePipeline({ pipelineTasks: [{ taskType: 'tld', config: { serviceId } }], inputData: { input: [{ source: text }] } }, config);
  const output = result?.pipelineResponse?.[0]?.output?.[0];
  return { languageCode: output?.langCode || output?.language || null, raw: result };
}
