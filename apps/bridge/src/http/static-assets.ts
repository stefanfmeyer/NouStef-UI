import fs from 'node:fs';
import path from 'node:path';
import type { ServerResponse } from 'node:http';

const themePlaceholder = '__HERMES_THEME_MODE__';

function writeHtml(response: ServerResponse, filePath: string, themeMode: 'dark' | 'light') {
  const html = fs.readFileSync(filePath, 'utf8').replaceAll(themePlaceholder, themeMode);
  response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  response.end(html);
}

export function serveStaticAsset(
  response: ServerResponse,
  staticDirectory: string,
  pathname: string,
  themeMode: 'dark' | 'light' = 'dark'
) {
  const relativePath = pathname === '/' ? '/index.html' : pathname;
  const filePath = path.join(staticDirectory, relativePath);
  const resolvedFilePath = path.resolve(filePath);
  const resolvedRoot = path.resolve(staticDirectory);

  if (!resolvedFilePath.startsWith(resolvedRoot)) {
    response.statusCode = 403;
    response.end('Forbidden');
    return;
  }

  if (!fs.existsSync(resolvedFilePath) || fs.statSync(resolvedFilePath).isDirectory()) {
    const fallbackPath = path.join(staticDirectory, 'index.html');
    if (fs.existsSync(fallbackPath)) {
      writeHtml(response, fallbackPath, themeMode);
      return;
    }

    response.statusCode = 404;
    response.end('Not found');
    return;
  }

  const extension = path.extname(resolvedFilePath);
  const contentType =
    extension === '.html'
      ? 'text/html; charset=utf-8'
      : extension === '.js'
        ? 'application/javascript; charset=utf-8'
        : extension === '.css'
          ? 'text/css; charset=utf-8'
            : extension === '.json'
              ? 'application/json; charset=utf-8'
              : extension === '.svg'
                ? 'image/svg+xml'
                : 'application/octet-stream';

  if (extension === '.html') {
    writeHtml(response, resolvedFilePath, themeMode);
    return;
  }

  response.writeHead(200, { 'content-type': contentType });
  fs.createReadStream(resolvedFilePath).pipe(response);
}
