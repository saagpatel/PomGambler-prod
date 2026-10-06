import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const themeSwitcherSource = readFileSync('js/components/ThemeSwitcher.js', 'utf8');
const mainSource = readFileSync('js/main.js', 'utf8');
const manifest = JSON.parse(readFileSync('manifest.json', 'utf8'));
const workflowSource = readFileSync('.github/workflows/deploy-pages.yml', 'utf8');
const serviceWorkerSource = readFileSync('service-worker.js', 'utf8');

test('ThemeSwitcher persists and applies theme preference', () => {
  assert.match(themeSwitcherSource, /THEME_PREFERENCE/);
  assert.match(themeSwitcherSource, /localStorage\.setItem/);
  assert.match(themeSwitcherSource, /document\.documentElement\.setAttribute\('data-theme'/);
});

test('App initializes theme switcher and scope-aware service worker registration', () => {
  assert.match(mainSource, /initThemeSwitcher\(\)/);
  assert.match(mainSource, /new URL\('\.\.\/service-worker\.js', import\.meta\.url\)/);
});

test('Manifest uses relative scope for GitHub Pages project deploys', () => {
  assert.equal(manifest.start_url, './');
  assert.equal(manifest.scope, './');
});

test('Deploy workflow pins official Pages actions and runs post-deploy smoke', () => {
  assert.match(workflowSource, /actions\/configure-pages@[0-9a-f]{40} # v\d+\.\d+\.\d+/);
  assert.match(workflowSource, /actions\/upload-pages-artifact@[0-9a-f]{40} # v\d+\.\d+\.\d+/);
  assert.match(workflowSource, /actions\/deploy-pages@[0-9a-f]{40} # v\d+\.\d+\.\d+/);
  assert.match(workflowSource, /scripts\/ci\/smoke-pages\.mjs/);
});

test('Service worker caches scope-aware URLs', () => {
  assert.match(serviceWorkerSource, /const toScopedUrl =/);
  assert.match(serviceWorkerSource, /cache\.addAll\(STATIC_URLS\)/);
});
