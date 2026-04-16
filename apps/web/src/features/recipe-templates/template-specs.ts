import type { RecipeTemplateId, RecipeTemplateSpec } from './types';

export const RECIPE_TEMPLATE_SPECS: Record<RecipeTemplateId, RecipeTemplateSpec> = {
  'price-comparison-grid': {
    id: 'price-comparison-grid',
    name: 'Price Comparison Grid',
    category: 'commerce',
    useCase: 'Compare the same or similar products across multiple merchants before buying.',
    purpose: 'A dense comparison surface for price, shipping, availability, and rating differences.',
    primaryUserGoal: 'Find the best overall buying option without losing merchant-by-merchant context.',
    whenHermesShouldChoose:
      'Choose this when the user is comparing identical or near-identical products across two or more stores and the primary question is price or value.',
    selectionSignals: ['compare prices', 'which store is cheapest', 'same product at different merchants', 'shipping and availability'],
    goodFor: ['Store price checks', 'Cart optimization', 'Merchant comparison'],
    supports: ['Sortable rows', 'Merchant columns', 'Buy links', 'Alternative prompts'],
    preferredLayout: 'comparison-grid',
    supportedTabs: ['Overview', 'Specs', 'Notes'],
    idealDataShape: ['One canonical product row per item', 'Merchant offer cells', 'Price, shipping, stock, rating, and notes'],
    requiredSections: ['Header summary', 'Comparison table', 'Quick actions'],
    optionalSections: ['Merchant notes', 'Saved alternatives list', 'Scope tags under table'],
    requiredActions: ['Open merchant', 'Save item', 'Remove row', 'Ask Hermes to compare alternatives'],
    optionalActions: ['Sort by shipping', 'Hide unavailable', 'Pin preferred merchant'],
    emptyStateBehavior: 'Show a merchant-ready placeholder with an invitation to add products or ask Hermes for comparison inputs.',
    loadingStateBehavior: 'Hold header, stats, and table scaffolding in place while merchant rows stream in.',
    errorStateBehavior: 'Preserve any confirmed rows and replace failed merchant cells with explicit unavailable/error markers.',
    smallPaneAdaptationNotes: ['Collapse merchant density before truncating row identity.', 'Keep the product name and best-price column pinned first.'],
    references: ['Google Shopping comparison tables', 'Amazon compare surfaces', 'Procurement scorecards'],
    populationInstructions: {
      summary: 'Populate one row per compared product and keep merchant offers normalized into predictable columns.',
      steps: [
        'Create a canonical product label for each compared item.',
        'Group merchant offers under stable merchant columns instead of duplicating whole cards.',
        'Prefer concise attributes that explain value differences.'
      ],
      guardrails: [
        'Do not invent merchant-specific actions that are not supported.',
        'Do not rewrite the whole table when only one offer changes.',
        'Keep notes and saved decisions outside the merchant cells.'
      ]
    },
    updateRules: {
      patchPrefer: ['Append or update merchant cells in place.', 'Patch row metrics and shipping deltas without changing row order unless the user asks to sort.'],
      replaceTriggers: ['Replace the whole table only when the compared product set changes entirely.', 'Replace the specs tab only when the product identity changes.'],
      persistAcrossUpdates: ['Saved items', 'Pinned merchant preference', 'Manual notes', 'Sort direction'],
      stableRegions: ['Tabs', 'Primary table columns', 'Saved notes panel']
    }
  },
  'shopping-shortlist': {
    id: 'shopping-shortlist',
    name: 'Shopping Shortlist',
    category: 'commerce',
    useCase: 'Review a curated shortlist of candidate products with fast card-level decisions.',
    purpose: 'An image-forward shortlist that balances quick scanning with concise product highlights.',
    primaryUserGoal: 'Narrow a broad search down to a few strong candidates and keep notes on why.',
    whenHermesShouldChoose:
      'Choose this when the user wants a curated shortlist rather than a dense row-and-column comparison.',
    selectionSignals: ['shortlist items', 'best options', 'saved products', 'top picks'],
    goodFor: ['Gift shopping', 'Home goods', 'Fashion shortlist'],
    supports: ['Image-first cards', 'Quick notes', 'Save/remove', 'Compare alternatives'],
    preferredLayout: 'image-shortlist',
    supportedTabs: ['Shortlist', 'Notes'],
    idealDataShape: ['One card per candidate item', 'Image label or media hint', 'Price, highlights, and shortlist note'],
    requiredSections: ['Hero summary', 'Card grid', 'Quick actions'],
    optionalSections: ['Notes panel', 'Filter strip', 'Saved reasons summary'],
    requiredActions: ['Open listing', 'Save', 'Remove', 'Ask Hermes for alternatives'],
    optionalActions: ['Filter by price band', 'Group by brand', 'Pin top choice'],
    emptyStateBehavior: 'Show a calm saved-items empty state that asks Hermes to gather a first shortlist.',
    loadingStateBehavior: 'Reserve card shells and preserve any saved notes while new cards arrive.',
    errorStateBehavior: 'Keep the current shortlist visible and mark failed item refreshes inline.',
    smallPaneAdaptationNotes: ['Collapse to one column with persistent action pills.', 'Keep price and one highlight visible above the fold.'],
    references: ['Saved items lists', 'Curated shopping collections', 'Modern mobile commerce cards'],
    populationInstructions: {
      summary: 'Fill a visually balanced card set with concise reasons each option is on the shortlist.',
      steps: [
        'Use one card per distinct option and lead with the most decision-relevant image or media label.',
        'Keep bullets short and specific.',
        'Store comparison or personal context in notes instead of overloading the card body.'
      ],
      guardrails: [
        'Do not turn this into a full matrix view.',
        'Avoid duplicate items that differ only trivially.',
        'Respect any user-authored shortlist notes across updates.'
      ]
    },
    updateRules: {
      patchPrefer: ['Update card price, availability, and highlights in place.', 'Append shortlist notes without replacing existing notes.'],
      replaceTriggers: ['Replace the shortlist only when the user changes the product hunt entirely.', 'Replace hero copy only when the main search intent changes.'],
      persistAcrossUpdates: ['Pinned items', 'Shortlist notes', 'Manual removals', 'Selected card state'],
      stableRegions: ['Shortlist tab', 'Action bar', 'Notes panel']
    }
  },
  'inbox-triage-board': {
    id: 'inbox-triage-board',
    name: 'Inbox Triage Board',
    category: 'communication',
    useCase: 'Group unread or noisy senders into clear buckets for inbox cleanup.',
    purpose: 'A queue-style inbox board that favors grouped senders, counts, and bulk actions over thread-by-thread reading.',
    primaryUserGoal: 'Reduce inbox noise quickly while keeping enough sender detail to act safely.',
    whenHermesShouldChoose:
      'Choose this when the user asks to triage unread email, clean up promotional senders, or batch-handle recurring inbox clutter.',
    selectionSignals: ['unread email', 'triage inbox', 'clean up senders', 'archive promotions'],
    goodFor: ['Unread sender triage', 'Bulk email cleanup', 'Queue-style inbox review'],
    supports: ['Grouped senders', 'Metrics', 'Bulk actions', 'Detail preview'],
    preferredLayout: 'triage-board',
    supportedTabs: ['Senders', 'Rules', 'Notes'],
    idealDataShape: ['Sender groups with message counts', 'Metrics per group', 'Representative preview for the selected sender'],
    requiredSections: ['Stat strip', 'Grouped senders list', 'Detail preview', 'Bulk action toolbar'],
    optionalSections: ['Suggested rule callout', 'Notes tab', 'Archive summary'],
    requiredActions: ['Archive', 'Move', 'Create rule', 'Ask Hermes to draft a safe cleanup'],
    optionalActions: ['Unsubscribe', 'Pin sender', 'Mark priority'],
    emptyStateBehavior: 'Celebrate a clean inbox with a compact zero-noise state and a note about what was checked.',
    loadingStateBehavior: 'Show sender-group skeletons and keep bulk-action recipe reserved so the layout does not jump.',
    errorStateBehavior: 'Preserve already loaded sender groups, disable destructive bulk actions, and explain which counts may be stale.',
    smallPaneAdaptationNotes: ['Use a stacked list-detail flow instead of side-by-side panes.', 'Keep bulk actions sticky at the bottom edge in narrow layouts.'],
    references: ['Gmail category triage', 'Admin moderation queues', 'Email cleanup dashboards'],
    populationInstructions: {
      summary: 'Group emails by sender or sender cluster first, then surface the metrics and the safest next actions.',
      steps: [
        'Aggregate senders into meaningful triage groups with counts and last-seen context.',
        'Select one representative sender detail pane for the preview state.',
        'Keep actions bounded to the supported inbox operations.'
      ],
      guardrails: [
        'Do not dump raw individual-message lists into the primary board.',
        'Do not remove counts or grouping stability between updates.',
        'Never apply actions implicitly in the preview.'
      ]
    },
    updateRules: {
      patchPrefer: ['Patch counts, previews, and sender summaries in place.', 'Append newly detected senders to the most relevant group.'],
      replaceTriggers: ['Replace grouping only when the triage objective changes materially, such as moving from unread senders to newsletters-only.'],
      persistAcrossUpdates: ['Selected sender preview', 'Manual rule notes', 'Collapsed groups', 'Acknowledged sender decisions'],
      stableRegions: ['Tabs', 'Sender grouping model', 'Bulk action toolbar']
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
    requiredActions: ['Open menu', 'Open website', 'Save option', 'Ask Hermes to book'],
    optionalActions: ['Call venue', 'Open map directions', 'Compare alternatives'],
    emptyStateBehavior: 'Show a local-search empty state with filters and a prompt to widen the area or cuisine.',
    loadingStateBehavior: 'Hold list and detail shells so the selected venue context stays anchored while results update.',
    errorStateBehavior: 'Preserve any loaded venues, disable booking prompts for stale entries, and surface source limitations clearly.',
    smallPaneAdaptationNotes: ['Collapse into a vertical results-first flow with a sticky selected-venue card.', 'Keep cuisine, price, and rating visible in each row.'],
    references: ['Yelp list-detail flows', 'Google Maps local results', 'OpenTable action affordances'],
    populationInstructions: {
      summary: 'Populate a result list that is easy to scan quickly and a selected-venue detail state that feels decision ready.',
      steps: [
        'Lead with a concise filter context such as cuisine, distance, or price band.',
        'Present the top venues as compact rows with consistent stats.',
        'Use the detail panel for hours, links, and booking-related context.'
      ],
      guardrails: [
        'Do not invent map tiles or arbitrary geospatial UI.',
        'Do not hide direct website/menu actions behind nested interactions.',
        'Avoid replacing the whole list when only one venue detail changes.'
      ]
    },
    updateRules: {
      patchPrefer: ['Patch venue rows, hours, and detail fields in place.', 'Append shortlist notes and saved items incrementally.'],
      replaceTriggers: ['Replace the result set when the search area or cuisine scope changes meaningfully.'],
      persistAcrossUpdates: ['Selected venue', 'Saved venues', 'User notes', 'Active filter chips'],
      stableRegions: ['Tabs', 'List/detail structure', 'Action bar']
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
    supports: ['Price', 'Amenities', 'Location notes', 'Booking links'],
    preferredLayout: 'travel-compare',
    supportedTabs: ['Hotels', 'Notes', 'Links'],
    idealDataShape: ['Hotel cards or rows', 'Nightly price', 'Location summary', 'Amenity highlights', 'Operator notes'],
    requiredSections: ['Header summary', 'Hotel shortlist cards', 'Stat strip', 'Notes tab'],
    optionalSections: ['Links tab', 'Neighborhood reminders', 'Per-property tags'],
    requiredActions: ['Open booking link', 'Save hotel', 'Remove hotel', 'Ask Hermes for better tradeoffs'],
    optionalActions: ['Filter amenities', 'Sort by value', 'Pin favorite'],
    emptyStateBehavior: 'Show a destination-specific prompt to add candidate hotels or ask Hermes to generate a shortlist.',
    loadingStateBehavior: 'Keep card positions stable and show price/amenity placeholders instead of collapsing the grid.',
    errorStateBehavior: 'Preserve any confirmed hotels and annotate stale prices or missing booking sources per card.',
    smallPaneAdaptationNotes: ['Switch to one-card-per-row and keep nightly price plus two top amenities visible.', 'Move notes into a dedicated tab on narrow screens.'],
    references: ['Booking property lists', 'Airbnb saved-property flows', 'TripAdvisor shortlist patterns'],
    populationInstructions: {
      summary: 'Fill a concise hotel shortlist with strong price/location/amenity tradeoff signals.',
      steps: [
        'Use one distinct property card per hotel.',
        'Highlight the most decision-relevant amenities and neighborhood context.',
        'Keep booking actions direct and visible.'
      ],
      guardrails: [
        'Do not overload cards with full review dumps.',
        'Do not reorder the shortlist on every small price refresh.',
        'Preserve user notes and saved status.'
      ]
    },
    updateRules: {
      patchPrefer: ['Patch prices, amenity notes, and links in place.', 'Append notes instead of regenerating them.'],
      replaceTriggers: ['Replace the hotel set only when the destination, date range, or trip style changes materially.'],
      persistAcrossUpdates: ['Saved hotels', 'Pinned favorite', 'Notes tab', 'Sort and filter choices'],
      stableRegions: ['Tabs', 'Hotel shortlist ordering', 'Notes tab']
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
    supports: ['Outbound/return tabs', 'Price and stops', 'Booking link', 'Ask Hermes action'],
    preferredLayout: 'travel-compare',
    supportedTabs: ['Outbound', 'Return', 'Notes'],
    idealDataShape: ['Separate itinerary sets per leg', 'Price, airline, stops, duration, booking link', 'Optional notes'],
    requiredSections: ['Tab rail', 'Flight comparison table', 'Stat strip', 'Primary action bar'],
    optionalSections: ['Notes tab', 'Fare caveats', 'Preferred-airline chips'],
    requiredActions: ['Open itinerary', 'Save itinerary', 'Ask Hermes to optimize tradeoffs'],
    optionalActions: ['Filter by stops', 'Highlight best duration', 'Compare baggage policies'],
    emptyStateBehavior: 'Explain that no itineraries are loaded yet and invite a route/date prompt.',
    loadingStateBehavior: 'Keep tab structure visible and stream itineraries into the active leg instead of blanking the page.',
    errorStateBehavior: 'Preserve the last valid leg table and label unavailable fare data explicitly.',
    smallPaneAdaptationNotes: ['Show the active leg first with compact rows.', 'Keep price, stops, and departure time as the first scan line.'],
    references: ['Kayak results', 'Google Flights compare views', 'Airline search summaries'],
    populationInstructions: {
      summary: 'Populate outbound and return results separately so flight decisions remain leg-aware.',
      steps: [
        'Use stable itinerary rows with price, stops, duration, and carrier.',
        'Keep outbound and return data in separate tabs or lanes.',
        'Add concise caveats when baggage or fare restrictions matter.'
      ],
      guardrails: [
        'Do not merge outbound and return data into one ambiguous list.',
        'Do not rewrite the selected leg when the inactive leg updates.',
        'Keep booking actions tied to concrete itinerary rows.'
      ]
    },
    updateRules: {
      patchPrefer: ['Patch itinerary rows within the active leg.', 'Append notes and fare caveats without clearing prior notes.'],
      replaceTriggers: ['Replace an entire leg only when route or date inputs change for that leg.'],
      persistAcrossUpdates: ['Selected tab', 'Saved itinerary', 'Notes', 'User filter chips'],
      stableRegions: ['Tab rail', 'Comparison table columns', 'Notes tab']
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
    supports: ['Timeline', 'Bookings tab', 'Packing tab', 'Links tab'],
    preferredLayout: 'timeline-tabs',
    supportedTabs: ['Itinerary', 'Bookings', 'Packing', 'Links'],
    idealDataShape: ['Dated itinerary events', 'Booking records', 'Checklist items', 'Useful links'],
    requiredSections: ['Tab rail', 'Timeline', 'Booking summary', 'Notes or checklist'],
    optionalSections: ['Packing tab', 'Links tab', 'Travel reminders'],
    requiredActions: ['Open booking', 'Add note', 'Ask Hermes to refine plan'],
    optionalActions: ['Mark checklist item', 'Reorder day plan', 'Open map link'],
    emptyStateBehavior: 'Start with a clear trip scaffold that explains the four core tabs and invites itinerary seeding.',
    loadingStateBehavior: 'Keep existing tabs and chronology visible while new itinerary segments or bookings arrive.',
    errorStateBehavior: 'Preserve the current trip state and isolate degraded data to the affected tab.',
    smallPaneAdaptationNotes: ['Prefer tab-driven navigation over multi-column layouts.', 'Keep day summary cards tight and chronologically clear.'],
    references: ['Travel planner apps', 'Itinerary managers', 'Notebook-style trip dashboards'],
    populationInstructions: {
      summary: 'Populate stable trip tabs so later updates feel like travel-plan maintenance instead of a full rewrite.',
      steps: [
        'Use the itinerary tab for chronological events only.',
        'Move confirmations and reservation details into bookings.',
        'Keep links and checklist content in dedicated tabs.'
      ],
      guardrails: [
        'Do not collapse the planner into one long markdown note.',
        'Do not replace completed checklist items when adding new ones.',
        'Keep tabs stable for the lifetime of the trip.'
      ]
    },
    updateRules: {
      patchPrefer: ['Append itinerary events, bookings, and packing items in place.', 'Patch changed reservation details without rewriting unaffected tabs.'],
      replaceTriggers: ['Replace the planner only if the trip itself changes to a different destination or date range.'],
      persistAcrossUpdates: ['Selected tab', 'Checklist completion', 'Manual notes', 'Pinned links'],
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
    supports: ['Sources tab', 'Notes tab', 'Extracted points tab', 'Ask follow-up actions'],
    preferredLayout: 'research-notebook',
    supportedTabs: ['Sources', 'Notes', 'Extracted points', 'Follow-ups'],
    idealDataShape: ['Source list', 'Extracted claims or findings', 'Operator notes', 'Follow-up prompts'],
    requiredSections: ['Tab rail', 'Sources list', 'Notes panel', 'Extracted points'],
    optionalSections: ['Open questions', 'Source quality chips', 'Follow-up prompt actions'],
    requiredActions: ['Open source', 'Add note', 'Run follow-up prompt', 'Pin claim'],
    optionalActions: ['Mark source reviewed', 'Group by theme', 'Copy citation'],
    emptyStateBehavior: 'Start with a notebook shell that explains how sources, notes, and extracted points will stay separate.',
    loadingStateBehavior: 'Keep existing tabs and note state fixed while new sources or extracted points arrive.',
    errorStateBehavior: 'Preserve already captured research material and show which extraction lane failed.',
    smallPaneAdaptationNotes: ['Use tab-first navigation and avoid side-by-side source/notes panes on narrow widths.', 'Keep source title, publication, and one relevance line visible.'],
    references: ['Notion research pages', 'Obsidian note collections', 'Apple Notes source stacks'],
    populationInstructions: {
      summary: 'Populate evidence, notes, and extracted points as separate but connected surfaces.',
      steps: [
        'Add one source item per document, article, or page.',
        'Store synthesized findings in extracted points rather than mixing them into raw source rows.',
        'Render follow-up prompts as immediately runnable actions, not inert text.',
        'Use follow-up actions for the next round of research prompts.'
      ],
      guardrails: [
        'Do not collapse all information into a single markdown wall.',
        'Do not replace user-authored notes when sources update.',
        'Keep source identity stable across updates.'
      ]
    },
    updateRules: {
      patchPrefer: ['Append sources and extracted points.', 'Patch existing source summaries rather than replacing the whole notebook.'],
      replaceTriggers: ['Replace the notebook only when the research topic changes completely.'],
      persistAcrossUpdates: ['Selected tab', 'Operator notes', 'Pinned claims', 'Reviewed markers'],
      stableRegions: ['Tab rail', 'Notes tab', 'Source ordering']
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
    supports: ['Severity grouping', 'Evidence detail', 'Remediation actions', 'Issue status tracking'],
    preferredLayout: 'workbench',
    supportedTabs: ['Findings', 'Remediation', 'Evidence'],
    idealDataShape: ['Severity-grouped findings', 'Evidence items', 'Remediation actions', 'Status tracking'],
    requiredSections: ['Severity groups', 'Structured finding detail', 'Remediation block', 'Status chips'],
    optionalSections: ['Scope note', 'Owner field', 'Verification log'],
    requiredActions: ['Open evidence', 'Assign remediation', 'Change status'],
    optionalActions: ['Escalate severity', 'Ask Hermes to summarize', 'Add verification note'],
    emptyStateBehavior: 'Show a review-ready board that explains severity grouping and evidence capture expectations.',
    loadingStateBehavior: 'Keep severity lanes visible and stream findings into the appropriate group.',
    errorStateBehavior: 'Preserve validated findings and label missing evidence or remediation data explicitly.',
    smallPaneAdaptationNotes: ['Render severity groups as stacked sections.', 'Keep severity, title, and status visible on each card before evidence.'],
    references: ['Security triage dashboards', 'Audit review boards', 'Risk register layouts'],
    populationInstructions: {
      summary: 'Populate finding cards with clear severity, status chips, evidence context, and remediation direction.',
      steps: [
        'Group findings by severity first.',
        'Attach a short evidence summary to each finding and reserve long detail for the evidence panel.',
        'Track remediation state separately from the finding narrative.'
      ],
      guardrails: [
        'Do not flatten severity into a single undifferentiated list.',
        'Do not overwrite remediation state when evidence expands.',
        'Keep evidence and remediation tied to stable finding ids.'
      ]
    },
    updateRules: {
      patchPrefer: ['Patch finding severity, status, and remediation details in place.', 'Append evidence notes rather than replacing them.'],
      replaceTriggers: ['Replace the whole board only when the review scope changes completely.'],
      persistAcrossUpdates: ['Status changes', 'Owner assignments', 'Selected finding', 'Verification notes'],
      stableRegions: ['Severity grouping', 'Remediation tab', 'Evidence panel']
    }
  },
  'vendor-evaluation-matrix': {
    id: 'vendor-evaluation-matrix',
    name: 'Vendor Evaluation Matrix',
    category: 'commerce',
    useCase: 'Compare vendors or software products across weighted criteria and pricing.',
    purpose: 'A weighted decision matrix for procurement-style comparisons.',
    primaryUserGoal: 'Make a defendable vendor choice using consistent evaluation criteria.',
    whenHermesShouldChoose:
      'Choose this when the user is comparing tools, vendors, or services across criteria rather than shopping individual goods.',
    selectionSignals: ['compare vendors', 'software evaluation', 'weighted criteria', 'procurement matrix'],
    goodFor: ['Software selection', 'Procurement review', 'Service comparison'],
    supports: ['Weighted criteria', 'Pricing', 'Capability matrix', 'Notes'],
    preferredLayout: 'matrix',
    supportedTabs: ['Matrix', 'Notes', 'Links'],
    idealDataShape: ['Vendor rows', 'Criteria columns with weights', 'Pricing summaries', 'Links and notes'],
    requiredSections: ['Criteria summary', 'Evaluation matrix', 'Decision notes', 'Action bar'],
    optionalSections: ['Links tab', 'Shortlist badge set', 'Risk note'],
    requiredActions: ['Open vendor site', 'Save note', 'Ask Hermes to reweight'],
    optionalActions: ['Pin frontrunner', 'Hide vendor', 'Export criteria'],
    emptyStateBehavior: 'Explain that the matrix needs vendors plus criteria before it becomes useful.',
    loadingStateBehavior: 'Keep criteria headers fixed while vendor rows or scoring details load.',
    errorStateBehavior: 'Preserve current criteria and loaded vendors; mark missing scoring areas as incomplete.',
    smallPaneAdaptationNotes: ['Keep weighted criteria visible as compact chips above the matrix.', 'Collapse low-priority columns first.'],
    references: ['Procurement scorecards', 'Evaluation spreadsheets', 'Decision frameworks'],
    populationInstructions: {
      summary: 'Populate stable criteria columns and vendor rows so scoring remains explainable over time.',
      steps: [
        'Use clear weighted criteria labels.',
        'Normalize pricing and capability language across vendors.',
        'Keep notes and links adjacent but not inside scoring cells.'
      ],
      guardrails: [
        'Do not use arbitrary unweighted columns when weights are part of the decision.',
        'Do not reorder vendors unexpectedly once the user starts taking notes.',
        'Keep manual weighting changes stable.'
      ]
    },
    updateRules: {
      patchPrefer: ['Patch cell scores, vendor pricing, and notes in place.', 'Append vendor notes without rebuilding the matrix.'],
      replaceTriggers: ['Replace the matrix only when the compared vendor set or criteria model changes materially.'],
      persistAcrossUpdates: ['Manual weights', 'Pinned vendors', 'Notes', 'Selected vendor'],
      stableRegions: ['Criteria columns', 'Notes tab', 'Links tab']
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
    selectionSignals: ['job listings', 'find jobs', 'compare roles', 'job postings', 'open positions'],
    goodFor: ['Job discovery', 'Role comparison', 'Posting research'],
    supports: ['Salary ranges', 'Job descriptions', 'Application links', 'Cover letter', 'Interview prep', 'Company research'],
    preferredLayout: 'kanban',
    supportedTabs: ['Pipeline', 'Notes', 'Research'],
    idealDataShape: ['Stage columns', 'Application cards', 'Salary/location fields', 'Posting links', 'Interview prep notes', 'Company notes'],
    requiredSections: ['Kanban board', 'Detail panel', 'Interview prep block', 'Next-step actions'],
    optionalSections: ['Notes tab', 'Company research tab', 'Offer risk chips'],
    requiredActions: ['Update stage', 'Add note', 'Interview prep', 'Open posting'],
    optionalActions: ['Mark stale', 'Pin company', 'Open company link'],
    emptyStateBehavior: 'Show interview stages and invite the user to add or import applications.',
    loadingStateBehavior: 'Keep stages stable and stream cards into the board rather than reshaping it.',
    errorStateBehavior: 'Preserve existing applications and isolate failed research or note refreshes to their tab.',
    smallPaneAdaptationNotes: ['Convert the board into stacked stage sections with sticky next-step actions.', 'Keep company, stage, and location visible above the fold.'],
    references: ['Applicant tracking boards', 'CRM pipeline patterns', 'Career-planning workspaces'],
    populationInstructions: {
      summary: 'Populate stable application stages with one card per company role pair.',
      steps: [
        'Map each application to a clear stage.',
        'Use the detail panel for notes, salary, posting links, and interview prep context.',
        'Keep next steps actionable and concise.'
      ],
      guardrails: [
        'Do not rebuild stages across updates.',
        'Do not remove user notes or prep tasks when status changes.',
        'Keep company identity stable even if the role title changes slightly.'
      ]
    },
    updateRules: {
      patchPrefer: ['Patch application cards in place and move only changed items between stages.', 'Append interview notes incrementally.', 'Preserve company research and prep notes while stages change.'],
      replaceTriggers: ['Replace the board only if the user starts a completely different search context.'],
      persistAcrossUpdates: ['Selected application', 'Manual notes', 'Pinned companies', 'Collapsed stages'],
      stableRegions: ['Stage columns', 'Detail panel', 'Notes tab']
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
    idealDataShape: ['Idea cards', 'Draft summaries', 'Scheduled items', 'Email draft context', 'Status chips', 'Idea notes'],
    requiredSections: ['Tab rail', 'Workflow board', 'Email write panel', 'Action bar'],
    optionalSections: ['Brief note', 'Owner chips', 'Launch reminders'],
    requiredActions: ['Flesh out idea', 'Add note', 'Write email'],
    optionalActions: ['Pin campaign', 'Duplicate draft', 'Ask Hermes for another angle'],
    emptyStateBehavior: 'Provide a clean campaign shell with idea, draft, schedule, and email tabs.',
    loadingStateBehavior: 'Keep the workflow tabs and stage layout stable while items populate.',
    errorStateBehavior: 'Preserve existing cards and label incomplete schedule or asset updates per tab.',
    smallPaneAdaptationNotes: ['Use tab-first navigation and keep status chips compact.', 'Favor one-column card stacks for draft-heavy views.'],
    references: ['Editorial planners', 'Kanban content boards', 'Marketing ops dashboards'],
    populationInstructions: {
      summary: 'Populate a stable workflow from ideas through schedule, with idea notes and launch email handled explicitly.',
      steps: [
        'Use one card per content item or campaign.',
        'Keep status transitions explicit.',
        'Preserve short operator notes on each idea so half-formed concepts can be expanded later.'
      ],
      guardrails: [
        'Do not flatten the workflow into one generic to-do list.',
        'Do not drop scheduled items when draft details change.',
        'Preserve manual notes and email context.'
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
    useCase: 'Follow a multi-step procedure with prerequisites and checkable progress.',
    purpose: 'A checklist-style guide that shows prerequisites up front and numbered steps that can be checked off as completed.',
    primaryUserGoal: 'Complete a procedure without missing a step or prerequisite.',
    whenHermesShouldChoose: 'Choose this when the user is asking how to do something step by step, looking for a tutorial, or needs a procedural guide.',
    selectionSignals: ['how to', 'step by step', 'instructions', 'tutorial', 'guide', 'walkthrough', 'procedure'],
    goodFor: ['Setup guides', 'Deployment procedures', 'Configuration walkthroughs', 'Tutorial follow-along'],
    supports: ['Prerequisites list', 'Numbered steps', 'Checkbox progress', 'Step details', 'Notes'],
    preferredLayout: 'checklist',
    supportedTabs: ['Instructions', 'Notes'],
    idealDataShape: ['Optional prerequisites as a string list', 'Ordered steps with id, label, and optional detail', 'Optional notes'],
    requiredSections: ['Checklist with steps'],
    optionalSections: ['Prerequisites', 'Notes'],
    requiredActions: ['Add note'],
    optionalActions: ['Share instructions'],
    emptyStateBehavior: 'Show a placeholder inviting the user to describe the procedure they need guidance on.',
    loadingStateBehavior: 'Show numbered step skeletons with checkbox placeholders.',
    errorStateBehavior: 'Keep any steps that were already populated and annotate incomplete sections.',
    smallPaneAdaptationNotes: ['Steps stack naturally on narrow viewports.', 'Keep step numbers and checkboxes visible.'],
    references: ['How-to guides', 'Runbooks', 'Checklists', 'Tutorial sequences'],
    populationInstructions: {
      summary: 'List prerequisites first, then populate ordered steps with clear labels and optional detail.',
      steps: [
        'Add any prerequisites as simple strings.',
        'Add steps in order with an id, label, and optional detail.',
        'Add notes if relevant.'
      ],
      guardrails: [
        'Always populate at least one step.',
        'Keep step labels concise and action-oriented.',
        'Do not duplicate prerequisite information in step details.'
      ]
    },
    updateRules: {
      patchPrefer: ['Append new steps. Update existing step labels in place.'],
      replaceTriggers: ['Replace only when the procedure changes entirely.'],
      persistAcrossUpdates: ['Step checked state (session-local)', 'Notes'],
      stableRegions: ['Step order', 'Prerequisites']
    }
  },
};
