/**
 * sync-content.mjs
 * Copies selected vault sections into src/content/docs/ and src/data/tokens/
 * for Astro Starlight to render as documentation.
 *
 * Run: node scripts/sync-content.mjs
 * Runs automatically before dev and build via package.json scripts.
 */

import { cpSync, mkdirSync, existsSync, rmSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Directories to skip during sync (internal vault structure, no public frontmatter)
const EXCLUDED_DIRS = new Set(['_spec', '.obsidian', 'archive'])

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const root = join(__dirname, '..')
const vault = join(root, 'vault')
const docsDir = join(root, 'src', 'content', 'docs')
const dataDir = join(root, 'src', 'data', 'tokens')

// Check vault is available
if (!existsSync(vault)) {
  console.error('❌ vault/ submodule not found. Run: git submodule update --init --recursive')
  process.exit(1)
}

/**
 * Recursively copy a directory, renaming _index.md → index.md
 */
function copyDir(src, dst) {
  mkdirSync(dst, { recursive: true })
  for (const entry of readdirSync(src, { withFileTypes: true })) {
    const srcPath = join(src, entry.name)

    if (entry.isDirectory()) {
      // Skip excluded directory names
      if (EXCLUDED_DIRS.has(entry.name)) continue
      const dstPath = join(dst, entry.name)
      copyDir(srcPath, dstPath)
    } else if (entry.isFile()) {
      // Only copy markdown and JSON files
      if (!entry.name.endsWith('.md') && !entry.name.endsWith('.mdx') && !entry.name.endsWith('.json')) continue
      // _index.md → index.md (Starlight section index convention)
      const dstName = entry.name === '_index.md' ? 'index.md' : entry.name
      const dstPath = join(dst, dstName)
      cpSync(srcPath, dstPath)
    }
  }
}

// ─── Clean generated directories ──────────────────────────────────────────────
const generatedDirs = [
  join(docsDir, 'design-system'),
  join(docsDir, 'patterns'),
  join(docsDir, 'workspace'),
  join(docsDir, 'knowledge'),
  dataDir,
]
for (const dir of generatedDirs) {
  if (existsSync(dir)) rmSync(dir, { recursive: true })
}
// Remove generated status.md if it exists
const statusDst = join(docsDir, 'status.md')
if (existsSync(statusDst)) rmSync(statusDst)

// ─── Copy vault sections → src/content/docs/ ──────────────────────────────────
const sectionMappings = [
  ['01-design-system', 'design-system'],
  ['02-patterns',      'patterns'],
  ['08-workspace',     'workspace'],
  ['09-knowledge',     'knowledge'],
]

for (const [srcSection, dstSection] of sectionMappings) {
  const srcPath = join(vault, srcSection)
  const dstPath = join(docsDir, dstSection)
  if (existsSync(srcPath)) {
    copyDir(srcPath, dstPath)
    console.log(`✓ ${srcSection} → docs/${dstSection}`)
  } else {
    console.warn(`⚠ Vault section not found: ${srcSection}`)
  }
}

// ─── Copy project-status.md → docs/status.md ──────────────────────────────────
const statusSrc = join(vault, '00-meta', 'project-status.md')
if (existsSync(statusSrc)) {
  cpSync(statusSrc, statusDst)
  console.log('✓ project-status.md → docs/status.md')
}

// ─── Copy tokens → src/data/tokens/ ──────────────────────────────────────────
const tokensSrc = join(vault, '05-tokens')
if (existsSync(tokensSrc)) {
  copyDir(tokensSrc, dataDir)
  console.log('✓ 05-tokens → src/data/tokens')
}

console.log('\n✅ Content sync complete\n')
