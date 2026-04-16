import { once } from 'node:events';
export async function readJsonBody(request) {
    const chunks = [];
    request.on('data', (chunk) => {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });
    await once(request, 'end');
    const raw = Buffer.concat(chunks).toString('utf8').trim();
    return raw.length > 0 ? JSON.parse(raw) : {};
}
