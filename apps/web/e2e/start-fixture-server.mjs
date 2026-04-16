import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { spawn } from 'node:child_process';

const repoRoot = process.cwd();
const runtimeRoot = path.join(repoRoot, 'tmp', 'playwright-fixture');
const databasePath = path.join(runtimeRoot, 'hermes-workspaces-e2e.sqlite');
const fixtureHome = path.join(runtimeRoot, 'fixture-home');
const fixturePort = process.env.PLAYWRIGHT_BRIDGE_PORT ?? '40178';

function seedSkillFiles() {
  const skillSeeds = [
    {
      category: 'productivity',
      name: 'google-workspace',
      content: '# Google Workspace\n\nUse `gmail, calendar, docs`.\n'
    },
    {
      category: 'productivity',
      name: 'project-notes',
      content: '# Project Notes\n\nUse `project notes, recipe context`.\n'
    }
  ];

  for (const profileId of ['default', '8tn', 'jbarton']) {
    for (const skill of skillSeeds) {
      const skillFile = path.join(fixtureHome, 'profiles', profileId, 'skills', skill.category, skill.name, 'SKILL.md');
      fs.mkdirSync(path.dirname(skillFile), { recursive: true });
      fs.writeFileSync(skillFile, skill.content, 'utf8');
    }
  }
}

fs.rmSync(runtimeRoot, { recursive: true, force: true });
fs.mkdirSync(runtimeRoot, { recursive: true });
seedSkillFiles();

const child = spawn(
  'pnpm',
  [
    '--filter',
    '@hermes-recipes/bridge',
    'start:fixture',
    '--',
    '--port',
    fixturePort,
    '--static-dir',
    '../web/dist',
    '--db-path',
    databasePath
  ],
  {
    cwd: repoRoot,
    env: {
      ...process.env,
      HERMES_FIXTURE_HOME: fixtureHome
    },
    stdio: 'inherit'
  }
);

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
