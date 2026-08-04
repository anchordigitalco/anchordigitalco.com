# Design Reference: everyday.io

A build brief for Claude Code. This describes the structure, motion, imagery, and typographic logic of everyday.io so the same feel can be rebuilt for a different subject. Do not copy the copy. Copy the system.

**What it is:** a hardware/software home systems company (air, water, energy), designed in partnership with Bjarke Ingels Group. Next.js on Vercel, Sanity CMS, next/image.

**The one-line read:** Scandinavian industrial-design catalog rendered as a website. Almost nothing on screen at any moment. Everything that is there is enormous, precise, and photographed like a museum object. The intricacy is not in the ornament. It is in the tolerances.

---

## 1. The governing principle

The page reads as sleek but intricate because those two things live in different layers.

**Sleek lives in the layout layer.** Two type sizes. One accent glyph. No borders, no cards with shadows, no gradients, no icon soup. Sections are separated by whitespace and image edges, never by rules or dividers. Radius is near zero or fully circular, nothing in between.

**Intricate lives in the image layer.** Every photograph is a macro or near-macro study of a manufactured surface: louvered vents, extruded ribs, brushed metal grilles, a hexagonal tile panel, wood grain, concrete aggregate, a hard diagonal shadow thrown by real sunlight. The complexity in the design is delegated entirely to the photography. The chrome around it stays silent.

If you build this, resist the urge to add detail to the UI. Add detail to the assets. That inversion is the whole trick.

---

## 2. Navigation

```
┌──────────────────────────────────────────────────────────────┐
│  [wordmark^]                    Air    OS    Get early access │
└──────────────────────────────────────────────────────────────┘
```

- Fixed, transparent, no background plate, no blur, no border-bottom at rest.
- Three items max on the right. Two product names, one CTA. The CTA is not a filled button in the top bar. It is the same weight as the nav links, differentiated only by position or a hairline pill.
- **The detail worth stealing:** the logo ships as two separate SVGs, a positive and a negative. As the user scrolls past a section flagged as dark, the mark swaps files. Implement with an `IntersectionObserver` watching sections tagged `data-theme="light|dark"`, toggling a class on the header. Both SVGs sit stacked in the DOM with opacity crossfade so there is no flash. You could fake this with `mix-blend-mode: difference`, but the two-file approach is what they did and it gives you exact control over the mark on busy photography.
- On scroll down past the hero, the nav condenses to just the mark plus the single CTA. Nav links drop out. On scroll up, they return. Standard directional-scroll header, but the condensed state is genuinely reduced, not just shrunk.

---

## 3. The hero

This is the part to get right.

```
┌──────────────────────────────────────────────────────────────┐
│  [wordmark^]                    Air    OS    Get early access │
│                                                               │
│                                                               │
│   A new company for                                           │
│   the new home                                                │
│                                                               │
│                              ( Get early access )             │
│                                                               │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

**Composition**

- Full viewport height, `100svh` not `100vh`, with `viewport-fit=cover` in the meta tag so it runs edge to edge on notched devices.
- The headline is a short declarative sentence, five to seven words, broken across exactly two lines with a hard break authored into the content, not left to wrap. The break is a design decision. Line one sets up, line two lands.
- The headline is set very large: think `clamp(2.75rem, 7vw, 6.5rem)`. Leading is tight, roughly 0.95 to 1.02. Tracking is negative, roughly -0.02em to -0.03em. Sentence case, never all caps, never title case.
- The headline is left-aligned and sits low-left or center-left in the frame, not vertically centered. There is a large, deliberately uncomfortable amount of empty space above it.
- One CTA. Not two. The second and third CTAs appear further down the page, not here.
- Background is either a flat warm off-white or a single full-bleed photograph. Both states exist on the site. If photographic, the image is desaturated, real-light, no color grading toward teal-orange.

**Hero motion, load sequence**

The page-load choreography matters more than any scroll effect. Orchestrate it as one moment, not scattered fades.

1. `t=0ms` — Background plate or image is already painted. No white flash, no spinner. If the hero is photographic, the image starts at `scale(1.06)` with a light blur.
2. `t=0 to 1200ms` — The image eases to `scale(1)` and blur to 0. Slow. `cubic-bezier(0.16, 1, 0.3, 1)`.
3. `t=150ms` — Headline line one reveals. The reveal is a **mask wipe, not a fade**: each line sits in a `overflow: hidden` wrapper and translates up from `translateY(105%)` to `0`. This is the single most important motion detail. Fading text in reads as generic. Masked line reveals read as designed.
4. `t=150 + 90ms` — Headline line two, same treatment, staggered.
5. `t=500ms` — Nav items and CTA fade up 12px with a short 400ms ease.
6. Nothing else moves. No floating orbs, no parallax particles, no cursor followers.

Total sequence under 1.5 seconds. Respect `prefers-reduced-motion` by collapsing everything to a 200ms opacity fade.

**Scroll out of hero**

The hero does not simply scroll away. As the user scrolls, the hero content translates up at a slightly slower rate than the page (a 0.2 to 0.4 parallax factor) and fades, while the next section slides over it. If the hero is photographic, the image scales fractionally up, to about 1.04, as it exits.

---

## 4. The statement block

Immediately after the hero, a single paragraph set at near-headline size. Around 25 to 35 words, one or two sentences, describing what the company does in plain language. Set at maybe 60 to 70 percent of the hero headline size, same tight tracking, max width around 20 to 24 characters per line at the largest breakpoint so it reads as a block of type rather than a paragraph.

Two CTAs sit under it, side by side, both text-weight. This is where the second action finally appears.

**Motion:** word-by-word or line-by-line reveal on scroll. If word-by-word, animate opacity from 0.15 to 1 across the block as it passes through the viewport, tied to scroll position rather than a one-shot trigger. Keep the stagger small, 15 to 25ms. This is the one place a scrubbed text effect earns its keep, because the paragraph is the thesis.

---

## 5. The three-pillar marquee

Three cards: Hardware, Software, Service. In the DOM the three appear **twice**, back to back. That duplication is the signature of a seamless infinite horizontal loop.

```
┌────────────────────────────────────────────────────────────────┐
│  ┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐             │
│  │        │   │        │   │        │   │        │             │
│  │  3:4   │   │  3:4   │   │  3:4   │   │  3:4   │   →→→       │
│  │ image  │   │ image  │   │ image  │   │ image  │             │
│  │        │   │        │   │        │   │        │             │
│  └────────┘   └────────┘   └────────┘   └────────┘             │
│  Hardware     Software     Service      Hardware               │
│  two-line     two-line     two-line     two-line               │
│  descriptor   descriptor   descriptor   descriptor             │
└────────────────────────────────────────────────────────────────┘
```

- Each card is a tall portrait image, source aspect 1824×2400, so **3:4**. Roughly 320 to 420px wide at desktop. Never square, never landscape. The tall crop is a big part of the catalog feel.
- Caption structure is a one-word category label, then a two-line descriptive phrase with an authored line break. Small type, maybe 15 to 17px, no all-caps, no letterspacing blowout.
- **Motion:** continuous slow autoplay drift, roughly 25 to 45 seconds per full loop, using a transform on a track containing the duplicated set. Pointer drag scrubs it and adds velocity. Wheel or trackpad horizontal input also scrubs. On hover, the drift slows rather than stopping dead.
- **Hover on a card:** the image inside scales to about 1.04 over 600ms while the card frame stays fixed, so the crop breathes inside a static window. Nothing else changes. No lift, no shadow, no border color.
- Use Embla or Keen-Slider with a free-drag loop, or hand-roll it with a `requestAnimationFrame` transform and a modulo wrap. GSAP's `horizontalLoop` helper is the shortest path if GSAP is already in the bundle.

---

## 6. The pinned system section

This is the most technically interesting block. In the DOM, the same heading and the same paragraph appear **three times**, each paired with a different image, at 2768×2350, 2768×2350, and 5536×4700.

That is a pinned scroll sequence. The section sticks to the viewport, the text holds still, and the imagery advances through three states as the user scrolls.

```
        ┌───────────────────────────────────────────┐
        │                                           │
        │   One home.          ┌─────────────────┐  │
        │   One system.        │                 │  │
        │                      │  image 1 → 2 → 3 │  │  ← pinned,
        │   Supporting         │   crossfade or   │  │    scroll
        │   paragraph, two     │   clip reveal    │  │    scrubbed
        │   or three lines.    │                 │  │
        │                      └─────────────────┘  │
        └───────────────────────────────────────────┘
```

Implementation: a `position: sticky` wrapper with a tall spacer, or GSAP `ScrollTrigger` with `pin: true` and `scrub: 1`. Images are absolutely stacked; opacity is driven by scroll progress. Use a slight scale differential between the outgoing and incoming image, outgoing at 1.0 to 1.04, incoming at 1.06 to 1.0, so the swap has depth instead of reading as a dissolve.

The third image is over 5500px wide. It is a flat texture study of paneling and grid lines, used as a full-bleed field rather than an object shot. Keep one of these in your asset set: a section that is nothing but surface, no product, no person.

Below this sits a three-item list, Air / Water / Energy, each with a 44×44 SVG icon and one sentence. Icons are line-drawn, single weight, no fill, no color. Reveal them with a staggered mask wipe as the row enters, 80ms apart.

---

## 7. Alternating feature blocks

Two blocks, each: one large portrait image (source 2752×3112, so about **8:9**), a two-line heading with an authored break, one sentence of body, and a text link reading like a single verb. The second block ships **two images** at the same aspect, a PNG and a JPG. That pairing is either a hover swap or a scroll-scrubbed transition between a rendered state and a photographic one.

Layout alternates image-left then image-right, but the offset is not symmetrical. Text sits off the strict grid, indented into the column, so the composition never resolves into a tidy two-up. That asymmetry is what keeps it from looking like a template.

Later, a block ships a 5536×3112 wide image alongside a 1496×2392 tall one. That is **art-directed responsive imagery**, not one image cropped by CSS. Use `<picture>` with two sources. Shooting or sourcing two crops per hero-scale image is expensive and it is exactly why the site feels considered on a phone.

---

## 8. Imagery direction

Non-negotiable if you want this feel:

- **Real light.** Hard directional sun, sharp diagonal shadow edges, visible falloff. No studio softbox flatness, no ambient occlusion mush.
- **Materials over products.** The subject is frequently a fragment: the corner of a grille, a louver stack, a shelf edge. Full-object hero shots are the minority.
- **Muted, near-neutral palette.** Concrete gray, warm plaster, graphite, raw wood tan, matte white. Saturation is low across the whole set. One warm material accent, wood, carries all the warmth.
- **People appear once, from behind, anonymous.** No smiling stock faces. No eye contact.
- **Portrait dominant.** 3:4 and 8:9 crops carry the page. Landscape is reserved for full-bleed texture fields.
- **Absurd quality settings.** Their next/image calls run `q=95` at widths up to 3840. Most sites ship q=75. The extra weight is a deliberate trade for material fidelity, because the whole design depends on you being able to read the grain of a surface. Budget for it. Serve AVIF, lazy-load below the fold, and use a low-quality blur placeholder so the reveal has something to resolve from.

---

## 9. Type and color

I could not pull the font files, so treat the typeface as characterized rather than identified. What the setting looks like:

- A single neo-grotesk family doing all the work, in the Söhne / Neue Haas / ABC Diatype / Suisse Int'l territory. No serif, no display face, no second family. The personality comes from the size jump and the tracking, not from a characterful face.
- Two real sizes: enormous for headings, small for everything else. There is very little in between. That gap is deliberate and it is a lot of the sleekness.
- Headings: tight negative tracking, leading under 1.05, sentence case, authored line breaks.
- Body and captions: normal tracking, generous leading around 1.5, small size, often in a muted gray rather than full black.
- **The brand signature is a single superscript caret appended to names.** `Everyday^`, `Air^`, `Water^`, `Energy^`. One glyph, applied consistently, doing all the work a logo lockup would normally do. If you want a signature element for your own build, look for something this small and this repeatable. A single mark used with discipline beats a decorative system.

Palette read from the imagery, approximate, verify against your own assets:

| Role | Value |
|---|---|
| Page ground | `#F2F1EE` warm off-white |
| Ink | `#111111` near-black, not pure |
| Muted text | `#6E6E6B` |
| Dark section ground | `#2A2A2A` graphite |
| Material accent | `#B8946A` wood tan, used only in photography |

Note there is effectively **no UI accent color**. No blue links, no green CTA. Every color on the page comes from a photograph. If you add an accent hex, you leave this aesthetic.

---

## 10. Closing sections

- A two-line closing statement, each line as its own block, revealed in sequence with the same mask wipe. Short, declarative, almost a tagline.
- A product card: image, name with the caret, category, availability year. Four lines of information total. No price, no spec table, no feature bullets.
- Footer: social links as plain text, a newsletter field with an inline subscribe, a language toggle, legal links, copyright. All small, all one weight, no columns of link soup.

---

## 11. Build stack recommendation

- Next.js App Router, `next/image` with `quality={95}` on hero-scale assets.
- Lenis for smooth scroll. It is doing quiet work here; the whole page feels expensive partly because scroll momentum is tuned. Keep `lerp` around 0.08 to 0.1.
- GSAP with ScrollTrigger for pinning and scrubbed sequences. Framer Motion is fine for the load choreography and simple reveals but ScrollTrigger is better for the pinned image sequence.
- A shared `<Reveal>` primitive implementing the mask wipe, used everywhere, so every reveal on the site is the same gesture. Consistency of one motion beats variety of five.
- `prefers-reduced-motion` collapses all of it to opacity fades. Keyboard focus visible. Marquee pausable.

---

## 12. Cut list

Things this design does not have. Do not add them.

No gradients. No glassmorphism. No drop shadows. No rounded cards. No icon grids. No testimonial carousel. No logo wall. No stat counters. No accent color. No second typeface. No emoji. No cursor follower. No particle background. No hero video autoplaying behind text. No numbered `01 / 02 / 03` markers, because the content is not a sequence.

The restraint is the design. Every element you remove makes the photography louder.
