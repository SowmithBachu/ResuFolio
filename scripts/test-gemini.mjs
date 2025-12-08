import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-pro';

if (!apiKey) {
  console.error('GEMINI_API_KEY is not set');
  process.exit(1);
}

async function main() {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });
    const prompt = 'Respond with plain text: OK';
    const res = await model.generateContent(prompt);
    const text = res.response.text();
    console.log(`Model: ${modelName}`);
    console.log(`Response: ${text}`);
  } catch (err) {
    console.error('Gemini test failed:');
    console.error(err);
    process.exit(1);
  }
}

main();

