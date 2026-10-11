import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

function setup() {
  const listeners = new Map();
  const attributes = new Map();
  const linkListeners = new Map();
  let focused = false;
  let brandHandler;
  const toggle = {
    addEventListener: (name, handler) => listeners.set(name, handler),
    setAttribute: (name, value) => attributes.set(name, value),
    focus: () => { focused = true; },
  };
  const menu = {
    inert: true,
    classList: { toggle() {} },
    querySelectorAll: () => [{ addEventListener: (name, handler) => linkListeners.set(name, handler) }],
  };
  const document = {
    getElementById: (id) => ({ menuToggle: toggle, mobileMenu: menu })[id],
    querySelectorAll: (selector) => selector === 'a[href^="#"]'
      ? [{ getAttribute: () => '#', addEventListener: (name, handler) => { brandHandler = handler; } }]
      : [],
    querySelector: (selector) => {
      if (selector === '#') throw new Error('Bare brand anchor must not enter selector handling');
      return null;
    },
  };
  const source = readFileSync(new URL('../src/scripts/site.js', import.meta.url), 'utf8')
    .replace(/^import .*;\n/, '').replace('export function', 'function');
  vm.runInNewContext(`${source}\ninitSiteInteractions();`, {
    document, renderIconSvg: () => '', IntersectionObserver: class { observe() {} },
  });
  return { menu, attributes, click: () => listeners.get('click')(),
    activate: () => linkListeners.get('click')({ detail: 0 }),
    focused: () => focused, brandHandler: () => brandHandler };
}

test('menu stops accepting interaction immediately on close and returns keyboard focus', () => {
  const ui = setup();
  ui.click();
  assert.equal(ui.menu.inert, false);
  assert.equal(ui.attributes.get('aria-expanded'), 'true');
  ui.activate();
  assert.equal(ui.menu.inert, true);
  assert.equal(ui.attributes.get('aria-expanded'), 'false');
  assert.equal(ui.focused(), true);
});

test('brand top navigation retains native handling without an invalid selector', () => {
  const ui = setup();
  assert.equal(ui.brandHandler(), undefined);
});
