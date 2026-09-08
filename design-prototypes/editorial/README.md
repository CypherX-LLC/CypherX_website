# CypherX design study 03: Readable typography, existing identity

A standalone discussion prototype for [issue #29](https://github.com/CypherX-LLC/CypherX_website/issues/29), not a Gatsby implementation or an approved brand refresh. Open `index.html` directly, or serve this directory with any static server. No installation, external fonts, trackers, or API calls are needed.

## Recommendation

Make CypherX feel like an experienced engineering partner, not a catalogue of technologies. Combine a strong editorial voice with restrained systems diagrams and specific work. Keep “Software. Quality. Security.” as a supporting brand line, not the whole value proposition.

The current homepage leads with the brand name, an abstract promise, a broad description, and “Learn more.” Its strongest material is further down: the actual projects. The redesign should bring that evidence forward.

### Three possible directions

| Direction                               | Character                                                                                  | Strength                                                                            | Trade-off                                               |
| --------------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **Engineering editorial — recommended** | CypherX gradient, violet accents, near-black type, technical diagrams, generous whitespace | Expert, distinctive, approachable; extends naturally into case studies and the blog | Needs disciplined copy and good project narratives      |
| Mission control                         | Graphite, cyan or lime, tighter grids, annotated system diagrams                           | Technical depth; good for engineering/security buyers                               | Can look like a SaaS dashboard or generic AI company    |
| Expert-led studio                       | Warm white, cobalt, founder photography, opinion-led headlines, long-form work stories     | Personal trust; strong for advisory and leadership work                             | Needs excellent real photography and attributable proof |

The Paper/Ink buttons compare palettes on **the same editorial layout**. Ink is not a fully developed alternative design. Decide the story and page structure separately from the palette.

## Positioning hypothesis — needs your agreement

**Audience:** founders and operators with a concrete technology or delivery problem.

**Promise:** “Complex tech. Clear advantage.”

**Explanation:** “We build AI systems, de-risk software, and help engineering teams deliver.”

This deliberately keeps CypherX broader than an AI agency. If AI implementation is the commercial priority, test a narrower hero instead: **“AI that works beyond the demo.”** If technical assurance is the priority: **“Make your next technical decision with confidence.”** The audience and revenue focus should decide this, not aesthetics alone.

### Organize by the reason someone buys

1. **Build:** AI, automation, digital assets.
2. **De-risk:** technical due diligence, software quality, security.
3. **Scale delivery:** engineering leadership, delivery improvement, distributed teams.

These are entry points, not a proposal to delete existing services or routes. Industry-specific capabilities can sit under the relevant entry point rather than competing for attention in the hero.

## Proposed page story

1. Clear promise, audience, contact action, selected-work action.
2. Three real projects before a long service pitch.
3. Three problem-led ways to work together.
4. A simple engagement process and honest fit criteria.
5. Editorial material that demonstrates how CypherX thinks.
6. Useful FAQs.
7. One clear conversation CTA.

Borrow hierarchy and conviction from SIROC, and the focused journey from Founder Funnel. Do not borrow their positioning, metrics, or qualification claims. Avoid fear-based AI urgency and artificial exclusivity.

## Visual system in this study

- Existing brand tokens from `src/scss/pages_style.scss`: ink `#18191f`, violet `#8c30f5`, footer dark `#0b0d17`, and footer secondary text `#d9dbe1`.
- Supporting prototype neutrals: background `#faf9fc`, secondary text `#61616e`, panel `#f0ebf7`, dividers `#ddd9e5`. These are new supporting tints, not claimed existing tokens.
- Violet buttons use white text. Headline violet is darkened to `#7922d9` on Paper and lightened to `#c599ff` on Ink for contrast.
- The existing `static/images/intro_bg.webp` supplies the hero illustration and closing CTA backgrounds. Light diagram surfaces and a dark CTA overlay keep copy readable.
- Case illustrations use cyan, violet, and pink supporting tints instead of olive/lime.
- Typography: system sans for directness; a restrained Georgia italic for contrast; monospace for annotations. No downloaded fonts in this prototype.
- Shared `rem`-based reading scale: intro **20px**, body **18px**, controls **16px**, section labels/metadata/diagram labels **15px**, supporting captions **14px** at the default browser size. No mobile font-size reductions for these roles.
- Section labels, capability labels, service tags, and diagram labels share `--text-label`; supporting captions intentionally use `--text-caption`. Paragraphs have 1.6–1.7 line height and bounded reading widths.
- Diagram labels are now HTML rather than scaled SVG text, so they retain their actual type size. Sections, cards, badges, and narrow diagrams reflow instead of squeezing text into fixed dimensions.
- Large, tight headlines; readable body copy; thin rules; almost-square buttons; limited card framing.
- Layout: asymmetric hero and evidence grid, alternating editorial rows, quiet diagrams instead of decorative stock art.
- Original `static/svg/Logo.svg` restored, including its cyan `#00ace8` X. An SVG viewport trims the asset’s empty margins without editing the original. Ink uses a white backing to preserve the actual logo colors.
- `assets/Logo.svg` and `assets/intro_bg.webp` are byte-for-byte copies of those repo assets, so the prototype still works from this directory or directly from disk. No production assets were modified.
- Minimal motion. No particles, scroll-jacking, carousels, or autoplay video.

## Beyond the homepage

The “Field notes” section is a small editorial style sample, not a complete blog prototype. After direction approval, test one blog listing and one article before building reusable Gatsby components:

- Listing: one featured story, topic filters only if useful, typographic story rows.
- Article: comfortable reading width, clear author/date, restrained diagrams, related reading, contextual contact CTA.
- Case study: problem → constraints → engineering decisions → result. Add numeric outcomes only with evidence and permission.
- Carry the same navigation, spacing, typography, and contact treatment through existing routes.

## Content honesty

- The three project descriptions come from `src/data/portfolio.yml` and link to the current project routes.
- Diagrams are conceptual, not actual product screenshots.
- No revenue figures, client metrics, fabricated testimonials, or customer logo strip.
- Current testimonial YAML has no names or roles. Prefer verifiable project evidence until attribution/permission is available.
- Process, fit criteria, and much of the marketing copy are proposals. Confirm that they reflect how CypherX actually works.
- The editorial headlines are explicitly labelled topic concepts; they link to the current blog, not invented articles.
- Contact buttons ultimately open the existing contact page. No forms submit data here.

## How to agree on the design efficiently

**Round 1 — direction:** Spend five minutes with the prototype, first on desktop and then on your phone. Answer only these:

1. Does this feel like the company you want clients to hire: engineering partner, AI specialist, or advisory studio?
2. Paper or Ink? Too restrained, too technical, or about right?
3. Is “build / de-risk / scale delivery” the right offer structure?
4. Which existing project would persuade your ideal buyer most?

**Round 2 — refinement:** Make one focused revision of the chosen direction. Confirm the hero wording, real proof, CTA, and one article template. Do not build three complete sites or debate individual button pixels before choosing positioning.

**Round 3 — implementation:** Only after approval, translate into Gatsby components, preserve current routes/SEO, confirm copy, and do full responsive/accessibility/performance/conversion QA.

This prototype intentionally does not complete the implementation acceptance criteria in issue #29.

## Prototype checks

Revision 03: verified computed intro size (20px) and consistent section/capability/diagram label size (15px) at widths 320, 390, 768, 1024, and 1440. No text-bearing elements computed below 14px. Checked diagram text bounds and page overflow at those widths plus 720; no clipping or horizontal page overflow. At a 1440px viewport with the root text size doubled, the intro grew to 40px and labels to 30px without horizontal page overflow. This is a text-scaling check, not a full browser-zoom/accessibility audit. Visually reviewed the full desktop page and mobile hero/diagram. No JavaScript errors in the checked session.

Revision 02: visually checked the full desktop layout, Paper/Ink heroes, and the narrow mobile hero/diagram. Rechecked widths 320–1440 for page overflow and diagram-label separation, theme controls, local anchors, and JavaScript errors. Asset hashes match the originals. White-on-violet buttons measure 5.45:1 contrast; both headline accent variants and Paper secondary text exceed 4.5:1. Hover styling preserves those colors.

Earlier layout checks (still relevant to unchanged content and interactions):

- Formatted both files with the installed Prettier using pinned Node `v20.18.2`.
- Visually inspected Paper at desktop, tablet, and mobile sizes, the full desktop page, and the Ink hero in Chromium.
- DOM checks at widths 320, 390, 768, 1024, and 1440 found no horizontal overflow.
- Verified palette switching and corresponding `aria-pressed` state, FAQ expansion, one H1, and all local anchor targets.
- No JavaScript page errors in the checked session.
- Opened all six unique external destinations and confirmed their page headings. No contact form was submitted.
- Existing-site observation for later QA: `/ai-agent-security/` renders the correct project heading, but its document title was “Why B2B Buyers Need Proof Before They Buy | CypherX.” This is outside the prototype scope.
- No production files changed. No Gatsby build or full accessibility/performance audit was run for this standalone HTML study.
