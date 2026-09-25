import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const build = process.env.TAGRIDES_BUILD_DIR || '.next/release-check';
const expected = [
  'content/articles/shared-value/manifest.json',
  'content/articles/shared-value/01-drivers/article.md',
  'content/articles/shared-value/02-riders/article.md',
  'content/articles/shared-value/03-cities-environment-investors/article.md',
];
for (const route of ['api/posts/route.js', 'api/posts/[slug]/route.js']) {
  const trace = JSON.parse(await readFile(`${build}/server/app/${route}.nft.json`, 'utf8'));
  for (const file of expected)
    assert(
      trace.files.some((entry) => entry.endsWith(file)),
      `${route} does not trace ${file}`,
    );
  console.log(`Verified serverless content tracing: ${route}`);
}
