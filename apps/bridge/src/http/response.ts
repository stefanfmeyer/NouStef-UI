import type { ServerResponse } from 'node:http';
import { createCorsHeaders } from './origin-policy';

export function sendJson(response: ServerResponse, statusCode: number, payload: unknown, allowOrigin?: string) {
  response.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    ...createCorsHeaders(allowOrigin)
  });
  response.end(JSON.stringify(payload));
}

export function sendSseHeaders(response: ServerResponse, allowOrigin?: string) {
  response.writeHead(200, {
    'content-type': 'text/event-stream; charset=utf-8',
    'cache-control': 'no-cache, no-transform',
    connection: 'keep-alive',
    ...createCorsHeaders(allowOrigin)
  });
}

export function writeSseEvent(response: ServerResponse, payload: unknown) {
  response.write(`data: ${JSON.stringify(payload)}\n\n`);
}
