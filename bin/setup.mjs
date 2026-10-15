#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { homedir } from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(__dirname, '..');
const skillsSource = join(packageRoot, 'skills');
const skillsTarget = join(homedir(), '.agents', 'skills');

const SKILLS = ['show-scope', 'archify', 'answer-me-with-html'];

function main() {
  console.log('show-scope installer');
  console.log(`  source: ${skillsSource}`);
  console.log(`  target: ${skillsTarget}\n`);

  if (!existsSync(skillsTarget)) {
    mkdirSync(skillsTarget, { recursive: true });
    console.log(`  created ${skillsTarget}`);
  }

  for (const skill of SKILLS) {
    const src = join(skillsSource, skill);
    const dest = join(skillsTarget, skill);

    if (!existsSync(src)) {
      console.error(`  ✗ ${skill} not found in package`);
      process.exit(1);
    }

    cpSync(src, dest, { recursive: true, force: true });
    console.log(`  ✓ ${skill} → ${dest}`);
  }

  const archifyDir = join(skillsTarget, 'archify');
  console.log('\n  installing archify dependencies...');
  try {
    execSync('npm install --omit=dev', {
      cwd: archifyDir,
      stdio: 'inherit'
    });
    console.log('  ✓ archify dependencies installed');
  } catch (err) {
    console.error('  ✗ failed to install archify dependencies');
    console.error('    run manually: cd', archifyDir, '&& npm install --production');
    process.exit(1);
  }

  console.log('\n  done. restart Qoder to load skills.');
}

main();
