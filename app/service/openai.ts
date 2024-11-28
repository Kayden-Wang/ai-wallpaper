import OpenAI from "openai";
// 替换 https 导入为 https-proxy-agent
import { HttpsProxyAgent } from "https-proxy-agent";

export function getOpenAIClient(): OpenAI {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://api.openai.com/v1",
    httpAgent: new HttpsProxyAgent("http://127.0.0.1:7890"),
  });
}
