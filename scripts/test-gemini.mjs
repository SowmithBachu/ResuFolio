import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';

function loadEnvValue(key) {
  if (process.env[key]) return process.env[key];
  const candidates = ['.env.local', '.env'];
  for (const file of candidates) {
    const fullPath = path.join(process.cwd(), file);
    try {
      const content = fs.readFileSync ? fs.readFileSync(fullPath, 'utf8') : null;
      if (!content) continue;
      const line = content
        .split('\n')
        .map((l) => l.trim())
        .find((l) => l && !l.startsWith('#') && l.startsWith(`${key}=`));
      if (line) {
        const value = line.slice(key.length + 1).trim().replace(/^['"]|['"]$/g, '');
        if (value) {
          process.env[key] = value;
          return value;
        }
      }
    } catch (err) {
      // ignore missing file
    }
  }
  return undefined;
}

const apiKey = loadEnvValue('GEMINI_API_KEY');
const modelName = process.env.GEMINI_MODEL || loadEnvValue('GEMINI_MODEL') || 'gemini-1.5-flash-002';

if (!apiKey) {
  console.error('GEMINI_API_KEY is not set (env or .env.local/.env)');
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

