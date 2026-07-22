/* global process */
import { spawnSync } from 'node:child_process'
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const fixtureRoot = await mkdtemp(join(tmpdir(), 'react-schema-form-package-'))

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    env: { ...process.env, npm_config_cache: join(tmpdir(), 'react-schema-form-npm-cache') },
    timeout: 120000,
  })
  if (result.status !== 0) {
    throw new Error([
      `${command} ${args.join(' ')} failed with status ${result.status}`,
      result.stdout,
      result.stderr,
    ].filter(Boolean).join('\n'))
  }
  return result.stdout.trim()
}

try {
  const packageJson = JSON.parse(await readFile(join(projectRoot, 'package.json'), 'utf8'))
  run(
    'npm',
    ['pack', '--json', '--pack-destination', fixtureRoot],
    projectRoot,
  )
  const tarballName = (await readdir(fixtureRoot)).find((entry) => entry.endsWith('.tgz'))
  if (!tarballName) throw new Error('npm pack did not create a tarball')
  const tarball = join(fixtureRoot, tarballName)

  await writeFile(join(fixtureRoot, 'package.json'), JSON.stringify({
    name: 'react-schema-form-package-fixture',
    private: true,
    type: 'module',
    version: '0.0.0',
  }, null, 2))
  run('npm', [
    'install',
    '--ignore-scripts',
    '--no-audit',
    '--no-fund',
    '--package-lock=false',
    tarball,
    ...Object.entries(packageJson.peerDependencies).map(([name, range]) => `${name}@${range}`),
  ], fixtureRoot)

  await writeFile(join(fixtureRoot, 'verify-esm.mjs'), `
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { SchemaForm, StructuredDataField } from 'react-schema-form'

assert.equal(typeof SchemaForm, 'function')
assert.equal(typeof StructuredDataField, 'function')

const schema = {
  type: 'object',
  properties: {
    settings: {
      title: 'Settings',
      type: 'object',
      properties: { name: { title: 'Name', type: 'string' } },
    },
  },
}
const form = [{ key: 'settings', type: 'structured' }]
const html = renderToStaticMarkup(React.createElement(SchemaForm, {
  form,
  model: { settings: { name: 'package fixture' } },
  onModelChange() {},
  schema,
}))
for (const tab of ['Form', 'JSON', 'YAML']) assert.match(html, new RegExp('>' + tab + '<'))
`)
  await writeFile(join(fixtureRoot, 'verify-commonjs.cjs'), `
const assert = require('node:assert/strict')
const packageExports = require('react-schema-form')
assert.equal(typeof packageExports.SchemaForm, 'function')
assert.equal(typeof packageExports.StructuredDataField, 'function')
assert.equal(typeof packageExports.parseStructuredText, 'function')
`)

  run('node', ['verify-esm.mjs'], fixtureRoot)
  run('node', ['verify-commonjs.cjs'], fixtureRoot)
  process.stdout.write(
    `Verified react-schema-form ${packageJson.version}: tarball install, ESM render, CommonJS require, and Form/JSON/YAML tabs.\n`,
  )
} finally {
  if (process.env.KEEP_PACKAGE_FIXTURE) {
    process.stdout.write(`Kept package fixture at ${fixtureRoot}\n`)
  } else {
    await rm(fixtureRoot, { force: true, recursive: true })
  }
}
