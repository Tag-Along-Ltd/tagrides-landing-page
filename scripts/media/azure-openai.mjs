#!/usr/bin/env node

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const baseURL =
  process.env.AZURE_OPENAI_BASE_URL ||
  'https://oniya-mjb19w1d-eastus2.services.ai.azure.com/openai/v1';
const apiKey = process.env.AZURE_OPENAI_API_KEY;

const models = {
  reasoning: process.env.AZURE_REASONING_MODEL || 'gpt-5.6-sol',
  codex: process.env.AZURE_CODEX_MODEL || 'gpt-5.3-codex',
  transcribe: process.env.AZURE_TRANSCRIBE_MODEL || 'gpt-4o-transcribe-diarize',
  tts: process.env.AZURE_TTS_MODEL || 'gpt-4o-mini-tts',
  image: process.env.AZURE_IMAGE_MODEL || 'gpt-image-2',
};

function usage() {
  console.log(`Usage:
  node scripts/media/azure-openai.mjs health
  node scripts/media/azure-openai.mjs transcribe <audio-file> [output-json]
  node scripts/media/azure-openai.mjs tts <text-or-file> [output-audio]
  node scripts/media/azure-openai.mjs image <prompt-or-file> [output-image]

Environment:
  AZURE_OPENAI_API_KEY       required
  AZURE_OPENAI_BASE_URL      optional, defaults to this project's Azure /openai/v1 endpoint
  AZURE_TRANSCRIBE_MODEL     optional, defaults to ${models.transcribe}
  AZURE_TTS_MODEL            optional, defaults to ${models.tts}
  AZURE_IMAGE_MODEL          optional, defaults to ${models.image}
`);
}

function requireApiKey() {
  if (!apiKey) {
    throw new Error('AZURE_OPENAI_API_KEY is not set');
  }
}

async function readTextArg(value) {
  if (!value) return '';
  try {
    return await readFile(value, 'utf8');
  } catch (error) {
    if (error?.code === 'ENOENT') return value;
    throw error;
  }
}

async function ensureParent(filePath) {
  await mkdir(path.dirname(filePath), { recursive: true });
}

async function requestJSON(endpoint, init) {
  requireApiKey();
  const response = await fetch(`${baseURL}${endpoint}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      ...(init.headers || {}),
    },
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${text}`);
  }
  return text ? JSON.parse(text) : null;
}

function azureDeploymentEndpoint(model, suffix) {
  const root = baseURL.replace(/\/openai\/v1\/?$/, '');
  return `${root}/openai/deployments/${encodeURIComponent(model)}${suffix}`;
}

async function health() {
  const body = await requestJSON('/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: models.reasoning,
      messages: [{ role: 'user', content: 'Reply exactly OK.' }],
      max_completion_tokens: 16,
    }),
  });

  console.log(
    JSON.stringify(
      {
        baseURL,
        models,
        chat: body?.choices?.[0]?.message?.content || null,
      },
      null,
      2,
    ),
  );
}

async function transcribe(inputFile, outputFile) {
  if (!inputFile) throw new Error('Missing audio file');
  requireApiKey();
  const file = await readFile(inputFile);
  const form = new FormData();
  form.append('model', models.transcribe);
  form.append('file', new Blob([file], { type: 'audio/wav' }), path.basename(inputFile));
  form.append('response_format', 'json');

  const endpoint =
    process.env.AZURE_TRANSCRIBE_URL ||
    azureDeploymentEndpoint(
      models.transcribe,
      `/audio/transcriptions?api-version=${process.env.AZURE_TRANSCRIBE_API_VERSION || '2025-04-01-preview'}`,
    );

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'api-key': apiKey },
    body: form,
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${text}`);
  }
  const body = text ? JSON.parse(text) : null;

  const target = outputFile || inputFile.replace(/\.[^.]+$/, '.transcript.json');
  await ensureParent(target);
  await writeFile(target, `${JSON.stringify(body, null, 2)}\n`);
  console.log(target);
}

async function tts(input, outputFile = 'media/generated/audio/voiceover.wav') {
  const text = (await readTextArg(input)).trim();
  if (!text) throw new Error('Missing TTS text or text file');
  requireApiKey();

  const response = await fetch(`${baseURL}/audio/speech`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: models.tts,
      voice: process.env.AZURE_TTS_VOICE || 'alloy',
      input: text,
      response_format: path.extname(outputFile).slice(1) || 'wav',
    }),
  });
  const data = Buffer.from(await response.arrayBuffer());
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${data.toString('utf8')}`);
  }
  await ensureParent(outputFile);
  await writeFile(outputFile, data);
  console.log(outputFile);
}

async function image(input, outputFile = 'media/generated/images/generated.png') {
  const prompt = (await readTextArg(input)).trim();
  if (!prompt) throw new Error('Missing image prompt or prompt file');
  const body = await requestJSON('/images/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: models.image,
      prompt,
      size: process.env.AZURE_IMAGE_SIZE || '1024x1024',
      n: 1,
    }),
  });

  const first = body?.data?.[0];
  if (first?.b64_json) {
    await ensureParent(outputFile);
    await writeFile(outputFile, Buffer.from(first.b64_json, 'base64'));
    console.log(outputFile);
    return;
  }
  console.log(JSON.stringify(body, null, 2));
}

const [command, ...args] = process.argv.slice(2);

try {
  switch (command) {
    case 'health':
      await health();
      break;
    case 'transcribe':
      await transcribe(args[0], args[1]);
      break;
    case 'tts':
      await tts(args[0], args[1]);
      break;
    case 'image':
      await image(args[0], args[1]);
      break;
    default:
      usage();
      process.exit(command ? 1 : 0);
  }
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
