import { once } from 'node:events';
import type { IncomingMessage } from 'node:http';

export async function readJsonBody<T>(request: IncomingMessage) {
  const chunks: Buffer[] = [];
  request.on('data', (chunk) => {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  });
  await once(request, 'end');
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  return raw.length > 0 ? (JSON.parse(raw) as T) : ({} as T);
}
