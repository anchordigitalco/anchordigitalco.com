import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

/**
 * Shared generator behind app/opengraph-image.tsx and app/twitter-image.tsx.
 * Not itself a Next.js file-convention route (the special names are
 * opengraph-image/twitter-image), so it lives here and gets called by both.
 *
 * Plain centered wordmark on the site's light ground color: no custom font
 * loading needed since "anchor digital" is already rasterized into the
 * logo lockup art itself, and no CSS filter/invert (Satori's CSS support
 * is limited, so this keeps rendering guaranteed-correct rather than
 * relying on it working).
 */
export async function buildOgImage() {
  const logoData = await readFile(join(process.cwd(), 'public', 'anchor-logo-full.png'))
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F2F0EC',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={520} height={347} style={{ objectFit: 'contain' }} alt="" />
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
