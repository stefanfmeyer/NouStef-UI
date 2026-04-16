import type { IncomingMessage } from 'node:http';

export interface OriginPolicyDecision {
  allowed: boolean;
  allowOrigin?: string;
  message?: string;
}

function isLocalHostname(hostname: string) {
  return hostname === '127.0.0.1' || hostname === 'localhost' || hostname === '::1';
}

function normalizePortFromOrigin(origin: URL) {
  if (origin.port) {
    return origin.port;
  }

  return origin.protocol === 'https:' ? '443' : '80';
}

export function evaluateLocalOriginPolicy(
  request: IncomingMessage,
  options: {
    allowedPorts?: string[];
  } = {}
): OriginPolicyDecision {
  const originHeader = request.headers.origin;
  if (!originHeader) {
    return {
      allowed: true
    };
  }

  if (originHeader === 'null') {
    return {
      allowed: false,
      message: 'The Hermes bridge only accepts requests from trusted local browser origins.'
    };
  }

  let origin: URL;
  try {
    origin = new URL(originHeader);
  } catch {
    return {
      allowed: false,
      message: 'The Hermes bridge rejected an invalid Origin header.'
    };
  }

  if (!isLocalHostname(origin.hostname)) {
    return {
      allowed: false,
      message: `The Hermes bridge only accepts localhost or 127.0.0.1 origins. Rejected ${origin.origin}.`
    };
  }

  const requestPort =
    request.headers.host?.split(':')[1] ??
    (typeof request.socket.localPort === 'number' ? String(request.socket.localPort) : undefined);

  const allowedPorts = new Set(['5173', '4173', '8787', ...(options.allowedPorts ?? [])]);
  if (requestPort) {
    allowedPorts.add(requestPort);
  }

  if (!allowedPorts.has(normalizePortFromOrigin(origin))) {
    return {
      allowed: false,
      message: `The Hermes bridge rejected origin ${origin.origin}. Only trusted local ports are allowed.`
    };
  }

  return {
    allowed: true,
    allowOrigin: origin.origin
  };
}

export function createCorsHeaders(allowOrigin?: string) {
  return allowOrigin
    ? {
        'access-control-allow-origin': allowOrigin,
        'access-control-allow-headers': 'content-type',
        'access-control-allow-methods': 'GET,POST,PUT,OPTIONS',
        vary: 'Origin'
      }
    : {
        vary: 'Origin'
      };
}
