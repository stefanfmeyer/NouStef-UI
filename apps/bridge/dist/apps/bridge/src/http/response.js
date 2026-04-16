import { createCorsHeaders } from './origin-policy';
export function sendJson(response, statusCode, payload, allowOrigin) {
    response.writeHead(statusCode, {
        'content-type': 'application/json; charset=utf-8',
        ...createCorsHeaders(allowOrigin)
    });
    response.end(JSON.stringify(payload));
}
export function sendSseHeaders(response, allowOrigin) {
    response.writeHead(200, {
        'content-type': 'text/event-stream; charset=utf-8',
        'cache-control': 'no-cache, no-transform',
        connection: 'keep-alive',
        ...createCorsHeaders(allowOrigin)
    });
}
export function writeSseEvent(response, payload) {
    response.write(`data: ${JSON.stringify(payload)}\n\n`);
}
