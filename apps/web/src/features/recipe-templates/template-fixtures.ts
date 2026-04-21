import type { RecipeTemplateId, RecipeTemplatePreviewSpec, TemplateAction, TemplateChip } from './types';

const chip = (label: string, tone: TemplateChip['tone'] = 'neutral'): TemplateChip => ({ label, tone });
const action = (label: string, tone: TemplateAction['tone'] = 'neutral', helper?: string): TemplateAction => ({ label, tone, helper });

export const RECIPE_TEMPLATE_FIXTURES: Record<RecipeTemplateId, RecipeTemplatePreviewSpec> = {
  'price-comparison-grid': {
    headline: 'Compare each item across up to four stores — every row carries a direct link.',
    summary: 'A focused price-first grid: one row per item, up to four store columns, and a hyperlinked Link column.',
    sections: [
      {
        kind: 'hero',
        eyebrow: 'Commerce template',
        title: '27" 4K monitor and laptop stand price check',
        summary: 'Two items compared across four stores. Every row links straight to the listing.',
        chips: [chip('Multiple items allowed', 'accent'), chip('Max 4 store columns'), chip('Link per row')],
        actions: []
      },
      {
        kind: 'comparison-table',
        title: 'Price grid',
        columns: [
          { id: 'amazon', label: 'Amazon', align: 'end' },
          { id: 'bestbuy', label: 'Best Buy', align: 'end' },
          { id: 'bh', label: 'B&H', align: 'end' },
          { id: 'newegg', label: 'Newegg', align: 'end' },
          { id: 'link', label: 'Link' }
        ],
        rows: [
          {
            id: 'dell-s2722qc',
            label: 'Dell S2722QC',
            cells: [
              { value: '$349' },
              { value: '$359' },
              { value: '$329', tone: 'success', emphasis: true },
              { value: '$341' },
              { value: 'Link', tone: 'accent' }
            ]
          },
          {
            id: 'lg-27up650',
            label: 'LG 27UP650',
            cells: [
              { value: '$319', tone: 'success', emphasis: true },
              { value: '$338' },
              { value: '$334' },
              { value: '$329' },
              { value: 'Link', tone: 'accent' }
            ]
          },
          {
            id: 'rain-laptop-stand',
            label: 'Rain Design mStand',
            cells: [
              { value: '$54' },
              { value: '$59' },
              { value: '$49', tone: 'success', emphasis: true },
              { value: '$56' },
              { value: 'Link', tone: 'accent' }
            ]
          }
        ]
      }
    ]
  },
  'shopping-shortlist': {
    headline: 'A tiled results grid of varied items with a photo, name, price, and direct link on every tile.',
    summary: 'Small tiled cards built for browsing a wide variety of items rather than comparing the same item.',
    sections: [
      {
        kind: 'hero',
        eyebrow: 'Commerce template',
        title: 'Gift ideas for a coffee lover',
        summary: 'A mixed set of items with just photo, name, and price on each tile.',
        chips: [chip('Small tiles', 'accent'), chip('Variety of items'), chip('Link per tile')],
        actions: []
      },
      {
        kind: 'card-grid',
        title: 'Results',
        columns: 3,
        cards: [
          {
            title: 'Fellow Stagg EKG Kettle',
            imageLabel: 'Matte black kettle',
            price: '$165',
            footer: 'Link',
          },
          {
            title: 'Baratza Encore Grinder',
            imageLabel: 'Burr grinder',
            price: '$179',
            footer: 'Link',
          },
          {
            title: 'Hario V60 Pour-Over Kit',
            imageLabel: 'Ceramic dripper',
            price: '$42',
            footer: 'Link',
          },
          {
            title: 'Chemex 6-Cup Classic',
            imageLabel: 'Glass carafe',
            price: '$48',
            footer: 'Link',
          },
          {
            title: 'Acaia Pearl Scale',
            imageLabel: 'Black scale',
            price: '$175',
            footer: 'Link',
          },
          {
            title: 'Origin Espresso Sampler',
            imageLabel: 'Bean sampler',
            price: '$38',
            footer: 'Link',
          }
        ]
      }
    ]
  },
  'inbox-triage-board': {
    headline: 'Expandable inbox rows: category name, vendor subtitle, count — click to reveal subjects, recommendation, and actions.',
    summary: 'Each row expands to show sample subjects, a toned recommendation panel, and Archive / Archive & Unsubscribe / Send to Folder buttons.',
    sections: [
      {
        kind: 'hero',
        eyebrow: 'Inbox template',
        title: 'Inbox triage',
        summary: 'Minimal rows with thin dividers. Click any row to expand.',
        chips: [chip('Expandable rows', 'accent'), chip('Sample subjects'), chip('Hermes-backed actions')],
        actions: []
      },
      {
        kind: 'accordion-list',
        items: [
          {
            id: 'promotions',
            title: 'Promotions',
            subtitle: 'Groupon, Woot, REI, Meh',
            count: '38 emails',
            tone: 'warning' as const,
            subjects: [
              '\u{1F525} REI Flash Sale \u2014 40% off hiking gear',
              '\u{1F4E6} Your Woot! deal of the day',
              '\u{1F6CD}\uFE0F Groupon: deals near you this weekend',
              'Meh \u2014 One sale. Today. $29.',
              '\u{1F4B8} REI Member Dividend reminder'
            ],
            recommendation: 'Safe to archive \u2014 no reply history and no purchases traced from these in 60 days.',
            recommendationTone: 'success' as const,
            actions: [action('Archive', 'accent'), action('Archive & Unsubscribe'), action('Send to Folder')]
          },
          {
            id: 'newsletters',
            title: 'Newsletters',
            subtitle: 'Stratechery, Platformer, The Browser, Morning Brew',
            count: '27 emails',
            subjects: [
              'Platformer \u2014 the OpenAI shakeup explained',
              'Stratechery \u2014 the aggregator bear case',
              'The Browser \u2014 5 great reads on attention',
              'Morning Brew \u2014 quick markets recap',
              'Platformer \u2014 how Meta is retooling ads'
            ],
            recommendation: 'Archive & Unsubscribe from low-engagement ones \u2014 you opened fewer than 10% of these in the last 30 days.',
            recommendationTone: 'warning' as const,
            actions: [action('Archive'), action('Archive & Unsubscribe', 'accent'), action('Send to Folder')]
          },
          {
            id: 'updates',
            title: 'Updates',
            subtitle: 'GitHub, Linear, Vercel',
            count: '19 emails',
            subjects: [
              '[GitHub] PR #1048 approved by jsmith',
              'Linear: 3 issues assigned to you',
              'Vercel deployment succeeded',
              '[GitHub] Dependabot alert: 1 new vulnerability',
              'Linear: Sprint review tomorrow at 10\u202fam'
            ],
            recommendation: 'Consider a digest rule \u2014 most of these are low-urgency and can batch to once-a-day.',
            recommendationTone: 'neutral' as const,
            actions: [action('Archive'), action('Archive & Unsubscribe'), action('Send to Folder', 'accent')]
          },
          {
            id: 'receipts',
            title: 'Receipts',
            subtitle: 'Stripe, Apple, Uber, Amazon',
            count: '12 emails',
            recommendation: 'Send to a Receipts folder to keep your inbox clean without losing the records.',
            recommendationTone: 'neutral' as const,
            actions: [action('Archive'), action('Archive & Unsubscribe'), action('Send to Folder', 'accent')]
          }
        ]
      }
    ]
  },
  'restaurant-finder': {
    headline: 'A local-search results surface that feels ready for a dining decision in a small pane.',
    summary: 'List/detail structure keeps cuisine, price, rating, and links visible without pretending to be a map UI.',
    sections: [
      {
        kind: 'hero',
        eyebrow: 'Travel template',
        title: 'Dinner options near Williamsburg',
        summary: 'Top nearby restaurants filtered for walkable dinner spots with good ratings and reliable reservation paths.',
        chips: [chip('Local search', 'accent'), chip('Book prompt'), chip('Cuisine filters')],
        actions: [action('Ask Hermes to book', 'accent'), action('Save selected'), action('Compare with quieter options')]
      },
      {
        kind: 'filter-strip',
        filters: [chip('Within 20 min walk'), chip('Italian or wine bar'), chip('$$$ max'), chip('Open after 7pm')],
        sortLabel: 'Sorted by rating and fit'
      },
      {
        kind: 'split',
        ratio: 'list-detail',
        left: [
          {
            kind: 'grouped-list',
            title: 'Results',
            groups: [
              {
                id: 'best-fits',
                label: 'Best fits',
                tone: 'success',
                items: [
                  {
                    title: 'Lilia',
                    subtitle: 'Italian · 4.7 ★ · $$$',
                    meta: 'Walk 14 min · reservations available',
                    chips: [chip('Top match', 'success'), chip('Popular')]
                  },
                  {
                    title: 'Four Horsemen',
                    subtitle: 'Wine bar · 4.6 ★ · $$$',
                    meta: 'Walk 11 min · small menu',
                    chips: [chip('Date-night pick', 'accent')]
                  }
                ]
              },
              {
                id: 'worth-checking',
                label: 'Worth checking',
                items: [
                  {
                    title: 'Misi',
                    subtitle: 'Italian · 4.5 ★ · $$$',
                    meta: 'Walk 19 min · later tables only',
                    chips: [chip('Later seating', 'warning')]
                  }
                ]
              }
            ]
          }
        ],
        right: [
          {
            kind: 'detail-panel',
            title: 'Selected venue',
            eyebrow: 'Lilia',
            fields: [
              { label: '\u{1F552} Hours', value: '5:00 PM \u2013 10:30 PM' },
              { label: '\u{1F310} Website', links: [{ label: 'Link', href: 'https://lilianewyork.com' }] },
              { label: '\u{1F4DE} Phone', value: '(718) 576-3095' },
              { label: '\u{1F374} Cuisine', value: 'Italian' }
            ],
            actions: []
          }
        ]
      }
    ]
  },
  'hotel-shortlist': {
    headline: 'Hotel cards with price, amenities, website, and phone — no tabs or chrome.',
    summary: 'Just cards. No header bar, no recipe tabs, no Hotels/Notes tabs, and no "Hotel shortlist" header.',
    sections: [
      {
        kind: 'card-grid',
        title: '',
        columns: 1,
        cards: [
          {
            title: 'Memmo Pr\u00edncipe Real',
            subtitle: 'Boutique \u00b7 Pr\u00edncipe Real',
            price: '$248/night',
            imageLabel: 'Warm terrace view',
            chips: [chip('Best fit', 'success'), chip('Rooftop')],
            bullets: ['Quiet block', 'Strong breakfast', 'Walkable to central sights', '\u{1F310} Link', '\u{1F4DE} +351 21 901 6800']
          },
          {
            title: 'The Lumiares',
            subtitle: 'Apartment hotel \u00b7 Bairro Alto',
            price: '$226/night',
            imageLabel: 'Suite interior',
            chips: [chip('Work-friendly', 'accent'), chip('Kitchenette')],
            bullets: ['Good for longer stay', 'Liveliest nightlife nearby', '\u{1F310} Link', '\u{1F4DE} +351 21 116 0200']
          },
          {
            title: 'Lisboa Pessoa',
            subtitle: 'Hotel \u00b7 Chiado',
            price: '$189/night',
            imageLabel: 'Classic room',
            chips: [chip('Best value', 'accent')],
            bullets: ['Central location', 'Slightly smaller rooms', '\u{1F310} Link', '\u{1F4DE} +351 21 140 1600']
          }
        ]
      }
    ]
  },
  'flight-comparison': {
    headline: 'A split-leg airfare workspace that keeps outbound and return decisions stable across refreshes.',
    summary: 'Tabs prevent outbound and return options from blurring together while preserving notes and saved choices.',
    sections: [
      {
        kind: 'hero',
        eyebrow: 'Travel template',
        title: 'NYC to Lisbon flight compare',
        summary: 'Round-trip search with stable outbound and return tabs, focused on one-stop options and overnight comfort.',
        chips: [chip('Leg-aware tabs', 'accent'), chip('Stops and duration'), chip('Save itinerary')],
        actions: [action('Save best itinerary', 'accent'), action('Filter one-stop'), action('Ask Hermes to optimize total travel time')]
      },
      {
        kind: 'stats',
        items: [
          { label: 'Best round-trip price', value: '$711', helper: 'TAP + Delta mix', tone: 'success' },
          { label: 'Shortest total duration', value: '12h 45m', helper: 'Outbound only' },
          { label: 'Nonstop options', value: '2', helper: 'Higher fare band' }
        ]
      },
      {
        kind: 'tabs',
        tabs: [
          { id: 'outbound', label: 'Outbound' },
          { id: 'return', label: 'Return' }
        ],
        activeTabId: 'outbound',
        panes: {
          outbound: [
            {
              kind: 'comparison-table',
              title: 'Outbound options',
              columns: [
                { id: 'price', label: 'Price', align: 'end' },
                { id: 'stops', label: 'Stops' },
                { id: 'duration', label: 'Duration' },
                { id: 'airline', label: 'Airline' },
                { id: 'action', label: '' }
              ],
              rows: [
                {
                  id: 'tap-direct',
                  label: '7:45 PM → 7:20 AM',
                  cells: [
                    { value: '$398', emphasis: true },
                    { value: 'Nonstop', tone: 'success' },
                    { value: '6h 35m' },
                    { value: 'TAP Air Portugal' },
                    { value: 'Continue booking', tone: 'accent' }
                  ]
                },
                {
                  id: 'delta-one-stop',
                  label: '5:10 PM → 8:55 AM',
                  cells: [{ value: '$355' }, { value: '1 stop' }, { value: '11h 45m' }, { value: 'Delta + KLM' }, { value: 'Continue booking', tone: 'accent' }]
                }
              ]
            }
          ],
          return: [
            {
              kind: 'comparison-table',
              title: 'Return options',
              columns: [
                { id: 'price', label: 'Price', align: 'end' },
                { id: 'stops', label: 'Stops' },
                { id: 'duration', label: 'Duration' },
                { id: 'airline', label: 'Airline' },
                { id: 'action', label: '' }
              ],
              rows: [
                {
                  id: 'tap-return',
                  label: '11:05 AM → 1:50 PM',
                  cells: [
                    { value: '$313', emphasis: true },
                    { value: 'Nonstop', tone: 'success' },
                    { value: '7h 45m' },
                    { value: 'TAP Air Portugal' },
                    { value: 'Continue booking', tone: 'accent' }
                  ]
                }
              ]
            }
          ]
        }
      }
    ]
  },
  'travel-itinerary-planner': {
    headline: 'A persistent trip-planning template with stable tabs for chronology, logistics, and notes.',
    summary: 'Later updates can patch itinerary events and bookings without rewriting the whole trip workspace.',
    sections: [
      {
        kind: 'hero',
        eyebrow: 'Travel template',
        title: 'Paris long-weekend itinerary',
        summary: 'A four-tab planner that separates chronology, confirmations, packing, and saved links.',
        chips: [chip('Trip timeline', 'accent'), chip('Bookings tab'), chip('Packing tab')],
        actions: [action('Refine day plan', 'accent'), action('Add booking note'), action('Share trip summary')]
      },
      {
        kind: 'tabs',
        tabs: [
          { id: 'itinerary', label: 'Itinerary' },
          { id: 'bookings', label: 'Bookings' },
          { id: 'packing', label: 'Packing' }
        ],
        activeTabId: 'itinerary',
        panes: {
          itinerary: [
            {
              kind: 'timeline',
              title: 'Day-by-day timeline',
              items: [
                { title: 'Arrive and check in', time: 'Thu 3:10 PM', summary: 'Hotel in Le Marais', chips: [chip('Booking')] },
                { title: 'Dinner near hotel', time: 'Thu 8:00 PM', summary: 'Shortlist from saved local discovery' },
                { title: 'Mus\u00e9e d\u2019Orsay visit', time: 'Fri 10:00 AM', summary: 'Timed entry recommended', chips: [chip('Book soon', 'warning')] }
              ]
            }
          ],
          bookings: [
            {
              kind: 'grouped-list',
              title: 'Bookings',
              groups: [
                {
                  id: 'confirmations',
                  label: 'Confirmations',
                  items: [
                    { title: 'Hotel in Le Marais', subtitle: 'Direct booking', meta: 'Confirmation #M4221' },
                    { title: 'Mus\u00e9e d\u2019Orsay timed entry', subtitle: 'Official site', meta: 'Fri 10:00 AM' }
                  ]
                }
              ]
            }
          ],
          packing: [
            {
              kind: 'grouped-list',
              title: 'Packing',
              groups: [
                {
                  id: 'carry-on',
                  label: 'Carry-on',
                  items: [
                    { title: 'Umbrella', meta: 'Rain forecast Friday' },
                    { title: 'Museum shoes', meta: 'High walking day' }
                  ]
                }
              ]
            }
          ]
        }
      }
    ]
  },
  'research-notebook': {
    headline: 'A structured notebook for evidence, notes, and extracted points that stays stable over many turns.',
    summary: 'Source gathering and follow-up actions stay separate so the notebook can accumulate rather than reset.',
    sections: [
      {
        kind: 'hero',
        eyebrow: 'Research template',
        title: 'AI browser agents research notebook',
        summary: 'Sources, notes, claims, and follow-up prompts split into distinct tabs with clear operator ownership.',
        chips: [chip('Sources tab', 'accent'), chip('Extracted points'), chip('Follow-up actions')],
        actions: [action('Ask follow-up', 'accent'), action('Pin claim'), action('Add research note')]
      },
      {
        kind: 'tabs',
        tabs: [
          { id: 'sources', label: 'Sources' },
          { id: 'points', label: 'Extracted points' }
        ],
        activeTabId: 'sources',
        panes: {
          sources: [
            {
              kind: 'grouped-list',
              title: 'Sources',
              groups: [
                {
                  id: 'papers',
                  label: 'Primary sources',
                  items: [
                    { title: 'WebArena paper', subtitle: 'Benchmark design and tasks', meta: 'Key evaluation reference' },
                    { title: 'AgentLab report', subtitle: 'Failure modes and orchestration', meta: 'Useful for system design' }
                  ]
                }
              ]
            }
          ],
          points: [
            {
              kind: 'grouped-list',
              title: 'Extracted points',
              groups: [
                {
                  id: 'claims',
                  label: 'Claims',
                  items: [
                    { title: 'Agents fail more from brittle recovery than initial navigation', chips: [chip('High signal', 'success')] },
                    { title: 'Small prompt changes can distort long-horizon planning behavior' }
                  ]
                }
              ]
            }
          ]
        }
      }
    ]
  },
  'security-review-board': {
    headline: 'Full-width expandable findings grouped by severity: Affected Surface, Evidence, Remediate now / Ignore.',
    summary: 'Click any finding to expand. No right pane. Ignore removes it from the list; Remediate now prompts Hermes.',
    sections: [
      {
        kind: 'hero',
        eyebrow: 'Security template',
        title: 'Public webhook surface review',
        summary: 'Severity-grouped findings as expandable rows. One click reveals the full context and actions.',
        chips: [chip('Severity groups', 'accent'), chip('Expandable rows'), chip('Remediate now / Ignore')],
        actions: []
      },
      {
        kind: 'stats',
        items: [
          { label: 'Critical', value: '1', tone: 'danger' },
          { label: 'Medium', value: '2', tone: 'warning' },
          { label: 'Low', value: '1', tone: 'neutral' }
        ]
      },
      {
        kind: 'accordion-list',
        title: 'Findings by Severity',
        items: [
          {
            id: 'webhook-bypass',
            title: 'Webhook signature bypass on preview endpoint',
            subtitle: 'Fallback preview path accepts unauthenticated traffic when feature flag is misconfigured.',
            count: 'Critical',
            tone: 'danger' as const,
            detailHeader: 'Affected surface',
            detailText: 'Preview webhook fallback route \u2014 /api/webhooks/preview falls through to an unauthenticated handler when the preview feature flag is enabled without a valid HMAC configuration.',
            evidenceBullets: [
              'Replay fixture reached the fallback route without a valid signature.',
              'Header verification is skipped when the preview flag is misconfigured.',
              'No audit log entry is emitted for the bypass path.'
            ],
            actions: [action('Remediate now', 'accent'), action('Ignore', 'danger')]
          },
          {
            id: 'stack-traces',
            title: 'Verbose stack traces in bridge error body',
            subtitle: 'Leaks internal paths and token fragments on unhandled exceptions.',
            count: 'Medium',
            tone: 'warning' as const,
            detailHeader: 'Affected surface',
            detailText: 'Bridge HTTP error handler \u2014 all 5xx responses from the bridge include a raw stack trace in the JSON body visible to authenticated callers.',
            evidenceBullets: [
              'Stack trace captured from a live 503 response in staging.',
              'Trace includes absolute file paths and partial module names.'
            ],
            actions: [action('Remediate now', 'accent'), action('Ignore', 'danger')]
          },
          {
            id: 'oauth-tokens',
            title: 'Long-lived oauth state tokens',
            subtitle: 'OAuth state tokens do not expire and accumulate in the session store.',
            count: 'Medium',
            tone: 'warning' as const,
            detailHeader: 'Affected surface',
            detailText: 'OAuth initiation flow \u2014 state tokens written to the session store on /auth/start have no TTL and persist indefinitely.',
            evidenceBullets: [
              'State tokens from 30-day-old sessions still present in store.',
              'No cleanup job found in codebase.'
            ],
            actions: [action('Remediate now', 'accent'), action('Ignore', 'danger')]
          },
          {
            id: 'hsts',
            title: 'Missing HSTS header on marketing subdomain',
            subtitle: 'Defense-in-depth issue \u2014 not exploitable without MitM position.',
            count: 'Low',
            tone: 'neutral' as const,
            detailHeader: 'Affected surface',
            detailText: 'marketing.example.com \u2014 Strict-Transport-Security header is absent from all responses.',
            evidenceBullets: [
              'Header not observed in curl response from marketing CDN origin.'
            ],
            actions: [action('Remediate now', 'accent'), action('Ignore', 'danger')]
          }
        ]
      }
    ]
  },
  'vendor-evaluation-matrix': {
    headline: 'A generic comparison matrix for frameworks, vendors, technologies, apps, or products.',
    summary: 'Up to 5 columns including the Name / Item column, followed by a single recommendation pane.',
    sections: [
      {
        kind: 'hero',
        eyebrow: 'Comparison template',
        title: 'Frontend framework comparison',
        summary: 'Four frameworks compared across four stable criteria, capped at five total columns.',
        chips: [chip('Max 5 columns', 'accent'), chip('Recommendation pane'), chip('No top stats')],
        actions: []
      },
      {
        kind: 'comparison-table',
        title: '',
        columns: [
          { id: 'bundle', label: 'Bundle size' },
          { id: 'rendering', label: 'Rendering model' },
          { id: 'ecosystem', label: 'Ecosystem' },
          { id: 'learning', label: 'Learning curve' }
        ],
        rows: [
          {
            id: 'react',
            label: 'React',
            cells: [{ value: 'Medium' }, { value: 'Client + SSR' }, { value: 'Largest', tone: 'success' }, { value: 'Moderate' }]
          },
          {
            id: 'solid',
            label: 'SolidJS',
            cells: [{ value: 'Small', tone: 'success' }, { value: 'Fine-grained reactive' }, { value: 'Growing' }, { value: 'Moderate' }]
          },
          {
            id: 'svelte',
            label: 'Svelte',
            cells: [{ value: 'Small', tone: 'success' }, { value: 'Compile-time' }, { value: 'Healthy' }, { value: 'Gentle', tone: 'success' }]
          },
          {
            id: 'qwik',
            label: 'Qwik',
            cells: [{ value: 'Tiny (resumable)', tone: 'success' }, { value: 'Resumable SSR' }, { value: 'Early' }, { value: 'Steep', tone: 'warning' }]
          }
        ]
      },
      {
        kind: 'detail-panel',
        title: 'Recommendation',
        summary: 'For a new team prioritizing ecosystem depth and hiring, start with React. If bundle size is non-negotiable, SolidJS or Svelte are both strong and will likely feel lighter day-to-day.',
        fields: [
          { label: 'Top pick', value: 'React', chips: [chip('Recommended', 'success')] },
          { label: 'Runner-up', value: 'Svelte', chips: [chip('Great DX', 'accent')] }
        ]
      }
    ]
  },
  'event-planner': {
    headline: 'A persistent multi-tab planner for events that need venues, guests, logistics, and notes to stay separate.',
    summary: 'The template is notebook-like, but with stronger operational structure and checklist persistence.',
    sections: [
      {
        kind: 'hero',
        eyebrow: 'Planning template',
        title: 'Team offsite planner',
        summary: 'Venue shortlist, guest prep, checklist items, itinerary, and notes organized into stable tabs.',
        chips: [chip('Planning tabs', 'accent'), chip('Checklist persistence'), chip('Venue shortlist')],
        actions: [action('Add guest', 'accent'), action('Adjust itinerary'), action('Save planning note')]
      },
      {
        kind: 'tabs',
        tabs: [
          { id: 'venues', label: 'Venues' },
          { id: 'guests', label: 'Guests' },
          { id: 'checklist', label: 'Checklist' },
          { id: 'itinerary', label: 'Itinerary' },
          { id: 'notes', label: 'Notes' },
        ],
        activeTabId: 'venues',
        panes: {
          venues: [
            {
              kind: 'card-grid',
              title: 'Venue shortlist',
              columns: 1,
              cards: [
                {
                  title: 'Greenpoint Loft',
                  subtitle: '70 capacity · indoor / outdoor',
                  price: '$4,800',
                  imageLabel: 'Industrial loft',
                  chips: [chip('Best fit', 'success')],
                  bullets: ['Great for workshop breakout rooms', 'Catering flexibility'],
                  footer: 'Need AV confirmation.'
                },
                {
                  title: 'Rooftop Union',
                  subtitle: '55 capacity · skyline view',
                  price: '$5,300',
                  imageLabel: 'Rooftop terrace',
                  chips: [chip('Higher wow factor', 'accent')],
                  bullets: ['Weather risk', 'Excellent transit access']
                }
              ]
            },
            {
              kind: 'action-bar',
              title: 'Venue actions',
              actions: [action('Select venue', 'accent'), action('Open venue page'), action('Ask Hermes to compare backup venues')]
            }
          ],
          guests: [
            {
              kind: 'grouped-list',
              title: 'Guest notes',
              groups: [
                {
                  id: 'travelers',
                  label: 'Travelers',
                  items: [{ title: 'SF team', meta: 'Needs hotel block and evening arrival note', actions: ['Add guest'] }]
                }
              ]
            },
            {
              kind: 'action-bar',
              title: 'Guest actions',
              actions: [action('Add guest', 'accent'), action('Draft invite message')]
            }
          ],
          checklist: [
            {
              kind: 'grouped-list',
              title: 'Checklist',
              groups: [
                {
                  id: 'open',
                  label: 'Open',
                  items: [{ title: 'Confirm AV quote', actions: ['Mark done'] }, { title: 'Send dietary form', actions: ['Mark done'] }]
                }
              ]
            }
          ],
          itinerary: [
            {
              kind: 'timeline',
              title: 'Run of show',
              items: [
                { title: 'Venue load-in', time: '9:00 AM', summary: 'Confirm AV and signage placement.' },
                { title: 'Team arrival', time: '10:00 AM', summary: 'Welcome desk and breakfast setup.' },
                { title: 'Afternoon breakout sessions', time: '1:30 PM', summary: 'Need room assignment confirmation.' }
              ]
            },
            {
              kind: 'action-bar',
              title: 'Itinerary actions',
              actions: [action('Adjust itinerary', 'accent'), action('Add travel buffer'), action('Ask Hermes to tighten the run-of-show')]
            }
          ],
          notes: [
            {
              kind: 'notes',
              title: 'Planning notes',
              lines: ['Prefer venue that handles breakout tables well.', 'Keep catering flexible for dietary changes.'],
              actions: [action('Add note', 'accent')]
            }
          ]
        }
      }
    ]
  },
  'job-search-pipeline': {
    headline: 'Job listings as a card grid with per-card Apply links and Find more.',
    summary: 'Each card shows a company photo or logo, role title, pay range, and a direct Apply link. No pipeline or kanban.',
    sections: [
      {
        kind: 'hero',
        eyebrow: 'Jobs template',
        title: 'Senior product design openings',
        summary: 'Browse curated roles, apply directly, or ask Hermes to find more.',
        chips: [chip('Card grid', 'accent'), chip('Per-card Apply link'), chip('Find more')],
        actions: []
      },
      {
        kind: 'card-grid',
        title: 'Job listings',
        columns: 2,
        cards: [
          {
            title: 'Senior Product Designer',
            subtitle: 'Horizon Health',
            price: '$195k \u2013 $215k',
            imageLabel: 'Horizon Health',
            chips: [chip('Remote', 'accent'), chip('Full-time')],
            bullets: ['\u{1F517} Apply → direct posting link']
          },
          {
            title: 'Staff Product Designer',
            subtitle: 'Northlane',
            price: '$180k \u2013 $195k',
            imageLabel: 'Northlane',
            chips: [chip('Hybrid'), chip('Full-time')],
            bullets: ['\u{1F517} Apply → direct posting link']
          },
          {
            title: 'Product Designer — Growth',
            subtitle: 'Aster',
            price: '$175k \u2013 $190k',
            imageLabel: 'Aster',
            chips: [chip('Remote', 'accent'), chip('Full-time')],
            bullets: ['\u{1F517} Apply → direct posting link']
          },
          {
            title: 'Product Designer',
            subtitle: 'Beacon',
            price: '$160k \u2013 $180k',
            imageLabel: 'Beacon',
            chips: [chip('SF / Remote'), chip('Full-time')],
            bullets: ['\u{1F517} Apply → direct posting link']
          }
        ]
      }
    ]
  },
    'content-campaign-planner': {
    headline: 'A content-ops template with workflow tabs for ideas, drafts, schedule, and email execution.',
    summary: 'The goal is to make status progression, idea expansion, and launch writing feel stable instead of rewrite-prone.',
    sections: [
      {
        kind: 'hero',
        eyebrow: 'Planning template',
        title: 'Q3 product launch campaign',
        summary: 'Campaign ideas, draft work, schedule commitments, and launch email execution organized into workflow tabs.',
        chips: [chip('Workflow tabs', 'accent'), chip('Status chips'), chip('Email write')],
        actions: [action('Flesh out idea', 'accent'), action('Write email'), action('Add note')]
      },
      {
        kind: 'tabs',
        tabs: [
          { id: 'ideas', label: 'Ideas' },
          { id: 'drafts', label: 'Drafts' },
          { id: 'schedule', label: 'Schedule' }
        ],
        activeTabId: 'ideas',
        panes: {
          ideas: [
            {
              kind: 'grouped-list',
              title: 'Ideas',
              groups: [
                {
                  id: 'ideas',
                  label: 'Ideas',
                  items: [
                    {
                      title: 'Launch diary thread',
                      subtitle: 'Founder-led social story',
                      chips: [chip('High voice fit', 'success')],
                      meta: 'Note: strong founder voice, needs lighter CTA.'
                    },
                    {
                      title: 'Before/after workflow carousel',
                      subtitle: 'Product demo angle',
                      meta: 'Note: clarify the one-screen narrative before writing.'
                    },
                    {
                      title: 'Customer quote montage',
                      subtitle: 'Need permissions',
                      meta: 'Note: permissions and proof are both incomplete.'
                    }
                  ]
                }
              ]
            },
            {
              kind: 'action-bar',
              title: 'Idea actions',
              actions: [action('Flesh out idea', 'accent'), action('Add note'), action('Ask Hermes for another angle')]
            }
          ],
          drafts: [
            {
              kind: 'grouped-list',
              title: 'Drafts',
              groups: [
                {
                  id: 'in-progress',
                  label: 'In progress',
                  items: [{ title: 'Launch email v2', meta: 'Needs CTA rewrite', chips: [chip('Drafting', 'accent')] }]
                }
              ]
            }
          ],
          schedule: [
            {
              kind: 'timeline',
              title: 'Schedule',
              items: [
                { title: 'Press teaser goes live', time: 'Jul 10', summary: 'Owned by comms' },
                { title: 'Launch email send', time: 'Jul 17', summary: 'Morning ET window', chips: [chip('Locked', 'success')] }
              ]
            }
          ]
        }
      }
    ]
  },
  'local-discovery-comparison': {
    headline: 'A flexible local-comparison template for nearby providers and venues that are not restaurants or hotels.',
    summary: 'It keeps contact actions visible and uses a stable list/detail frame without pretending to be a freeform map canvas.',
    sections: [
      {
        kind: 'hero',
        eyebrow: 'Travel template',
        title: 'Coworking spaces near SoHo',
        summary: 'Nearby providers compared on day pass pricing, atmosphere, and direct contact links.',
        chips: [chip('Local comparison', 'accent'), chip('Direct links'), chip('Saved shortlist')],
        actions: [action('Save place', 'accent'), action('Convert to event plan'), action('Ask Hermes for quieter options')]
      },
      {
        kind: 'filter-strip',
        filters: [chip('Within 15 min'), chip('Day pass under $45'), chip('Phone booth needed'), chip('Weekend access')],
        sortLabel: 'Sorted by fit and rating'
      },
      {
        kind: 'split',
        ratio: 'list-detail',
        left: [
          {
            kind: 'grouped-list',
            title: 'Results',
            groups: [
              {
                id: 'top',
                label: 'Top matches',
                tone: 'success',
                items: [
                  {
                    title: 'The Malin SoHo',
                    subtitle: 'Coworking · 4.8 ★',
                    meta: '$40 day pass · weekend access',
                    chips: [chip('Best fit', 'success')]
                  },
                  {
                    title: 'NeueHouse Madison',
                    subtitle: 'Creative workspace · 4.6 ★',
                    meta: '$45 day pass · phone booths',
                    chips: [chip('Slightly farther', 'warning')]
                  }
                ]
              }
            ]
          }
        ],
        right: [
          {
            kind: 'detail-panel',
            title: 'Selected place',
            eyebrow: 'The Malin SoHo',
            summary: 'Quiet workspace with strong design, booth availability, and a booking-ready day pass.',
            fields: [
              { label: 'Website', links: [{ label: 'Visit booking site', href: 'https://example.com/the-malin-soho' }] },
              {
                label: 'Contact',
                links: [
                  { label: 'Email concierge', href: 'mailto:concierge@example.com' },
                  { label: 'Call front desk', href: 'tel:+12125550100' }
                ]
              },
              {
                label: 'Why it fits',
                value: 'Best blend of calm atmosphere, reliable booth access, and quick walking distance from the target area.',
                fullWidth: true
              }
            ],
            actions: [action('Save place', 'accent'), action('Convert to event plan')]
          }
        ]
      }
    ]
  },
  'step-by-step-instructions': {
    headline: 'A compact checklist with markdown, checkable steps that strike through when done, and code blocks with copy buttons.',
    summary: 'Use this whenever the user asks how to do something or how to troubleshoot something.',
    sections: [
      {
        kind: 'hero',
        eyebrow: 'How-to template',
        title: 'Deploy a Node.js app to production',
        summary: 'Numbered steps. Check one off and it gets struck through. Code blocks include a copy button.',
        chips: [chip('Markdown', 'accent'), chip('Strikethrough on check'), chip('Copy buttons on code')],
        actions: []
      },
      {
        kind: 'grouped-list',
        title: 'Checklist',
        groups: [
          {
            id: 'prereqs',
            label: 'Prerequisites',
            tone: 'warning',
            items: [
              { title: 'Node.js 18+ installed', chips: [chip('Required', 'danger')] },
              { title: 'Docker CLI available', chips: [chip('Required', 'danger')] },
              { title: 'Access to container registry', chips: [chip('Required', 'danger')] }
            ]
          },
          {
            id: 'steps',
            label: 'Steps',
            tone: 'accent',
            items: [
              {
                title: '1. Build the image',
                subtitle: 'docker build -t myapp:$(git rev-parse --short HEAD) .',
                chips: [chip('code', 'accent'), chip('copy')]
              },
              {
                title: '2. Run tests against the image',
                subtitle: 'docker run --rm myapp:$(git rev-parse --short HEAD) npm test',
                chips: [chip('code', 'accent'), chip('copy')]
              },
              {
                title: '3. Push to the registry',
                subtitle: 'docker push ghcr.io/acme/myapp:$(git rev-parse --short HEAD)',
                chips: [chip('code', 'accent'), chip('copy')]
              },
              {
                title: '4. Update the k8s manifest',
                subtitle: 'Bump `spec.template.spec.containers[0].image` to the new tag.',
                chips: [chip('markdown', 'accent')]
              },
              {
                title: '5. Apply and verify',
                subtitle: 'kubectl apply -f deploy.yaml && kubectl rollout status deployment/myapp',
                chips: [chip('code', 'accent'), chip('copy')]
              },
              {
                title: '6. Smoke test',
                subtitle: 'curl https://api.example.com/healthz',
                chips: [chip('code', 'accent'), chip('copy'), chip('Critical', 'danger')]
              }
            ]
          }
        ]
      }
    ]
  },
};
