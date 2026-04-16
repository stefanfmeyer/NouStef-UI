import type { RecipeTemplateId, RecipeTemplatePreviewSpec, TemplateAction, TemplateChip } from './types';

const chip = (label: string, tone: TemplateChip['tone'] = 'neutral'): TemplateChip => ({ label, tone });
const action = (label: string, tone: TemplateAction['tone'] = 'neutral', helper?: string): TemplateAction => ({ label, tone, helper });

export const RECIPE_TEMPLATE_FIXTURES: Record<RecipeTemplateId, RecipeTemplatePreviewSpec> = {
  'price-comparison-grid': {
    headline: 'Compare one product family across four merchants with fast price and shipping tradeoffs.',
    summary: 'A dense merchant-first matrix with stable row identity, compact scope tags, and direct decision actions.',
    sections: [
      {
        kind: 'hero',
        eyebrow: 'Commerce template',
        title: '27" 4K monitor price check',
        summary: 'Three high-signal monitor options compared across four merchants, with shipping and stock risk kept visible.',
        chips: [chip('Merchant columns', 'accent'), chip('Sortable pricing'), chip('Alternative prompt')],
        actions: [action('Buy best value', 'accent'), action('Save shortlist'), action('Ask Hermes for alternatives')]
      },
      {
        kind: 'comparison-table',
        title: 'Offer grid',
        columns: [
          { id: 'amazon', label: 'Amazon' },
          { id: 'bestbuy', label: 'Best Buy' },
          { id: 'bh', label: 'B&H' },
          { id: 'newegg', label: 'Newegg' }
        ],
        rows: [
          {
            id: 'dell-s2722qc',
            label: 'Dell S2722QC',
            cells: [
              { value: '$349', subvalue: 'Free ship' },
              { value: '$359', subvalue: 'Pickup today' },
              { value: '$329', subvalue: '2-day ship', tone: 'success', emphasis: true },
              { value: '$341', subvalue: 'Low stock' }
            ]
          },
          {
            id: 'lg-27up650',
            label: 'LG 27UP650',
            cells: [
              { value: '$319', subvalue: 'Backordered', tone: 'warning' },
              { value: '$338', subvalue: 'Free ship' },
              { value: '$334', subvalue: 'Tax extra' },
              { value: '$329', subvalue: '3-day ship', tone: 'success' }
            ]
          },
          {
            id: 'asus-pa279cv',
            label: 'ASUS PA279CV',
            cells: [
              { value: '$399', subvalue: 'Prime' },
              { value: '$389', subvalue: 'Open box nearby' },
              { value: '$405', subvalue: 'Bundle cable' },
              { value: '$394', subvalue: 'Free ship' }
            ]
          }
        ],
        footerChips: [chip('27 inch'), chip('4K IPS'), chip('Under $420'), chip('USB-C preferred'), chip('Sorted by landed price', 'accent')],
        footnote: 'Cell values are preview fixtures showing how merchant-specific pricing and shipping remain aligned.'
      },
      {
        kind: 'notes',
        title: 'Operator note',
        lines: ['Keep USB-C power delivery visible.', 'Do not reshuffle row order if only one merchant price changes.']
      },
      {
        kind: 'action-bar',
        title: 'Quick actions',
        actions: [action('Pin Dell as baseline'), action('Hide backordered offers'), action('Summarize tradeoffs')]
      }
    ]
  },
  'shopping-shortlist': {
    headline: 'A visual shortlist for decision-making when a dense comparison table is too heavy.',
    summary: 'Image-forward cards keep price, highlights, and shortlist reasons visible without turning into a grid.',
    sections: [
      {
        kind: 'hero',
        eyebrow: 'Commerce template',
        title: 'Carry-on luggage shortlist',
        summary: 'Four well-reviewed options with concise reasons they survived the initial cut.',
        chips: [chip('Image-first cards', 'accent'), chip('Quick shortlist notes'), chip('Compact action bar')],
        actions: [action('Save favorite', 'accent'), action('Compare alternatives'), action('Remove weakest option')]
      },
      {
        kind: 'card-grid',
        title: 'Shortlist',
        columns: 2,
        cards: [
          {
            title: 'Away The Carry-On',
            subtitle: 'Hard shell · 39L',
            price: '$275',
            imageLabel: 'Silver case',
            chips: [chip('Best balance', 'success'), chip('Spinner wheels')],
            bullets: ['Strong warranty', 'Fits most overhead bins'],
            footer: 'Shortlist note: strong travel-day reliability.'
          },
          {
            title: 'Travelpro Maxlite 5',
            subtitle: 'Soft shell · 46L',
            price: '$170',
            imageLabel: 'Black roller',
            chips: [chip('Best value', 'accent'), chip('Lightweight')],
            bullets: ['Larger usable volume', 'Less polished styling'],
            footer: 'Shortlist note: best budget pick.'
          },
          {
            title: 'Briggs & Riley Baseline',
            subtitle: 'Soft shell · CX expansion',
            price: '$699',
            imageLabel: 'Navy roller',
            chips: [chip('Premium', 'warning'), chip('Lifetime repair')],
            bullets: ['Excellent build quality', 'Higher cost'],
            footer: 'Shortlist note: ideal if durability matters most.'
          },
          {
            title: 'Monos Carry-On Pro',
            subtitle: 'Hard shell · front pocket',
            price: '$295',
            imageLabel: 'Olive case',
            chips: [chip('Laptop pocket'), chip('Sleek design')],
            bullets: ['Sharp organization', 'Pocket adds bulk'],
            footer: 'Shortlist note: best for business trips.'
          }
        ]
      },
      {
        kind: 'notes',
        title: 'Shortlist notes',
        lines: ['Need one model that fits small regional bins.', 'User prefers durable wheels over extra organizer pockets.'],
        actions: [action('Add note')]
      },
      {
        kind: 'action-bar',
        title: 'Quick actions',
        actions: [action('Pin top choice', 'accent'), action('Compare selected'), action('Ask Hermes for softer-shell options')]
      }
    ]
  },
  'inbox-triage-board': {
    headline: 'Grouped sender triage tuned for bulk cleanup rather than individual thread reading.',
    summary: 'Queue-style buckets, sender counts, and a safe detail preview make cleanup fast without hiding risk.',
    sections: [
      {
        kind: 'hero',
        eyebrow: 'Inbox template',
        title: 'Unread sender triage',
        summary: 'Promotions and noisy senders grouped into cleanup lanes, with one selected sender shown in detail.',
        chips: [chip('Bulk actions', 'accent'), chip('Grouped senders'), chip('Detail preview')],
        actions: [action('Archive promotional lane', 'accent'), action('Create new rule'), action('Summarize selected sender')]
      },
      {
        kind: 'stats',
        items: [
          { label: 'Unread senders', value: '23', helper: 'Top 6 shown' },
          { label: 'Messages this week', value: '142', helper: 'Estimated promotional load' },
          { label: 'Rules suggested', value: '4', helper: 'Safe automation opportunities', tone: 'success' }
        ]
      },
      {
        kind: 'split',
        ratio: 'list-detail',
        left: [
          {
            kind: 'grouped-list',
            title: 'Sender groups',
            groups: [
              {
                id: 'promotions',
                label: 'Promotions',
                tone: 'warning',
                items: [
                  {
                    title: 'Daily deals cluster',
                    subtitle: 'Groupon, Woot, Meh',
                    meta: '38 unread · last seen 2h ago',
                    chips: [chip('Archive safely', 'success'), chip('Rule candidate')]
                  },
                  {
                    title: 'Retail newsletters',
                    subtitle: 'REI, Huckberry, Uniqlo',
                    meta: '27 unread · last seen 4h ago',
                    chips: [chip('Review first')]
                  }
                ]
              },
              {
                id: 'updates',
                label: 'Updates',
                items: [
                  {
                    title: 'Tool notifications',
                    subtitle: 'GitHub, Linear, Vercel',
                    meta: '19 unread · mostly low urgency',
                    chips: [chip('Potential digest rule')]
                  }
                ]
              }
            ]
          }
        ],
        right: [
          {
            kind: 'detail-panel',
            title: 'Selected sender preview',
            eyebrow: 'Daily deals cluster',
            summary: 'Mostly promo blasts with no reply history in the last 60 days.',
            fields: [
              { label: 'Unread count', value: '38' },
              { label: 'Typical subject', value: 'Morning flash sale' },
              { label: 'Safe move', value: 'Archive and build sender rule' }
            ],
            actions: [action('Archive group', 'accent'), action('Create rule'), action('Open latest message')],
            note: 'Preview state is sender-cluster oriented rather than message-thread oriented.'
          }
        ]
      },
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
            summary: 'High-confidence dinner pick with strong pasta menu, known demand, and a direct reservation path.',
            fields: [
              { label: 'Hours tonight', value: '5:00 PM to 10:30 PM' },
              { label: 'Booking', value: 'Reservation link available' },
              { label: 'Menu', value: 'Pasta-focused seasonal menu' }
            ],
            actions: [action('Open reservation', 'accent'), action('Open menu'), action('Open website')],
            note: 'This template keeps the selected venue stable while the list updates.'
          }
        ]
      }
    ]
  },
  'hotel-shortlist': {
    headline: 'A hospitality shortlist that makes location and amenity tradeoffs feel tangible.',
    summary: 'Property cards, quick stats, and stable notes make this a strong trip-decision workspace.',
    sections: [
      {
        kind: 'hero',
        eyebrow: 'Travel template',
        title: 'Lisbon hotel shortlist',
        summary: 'Three candidate stays balanced across neighborhood fit, price, and remote-work comfort.',
        chips: [chip('Property shortlist', 'accent'), chip('Amenities'), chip('Notes tab')],
        actions: [action('Open booking link', 'accent'), action('Pin favorite'), action('Ask Hermes for quieter neighborhoods')]
      },
      {
        kind: 'stats',
        items: [
          { label: 'Nightly sweet spot', value: '$212', helper: 'Current median' },
          { label: 'Walkable districts', value: '3', helper: 'Chiado, Príncipe Real, Alfama' },
          { label: 'Reliable wifi', value: '2 / 3', helper: 'Top picks' }
        ]
      },
      {
        kind: 'tabs',
        title: 'Recipe tabs',
        tabs: [
          { id: 'hotels', label: 'Hotels' },
          { id: 'notes', label: 'Notes' }
        ],
        activeTabId: 'hotels',
        panes: {
          hotels: [
            {
              kind: 'card-grid',
              title: 'Hotel shortlist',
              columns: 1,
              cards: [
                {
                  title: 'Memmo Príncipe Real',
                  subtitle: 'Boutique · Príncipe Real',
                  price: '$248/night',
                  imageLabel: 'Warm terrace view',
                  chips: [chip('Best fit', 'success'), chip('Rooftop')],
                  bullets: ['Quiet block', 'Strong breakfast', 'Walkable to central sights'],
                  footer: 'Note: best overall neighborhood fit.'
                },
                {
                  title: 'The Lumiares',
                  subtitle: 'Apartment hotel · Bairro Alto',
                  price: '$226/night',
                  imageLabel: 'Suite interior',
                  chips: [chip('More recipe'), chip('Kitchenette')],
                  bullets: ['Good for longer stay', 'Liveliest nightlife nearby'],
                  footer: 'Note: strongest work setup.'
                },
                {
                  title: 'Lisboa Pessoa',
                  subtitle: 'Hotel · Chiado',
                  price: '$189/night',
                  imageLabel: 'Classic room',
                  chips: [chip('Best value', 'accent')],
                  bullets: ['Central location', 'Slightly smaller rooms'],
                  footer: 'Note: value pick if quiet is less critical.'
                }
              ]
            }
          ],
          notes: [
            {
              kind: 'notes',
              title: 'Trip notes',
              lines: ['Prefer calm streets over nightlife proximity.', 'Need reliable morning workspace on checkout day.']
            }
          ]
        }
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
          { id: 'return', label: 'Return' },
          { id: 'notes', label: 'Notes' }
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
          ],
          notes: [
            {
              kind: 'notes',
              title: 'Traveler preferences',
              lines: ['Avoid very early layovers.', 'Worth paying slightly more for nonstop return.']
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
          { id: 'packing', label: 'Packing' },
          { id: 'notes', label: 'Notes' },
          { id: 'links', label: 'Links' }
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
          ],
          notes: [
            {
              kind: 'notes',
              title: 'Trip notes',
              lines: ['Prefer morning flights for day-one exploration.', 'Pack light for metro transfers.']
            }
          ],
          links: [
            {
              kind: 'grouped-list',
              title: 'Saved links',
              groups: [
                {
                  id: 'trip-links',
                  label: 'Useful links',
                  items: [
                    { title: 'Hotel confirmation', meta: 'Direct booking' },
                    { title: 'Museum tickets', meta: 'Official site' },
                    { title: 'Airport transfer options', meta: 'Saved for later' }
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
          { id: 'notes', label: 'Notes' },
          { id: 'points', label: 'Extracted points' },
          { id: 'followups', label: 'Follow-ups' }
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
          notes: [
            {
              kind: 'notes',
              title: 'Operator notes',
              lines: ['Need a clear split between browsing competence and task-completion robustness.', 'Benchmark results alone do not explain repair-loop design.']
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
          ],
          followups: [
            {
              kind: 'grouped-list',
              title: 'Follow-up prompts',
              groups: [
                {
                  id: 'next-asks',
                  label: 'Next asks',
                  items: [
                    {
                      title: 'Compare repair strategies across benchmark families',
                      meta: 'Good next Hermes prompt',
                      actions: ['Run follow-up']
                    },
                    {
                      title: 'Extract common failure loops from recent agent benchmarks',
                      meta: 'Directly runnable next question',
                      actions: ['Run follow-up']
                    }
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
    headline: 'A severity-first review board for evidence-backed security triage.',
    summary: 'Finding groups stay stable while evidence and remediation details remain attached to a selected issue.',
    sections: [
      {
        kind: 'hero',
        eyebrow: 'Security template',
        title: 'Public webhook surface review',
        summary: 'Findings grouped by severity with a selected issue detail panel and remediation actions.',
        chips: [chip('Severity groups', 'accent'), chip('Evidence detail'), chip('Remediation tracking')],
        actions: [action('Assign remediation', 'accent'), action('Open evidence'), action('Change status')]
      },
      {
        kind: 'stats',
        items: [
          { label: 'Critical', value: '1', helper: 'Unauthenticated endpoint', tone: 'danger' },
          { label: 'Medium', value: '3', helper: 'Needs review', tone: 'warning' },
          { label: 'Remediation ready', value: '2', helper: 'Actionable fix path', tone: 'success' }
        ]
      },
      {
        kind: 'split',
        ratio: 'list-detail',
        left: [
          {
            kind: 'grouped-list',
            title: 'Findings by severity',
            groups: [
              {
                id: 'critical',
                label: 'Critical',
                tone: 'danger',
                items: [
                  {
                    title: 'Webhook signature bypass on preview endpoint',
                    subtitle: 'Missing auth check in fallback route',
                    meta: 'Evidence captured from replayed fixture payload',
                    chips: [chip('Exploit path', 'danger')]
                  }
                ]
              },
              {
                id: 'medium',
                label: 'Medium',
                tone: 'warning',
                items: [
                  { title: 'Verbose stack traces in bridge error body', meta: 'Leaks internal paths during failure.' },
                  { title: 'Long-lived oauth state tokens', meta: 'Needs expiry audit.' }
                ]
              }
            ]
          }
        ],
        right: [
          {
            kind: 'detail-panel',
            title: 'Selected finding',
            eyebrow: 'Webhook signature bypass',
            summary: 'Fallback preview path accepts unauthenticated traffic when feature flag is misconfigured.',
            chips: [chip('Critical', 'danger'), chip('Open', 'warning')],
            fields: [
              { label: 'Affected surface', value: 'Preview webhook fallback route' },
              {
                label: 'Evidence',
                bullets: ['Replay fixture reached the fallback route without a valid signature.', 'Header verification is skipped when the preview flag is misconfigured.']
              }
            ],
            actions: [action('Assign remediation', 'accent'), action('Mark investigating'), action('Open evidence')],
            noteTitle: 'Proposed remediation',
            note: 'Require shared-secret verification in all routes, then add an integration test that exercises the preview fallback path.'
          }
        ]
      }
    ]
  },
  'vendor-evaluation-matrix': {
    headline: 'A weighted comparison matrix for software or service procurement decisions.',
    summary: 'Criteria and vendor rows stay explainable, which matters more here than visual novelty.',
    sections: [
      {
        kind: 'hero',
        eyebrow: 'Commerce template',
        title: 'Customer support platform evaluation',
        summary: 'Four vendors scored across weighted criteria with pricing and notes kept adjacent to the matrix.',
        chips: [chip('Weighted criteria', 'accent'), chip('Procurement-ready'), chip('Notes tab')],
        actions: [action('Reweight criteria', 'accent'), action('Pin frontrunner'), action('Open vendor site')]
      },
      {
        kind: 'stats',
        items: [
          { label: 'Frontrunner', value: 'Plain', helper: 'Highest current score', tone: 'success' },
          { label: 'Top weight', value: 'API quality', helper: '30%' },
          { label: 'Budget ceiling', value: '$55/seat', helper: 'Target range' }
        ]
      },
      {
        kind: 'comparison-table',
        title: 'Evaluation matrix',
        columns: [
          { id: 'api', label: 'API quality' },
          { id: 'workflow', label: 'Workflow fit' },
          { id: 'reporting', label: 'Reporting' },
          { id: 'price', label: 'Price' }
        ],
        rows: [
          {
            id: 'plain',
            label: 'Plain',
            cells: [
              { value: '9 / 10', tone: 'success' },
              { value: '8 / 10' },
              { value: '7 / 10' },
              { value: '$49 / seat', emphasis: true }
            ]
          },
          {
            id: 'zendesk',
            label: 'Zendesk',
            cells: [{ value: '8 / 10' }, { value: '9 / 10', tone: 'success' }, { value: '9 / 10' }, { value: '$69 / seat', tone: 'warning' }]
          },
          {
            id: 'helpscout',
            label: 'Help Scout',
            cells: [{ value: '7 / 10' }, { value: '8 / 10' }, { value: '7 / 10' }, { value: '$40 / seat', tone: 'success' }]
          }
        ],
        footnote: 'Preview weights: API quality 30%, workflow fit 25%, reporting 20%, price 25%.'
      },
      {
        kind: 'notes',
        title: 'Decision notes',
        lines: ['Need low-friction API access more than enterprise reporting.', 'Seat expansion cost will matter within 12 months.']
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
    headline: 'A stage-based job-search board with salary and location context kept close to next steps.',
    summary: 'This preview leans on strong stage stability so interview updates feel like patches, not rewrites.',
    sections: [
      {
        kind: 'hero',
        eyebrow: 'Pipeline template',
        title: 'Senior product design job search',
        summary: 'Applications grouped by interview stage with durable links, salary/location detail, and interview prep notes in a stable side panel.',
        chips: [chip('Interview stages', 'accent'), chip('Salary highlights'), chip('Prep notes')],
        actions: [action('Update stage', 'accent'), action('Add interview note'), action('Interview prep')]
      },
      {
        kind: 'stats',
        items: [
          { label: 'Active applications', value: '9', helper: '3 onsite stage' },
          { label: 'Remote roles', value: '5', helper: '2 hybrid NYC' },
          { label: 'Top salary band', value: '$210k', helper: 'Current high end', tone: 'success' }
        ]
      },
      {
        kind: 'kanban',
        title: 'Application pipeline',
        columns: [
          {
            label: 'Applied',
            cards: [
              { title: 'Northlane', subtitle: 'Staff Product Designer · Remote', footer: '$180k to $195k' },
              { title: 'Aster', subtitle: 'Senior Product Designer · NYC hybrid', footer: '$175k to $190k' }
            ]
          },
          {
            label: 'Phone screen',
            tone: 'warning',
            cards: [{ title: 'Beacon', subtitle: 'Product design screen booked', chips: [chip('Prep soon', 'warning')], footer: 'Tue 11:00 AM' }]
          },
          {
            label: 'Onsite',
            tone: 'success',
            cards: [{ title: 'Horizon Health', subtitle: 'Panel next Friday', chips: [chip('Top fit', 'success')], footer: '$205k target' }]
          }
        ]
      },
      {
        kind: 'detail-panel',
        title: 'Selected application',
        eyebrow: 'Horizon Health',
        summary: 'Mission fit is strong. Need sharper examples around design system adoption and care-team workflows.',
        chips: [chip('Onsite', 'success'), chip('Remote-first')],
        fields: [
          { label: 'Location', value: 'Remote-first' },
          { label: 'Posting', links: [{ label: 'Open posting', href: 'https://jobs.example.com/horizon-health/design' }] },
          { label: 'Next step', value: 'Draft panel stories by Wednesday' },
          {
            label: 'Interview prep brief',
            fullWidth: true,
            bullets: [
              'Role: lead with design system adoption and cross-functional operating model examples.',
              'Company: connect care-team workflow empathy to product execution.',
              'Technology: be ready for Figma systems, analytics instrumentation, and experimentation questions.',
              'Requirements: prepare two stories that show systems thinking and measurable outcomes.'
            ]
          }
        ],
        actions: [action('Interview prep', 'accent'), action('Open company research'), action('Update stage')]
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
              kind: 'kanban',
              title: 'Idea lanes',
              columns: [
                {
                  label: 'Worth exploring',
                  cards: [
                    { title: 'Launch diary thread', subtitle: 'Founder-led social story', chips: [chip('High voice fit', 'success')], footer: 'Note: strong founder voice, needs lighter CTA.' },
                    { title: 'Before/after workflow carousel', subtitle: 'Product demo angle', footer: 'Note: clarify the one-screen narrative before writing.' }
                  ]
                },
                {
                  label: 'Needs shaping',
                  cards: [{ title: 'Customer quote montage', subtitle: 'Need permissions', footer: 'Note: permissions and proof are both incomplete.' }]
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
    headline: 'Follow a procedure with prerequisites and numbered steps you can check off.',
    summary: 'A checklist-style guide with prerequisites listed up front and each step checkable for progress tracking.',
    sections: [
      {
        kind: 'hero',
        eyebrow: 'Procedural template',
        title: 'Deploy a Node.js app to production',
        summary: 'Step-by-step deployment guide with prerequisites and checkable steps.',
        chips: [chip('Prerequisites', 'accent'), chip('Numbered steps'), chip('Checkable progress')],
        actions: [action('Add note'), action('Ask Hermes to refine')]
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
              { title: 'Node.js 18+ installed', chips: [chip('Required', 'danger')], actions: ['Verify'] },
              { title: 'Docker CLI available', chips: [chip('Required', 'danger')], actions: ['Verify'] },
              { title: 'Access to container registry', chips: [chip('Required', 'danger')], actions: ['Request access'] },
              { title: 'CI pipeline green on main', chips: [chip('Recommended', 'warning')], actions: ['Check CI'] }
            ]
          },
          {
            id: 'steps',
            label: 'Steps',
            tone: 'accent',
            items: [
              { title: '1. Build the Docker image', subtitle: 'Run docker build -t myapp .', chips: [chip('~2 min')], actions: ['Copy command'] },
              { title: '2. Run tests against the image', subtitle: 'Execute the test suite inside the container.', chips: [chip('~5 min')], actions: ['Copy command'] },
              { title: '3. Push to registry', subtitle: 'Tag and push to your container registry.', chips: [chip('~1 min')], actions: ['Copy command'] },
              { title: '4. Update the deployment manifest', subtitle: 'Set the new image tag in your k8s manifest.', chips: [chip('Manual edit')], actions: ['Open file'] },
              { title: '5. Apply and verify', subtitle: 'Run kubectl apply and check rollout status.', chips: [chip('~3 min')], actions: ['Copy command'] },
              { title: '6. Smoke test production', subtitle: 'Hit the health endpoint and verify key flows.', chips: [chip('Critical', 'danger')], actions: ['Open URL'] }
            ]
          },
          {
            id: 'post-deploy',
            label: 'Post-deploy',
            items: [
              { title: 'Monitor error rate for 15 min', chips: [chip('Observability')], actions: ['Open dashboard'] },
              { title: 'Notify team in Slack', chips: [chip('Communication')], actions: ['Send message'] },
              { title: 'Update changelog', actions: ['Open changelog'] }
            ]
          }
        ]
      },
      {
        kind: 'notes',
        title: 'Notes',
        lines: ['Ensure CI pipeline passes before deploying.', 'Roll back immediately if health checks fail.', 'Tag the release in git after a successful deploy.']
      },
      {
        kind: 'action-bar',
        title: 'Quick actions',
        actions: [action('Mark all complete', 'success'), action('Reset checklist'), action('Export as runbook')]
      }
    ]
  },
};
