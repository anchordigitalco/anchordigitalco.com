#!/usr/bin/env node
/**
 * Processes the 4 raw hero clips into the site's final delivery set:
 * trim (forward-playing, no reverse/ping-pong) -> shared color grade + grain
 * -> dual H.264/VP9 export -> mobile variant (clip 1 only) -> poster frames
 * (jpg/webp/avif) -> a tiny base64 blur data-URI module.
 *
 * Run: node scripts/process-hero-videos.mjs
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ffmpegPath from 'ffmpeg-static'
import ffprobeStatic from 'ffprobe-static'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SRC_DIR = path.join(ROOT, 'hero slide videos')
const OUT_DIR = path.join(ROOT, 'public', 'hero-slide-videos')
const TMP_DIR = path.join(ROOT, '.tmp-hero-videos')
const ffprobePath = ffprobeStatic.path

const GRADE_CHAIN =
  "eq=contrast=1.04:saturation=0.90,colorbalance=rs=0.03:gs=0:bs=-0.03:rm=0.02:gm=0:bm=-0.02,curves=all='0/0.10 0.5/0.5 1/0.97',noise=alls=6:allf=t+u"

const SLIDES = [
  // crf pushed low — actual output sizes have been well under the <1.6MB/clip
  // budget, so there's plenty of headroom to prioritize quality.
  // 02-plaster (window-mullion shadow clip) was removed from the rotation —
  // slot skipped rather than renumbered, so re-running this script doesn't
  // regenerate it.
  { slot: '01-underwater', src: 'davinci_extreme_macro_of_the_chamfered_aluminum_edge_of_a_.mp4', mobile: false, crf: 16 },
  { slot: '03-shutter', src: 'davinci_hard_afternoon_light_through_venetian_blinds_casti.mp4', mobile: false, crf: 16 },
  { slot: '04-water-surface', src: 'davinci_top_down_view_of_still_water_surface_with_slow_ten.mp4', mobile: false, crf: 18 },
  // 5th clip — now shown first in the Hero rotation (see components/home/Hero.tsx),
  // so it carries the mobile variant that used to belong to slot 1.
  { slot: '05-storefront-glow', src: 'davinci_slow_cinematic_push_in_toward_the_front_window_of_.mp4', mobile: true, crf: 16 },
]

const ONLY = process.argv[2] // optional: run a single slot by name for fast iteration

function run(bin, args) {
  execFileSync(bin, args, { stdio: 'inherit' })
}

function probeDuration(file) {
  const out = execFileSync(ffprobePath, [
    '-v', 'error',
    '-show_entries', 'format=duration',
    '-of', 'csv=p=0',
    file,
  ]).toString().trim()
  return parseFloat(out)
}

function computeTrimStart(duration) {
  const safeStart = 0.5
  const safeEnd = duration - 0.5
  const window = safeEnd - safeStart
  if (window >= 3) {
    return safeStart + (window - 3) / 2
  }
  console.warn(`  [warn] clip is short (${duration.toFixed(2)}s) — trim window fallback to full-clip center`)
  return Math.max(0, (duration - 3) / 2)
}

function processClip({ slot, src, mobile, crf = 24 }) {
  console.log(`\n=== ${slot} (${src}) ===`)
  const srcFile = path.join(SRC_DIR, src)
  if (!existsSync(srcFile)) {
    console.error(`  [error] source file not found: ${srcFile}`)
    process.exitCode = 1
    return
  }

  const duration = probeDuration(srcFile)
  const trimStart = computeTrimStart(duration)
  console.log(`  duration=${duration.toFixed(2)}s trimStart=${trimStart.toFixed(2)}s`)

  const trimFile = path.join(TMP_DIR, `${slot}-trim.mp4`)

  // Step 1: trim to 3s, strip audio, high-quality intermediate — plays
  // forward and loops forward (via <video loop>), no reverse/ping-pong.
  run(ffmpegPath, [
    '-y', '-ss', String(trimStart), '-t', '3', '-i', srcFile,
    '-an', '-c:v', 'libx264', '-crf', '12', '-preset', 'slow',
    trimFile,
  ])

  // Step 2: final grade+grain+scale export, H.264 primary. `veryslow` is
  // affordable here — clips are only ~3s, so the extra encode time is
  // negligible and buys real quality-per-bit at this crf.
  const mp4Out = path.join(OUT_DIR, `${slot}.mp4`)
  run(ffmpegPath, [
    '-y', '-i', trimFile,
    '-vf', `scale=1920:-2,${GRADE_CHAIN}`,
    '-c:v', 'libx264', '-crf', String(crf), '-preset', 'veryslow', '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart', '-an',
    mp4Out,
  ])

  // Step 3: VP9 secondary (VP9 crf scales differently — offset +10 from the H.264 value)
  const webmOut = path.join(OUT_DIR, `${slot}.webm`)
  run(ffmpegPath, [
    '-y', '-i', trimFile,
    '-vf', `scale=1920:-2,${GRADE_CHAIN}`,
    '-c:v', 'libvpx-vp9', '-crf', String(crf + 10), '-b:v', '0', '-row-mt', '1', '-pix_fmt', 'yuv420p', '-an',
    webmOut,
  ])

  // Step 4: mobile variant (clip 1 only)
  if (mobile) {
    const mobileOut = path.join(OUT_DIR, `${slot}-mobile.mp4`)
    run(ffmpegPath, [
      '-y', '-i', trimFile,
      '-vf', `scale=960:-2,${GRADE_CHAIN}`,
      '-c:v', 'libx264', '-crf', '20', '-preset', 'veryslow', '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart', '-an',
      mobileOut,
    ])
  }

  // Step 6: poster — mid-loop frame (1.5s into the 3s forward pass), from the final graded mp4
  const posterJpg = path.join(OUT_DIR, `${slot}-poster.jpg`)
  run(ffmpegPath, ['-y', '-ss', '1.5', '-i', mp4Out, '-frames:v', '1', '-q:v', '2', posterJpg])

  const posterWebp = path.join(OUT_DIR, `${slot}-poster.webp`)
  run(ffmpegPath, ['-y', '-i', posterJpg, '-c:v', 'libwebp', '-quality', '90', posterWebp])

  // Step 7: tiny frame for the blur data-URI
  const tinyJpg = path.join(TMP_DIR, `${slot}-tiny.jpg`)
  run(ffmpegPath, ['-y', '-i', posterJpg, '-vf', 'scale=20:-1', '-q:v', '5', tinyJpg])

  console.log(`  done -> ${slot}.mp4 / .webm${mobile ? ' / -mobile.mp4' : ''} / -poster.jpg / -poster.webp`)
}

function tryAvifPosters() {
  console.log('\n=== AVIF posters (via @squoosh/cli, one-off) ===')
  try {
    run('npx', ['--yes', '@squoosh/cli@0.7.3', '--avif', '{"cqLevel":25}', '-d', OUT_DIR,
      ...SLIDES.map((s) => path.join(OUT_DIR, `${s.slot}-poster.jpg`))])
  } catch (err) {
    console.warn('  [warn] AVIF poster generation failed/unavailable — jpg/webp posters still work fine as fallback.')
    console.warn(`  ${err.message}`)
  }
}

function writePosterDataModule() {
  console.log('\n=== writing lib/hero-poster-data.ts ===')
  const entries = SLIDES.map(({ slot }) => {
    const tinyJpg = path.join(TMP_DIR, `${slot}-tiny.jpg`)
    if (!existsSync(tinyJpg)) return null
    const base64 = readFileSync(tinyJpg).toString('base64')
    const key = slot.replace(/^0\d-/, '').replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    return `  ${key}: 'data:image/jpeg;base64,${base64}',`
  }).filter(Boolean)

  const content = `// Generated by scripts/process-hero-videos.mjs — do not hand-edit.\nexport const heroPosterBlur = {\n${entries.join('\n')}\n} as const\n`
  writeFileSync(path.join(ROOT, 'lib', 'hero-poster-data.ts'), content)
  console.log('  written.')
}

function reportSizes() {
  console.log('\n=== output sizes ===')
  run('bash', ['-c', `ls -la "${OUT_DIR}"/*.mp4 "${OUT_DIR}"/*.webm 2>/dev/null | awk '{print $5, $9}'`])
}

mkdirSync(OUT_DIR, { recursive: true })
mkdirSync(TMP_DIR, { recursive: true })

const slidesToRun = ONLY ? SLIDES.filter((s) => s.slot === ONLY) : SLIDES
for (const slide of slidesToRun) {
  processClip(slide)
}

if (!ONLY) {
  tryAvifPosters()
  writePosterDataModule()
}
reportSizes()

rmSync(TMP_DIR, { recursive: true, force: true })
console.log('\nDone.')
