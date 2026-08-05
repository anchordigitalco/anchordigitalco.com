import Image from 'next/image'
import FeatureBlock from '@/components/sections/FeatureBlock'
import ClientLogos from '@/components/home/ClientLogos'
import { SERVICES } from '@/lib/constants'

// Real photo per service — same rounded/hairline-bordered rectangle
// PlaceholderFrame used, just filled in rather than left flat.
const SERVICE_IMAGES: Record<string, string> = {
  'brand-systems': '/images/brand-digital-systems.png',
  maintenance: '/images/ongoing-maintenance.png',
}

/**
 * NOTE: reconstructed after an accidental full-site rewrite was undone —
 * a reasonable rebuild using the real SERVICES data and the existing
 * FeatureBlock primitive, not a guaranteed byte-exact restoration of the
 * original file. The "Website Design & Development" block uses the real
 * client-logo rectangle; the other two now use real per-service photos.
 */
export default function FeatureBlocks() {
  return (
    <>
      {SERVICES.map((service, i) => (
        <FeatureBlock
          key={service.id}
          heading={[service.title]}
          body={service.description}
          reverse={i % 2 === 1}
          alignBottom
          extraBottomGap={i === SERVICES.length - 1}
          link={i === SERVICES.length - 1 ? { label: 'Contact us', href: '/start' } : undefined}
          media={
            <div className={`md:max-w-[82%] ${i % 2 === 1 ? 'md:ml-auto' : ''}`}>
              {service.id === 'design-dev' ? (
                <ClientLogos />
              ) : (
                <div
                  className="relative overflow-hidden rounded-[14px] border border-hairline"
                  style={{ aspectRatio: '4 / 3' }}
                >
                  <Image
                    src={SERVICE_IMAGES[service.id]}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 48vw, 100vw"
                    quality={92}
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          }
        />
      ))}
    </>
  )
}
