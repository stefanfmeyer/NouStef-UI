import type { RecipeTemplateId, RecipeTemplateSpec } from './types';

export const RECIPE_TEMPLATE_SPECS: Record<RecipeTemplateId, RecipeTemplateSpec> = {
  'price-comparison-grid': {
    id: 'price-comparison-grid',
    name: 'Price Comparison Grid',
    category: 'commerce',
    useCase: 'Compare one or more items across up to four stores when price is the primary concern.',
    purpose: 'A focused price-first comparison grid with direct item links in every row.',
    primaryUserGoal: 'See the cheapest option across a small, stable set of stores without losing item identity.',
    whenHermesShouldChoose:
      'Choose this when the user is comparing one or more items across up to four stores, hotels, restaurants, or other places where price is the decisive factor.',
    selectionSignals: ['compare prices', 'which store is cheapest', 'cheapest hotel', 'price across stores', 'price comparison'],
    goodFor: ['Single-item store shopping', 'Hotel price checks', 'Restaurant price checks', 'Any price-first comparison'],
    supports: ['Up to 4 store columns', 'Per-row item link', 'Sortable price columns', 'Multiple items in title'],
    preferredLayout: 'comparison-grid',
    supportedTabs: ['Overview'],
    idealDataShape: ['One row per item being compared', 'Up to four stable store columns', 'A direct item link per row'],
    requiredSections: ['Comparison table'],
    optionalSections: [],
    requiredActions: ['Open item link'],
    optionalActions: [],
    emptyStateBehavior: 'Show a placeholder inviting the user to name the item(s) and stores to compare.',
    loadingStateBehavior: 'Hold the table scaffold in place while store cells stream in.',
    errorStateBehavior: 'Preserve any confirmed rows and mark failed cells as unavailable.',
    smallPaneAdaptationNotes: ['Keep item name and cheapest price column pinned first.', 'Collapse the lowest-priority store column before truncating item identity.'],
    references: ['Google Shopping comparison tables', 'Amazon compare surfaces', 'Booking price grids'],
    populationInstructions: {
      summary: 'Populate one row per compared item across no more than four stable store columns, always including a direct link to each item.',
      steps: [
        'Use the title to list the items being compared (it is okay to include multiple items).',
        'Create one row per distinct item and one column per store, capped at four stores.',
        'Include a direct link to the item or listing in every row so the user can jump straight to it.'
      ],
      guardrails: [
        'Never exceed four store columns including the item identity column.',
        'Do not add operator notes, quick action bars, or advisory footers — this recipe is price-first only.',
        'Never render a row without a direct link to the item.'
      ]
    },
    updateRules: {
      patchPrefer: ['Patch store prices in place without changing row order unless the user asks to sort.'],
      replaceTriggers: ['Replace the whole table only when the compared item set changes entirely.'],
      persistAcrossUpdates: ['Row order', 'Selected item links', 'Sort direction'],
      stableRegions: ['Primary table columns', 'Item-link column']
    }
  },
  'shopping-shortlist': {
    id: 'shopping-shortlist',
    name: 'Shopping Results',
    category: 'commerce',
    useCase: 'Show a wide variety of candidate items as small tiled cards with name, photo, and price.',
    purpose: 'A tight, tile-based results surface for browsing a diverse set of items with a direct link to each.',
    primaryUserGoal: 'Quickly scan many candidate items and jump straight to the listing that looks right.',
    whenHermesShouldChoose:
      'Choose this when the user wants a loose set of shopping results across a variety of items rather than comparing a single product across stores.',
    selectionSignals: ['shopping results', 'find me', 'browse items', 'gift ideas', 'show me options'],
    goodFor: ['Gift ideas', 'Home goods discovery', 'Browsing a variety', 'Visual shopping scans'],
    supports: ['Small tiled cards', 'Photo or image label', 'Item name', 'Price', 'Direct item link'],
    preferredLayout: 'image-shortlist',
    supportedTabs: ['Results'],
    idealDataShape: ['One tile per item', 'Item name', 'Photo or image label', 'Price', 'Direct item link'],
    requiredSections: ['Tile grid'],
    optionalSections: [],
    requiredActions: ['Open item link'],
    optionalActions: [],
    emptyStateBehavior: 'Invite the user to ask for results with a short prompt.',
    loadingStateBehavior: 'Reserve tile shells while new items stream in.',
    errorStateBehavior: 'Keep existing tiles visible and mark missing photos or prices inline.',
    smallPaneAdaptationNotes: ['Collapse to one or two columns.', 'Keep photo, name, and price visible on every tile.'],
    references: ['Pinterest-style result grids', 'Search result tiles', 'Marketplace card feeds'],
    populationInstructions: {
      summary: 'Fill small tiles with just the item name, a photo (or descriptive image label), and a price, each linking to the item.',
      steps: [
        'Use one compact tile per item.',
        'Include an image label or photo hint if a real image is unavailable.',
        'Show the price directly on the tile.',
        'Include a direct link to the item listing on every tile.'
      ],
      guardrails: [
        'Do not add bullets, comparison tables, or operator notes — keep tiles minimal.',
        'Do not duplicate items.',
        'Never render a tile without a direct link to the item.'
      ]
    },
    updateRules: {
      patchPrefer: ['Update tile price or image in place.', 'Append new tiles without replacing the grid.'],
      replaceTriggers: ['Replace the grid only when the search changes entirely.'],
      persistAcrossUpdates: ['Tile ordering', 'Saved item links'],
      stableRegions: ['Tile grid']
    }
  },
  'inbox-triage-board': {
    id: 'inbox-triage-board',
    name: 'Inbox Triage Board',
    category: 'communication',
    useCase: 'Triage unread or noisy senders as a clean inbox-style list of expandable categories.',
    purpose: 'A minimalist inbox view: one row per category with vendors and email counts, and an expandable detail with sample subjects, a recommendation, and quick actions.',
    primaryUserGoal: 'Scan the inbox by category, decide quickly, and let Hermes act on the chosen category.',
    whenHermesShouldChoose:
      'Choose this when the user asks to triage unread email, clean up promotional senders, or batch-handle recurring inbox clutter.',
    selectionSignals: ['unread email', 'triage inbox', 'clean up senders', 'archive promotions'],
    goodFor: ['Unread sender triage', 'Bulk email cleanup', 'Inbox hygiene'],
    supports: ['Expandable rows', 'Vendor subtitle', 'Email count', 'Sample subjects', 'Recommendation callout', 'Hermes-backed actions'],
    preferredLayout: 'triage-board',
    supportedTabs: ['Inbox'],
    idealDataShape: [
      'One row per category (e.g. Promotions, Updates, Newsletters)',
      'Vendor names rendered as a subtitle list',
      'Integer email count per category',
      'Up to 5 sample subject lines per category',
      'A recommendation string plus tone (success/warning/danger/neutral)'
    ],
    requiredSections: ['Expandable category list'],
    optionalSections: [],
    requiredActions: ['Archive', 'Archive & Unsubscribe', 'Send to Folder'],
    optionalActions: [],
    emptyStateBehavior: 'Show a compact "inbox is quiet" message when nothing needs triage.',
    loadingStateBehavior: 'Render row skeletons with dividers so the inbox layout does not jump.',
    errorStateBehavior: 'Keep loaded rows visible, disable destructive actions, and flag stale counts.',
    smallPaneAdaptationNotes: ['Expanded detail stacks below the row.', 'Keep action buttons full-width when collapsed into one column.'],
    references: ['Gmail category view', 'Modern minimalist mail clients', 'Inbox zero workflows'],
    populationInstructions: {
      summary: 'Render an inbox-like list of category rows with dividers between them, each expandable to show sample subjects, a recommendation, and three action buttons.',
      steps: [
        'Aggregate emails into meaningful categories (Promotions, Updates, Newsletters, Receipts, etc.).',
        'For each category, render a row with the category name, vendor names as a subtitle, and the email count on the right.',
        'Separate rows with thin divider lines instead of heavy card chrome.',
        'When a row is expanded, show a "Sample subjects" header and up to 5 subject lines.',
        'Below sample subjects, render a recommendation in an info panel whose style matches the advice tone (green for safe, amber for caution, red for risky, neutral otherwise).',
        'Render three action buttons at the bottom of the expanded row: "Archive", "Archive & Unsubscribe", and "Send to Folder".'
      ],
      guardrails: [
        'Never exceed 5 sample subjects per category.',
        'Clicking any action button must prompt Hermes to perform exactly what the button says — nothing is applied silently.',
        'When "Send to Folder" is clicked, Hermes must ask the user for the destination folder name before performing the move.',
        'Do not replace the row model during incremental updates — patch counts in place.'
      ]
    },
    updateRules: {
      patchPrefer: ['Patch counts, vendors, and subject samples in place.', 'Append newly detected categories at the bottom of the list.'],
      replaceTriggers: ['Replace grouping only when the triage objective changes materially.'],
      persistAcrossUpdates: ['Expanded row state', 'Recommendation tone', 'User-applied actions'],
      stableRegions: ['Row order', 'Action buttons']
    }
  },
  'restaurant-finder': {
    id: 'restaurant-finder',
    name: 'Restaurant Finder',
    category: 'travel',
    useCase: 'Search nearby restaurants and compare a short set of options.',
    purpose: 'A list-detail restaurant workspace with fast cuisine, price, and rating scanning.',
    primaryUserGoal: 'Pick the right nearby restaurant with enough context to decide or ask Hermes to book.',
    whenHermesShouldChoose:
      'Choose this when the user is looking for nearby dining options, cuisine comparisons, or restaurant suggestions in an area.',
    selectionSignals: ['restaurants nearby', 'find dinner', 'best places to eat', 'compare restaurants'],
    goodFor: ['Nearby dining', 'Date-night options', 'Cuisine filtering'],
    supports: ['List/detail view', 'Hours', 'Menu links', 'Book prompt'],
    preferredLayout: 'list-detail',
    supportedTabs: ['Results', 'Saved', 'Notes'],
    idealDataShape: ['Venue list with cuisine, rating, price, and hours', 'Detail panel with address and links', 'Optional shortlist notes'],
    requiredSections: ['Filter strip', 'Result list', 'Detail panel', 'Action bar'],
    optionalSections: ['Saved tab', 'Neighborhood note', 'Opening-hours highlights'],
    requiredActions: [],
    optionalActions: [],
    emptyStateBehavior: 'Show a local-search empty state with filters and a prompt to widen the area or cuisine.',
    loadingStateBehavior: 'Hold list and detail shells so the selected venue context stays anchored while results update.',
    errorStateBehavior: 'Preserve any loaded venues and surface source limitations clearly.',
    smallPaneAdaptationNotes: ['Collapse into a vertical results-first flow with a sticky selected-venue card.', 'Keep cuisine, price, and rating visible in each row.'],
    references: ['Yelp list-detail flows', 'Google Maps local results', 'OpenTable action affordances'],
    populationInstructions: {
      summary: 'Populate a result list that is easy to scan quickly and a selected-venue detail panel with hours, website, phone, and cuisine shown as icon + value rows.',
      steps: [
        'Lead with a concise filter context such as cuisine, distance, or price band.',
        'Present the top venues as compact rows with consistent stats.',
        'In the selected-venue panel render four stacked icon rows in this order: clock icon + hours text, website icon + a hyperlinked "Link" to the venue website, phone icon + phone number, food icon + food genre.',
        'Do not render a bottom action bar or any stability note on the selected-venue panel.'
      ],
      guardrails: [
        'Do not invent map tiles or arbitrary geospatial UI.',
        'Keep the selected-venue panel limited to hours, website, phone, and genre rows.',
        'Avoid replacing the whole list when only one venue detail changes.'
      ]
    },
    updateRules: {
      patchPrefer: ['Patch venue rows, hours, and detail fields in place.'],
      replaceTriggers: ['Replace the result set when the search area or cuisine scope changes meaningfully.'],
      persistAcrossUpdates: ['Selected venue', 'Active filter chips'],
      stableRegions: ['List/detail structure', 'Selected-venue icon rows']
    }
  },
  'hotel-shortlist': {
    id: 'hotel-shortlist',
    name: 'Hotel Shortlist',
    category: 'travel',
    useCase: 'Compare likely hotels for a trip with room to keep notes and booking links.',
    purpose: 'A hospitality shortlist that balances property cards with decision notes.',
    primaryUserGoal: 'Narrow hotel options down to the best trip-fit shortlist without losing amenities or location context.',
    whenHermesShouldChoose:
      'Choose this when the user is deciding between multiple hotels for a destination or trip window.',
    selectionSignals: ['compare hotels', 'shortlist hotels', 'where to stay', 'trip lodging options'],
    goodFor: ['Trip lodging', 'Business travel', 'Weekend getaways'],
    supports: ['Price', 'Amenities', 'Location notes', 'Booking links', 'Website icon', 'Phone icon'],
    preferredLayout: 'travel-compare',
    supportedTabs: [],
    idealDataShape: ['Hotel cards with nightly price, location, amenities, website link, and phone number'],
    requiredSections: ['Hotel cards'],
    optionalSections: [],
    requiredActions: ['Open booking link'],
    optionalActions: [],
    emptyStateBehavior: 'Show a destination-specific prompt to add candidate hotels or ask Hermes to generate a shortlist.',
    loadingStateBehavior: 'Keep card positions stable and show price/amenity placeholders instead of collapsing the grid.',
    errorStateBehavior: 'Preserve any confirmed hotels and annotate stale prices or missing booking sources per card.',
    smallPaneAdaptationNotes: ['Switch to one-card-per-row and keep nightly price plus two top amenities visible.'],
    references: ['Booking property lists', 'Airbnb saved-property flows', 'TripAdvisor shortlist patterns'],
    populationInstructions: {
      summary: 'Render hotels as stacked cards only — no header bar, no recipe tabs, no Hotels/Notes tabs, and no "Hotel shortlist" section header. Each card carries price, amenities, a website icon, and a phone icon.',
      steps: [
        'Use one distinct card per hotel.',
        'Include a website icon with a hyperlinked "Link" and a phone icon with the phone number on every card.',
        'Highlight the most decision-relevant amenities and neighborhood context directly on the card.'
      ],
      guardrails: [
        'Do not render a header bar, recipe tabs, Hotels/Notes tabs, or a "Hotel shortlist" section header.',
        'Do not overload cards with full review dumps.',
        'Do not reorder the shortlist on every small price refresh.'
      ]
    },
    updateRules: {
      patchPrefer: ['Patch prices, amenity notes, and links in place.'],
      replaceTriggers: ['Replace the hotel set only when the destination, date range, or trip style changes materially.'],
      persistAcrossUpdates: ['Card order', 'Saved hotels', 'Booking links'],
      stableRegions: ['Card order', 'Website/phone rows']
    }
  },
  'flight-comparison': {
    id: 'flight-comparison',
    name: 'Flight Comparison',
    category: 'travel',
    useCase: 'Compare round-trip or multi-leg flight options with stable outbound and return lanes.',
    purpose: 'A flight workspace tuned for price, stops, duration, and airline tradeoffs.',
    primaryUserGoal: 'Choose the best itinerary quickly without losing outbound/return structure.',
    whenHermesShouldChoose:
      'Choose this when the user is evaluating multiple flight itineraries, especially with outbound and return comparisons.',
    selectionSignals: ['compare flights', 'best itinerary', 'outbound return options', 'cheapest flight'],
    goodFor: ['Trip booking', 'Airline comparison', 'Stop-vs-price tradeoffs'],
    supports: ['Outbound/Return tabs', 'Price and stops', 'Booking link', 'Ask Hermes action'],
    preferredLayout: 'travel-compare',
    supportedTabs: ['Outbound', 'Return'],
    idealDataShape: ['Separate itinerary sets per leg', 'Price, airline, stops, duration, booking link'],
    requiredSections: ['Tab rail', 'Flight comparison table'],
    optionalSections: ['Stat strip', 'Fare caveats', 'Preferred-airline chips'],
    requiredActions: ['Open itinerary'],
    optionalActions: ['Filter by stops', 'Highlight best duration', 'Compare baggage policies'],
    emptyStateBehavior: 'Explain that no itineraries are loaded yet and invite a route/date prompt.',
    loadingStateBehavior: 'Keep tab structure visible and stream itineraries into the active leg instead of blanking the page.',
    errorStateBehavior: 'Preserve the last valid leg table and label unavailable fare data explicitly.',
    smallPaneAdaptationNotes: ['Show the active leg first with compact rows.', 'Keep price, stops, and departure time as the first scan line.'],
    references: ['Kayak results', 'Google Flights compare views', 'Airline search summaries'],
    populationInstructions: {
      summary: 'Populate outbound and return results separately so flight decisions remain leg-aware. Outbound is the default selected tab and there is no Notes tab.',
      steps: [
        'Use stable itinerary rows with price, stops, duration, and carrier.',
        'Keep outbound and return data in separate tabs.',
        'Always render Outbound as the active tab on first load.'
      ],
      guardrails: [
        'Never render a Notes tab on this recipe.',
        'Do not merge outbound and return data into one ambiguous list.',
        'Do not rewrite the selected leg when the inactive leg updates.'
      ]
    },
    updateRules: {
      patchPrefer: ['Patch itinerary rows within the active leg.'],
      replaceTriggers: ['Replace an entire leg only when route or date inputs change for that leg.'],
      persistAcrossUpdates: ['Selected tab', 'Saved itinerary', 'User filter chips'],
      stableRegions: ['Tab rail', 'Comparison table columns']
    }
  },
  'travel-itinerary-planner': {
    id: 'travel-itinerary-planner',
    name: 'Travel Itinerary Planner',
    category: 'travel',
    useCase: 'Organize a trip across itinerary, bookings, packing, notes, and links.',
    purpose: 'A multi-tab travel workspace that keeps planning context stable as new bookings and ideas arrive.',
    primaryUserGoal: 'Keep a trip plan coherent over time instead of reassembling scattered confirmations and notes.',
    whenHermesShouldChoose:
      'Choose this when the user needs a persistent trip workspace rather than a single search or comparison result.',
    selectionSignals: ['plan my trip', 'itinerary', 'bookings and notes', 'travel checklist'],
    goodFor: ['Multi-day trips', 'Work travel', 'Group planning'],
    supports: ['Timeline', 'Bookings tab', 'Packing tab'],
    preferredLayout: 'timeline-tabs',
    supportedTabs: ['Itinerary', 'Bookings', 'Packing'],
    idealDataShape: ['Dated itinerary events', 'Booking records', 'Checklist items'],
    requiredSections: ['Tab rail', 'Timeline', 'Booking summary', 'Packing checklist'],
    optionalSections: ['Travel reminders'],
    requiredActions: ['Open booking', 'Ask Hermes to refine plan'],
    optionalActions: ['Mark checklist item', 'Reorder day plan'],
    emptyStateBehavior: 'Start with a clear trip scaffold that explains the core tabs and invites itinerary seeding.',
    loadingStateBehavior: 'Keep existing tabs and chronology visible while new itinerary segments or bookings arrive.',
    errorStateBehavior: 'Preserve the current trip state and isolate degraded data to the affected tab.',
    smallPaneAdaptationNotes: ['Prefer tab-driven navigation over multi-column layouts.', 'Keep day summary cards tight and chronologically clear.'],
    references: ['Travel planner apps', 'Itinerary managers', 'Notebook-style trip dashboards'],
    populationInstructions: {
      summary: 'Populate stable trip tabs (Itinerary, Bookings, Packing) so later updates feel like travel-plan maintenance instead of a full rewrite.',
      steps: [
        'Use the itinerary tab for chronological events only.',
        'Move confirmations and reservation details into bookings.',
        'Keep packing content in the packing tab.'
      ],
      guardrails: [
        'Never render a Notes tab or a Links tab on this recipe.',
        'Do not collapse the planner into one long markdown note.',
        'Do not replace completed checklist items when adding new ones.'
      ]
    },
    updateRules: {
      patchPrefer: ['Append itinerary events, bookings, and packing items in place.', 'Patch changed reservation details without rewriting unaffected tabs.'],
      replaceTriggers: ['Replace the planner only if the trip itself changes to a different destination or date range.'],
      persistAcrossUpdates: ['Selected tab', 'Checklist completion'],
      stableRegions: ['Tab rail', 'Timeline order', 'Bookings tab', 'Packing tab']
    }
  },
  'research-notebook': {
    id: 'research-notebook',
    name: 'Research Notebook',
    category: 'research',
    useCase: 'Gather sources, claims, notes, and follow-up questions around a research topic.',
    purpose: 'A notebook-style workspace that separates sources, extracted points, and operator notes.',
    primaryUserGoal: 'Keep evidence and thoughts organized so follow-up work can build instead of starting over.',
    whenHermesShouldChoose:
      'Choose this when the user is collecting sources, claims, or references over multiple turns.',
    selectionSignals: ['research sources', 'gather notes', 'extract claims', 'follow-up questions'],
    goodFor: ['Source review', 'Competitive research', 'Reading notes'],
    supports: ['Sources tab', 'Extracted points tab'],
    preferredLayout: 'research-notebook',
    supportedTabs: ['Sources', 'Extracted points'],
    idealDataShape: ['Source list', 'Extracted claims or findings'],
    requiredSections: ['Tab rail', 'Sources list', 'Extracted points'],
    optionalSections: ['Source quality chips'],
    requiredActions: ['Open source', 'Pin claim'],
    optionalActions: ['Mark source reviewed', 'Group by theme', 'Copy citation'],
    emptyStateBehavior: 'Start with a notebook shell that explains how sources and extracted points stay separate.',
    loadingStateBehavior: 'Keep existing tabs fixed while new sources or extracted points arrive.',
    errorStateBehavior: 'Preserve already captured research material and show which extraction lane failed.',
    smallPaneAdaptationNotes: ['Use tab-first navigation on narrow widths.', 'Keep source title, publication, and one relevance line visible.'],
    references: ['Notion research pages', 'Obsidian note collections', 'Apple Notes source stacks'],
    populationInstructions: {
      summary: 'Populate evidence and extracted points as separate but connected surfaces.',
      steps: [
        'Add one source item per document, article, or page.',
        'Store synthesized findings in extracted points rather than mixing them into raw source rows.'
      ],
      guardrails: [
        'Never render a Notes tab or a Follow-ups tab on this recipe.',
        'Do not collapse all information into a single markdown wall.',
        'Keep source identity stable across updates.'
      ]
    },
    updateRules: {
      patchPrefer: ['Append sources and extracted points.', 'Patch existing source summaries rather than replacing the whole notebook.'],
      replaceTriggers: ['Replace the notebook only when the research topic changes completely.'],
      persistAcrossUpdates: ['Selected tab', 'Pinned claims', 'Reviewed markers'],
      stableRegions: ['Tab rail', 'Source ordering']
    }
  },
  'security-review-board': {
    id: 'security-review-board',
    name: 'Security Review Board',
    category: 'research',
    useCase: 'Organize security findings by severity with evidence and remediation steps.',
    purpose: 'A security triage board that emphasizes severity, evidence, and remediation ownership.',
    primaryUserGoal: 'Understand the highest-risk findings first and turn them into tracked remediation work.',
    whenHermesShouldChoose:
      'Choose this when the user is reviewing threats, audits, vulnerabilities, or security-control gaps.',
    selectionSignals: ['security review', 'threat hunting', 'audit findings', 'vulnerability triage'],
    goodFor: ['Threat review', 'Audit findings', 'Remediation planning'],
    supports: ['Full-width severity groups', 'Expandable findings', 'Affected Surface', 'Evidence bullets', 'Remediate now action', 'Ignore action'],
    preferredLayout: 'workbench',
    supportedTabs: [],
    idealDataShape: ['Severity-grouped findings', 'Affected surface per finding', 'Evidence bullet list per finding'],
    requiredSections: ['Findings by Severity (full width, expandable rows)'],
    optionalSections: ['Stat strip'],
    requiredActions: ['Remediate now', 'Ignore'],
    optionalActions: ['Ask Hermes to summarize'],
    emptyStateBehavior: 'Show a review-ready board that explains severity grouping and evidence capture expectations.',
    loadingStateBehavior: 'Keep severity lanes visible and stream findings into the appropriate group.',
    errorStateBehavior: 'Preserve validated findings and label missing evidence or remediation data explicitly.',
    smallPaneAdaptationNotes: ['Render severity groups as stacked sections.', 'Keep severity and title visible on each collapsed row.'],
    references: ['Security triage dashboards', 'Audit review boards', 'Risk register layouts'],
    populationInstructions: {
      summary: 'Render Findings by Severity as a single full-width section. Each finding is a collapsed row that expands to show Affected Surface, Evidence bullets, and Remediate now / Ignore buttons.',
      steps: [
        'Group findings by severity first (Critical, High, Medium, Low).',
        'Make each finding an expandable row whose collapsed line shows severity color, title, and one-line summary.',
        'When expanded, render an "Affected surface" header followed by a short text description.',
        'Below that render an "Evidence" header with the evidence as a bulleted list.',
        'Below evidence render two quick action buttons: "Remediate now" (primary) and "Ignore" (neutral).'
      ],
      guardrails: [
        'Do not render a separate right-pane selected-finding panel — details live inside the expanded row.',
        'Clicking "Ignore" must remove the finding from the list locally.',
        'Clicking "Remediate now" must prompt Hermes to remediate and then update the recipe accordingly.',
        'Never flatten severity into a single undifferentiated list.'
      ]
    },
    updateRules: {
      patchPrefer: ['Patch finding severity, status, and remediation details in place.', 'Append evidence bullets rather than replacing them.', 'Remove a finding row when the user chose Ignore.'],
      replaceTriggers: ['Replace the whole board only when the review scope changes completely.'],
      persistAcrossUpdates: ['Expanded row state', 'Ignored findings', 'Remediation progress'],
      stableRegions: ['Severity grouping', 'Expanded-row structure (Affected Surface → Evidence → Actions)']
    }
  },
  'vendor-evaluation-matrix': {
    id: 'vendor-evaluation-matrix',
    name: 'Comparison Matrix',
    category: 'commerce',
    useCase: 'Compare any set of items — frameworks, vendors, technologies, apps, products — side by side.',
    purpose: 'A generic comparison matrix capped at five columns, followed by a single recommendation pane.',
    primaryUserGoal: 'Compare candidates across a handful of criteria and see a clear recommendation.',
    whenHermesShouldChoose:
      'Choose this when the user is comparing multiple candidates — coding frameworks, vendors, technologies, apps, products, services — across a few consistent criteria.',
    selectionSignals: ['compare', 'comparison matrix', 'versus', 'which is better', 'compare frameworks', 'compare vendors', 'compare apps'],
    goodFor: ['Framework comparison', 'Vendor comparison', 'Technology comparison', 'App comparison', 'Product comparison'],
    supports: ['Up to 5 columns including Name / Item', 'Recommendation pane below the table'],
    preferredLayout: 'matrix',
    supportedTabs: [],
    idealDataShape: ['A Name / Item column plus up to 4 additional comparison columns', 'One row per candidate', 'A concise recommendation below the table'],
    requiredSections: ['Comparison matrix', 'Recommendation pane'],
    optionalSections: [],
    requiredActions: [],
    optionalActions: [],
    emptyStateBehavior: 'Explain that the matrix needs items plus criteria before it becomes useful.',
    loadingStateBehavior: 'Keep criteria headers fixed while rows or scoring details load.',
    errorStateBehavior: 'Preserve current criteria and loaded rows; mark missing scoring areas as incomplete.',
    smallPaneAdaptationNotes: ['Collapse the lowest-priority column first.', 'Keep Name / Item and the first criterion column visible.'],
    references: ['Procurement scorecards', 'Framework-comparison tables', 'Review-site feature grids'],
    populationInstructions: {
      summary: 'Render a single comparison matrix (max 5 columns including the Name / Item column) and a recommendation pane below it.',
      steps: [
        'Always include a Name / Item column as the first column.',
        'Add at most four additional criteria columns.',
        'Normalize language across rows so cells are scannable.',
        'Follow the table with a single recommendation pane that states the suggested pick and why.'
      ],
      guardrails: [
        'Never exceed 5 total columns including the Name / Item column.',
        'Do not render a top summary pane with stats or badges — the only surface above the recommendation is the table itself.',
        'Do not reorder rows unexpectedly across refreshes.'
      ]
    },
    updateRules: {
      patchPrefer: ['Patch cell values and the recommendation in place.'],
      replaceTriggers: ['Replace the matrix only when the compared item set or criteria model changes materially.'],
      persistAcrossUpdates: ['Row order', 'Column order'],
      stableRegions: ['Name / Item column', 'Recommendation pane position']
    }
  },
  'event-planner': {
    id: 'event-planner',
    name: 'Event Planner',
    category: 'operations',
    useCase: 'Plan an event with tabs for venues, guests, checklist, itinerary, and notes.',
    purpose: 'A persistent planning workspace for event logistics and decision tracking.',
    primaryUserGoal: 'Keep venue, guest, checklist, and notes organized in one stable place.',
    whenHermesShouldChoose:
      'Choose this when the user is coordinating an event over time instead of handling a one-off search result.',
    selectionSignals: ['event planning', 'venue and guests', 'event checklist', 'organize party'],
    goodFor: ['Private events', 'Team offsites', 'Meetups'],
    supports: ['Multi-tab organization', 'Venue selection', 'Guest updates', 'Checklist interactions', 'Editable itinerary'],
    preferredLayout: 'timeline-tabs',
    supportedTabs: ['Venues', 'Guests', 'Checklist', 'Itinerary', 'Notes'],
    idealDataShape: ['Venue shortlist', 'Guest list', 'Checklist items', 'Itinerary events', 'Notes'],
    requiredSections: ['Tab rail', 'Venue shortlist', 'Guest list', 'Checklist panel', 'Itinerary tab', 'Notes panel'],
    optionalSections: ['Budget note', 'Guest reminders'],
    requiredActions: ['Select venue', 'Add guest', 'Add note', 'Mark checklist item', 'Adjust itinerary'],
    optionalActions: ['Open venue site', 'Pin venue', 'Draft invite note'],
    emptyStateBehavior: 'Show the event shell with the core planning tabs and guidance about how each tab is used.',
    loadingStateBehavior: 'Keep tabs and checklist structure visible while venues or guest details arrive.',
    errorStateBehavior: 'Preserve manual planning state and isolate failures to the affected tab.',
    smallPaneAdaptationNotes: ['Tabs should stay the primary navigation on small panes.', 'Checklist progress should remain visible near the top.'],
    references: ['Project planner boards', 'Checklist apps', 'Event coordination notebooks'],
    populationInstructions: {
      summary: 'Populate the event planner with stable tabs so repeated updates feel like ongoing organization.',
      steps: [
        'Use venues for place options, guests for invite context, checklist for action items, and itinerary for run-of-show changes.',
        'Keep notes as operator-authored context rather than output-only summaries.',
        'Expose direct venue selection, guest addition, checklist interaction, and itinerary adjustment affordances.'
      ],
      guardrails: [
        'Do not merge checklist state into notes.',
        'Do not drop completed checklist items during incremental updates.',
        'Keep tabs stable even as details expand.'
      ]
    },
    updateRules: {
      patchPrefer: ['Append checklist items, venue updates, and guest notes without replacing the whole planner.', 'Patch individual tab content independently.'],
      replaceTriggers: ['Replace the planner only when the event itself changes materially.'],
      persistAcrossUpdates: ['Checklist completion', 'Selected tab', 'Pinned venue', 'Manual notes', 'Guest list state', 'Itinerary adjustments'],
      stableRegions: ['Tab rail', 'Checklist tab', 'Notes tab', 'Itinerary tab']
    }
  },
  'job-search-pipeline': {
    id: 'job-search-pipeline',
    name: 'Job Listings',
    category: 'operations',
    useCase: 'Find and compare job postings across companies with salary, location, and role details.',
    purpose: 'A structured job-listing workspace that surfaces salary ranges, descriptions, and application links for quick comparison.',
    primaryUserGoal: 'Discover and compare relevant job postings to decide which roles are worth pursuing.',
    whenHermesShouldChoose:
      'Choose this when the user is searching for job postings, comparing roles, or gathering listings across companies.',
    selectionSignals: ['job listings', 'find jobs', 'job postings', 'open positions', 'apply to jobs'],
    goodFor: ['Job discovery', 'Browsing openings', 'Applying in batch'],
    supports: ['Job table', 'Selectable rows', 'Apply to selected', 'Find more'],
    preferredLayout: 'matrix',
    supportedTabs: [],
    idealDataShape: ['One row per job listing', 'Columns: position, company, estimated pay, link', 'Every row carries a direct link to the posting'],
    requiredSections: ['Job listings table', 'Selection action bar'],
    optionalSections: [],
    requiredActions: ['Apply to selected', 'Find more'],
    optionalActions: [],
    emptyStateBehavior: 'Show an empty state that invites the user to describe the role and seed the first batch.',
    loadingStateBehavior: 'Keep the table scaffold in place while rows stream in.',
    errorStateBehavior: 'Preserve existing rows and mark failed refreshes inline.',
    smallPaneAdaptationNotes: ['Collapse the estimated-pay column before the company column.', 'Keep Position and Link visible at the smallest widths.'],
    references: ['LinkedIn jobs tables', 'Indeed listings', 'Wellfound job feed'],
    populationInstructions: {
      summary: 'Render a selectable job-listings table with four columns (Position, Company, Estimated Pay, Link). Below the table, render two buttons: "Apply to selected" and "Find more".',
      steps: [
        'Use one row per job listing.',
        'Put Position in the first column, Company next, Estimated Pay next, and a hyperlinked Link in the last column.',
        'Make rows selectable via a leading checkbox.',
        '"Apply to selected" is enabled only when at least one row is selected and prompts Hermes to apply to those jobs.',
        '"Find more" asks Hermes to populate the table with additional job listings.'
      ],
      guardrails: [
        'Never render an Application pipeline, kanban board, Notes tab, or Research tab on this recipe.',
        'Every row must have a link column.',
        'Do not remove selections when new rows are appended.'
      ]
    },
    updateRules: {
      patchPrefer: ['Append new rows without replacing existing rows.', 'Patch pay ranges in place.'],
      replaceTriggers: ['Replace the whole table only when the user redefines the job search entirely.'],
      persistAcrossUpdates: ['Selected rows', 'Row order'],
      stableRegions: ['Column order', 'Action bar']
    }
  },
  'content-campaign-planner': {
    id: 'content-campaign-planner',
    name: 'Content / Campaign Planner',
    category: 'operations',
    useCase: 'Manage ideas, drafts, schedule, and email output for a content or campaign workflow.',
    purpose: 'A lightweight editorial workflow with stable tabs, idea expansion, and launch-email support.',
    primaryUserGoal: 'Keep creative work moving from idea to scheduled output without losing idea notes or launch context.',
    whenHermesShouldChoose:
      'Choose this when the user is organizing a content plan, campaign calendar, or editorial workflow.',
    selectionSignals: ['content plan', 'campaign planner', 'editorial schedule', 'draft pipeline'],
    goodFor: ['Editorial calendars', 'Launch campaigns', 'Content ops'],
    supports: ['Workflow tabs', 'Status chips', 'Idea notes', 'Email writing'],
    preferredLayout: 'kanban',
    supportedTabs: ['Ideas', 'Drafts', 'Schedule', 'Email'],
    idealDataShape: ['Idea list', 'Draft summaries', 'Scheduled items', 'Email draft context', 'Status chips'],
    requiredSections: ['Tab rail', 'Idea list', 'Draft list', 'Schedule timeline', 'Email write panel'],
    optionalSections: ['Brief note', 'Owner chips', 'Launch reminders'],
    requiredActions: ['Flesh out idea', 'Add note', 'Write email'],
    optionalActions: ['Pin campaign', 'Duplicate draft', 'Ask Hermes for another angle'],
    emptyStateBehavior: 'Provide a clean campaign shell with idea, draft, schedule, and email tabs.',
    loadingStateBehavior: 'Keep the workflow tabs and stage layout stable while items populate.',
    errorStateBehavior: 'Preserve existing cards and label incomplete schedule or asset updates per tab.',
    smallPaneAdaptationNotes: ['Use tab-first navigation and keep status chips compact.', 'Favor one-column card stacks for draft-heavy views.'],
    references: ['Editorial planners', 'Kanban content boards', 'Marketing ops dashboards'],
    populationInstructions: {
      summary: 'Populate a stable workflow from ideas through schedule, using a simple list for Ideas rather than a kanban of lanes.',
      steps: [
        'Use a flat list (not a kanban board) for ideas.',
        'Keep status transitions explicit.',
        'Preserve short operator notes on each idea so half-formed concepts can be expanded later.'
      ],
      guardrails: [
        'Never render an "Idea lanes" kanban on this recipe — the Ideas tab is a simple list.',
        'Do not flatten the workflow into one generic to-do list.',
        'Do not drop scheduled items when draft details change.'
      ]
    },
    updateRules: {
      patchPrefer: ['Patch cards and status changes in place.', 'Append idea notes and email draft context without replacing tabs.'],
      replaceTriggers: ['Replace the planner only when the campaign scope changes entirely.'],
      persistAcrossUpdates: ['Selected tab', 'Manual notes', 'Pinned campaigns', 'Card ordering where user-curated'],
      stableRegions: ['Tabs', 'Workflow status model', 'Email tab']
    }
  },
  'local-discovery-comparison': {
    id: 'local-discovery-comparison',
    name: 'Local Discovery Comparison',
    hiddenFromGallery: true,
    category: 'travel',
    useCase: 'Compare local services, venues, or shops beyond just restaurants and hotels.',
    purpose: 'A flexible local-search comparison workspace for place categories that still need structured evaluation.',
    primaryUserGoal: 'Compare local options in one area with direct links and grouped decision context.',
    whenHermesShouldChoose:
      'Choose this when the user is comparing nearby providers or places that do not fit the dedicated restaurant or hotel templates.',
    selectionSignals: ['compare nearby places', 'local services', 'shops in an area', 'venues nearby'],
    goodFor: ['Salons', 'Gyms', 'Event venues', 'Service providers'],
    supports: ['Grouped compare mode', 'Direct website/contact links', 'Local filters', 'Template transition path'],
    preferredLayout: 'list-detail',
    supportedTabs: ['Results', 'Saved', 'Notes'],
    idealDataShape: ['Place list', 'Category and rating info', 'Contact links', 'Grouped notes'],
    requiredSections: ['Filter strip', 'Results list', 'Detail panel', 'Action bar'],
    optionalSections: ['Saved tab', 'Notes tab', 'Category group chips'],
    requiredActions: ['Save place', 'Ask Hermes to compare', 'Convert to event plan'],
    optionalActions: ['Call provider', 'Open map directions', 'Pin favorite'],
    emptyStateBehavior: 'Use a generic local-discovery empty state that invites a place type plus area.',
    loadingStateBehavior: 'Keep list/detail scaffolding fixed while results resolve.',
    errorStateBehavior: 'Preserve loaded places and clearly mark missing listing or contact data.',
    smallPaneAdaptationNotes: ['Results should stay list-first on narrow panes.', 'Keep rating, category, and one direct contact action visible.'],
    references: ['Local directory flows', 'Maps result lists', 'Marketplace comparison patterns'],
    populationInstructions: {
      summary: 'Populate structured local results for non-restaurant categories while keeping the comparison surface simple.',
      steps: [
        'Use one result row per place or provider.',
        'Surface the most decision-relevant attributes for that category.',
        'Reserve detail recipe for address, contact, richer notes, and any follow-on template transition path.'
      ],
      guardrails: [
        'Do not imitate a full map UI.',
        'Do not hide contact actions behind nested controls.',
        'Preserve saved items and notes across refreshes.'
      ]
    },
    updateRules: {
      patchPrefer: ['Patch result rows and detail fields in place.', 'Append notes and saved places incrementally.', 'Preserve the selected place so a later template switch can reuse it.'],
      replaceTriggers: ['Replace the result set only when the area or provider category changes materially.'],
      persistAcrossUpdates: ['Selected place', 'Saved places', 'Notes', 'Active filters', 'Transition-ready selected entity'],
      stableRegions: ['Tabs', 'List/detail structure', 'Action bar']
    }
  },
  'step-by-step-instructions': {
    id: 'step-by-step-instructions',
    name: 'Step-by-Step Instructions',
    category: 'operations',
    useCase: 'Follow a compact procedure with stateful checkboxes, markdown, and copyable code blocks.',
    purpose: 'A tight checklist-style guide with markdown-formatted steps, code blocks that carry a copy button, and checkboxes that strike through completed work.',
    primaryUserGoal: 'Follow instructions or a troubleshooting guide without missing a step, copying commands in one click.',
    whenHermesShouldChoose: 'Use this any time the user asks how to do something, requests a tutorial, or asks how to troubleshoot an issue.',
    selectionSignals: ['how to', 'step by step', 'instructions', 'tutorial', 'guide', 'walkthrough', 'procedure', 'troubleshoot', 'fix', 'why is', 'how do I'],
    goodFor: ['Setup guides', 'Deployment procedures', 'Troubleshooting recipes', 'Configuration walkthroughs', 'CLI recipes'],
    supports: ['Compact layout', 'Stateful checkboxes with strikethrough', 'Markdown formatting per step', 'Code blocks with copy buttons', 'Prerequisites'],
    preferredLayout: 'checklist',
    supportedTabs: [],
    idealDataShape: ['Optional prerequisites as a string list', 'Ordered steps, each with a markdown label and optional markdown detail', 'Code blocks inside step detail are rendered with a copy affordance'],
    requiredSections: ['Checklist with steps'],
    optionalSections: ['Prerequisites'],
    requiredActions: [],
    optionalActions: [],
    emptyStateBehavior: 'Show a placeholder inviting the user to describe the procedure they need guidance on.',
    loadingStateBehavior: 'Show compact numbered step skeletons with checkbox placeholders.',
    errorStateBehavior: 'Keep any steps that were already populated and annotate incomplete sections.',
    smallPaneAdaptationNotes: ['Steps stack naturally on narrow viewports.', 'Code blocks scroll horizontally rather than wrapping.'],
    references: ['How-to guides', 'Runbooks', 'Troubleshooting docs', 'Tutorial sequences'],
    populationInstructions: {
      summary: 'Render a compact numbered checklist. Each step supports markdown (bold, links, inline code) and optional fenced code blocks that render with a copy button. Completed steps show the label struck through.',
      steps: [
        'List prerequisites up front as short strings.',
        'Add steps in order with an id and a markdown-formatted label.',
        'Use the step detail for additional explanation or a fenced code block — code blocks must render with a copy button.',
        'Checkbox state is session-local and strikes through the label plus detail.'
      ],
      guardrails: [
        'Keep the layout compact — no hero, no tabs, no action bar footer.',
        'Always populate at least one step.',
        'Never omit a copy button on a code block.',
        'Strike through the entire step (label and detail) when its checkbox is checked.'
      ]
    },
    updateRules: {
      patchPrefer: ['Append new steps. Update existing step labels in place.'],
      replaceTriggers: ['Replace only when the procedure changes entirely.'],
      persistAcrossUpdates: ['Step checked state (session-local)'],
      stableRegions: ['Step order', 'Prerequisites']
    }
  },
};
