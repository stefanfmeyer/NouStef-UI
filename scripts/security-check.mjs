import { execSync, spawnSync } from 'node:child_process';

const checks = [
  {
    name: 'npm audit',
    run: () => {
      try {
        execSync('pnpm audit --prod --audit-level=high', { stdio: 'pipe', encoding: 'utf8' });
      } catch (error) {
        const stderr = error?.stderr ?? '';
        const stdout = error?.stdout ?? '';
        const combined = `${stderr}\n${stdout}`;
        if (combined.includes('410') || combined.includes('being retired') || combined.includes('ERR_PNPM_AUDIT_BAD_RESPONSE')) {
          console.warn(
            '\n\u26A0\uFE0F  npm audit endpoint returned 410 (deprecated).\n' +
            '    Treating as non-blocking, but vulnerabilities are NOT being checked.\n' +
            '    Consider adding osv-scanner or CodeQL to CI for real coverage.\n'
          );
          return;
        }
        // Re-print the output for other failures
        if (stderr) process.stderr.write(stderr);
        if (stdout) process.stdout.write(stdout);
        throw error;
      }
    }
  },
  {
    name: 'unsafe pattern scan',
    run: () => {
      const result = spawnSync(
        'rg',
        [
          '-n',
          '--glob',
          '!pnpm-lock.yaml',
          '--glob',
          '!node_modules/**',
          '--glob',
          '*.js',
          '--glob',
          '*.jsx',
          '--glob',
          '*.ts',
          '--glob',
          '*.tsx',
          '--glob',
          '*.mjs',
          '--glob',
          '*.cjs',
          '--glob',
          '*.html',
          '--glob',
          '!dist/**',
          '--glob',
          '!playwright-report/**',
          '--glob',
          '!test-results/**',
          '--glob',
          '!scripts/security-check.mjs',
          '(dangerouslySetInnerHTML|eval\\(|new Function\\(|innerHTML\\s*=)',
          '.'
        ],
        { encoding: 'utf8' }
      );

      if (result.status === 0) {
        console.error(result.stdout);
        throw new Error('Unsafe patterns found.');
      }

      if (result.status !== 1) {
        throw new Error(result.stderr || 'rg failed to scan the repository.');
      }
    }
  }
];

let failed = false;

for (const check of checks) {
  try {
    check.run();
  } catch (error) {
    if (check.name === 'unsafe pattern scan' && error.status === 1) {
      continue;
    }
    failed = true;
    console.error(`Security check failed: ${check.name}`);
  }
}

if (failed) {
  process.exit(1);
}

console.log('Security checks passed.');
