import type {
  Recipe,
  RecipeContentEntry,
  RecipeContentEntrySource,
  RecipeCardData,
  RecipeCellValue,
  RecipeContentTab,
  RecipeContentFormat,
  RecipeContentModel,
  RecipeExtensionTab,
  RecipeImage,
  RecipeLink,
  RecipeMarkdownData,
  RecipeRichTextValue,
  RecipeTableData,
  RecipeTab,
  RecipeUiState
} from './schemas';
import {
  RecipeCardDataSchema,
  RecipeCellValueSchema,
  RecipeContentEntrySchema,
  RecipeContentEntrySourceSchema,
  RecipeContentModelSchema,
  RecipeExtensionTabSchema,
  RecipeMarkdownDataSchema,
  RecipeRichTextValueSchema,
  RecipeTableDataSchema,
  RecipeTabSchema,
  RecipeUiStateSchema
} from './schemas';

const DEFAULT_MARKDOWN_REPRESENTATION: RecipeMarkdownData = {
  markdown: ''
};

const DEFAULT_TABLE_REPRESENTATION: RecipeTableData = {
  columns: [
    {
      id: 'value',
      label: 'Value',
      emphasis: 'primary',
      presentation: 'text'
    }
  ],
  rows: [],
  emptyMessage: 'No rows yet.'
};

const DEFAULT_CARD_REPRESENTATION: RecipeCardData = {
  cards: [],
  emptyMessage: 'No cards yet.'
};

type RecipeContentViewDataMap = {
  markdown: RecipeMarkdownData;
  table: RecipeTableData;
  card: RecipeCardData;
};

type RecipeContentEntryCandidate = {
  id?: string;
  md?: string;
  row?: Record<string, unknown>;
  card?: unknown;
  source?: unknown;
  metadata?: unknown;
};

type RecipeNormalizedTabs = [RecipeContentTab, ...RecipeExtensionTab[]];

type StructuredMarkdownField = {
  label: string;
  value: RecipeCellValue;
  link?: RecipeLink;
};

type StructuredMarkdownEntry = {
  title: string;
  titleLink?: RecipeLink;
  description?: string;
  fields: StructuredMarkdownField[];
  links: RecipeLink[];
  image?: RecipeImage;
  badges: string[];
  eyebrow?: string;
  sectionHeading?: string;
};

const LINK_KIND_LABELS = {
  website: 'Website',
  place: 'Place',
  booking: 'Booking',
  menu: 'Menu',
  map: 'Map',
  email: 'Email',
  other: 'Link'
} satisfies Record<RecipeLink['kind'], string>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseRecipeContentFormat(value: unknown): RecipeContentFormat | null {
  return value === 'markdown' || value === 'table' || value === 'card' ? value : null;
}

function truncateRecipeText(value: string, maxLength: number) {
  const normalized = value.replace(/\s+/gu, ' ').trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

function slugifyColumnId(label: string, fallback: string) {
  const normalized = label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, '_')
    .replace(/^_+|_+$/gu, '');
  return normalized || fallback;
}

function stripMarkdownFormatting(value: string) {
  return value
    .replace(/!\[([^\]\n]*)\]\(([^)\n]+)\)/gu, '$1')
    .replace(/\[([^\]\n]+)\]\(([^)\n]+)\)/gu, '$1')
    .replace(/[*_`>#]+/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim();
}

function splitMarkdownBlocks(markdown: string) {
  return markdown
    .replace(/\r\n/gu, '\n')
    .split(/\n{2,}/u)
    .map((chunk) => chunk.trim())
    .filter(Boolean);
}

function stripListMarker(line: string) {
  return line
    .replace(/^[-*+]\s+/u, '')
    .replace(/^\d+\.\s+/u, '')
    .trim();
}

function displayLabelForUrl(url: string) {
  return url
    .replace(/^mailto:/iu, '')
    .replace(/^https?:\/\//iu, '')
    .replace(/^www\./iu, '')
    .replace(/\/$/u, '');
}

function normalizeUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  if (/^mailto:/iu.test(trimmed)) {
    return trimmed;
  }

  if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/iu.test(trimmed)) {
    return `mailto:${trimmed}`;
  }

  if (/^https?:\/\//iu.test(trimmed)) {
    return trimmed;
  }

  if (/^www\./iu.test(trimmed)) {
    return `https://${trimmed}`;
  }

  if (/^[a-z0-9.-]+\.[a-z]{2,}(?:\/[^\s]*)?$/iu.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return null;
}

function classifyLinkKind(url: string, label?: string): RecipeLink['kind'] {
  const normalized = url.toLowerCase();
  const labelText = label?.toLowerCase() ?? '';

  if (normalized.startsWith('mailto:')) {
    return 'email';
  }
  if (/\b(menu|order)\b/u.test(labelText) || /\/menu\b/u.test(normalized)) {
    return 'menu';
  }
  if (/\b(book|reserve|reservation|stay)\b/u.test(labelText) || /(booking|marriott|hilton|hyatt|expedia|hotels\.com)/u.test(normalized)) {
    return 'booking';
  }
  if (/\b(map|directions|location)\b/u.test(labelText) || /(maps\.google|apple\.com\/maps|mapbox|openstreetmap)/u.test(normalized)) {
    return 'map';
  }
  if (/\b(place|listing|google maps|yelp|tripadvisor)\b/u.test(labelText) || /(yelp|tripadvisor|opentable)/u.test(normalized)) {
    return 'place';
  }
  if (/\b(site|website|homepage|official)\b/u.test(labelText)) {
    return 'website';
  }

  return 'other';
}

function normalizeLink(input: { label?: string | null; url?: string | null; href?: string | null; kind?: unknown } | null | undefined) {
  if (!input) {
    return null;
  }

  const rawUrl = input.url ?? input.href ?? null;
  if (!rawUrl) {
    return null;
  }

  const url = normalizeUrl(rawUrl);
  if (!url) {
    return null;
  }

  const label = truncateRecipeText(stripMarkdownFormatting((input.label ?? '').trim()) || displayLabelForUrl(url), 120);
  const kind =
    input.kind === 'website' ||
    input.kind === 'place' ||
    input.kind === 'booking' ||
    input.kind === 'menu' ||
    input.kind === 'map' ||
    input.kind === 'email' ||
    input.kind === 'other'
      ? input.kind
      : classifyLinkKind(url, label);

  return {
    label,
    url,
    kind
  } satisfies RecipeLink;
}

function normalizeImage(input: unknown): RecipeImage | undefined {
  if (!isRecord(input)) {
    return undefined;
  }

  const url = typeof input.url === 'string' ? normalizeUrl(input.url) ?? input.url.trim() : '';
  if (!url) {
    return undefined;
  }

  const alt = typeof input.alt === 'string' && input.alt.trim().length > 0 ? truncateRecipeText(input.alt, 160) : undefined;
  return {
    url,
    alt
  };
}

function parseMarkdownImage(value: string) {
  const match = value.match(/!\[([^\]\n]*)\]\(([^)\n]+)\)/u);
  if (!match?.[2]) {
    return undefined;
  }

  return normalizeImage({
    url: match[2],
    alt: match[1]?.trim() || undefined
  });
}

function parseExactMarkdownLink(value: string) {
  const match = value.match(/^\[([^\]]+)\]\(([^)]+)\)$/u);
  if (!match?.[2]) {
    return null;
  }

  return normalizeLink({
    label: match[1],
    url: match[2]
  });
}

function dedupeLinks(links: Array<RecipeLink | null | undefined>) {
  const seen = new Set<string>();
  return links.filter((link): link is RecipeLink => Boolean(link)).filter((link) => {
    const key = `${link.kind}:${link.url}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function extractLinksFromText(value: string) {
  const links: RecipeLink[] = [];
  const markdownLinkPattern = /\[([^\]]+)\]\(([^)]+)\)/gu;
  for (const match of value.matchAll(markdownLinkPattern)) {
    const link = normalizeLink({
      label: match[1],
      url: match[2]
    });
    if (link) {
      links.push(link);
    }
  }

  const plainUrlPattern = /\b(?:https?:\/\/|www\.)[^\s)]+/gu;
  for (const match of value.matchAll(plainUrlPattern)) {
    const link = normalizeLink({
      label: displayLabelForUrl(match[0]),
      url: match[0]
    });
    if (link) {
      links.push(link);
    }
  }

  const emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/giu;
  for (const match of value.matchAll(emailPattern)) {
    const link = normalizeLink({
      label: match[0],
      url: match[0]
    });
    if (link) {
      links.push(link);
    }
  }

  return dedupeLinks(links);
}

function cellLink(value: RecipeCellValue | unknown) {
  if (!isRecord(value)) {
    return null;
  }

  return normalizeLink({
    label: typeof value.text === 'string' ? value.text : typeof value.label === 'string' ? value.label : undefined,
    url: typeof value.href === 'string' ? value.href : typeof value.url === 'string' ? value.url : undefined,
    kind: value.kind
  });
}

function cellImage(value: RecipeCellValue | unknown) {
  if (!isRecord(value)) {
    return undefined;
  }

  return normalizeImage({
    url: typeof value.imageUrl === 'string' ? value.imageUrl : typeof value.url === 'string' ? value.url : undefined,
    alt: typeof value.imageAlt === 'string' ? value.imageAlt : typeof value.alt === 'string' ? value.alt : undefined
  });
}

function normalizeRichTextValue(value: Record<string, unknown>): RecipeRichTextValue {
  const link = normalizeLink({
    label: typeof value.text === 'string' ? value.text : undefined,
    url: typeof value.href === 'string' ? value.href : typeof value.url === 'string' ? value.url : undefined,
    kind: value.kind
  });
  const image = normalizeImage({
    url: typeof value.imageUrl === 'string' ? value.imageUrl : undefined,
    alt: typeof value.imageAlt === 'string' ? value.imageAlt : undefined
  });
  const text =
    typeof value.text === 'string' && value.text.trim().length > 0
      ? truncateRecipeText(stripMarkdownFormatting(value.text), 200)
      : image?.alt ?? (link ? displayLabelForUrl(link.url) : undefined);

  return RecipeRichTextValueSchema.parse({
    text,
    href: link?.url,
    kind: link?.kind === 'email' ? 'email' : link ? 'link' : 'text',
    imageUrl: image?.url,
    imageAlt: image?.alt
  });
}

function normalizeCellValue(value: unknown): RecipeCellValue {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) {
      return '';
    }

    const image = parseMarkdownImage(trimmed);
    const exactLink = parseExactMarkdownLink(trimmed);
    const normalizedUrl = normalizeUrl(trimmed);

    if (image) {
      return normalizeRichTextValue({
        text: image.alt ?? 'Image',
        href: image.url,
        imageUrl: image.url,
        imageAlt: image.alt
      });
    }

    if (exactLink) {
      return normalizeRichTextValue({
        text: exactLink.label,
        href: exactLink.url,
        kind: exactLink.kind === 'email' ? 'email' : 'link'
      });
    }

    if (normalizedUrl) {
      return normalizeRichTextValue({
        text: displayLabelForUrl(normalizedUrl),
        href: normalizedUrl,
        kind: normalizedUrl.startsWith('mailto:') ? 'email' : 'link'
      });
    }

    return truncateRecipeText(stripMarkdownFormatting(trimmed), 400);
  }

  if (isRecord(value)) {
    const parsedCell = RecipeCellValueSchema.safeParse(value);
    if (parsedCell.success) {
      if (isRecord(parsedCell.data)) {
        return normalizeRichTextValue(parsedCell.data);
      }

      return parsedCell.data;
    }

    return normalizeRichTextValue(value);
  }

  return truncateRecipeText(String(value), 400);
}

function plainTextCellValue(value: RecipeCellValue | unknown) {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return String(value).trim();
  }

  const image = cellImage(value);
  const link = cellLink(value);
  if (isRecord(value) && typeof value.text === 'string' && value.text.trim().length > 0) {
    return value.text.trim();
  }
  if (image?.alt) {
    return image.alt;
  }
  if (link) {
    return link.label;
  }

  return String(value).trim();
}

function renderCellValueAsMarkdown(value: RecipeCellValue | unknown) {
  const image = cellImage(value);
  const link = cellLink(value);
  const text = plainTextCellValue(value);

  if (image) {
    const imageLink = normalizeLink({
      label: image.alt ?? text ?? 'View image',
      url: link?.url ?? image.url,
      kind: link?.kind ?? 'other'
    });
    return imageLink ? `[${imageLink.label}](${imageLink.url})` : text;
  }

  if (link) {
    return `[${text || link.label}](${link.url})`;
  }

  return text;
}

function inferColumnPresentation(values: RecipeCellValue[]) {
  if (values.some((value) => Boolean(cellImage(value)))) {
    return 'image' as const;
  }
  if (values.some((value) => cellLink(value)?.kind === 'email')) {
    return 'email' as const;
  }
  if (values.some((value) => Boolean(cellLink(value)))) {
    return 'link' as const;
  }
  return 'text' as const;
}

function cloneMarkdownRepresentation(data: RecipeMarkdownData) {
  return RecipeMarkdownDataSchema.parse({
    markdown: data.markdown
  });
}

function normalizeTableRepresentation(data: unknown) {
  const parsed = RecipeTableDataSchema.safeParse(data);
  const source = parsed.success ? parsed.data : isRecord(data) ? data : {};
  const rawColumns = Array.isArray(source.columns) ? source.columns : DEFAULT_TABLE_REPRESENTATION.columns;
  const columns = rawColumns
    .map((column, index) => {
      if (!isRecord(column)) {
        return null;
      }

      const id = typeof column.id === 'string' && column.id.trim().length > 0 ? column.id : `column_${index + 1}`;
      const label = typeof column.label === 'string' && column.label.trim().length > 0 ? column.label : id;
      const emphasis = column.emphasis === 'primary' || column.emphasis === 'status' ? column.emphasis : 'none';
      const presentation =
        column.presentation === 'link' || column.presentation === 'email' || column.presentation === 'image'
          ? column.presentation
          : 'text';

      return {
        id,
        label,
        emphasis,
        presentation
      };
    })
    .filter((column): column is RecipeTableData['columns'][number] => Boolean(column));
  const normalizedColumns = columns.length > 0 ? columns : DEFAULT_TABLE_REPRESENTATION.columns;
  const rawRows = Array.isArray(source.rows) ? source.rows : [];
  const rows = rawRows.map((row) => {
    const nextRow: Record<string, RecipeCellValue> = {};
    for (const column of normalizedColumns) {
      const rawValue = isRecord(row) ? row[column.id] : '';
      nextRow[column.id] = normalizeCellValue(rawValue);
    }
    return nextRow;
  });

  return RecipeTableDataSchema.parse({
    columns: normalizedColumns.map((column) => ({
      ...column,
      presentation:
        column.presentation !== 'text'
          ? column.presentation
          : inferColumnPresentation(rows.map((row) => row[column.id]))
    })),
    rows,
    emptyMessage: typeof source.emptyMessage === 'string' && source.emptyMessage.trim().length > 0 ? source.emptyMessage : 'No rows yet.'
  });
}

function cloneTableRepresentation(data: RecipeTableData) {
  return normalizeTableRepresentation(data);
}

function normalizeCardRepresentation(data: unknown) {
  const parsed = RecipeCardDataSchema.safeParse(data);
  const source = parsed.success ? parsed.data : isRecord(data) ? data : {};
  const cards = (Array.isArray(source.cards) ? source.cards : []).map((card, index) => {
    const record = isRecord(card) ? card : {};
    const links = dedupeLinks(
      Array.isArray(record.links)
        ? record.links.map((link) =>
            normalizeLink(
              isRecord(link)
                ? {
                    label: typeof link.label === 'string' ? link.label : undefined,
                    url: typeof link.url === 'string' ? link.url : undefined,
                    kind: link.kind
                  }
                : null
            )
          )
        : []
    );
    const metadata = Array.isArray(record.metadata)
      ? record.metadata
          .map((item) => {
            if (!isRecord(item) || typeof item.label !== 'string' || typeof item.value !== 'string') {
              return null;
            }

            const link =
              normalizeLink(
                isRecord(item.link)
                  ? {
                      label: typeof item.link.label === 'string' ? item.link.label : item.value,
                      url: typeof item.link.url === 'string' ? item.link.url : undefined,
                      kind: item.link.kind
                    }
                  : null
              ) ?? normalizeLink({ label: item.value, url: item.value });

            return {
              label: truncateRecipeText(stripMarkdownFormatting(item.label), 80),
              value: truncateRecipeText(stripMarkdownFormatting(item.value), 240),
              ...(link ? { link } : {})
            };
          })
          .filter((item): item is NonNullable<typeof item> => Boolean(item))
      : [];
    const image = normalizeImage(record.image);

    return {
      id: typeof record.id === 'string' && record.id.trim().length > 0 ? record.id : `card-${index + 1}`,
      title: truncateRecipeText(stripMarkdownFormatting(typeof record.title === 'string' ? record.title : `Card ${index + 1}`), 120),
      description:
        typeof record.description === 'string' && record.description.trim().length > 0
          ? truncateRecipeText(stripMarkdownFormatting(record.description), 320)
          : undefined,
      eyebrow:
        typeof record.eyebrow === 'string' && record.eyebrow.trim().length > 0
          ? truncateRecipeText(stripMarkdownFormatting(record.eyebrow), 80)
          : undefined,
      badges: Array.isArray(record.badges)
        ? record.badges
            .map((badge) => (typeof badge === 'string' ? truncateRecipeText(stripMarkdownFormatting(badge), 60) : ''))
            .filter(Boolean)
        : [],
      metadata,
      links,
      image
    };
  });

  return RecipeCardDataSchema.parse({
    cards,
    emptyMessage: typeof source.emptyMessage === 'string' && source.emptyMessage.trim().length > 0 ? source.emptyMessage : 'No cards yet.'
  });
}

function cloneCardRepresentation(data: RecipeCardData) {
  return normalizeCardRepresentation(data);
}

function cloneEntrySource(source: RecipeContentEntrySource | undefined) {
  if (!source) {
    return undefined;
  }

  return RecipeContentEntrySourceSchema.parse({
    ...source,
    metadata: isRecord(source.metadata) ? { ...source.metadata } : {}
  });
}

function cloneEntry(entry: RecipeContentEntry) {
  return RecipeContentEntrySchema.parse({
    id: entry.id,
    md: entry.md,
    row: Object.fromEntries(Object.entries(entry.row).map(([key, value]) => [key, normalizeCellValue(value)])),
    card: normalizeCardRepresentation({
      cards: [
        {
          ...entry.card,
          id: entry.id
        }
      ]
    }).cards[0],
    source: cloneEntrySource(entry.source),
    metadata: isRecord(entry.metadata) ? { ...entry.metadata } : {}
  });
}

function humanizeColumnLabel(value: string) {
  const normalized = value
    .replace(/[_-]+/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim();
  if (!normalized) {
    return 'Value';
  }

  return normalized.replace(/\b\w/gu, (character) => character.toUpperCase());
}

function normalizeEntryRow(row: Record<string, unknown> | null | undefined) {
  if (!row) {
    return {} as Record<string, RecipeCellValue>;
  }

  return Object.fromEntries(Object.entries(row).map(([key, value]) => [key, normalizeCellValue(value)]));
}

function deriveTableColumnsFromRows(
  rows: Array<Record<string, RecipeCellValue>>,
  preferredColumns: RecipeTableData['columns'] = []
) {
  const valuesByColumn = new Map<string, RecipeCellValue[]>();
  const rowKeysInOrder: string[] = [];
  const seenRowKeys = new Set<string>();

  for (const row of rows) {
    for (const [key, value] of Object.entries(row)) {
      const values = valuesByColumn.get(key) ?? [];
      values.push(normalizeCellValue(value));
      valuesByColumn.set(key, values);
      if (!seenRowKeys.has(key)) {
        seenRowKeys.add(key);
        rowKeysInOrder.push(key);
      }
    }
  }

  const columns: RecipeTableData['columns'] = [];
  const usedIds = new Set<string>();

  for (const column of preferredColumns) {
    if (usedIds.has(column.id)) {
      continue;
    }

    usedIds.add(column.id);
    const values = valuesByColumn.get(column.id) ?? [];
    columns.push({
      id: column.id,
      label: column.label,
      emphasis: column.emphasis ?? (columns.length === 0 ? 'primary' : 'none'),
      presentation:
        column.presentation !== 'text' ? column.presentation : inferColumnPresentation(values)
    });
  }

  for (const key of rowKeysInOrder) {
    if (usedIds.has(key)) {
      continue;
    }

    usedIds.add(key);
    const values = valuesByColumn.get(key) ?? [];
    columns.push({
      id: key,
      label: humanizeColumnLabel(key),
      emphasis: columns.length === 0 ? 'primary' : 'none',
      presentation: inferColumnPresentation(values)
    });
  }

  return columns.length > 0 ? columns : DEFAULT_TABLE_REPRESENTATION.columns;
}

function entryTitleFromMarkdown(markdown: string, index: number) {
  const firstMeaningfulLine =
    markdown
      .replace(/\r\n/gu, '\n')
      .split('\n')
      .map((line) => line.trim())
      .find(Boolean) ?? '';
  const title = stripMarkdownFormatting(firstMeaningfulLine.replace(/^#{1,6}\s+/u, '').replace(/^[-*+]\s+/u, ''));
  return truncateRecipeText(title || `Item ${index + 1}`, 120);
}

function createFallbackCard(id: string, markdown: string, row: Record<string, RecipeCellValue>, index: number) {
  const firstValue = Object.values(row)
    .map((value) => plainTextCellValue(value))
    .find((value) => value.length > 0);
  const title = entryTitleFromMarkdown(markdown, index) || truncateRecipeText(firstValue || `Item ${index + 1}`, 120);

  return normalizeCardRepresentation({
    cards: [
      {
        id,
        title,
        description:
          truncateRecipeText(
            stripMarkdownFormatting(
              markdown
                .replace(/\r\n/gu, '\n')
                .split('\n')
                .slice(1)
                .join(' ')
            ),
            240
          ) || undefined,
        badges: [],
        metadata: [],
        links: extractLinksFromText(markdown),
        image: parseMarkdownImage(markdown)
      }
    ]
  }).cards[0]!;
}

function normalizeEntrySource(rawSource: unknown) {
  const parsed = RecipeContentEntrySourceSchema.safeParse(rawSource);
  return parsed.success ? cloneEntrySource(parsed.data) : undefined;
}

function inferEmailEntrySource(
  row: Record<string, RecipeCellValue>,
  card: RecipeContentEntry['card'] | null,
  markdown: string
) {
  const rowKeys = Object.keys(row);
  const hasEmailShape =
    rowKeys.some((key) => /^(from|to|subject|snippet|labels?|thread_id|threadId)$/iu.test(key)) ||
    Boolean(card?.metadata.some((item) => /^(from|to|subject|snippet|labels?|thread id)$/iu.test(item.label))) ||
    /\b(subject|from|to|snippet|labels?)\b/iu.test(markdown);

  if (!hasEmailShape) {
    return undefined;
  }

  const rowMessageId =
    plainTextCellValue(
      row.messageId ??
        row.message_id ??
        row.gmailMessageId ??
        row.gmail_message_id ??
        (rowKeys.some((key) => key === 'id') ? row.id : '')
    ) || '';
  const cardMessageId =
    card?.metadata.find((item) => /^(message id|gmail message id|id)$/iu.test(item.label))?.value.trim() ?? '';
  const resourceId = rowMessageId || cardMessageId;
  if (!resourceId) {
    return undefined;
  }

  return {
    integration: 'google-workspace',
    kind: 'gmail_message',
    resourceId,
    label:
      plainTextCellValue(row.subject) ||
      card?.title ||
      'Delete email',
    metadata: {}
  } satisfies RecipeContentEntrySource;
}

function getEntrySectionHeading(entry: Pick<RecipeContentEntry, 'metadata'> | StructuredMarkdownEntry) {
  if ('sectionHeading' in entry && typeof entry.sectionHeading === 'string' && entry.sectionHeading.trim().length > 0) {
    return truncateRecipeText(entry.sectionHeading.trim(), 120);
  }

  const rawMetadata = 'metadata' in entry ? entry.metadata : undefined;
  const rawValue =
    isRecord(rawMetadata) && typeof rawMetadata.sectionHeading === 'string' ? rawMetadata.sectionHeading.trim() : '';
  return rawValue ? truncateRecipeText(rawValue, 120) : undefined;
}

function renderStructuredMarkdownEntryAsBlock(entry: StructuredMarkdownEntry) {
  const lines = [
    `### ${entry.titleLink ? `[${entry.title}](${entry.titleLink.url})` : entry.title}`
  ];

  if (entry.description) {
    lines.push(entry.description);
  }

  if (entry.eyebrow) {
    lines.push(`- Area: ${entry.eyebrow}`);
  }

  if (entry.badges.length > 0) {
    lines.push(`- Tags: ${entry.badges.join(', ')}`);
  }

  for (const field of entry.fields) {
    const renderedValue = renderCellValueAsMarkdown(field.value);
    if (renderedValue) {
      lines.push(`- ${field.label}: ${renderedValue}`);
    }
  }

  for (const link of dedupeLinks([...(entry.titleLink ? [entry.titleLink] : []), ...entry.links])) {
    const alreadyPresentInFields = entry.fields.some((field) => field.link?.url === link.url);
    if (alreadyPresentInFields || entry.titleLink?.url === link.url) {
      continue;
    }

    lines.push(`- ${LINK_KIND_LABELS[link.kind]}: [${link.label}](${link.url})`);
  }

  if (entry.image) {
    const imageLink = normalizeLink({
      label: entry.image.alt ?? entry.title,
      url: entry.image.url
    });
    if (imageLink) {
      lines.push(`- Image: [${imageLink.label}](${imageLink.url})`);
    }
  }

  return lines.join('\n').trim();
}

function hashStableValue(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33 + value.charCodeAt(index)) >>> 0;
  }

  return hash.toString(36);
}

function getEntryFingerprint(input: {
  md: string;
  row: Record<string, RecipeCellValue>;
  card: RecipeContentEntry['card'];
  source?: RecipeContentEntrySource;
}) {
  const { id: _ignoredId, ...cardWithoutId } = input.card;
  return stableStringify({
    md: input.md,
    row: input.row,
    card: cardWithoutId,
    source: input.source ?? null
  });
}

function normalizeEntryCandidate(
  candidate: RecipeContentEntryCandidate,
  index: number
): Omit<RecipeContentEntry, 'id'> & {
  explicitId?: string;
} {
  const explicitId = typeof candidate.id === 'string' && candidate.id.trim().length > 0 ? candidate.id.trim() : undefined;
  let md = typeof candidate.md === 'string' ? candidate.md.trim() : '';
  let row = normalizeEntryRow(isRecord(candidate.row) ? candidate.row : undefined);
  let card = isRecord(candidate.card)
    ? normalizeCardRepresentation({
        cards: [candidate.card]
      }).cards[0] ?? null
    : null;

  if (card && Object.keys(row).length === 0) {
    row = normalizeEntryRow(
      convertCardToTable({
        cards: [card],
        emptyMessage: DEFAULT_CARD_REPRESENTATION.emptyMessage
      }).rows[0] ?? {}
    );
  }

  if (!md && card) {
    md = convertCardToMarkdown({
      cards: [card],
      emptyMessage: DEFAULT_CARD_REPRESENTATION.emptyMessage
    }).markdown.trim();
  }

  if (Object.keys(row).length === 0 && md) {
    const derivedRow =
      convertMarkdownToTable({
        markdown: md
      }).rows[0] ?? {
        value: stripMarkdownFormatting(md)
      };
    row = normalizeEntryRow(derivedRow);
  }

  if (!card && Object.keys(row).length > 0) {
    const derivedCard =
      convertTableToCard({
        columns: deriveTableColumnsFromRows([row]),
        rows: [row],
        emptyMessage: DEFAULT_TABLE_REPRESENTATION.emptyMessage
      }).cards[0] ?? null;
    card = derivedCard;
  }

  if (!card && md) {
    card =
      convertMarkdownToCard({
        markdown: md
      }).cards[0] ?? null;
  }

  if (!md && Object.keys(row).length > 0) {
    md = convertTableToMarkdown({
      columns: deriveTableColumnsFromRows([row]),
      rows: [row],
      emptyMessage: DEFAULT_TABLE_REPRESENTATION.emptyMessage
    }).markdown.trim();
  }

  if (!card) {
    if (!md && Object.keys(row).length === 0) {
      throw new Error('Recipe content entries must include at least one of md, row, or card.');
    }
    card = createFallbackCard(explicitId ?? `entry-${index + 1}`, md, row, index);
  }

  if (!md) {
    md = convertCardToMarkdown({
      cards: [card],
      emptyMessage: DEFAULT_CARD_REPRESENTATION.emptyMessage
    }).markdown.trim();
  }

  return {
    explicitId,
    md,
    row,
    card,
    source: normalizeEntrySource(candidate.source) ?? inferEmailEntrySource(row, card, md),
    metadata: isRecord(candidate.metadata) ? { ...candidate.metadata } : {}
  };
}

function stabilizeEntries(
  candidates: RecipeContentEntryCandidate[],
  currentEntries: RecipeContentEntry[] = []
) {
  const currentByFingerprint = new Map<string, RecipeContentEntry[]>();
  for (const currentEntry of currentEntries) {
    const fingerprint = getEntryFingerprint(currentEntry);
    const existing = currentByFingerprint.get(fingerprint) ?? [];
    existing.push(cloneEntry(currentEntry));
    currentByFingerprint.set(fingerprint, existing);
  }

  const usedIds = new Set<string>();

  return candidates.map((candidate, index) => {
    const normalizedCandidate = normalizeEntryCandidate(candidate, index);
    const fingerprint = getEntryFingerprint(normalizedCandidate);
    const matchedCurrent = (currentByFingerprint.get(fingerprint) ?? []).find((entry) => !usedIds.has(entry.id)) ?? null;

    let resolvedId =
      (normalizedCandidate.explicitId && !usedIds.has(normalizedCandidate.explicitId) ? normalizedCandidate.explicitId : null) ??
      matchedCurrent?.id ??
      `entry-${hashStableValue(`${fingerprint}:${index}`)}`;
    while (usedIds.has(resolvedId)) {
      resolvedId = `${resolvedId}-${index + 1}`;
    }
    usedIds.add(resolvedId);

    const normalizedCard =
      normalizeCardRepresentation({
        cards: [
          {
            ...normalizedCandidate.card,
            id: resolvedId
          }
        ]
      }).cards[0] ?? createFallbackCard(resolvedId, normalizedCandidate.md, normalizedCandidate.row, index);

    return RecipeContentEntrySchema.parse({
      id: resolvedId,
      md: normalizedCandidate.md,
      row: normalizedCandidate.row,
      card: normalizedCard,
      source: normalizedCandidate.source ?? matchedCurrent?.source,
      metadata:
        Object.keys(normalizedCandidate.metadata).length > 0
          ? normalizedCandidate.metadata
          : matchedCurrent?.metadata ?? {}
    });
  });
}

function convertTableToEntries(tableData: RecipeTableData, currentEntries: RecipeContentEntry[] = []) {
  return stabilizeEntries(
    tableData.rows.map((row) => {
      const normalizedRow = normalizeEntryRow(row);
      const markdown = convertTableToMarkdown({
        columns: tableData.columns,
        rows: [normalizedRow],
        emptyMessage: tableData.emptyMessage
      }).markdown;
      const card = convertTableToCard({
        columns: tableData.columns,
        rows: [normalizedRow],
        emptyMessage: tableData.emptyMessage
      }).cards[0];

      return {
        md: markdown,
        row: normalizedRow,
        card
      } satisfies RecipeContentEntryCandidate;
    }),
    currentEntries
  );
}

function convertCardToEntries(cardData: RecipeCardData, currentEntries: RecipeContentEntry[] = []) {
  return stabilizeEntries(
    cardData.cards.map((card) => {
      const markdown = convertCardToMarkdown({
        cards: [card],
        emptyMessage: cardData.emptyMessage
      }).markdown;
      const row = convertCardToTable({
        cards: [card],
        emptyMessage: cardData.emptyMessage
      }).rows[0] ?? {};

      return {
        id: card.id,
        md: markdown,
        row,
        card
      } satisfies RecipeContentEntryCandidate;
    }),
    currentEntries
  );
}

function createMarkdownBlockEntryCandidate(
  block: string,
  options: {
    sectionHeading?: string;
  } = {}
) {
  const normalizedBlock = block.trim();
  const row =
    convertMarkdownToTable({
      markdown: normalizedBlock
    }).rows[0] ?? {
      value: stripMarkdownFormatting(normalizedBlock)
    };
  const card = convertMarkdownToCard({
    markdown: normalizedBlock
  }).cards[0] ?? null;

  return {
    md: normalizedBlock,
    row,
    card,
    metadata: options.sectionHeading ? { sectionHeading: options.sectionHeading } : {}
  } satisfies RecipeContentEntryCandidate;
}

function convertMarkdownToEntries(markdownData: RecipeMarkdownData, currentEntries: RecipeContentEntry[] = []) {
  const markdownTable = parseMarkdownPipeTable(markdownData.markdown);
  if (markdownTable) {
    return convertTableToEntries(markdownTable, currentEntries);
  }

  const blocks = splitMarkdownBlocks(markdownData.markdown);
  const markdownCandidates: RecipeContentEntryCandidate[] = [];
  let pendingSectionHeading: string | undefined;
  let recoveredStructuredContent = false;

  for (const block of blocks) {
    const trimmedBlock = block.trim();
    if (!trimmedBlock) {
      continue;
    }

    const headingOnlyMatch = trimmedBlock.match(/^(#{1,6})\s+(.+)$/u);
    if (headingOnlyMatch && (headingOnlyMatch[1]?.length ?? 0) <= 2) {
      pendingSectionHeading = truncateRecipeText(stripMarkdownFormatting(headingOnlyMatch[2] ?? ''), 120) || undefined;
      continue;
    }

    const extractedEntries = extractStructuredMarkdownEntriesFromBlock(trimmedBlock, pendingSectionHeading);
    if (extractedEntries.length > 0) {
      recoveredStructuredContent = true;
      markdownCandidates.push(
        ...extractedEntries.map((entry) => {
          const md = renderStructuredMarkdownEntryAsBlock(entry);
          const row = convertMarkdownToTable({
            markdown: md
          }).rows[0] ?? {
            value: entry.title
          };
          const card =
            convertMarkdownToCard({
              markdown: md
            }).cards[0] ?? null;

          return {
            md,
            row,
            card,
            source: undefined,
            metadata: entry.sectionHeading ? { sectionHeading: entry.sectionHeading } : {}
          } satisfies RecipeContentEntryCandidate;
        })
      );
      continue;
    }

    markdownCandidates.push(
      createMarkdownBlockEntryCandidate(trimmedBlock, {
        sectionHeading: pendingSectionHeading
      })
    );
  }

  if (recoveredStructuredContent) {
    return stabilizeEntries(
      markdownCandidates,
      currentEntries
    );
  }

  return stabilizeEntries(
    (markdownCandidates.length > 0
      ? markdownCandidates
      : markdownData.markdown.trim()
        ? [createMarkdownBlockEntryCandidate(markdownData.markdown)]
        : []),
    currentEntries
  );
}

function buildMarkdownFromEntries(entries: RecipeContentEntry[]) {
  const markdownBlocks: string[] = [];
  let lastSectionHeading: string | undefined;

  for (const entry of entries) {
    const sectionHeading = getEntrySectionHeading(entry);
    if (sectionHeading && sectionHeading !== lastSectionHeading) {
      markdownBlocks.push(`## ${sectionHeading}`);
      lastSectionHeading = sectionHeading;
    } else if (!sectionHeading) {
      lastSectionHeading = undefined;
    }

    if (entry.md.trim().length > 0) {
      markdownBlocks.push(entry.md.trim());
    }
  }

  return cloneMarkdownRepresentation({
    markdown: markdownBlocks.join('\n\n')
  });
}

function buildTableFromEntries(
  entries: RecipeContentEntry[],
  options: {
    sourceTable?: RecipeTableData | null;
  } = {}
) {
  const normalizedRows = entries.map((entry) => normalizeEntryRow(entry.row));
  const columns = deriveTableColumnsFromRows(normalizedRows, options.sourceTable?.columns ?? []);

  return normalizeTableRepresentation({
    columns,
    rows: normalizedRows.map((row) =>
      Object.fromEntries(columns.map((column) => [column.id, row[column.id] ?? '']))
    ),
    emptyMessage: options.sourceTable?.emptyMessage ?? DEFAULT_TABLE_REPRESENTATION.emptyMessage
  });
}

function buildCardFromEntries(
  entries: RecipeContentEntry[],
  options: {
    sourceCard?: RecipeCardData | null;
  } = {}
) {
  return normalizeCardRepresentation({
    cards: entries.map((entry, index) => ({
      ...(options.sourceCard?.cards[index] ?? {}),
      ...entry.card,
      id: entry.id
    })),
    emptyMessage: options.sourceCard?.emptyMessage ?? DEFAULT_CARD_REPRESENTATION.emptyMessage
  });
}

function getDefaultRepresentation(format: RecipeContentFormat) {
  if (format === 'table') {
    return cloneTableRepresentation(DEFAULT_TABLE_REPRESENTATION);
  }

  if (format === 'card') {
    return cloneCardRepresentation(DEFAULT_CARD_REPRESENTATION);
  }

  return cloneMarkdownRepresentation(DEFAULT_MARKDOWN_REPRESENTATION);
}

function parsePlainMarkdownListEntry(line: string): StructuredMarkdownEntry | null {
  const checklistMatch = line.match(/^[-*]\s+\[[ xX]\]\s+(.+)$/u);
  const bulletLineMatch = line.match(/^[-*+]\s+(.+)$/u);
  const orderedLineMatch = line.match(/^\d+\.\s+(.+)$/u);
  const rawTitle = checklistMatch?.[1] ?? bulletLineMatch?.[1] ?? orderedLineMatch?.[1] ?? null;
  if (!rawTitle) {
    return null;
  }

  const titleText = stripMarkdownFormatting(rawTitle);
  if (!titleText || /^[^:]{1,80}:\s+.+$/u.test(titleText)) {
    return null;
  }

  const titleLink = parseExactMarkdownLink(rawTitle.trim()) ?? extractLinksFromText(rawTitle)[0] ?? null;
  const image = parseMarkdownImage(rawTitle);

  return {
    title: titleText,
    titleLink: titleLink ?? undefined,
    description: undefined,
    fields: [],
    links: titleLink ? [titleLink] : [],
    image,
    badges: []
  };
}

function parseStructuredField(label: string, rawValue: string): StructuredMarkdownField {
  const inlineLinks = extractLinksFromText(rawValue);
  const normalizedLink = inlineLinks[0] ?? normalizeLink({ label: rawValue, url: rawValue });
  return {
    label: truncateRecipeText(stripMarkdownFormatting(label), 80),
    value: normalizeCellValue(rawValue),
    link: normalizedLink ?? undefined
  };
}

function extractStructuredMarkdownEntriesFromBlock(
  block: string,
  pendingSectionHeading?: string
): StructuredMarkdownEntry[] {
  const lines = block
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return [];
  }

  const blockListEntries = lines
    .map((line) => parsePlainMarkdownListEntry(line))
    .filter((entry): entry is StructuredMarkdownEntry => entry !== null);
  if (lines.length > 1 && blockListEntries.length === lines.length) {
    return blockListEntries.map((entry) => ({
      ...entry,
      sectionHeading: pendingSectionHeading ?? entry.sectionHeading
    }));
  }

  const firstLine = lines[0] ?? '';
  let title = '';
  let titleLink: RecipeLink | undefined;
  const descriptionLines: string[] = [];
  const fields: StructuredMarkdownField[] = [];
  const links: RecipeLink[] = [];
  const badges: string[] = [];
  let eyebrow: string | undefined;
  let image = parseMarkdownImage(block);
  const remainingLines = lines.slice(1);

  const headingMatch = firstLine.match(/^(#{1,6})\s+(.+)$/u);
  const bulletBoldMatch = firstLine.match(/^[-*+]\s+\*\*(.+?)\*\*(?:\s+[—-]\s+(.+))?$/u);
  const bulletMatch = firstLine.match(/^[-*+]\s+(.+)$/u);
  const orderedMatch = firstLine.match(/^\d+\.\s+(.+)$/u);

  const setTitle = (raw: string) => {
    title = stripMarkdownFormatting(raw);
    titleLink = parseExactMarkdownLink(raw.trim()) ?? extractLinksFromText(raw)[0] ?? undefined;
  };

  if (headingMatch) {
    const headingLevel = headingMatch[1]?.length ?? 0;
    if (remainingLines.length === 0 && headingLevel <= 2) {
      return [];
    }

    const normalizedHeading = truncateRecipeText(stripMarkdownFormatting(headingMatch[2] ?? ''), 120);
    const listEntries = remainingLines
      .map((line) => parsePlainMarkdownListEntry(line))
      .filter((entry): entry is StructuredMarkdownEntry => entry !== null);

    if (listEntries.length > 0 && listEntries.length === remainingLines.length) {
      return listEntries.map((entry) => ({
        ...entry,
        sectionHeading: normalizedHeading
      }));
    }
    setTitle(headingMatch[2] ?? '');
  } else if (bulletBoldMatch) {
    setTitle(bulletBoldMatch[1] ?? '');
    if (bulletBoldMatch[2]) {
      descriptionLines.push(stripMarkdownFormatting(bulletBoldMatch[2]));
    }
  } else if (bulletMatch) {
    setTitle(bulletMatch[1] ?? '');
  } else if (orderedMatch) {
    setTitle(orderedMatch[1] ?? '');
  } else {
    return [];
  }

  for (const line of remainingLines) {
    const fieldMatch = line.match(/^[-*+]\s+([^:]{1,80}):\s+(.+)$/u) ?? line.match(/^([^:#]{1,80}):\s+(.+)$/u);
    if (fieldMatch) {
      const label = fieldMatch[1]?.trim() ?? 'Detail';
      const rawValue = fieldMatch[2]?.trim() ?? '';
      if (/^(tags?|badges?)$/iu.test(label)) {
        badges.push(
          ...rawValue
            .split(/[,|/]/u)
            .map((value) => truncateRecipeText(stripMarkdownFormatting(value), 40))
            .filter(Boolean)
        );
        continue;
      }
      if (/^(section|category|area|neighborhood)$/iu.test(label)) {
        eyebrow = truncateRecipeText(stripMarkdownFormatting(rawValue), 80);
        continue;
      }

      if (/^(image|photo|picture|thumbnail)$/iu.test(label)) {
        image = parseMarkdownImage(rawValue) ?? normalizeImage({ url: rawValue, alt: title });
        continue;
      }

      const field = parseStructuredField(label, rawValue);
      fields.push(field);
      if (field.link) {
        links.push(field.link);
      }
      continue;
    }

    const parsedImage = parseMarkdownImage(line);
    if (parsedImage) {
      image = parsedImage;
      continue;
    }

    const stripped = stripListMarker(line);
    if (stripped) {
      descriptionLines.push(stripMarkdownFormatting(stripped));
      links.push(...extractLinksFromText(stripped));
    }
  }

  if (!title) {
    return [];
  }

  return [
    {
      title,
      titleLink,
      description: descriptionLines.join(' ').trim() || undefined,
      fields,
      links: dedupeLinks([...links, ...(titleLink ? [titleLink] : [])]),
      image,
      badges: [...new Set(badges)],
      eyebrow,
      sectionHeading: pendingSectionHeading
    } satisfies StructuredMarkdownEntry
  ];
}

function extractStructuredMarkdownEntries(markdown: string): StructuredMarkdownEntry[] {
  const blocks = splitMarkdownBlocks(markdown);
  const entries: StructuredMarkdownEntry[] = [];
  let pendingSectionHeading: string | undefined;

  for (const block of blocks) {
    const headingOnlyMatch = block.trim().match(/^(#{1,6})\s+(.+)$/u);
    if (headingOnlyMatch && (headingOnlyMatch[1]?.length ?? 0) <= 2) {
      pendingSectionHeading = truncateRecipeText(stripMarkdownFormatting(headingOnlyMatch[2] ?? ''), 120) || undefined;
      continue;
    }

    const extractedEntries = extractStructuredMarkdownEntriesFromBlock(block, pendingSectionHeading);
    if (extractedEntries.length > 0) {
      entries.push(...extractedEntries);
    }
  }

  return entries.filter((entry) => entry.title.length > 0);
}

function parseMarkdownPipeTable(markdown: string) {
  const lines = markdown
    .replace(/\r\n/gu, '\n')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2 || !lines[0]?.startsWith('|') || !lines[1]?.startsWith('|')) {
    return null;
  }

  const headerCells = lines[0]
    .split('|')
    .map((cell) => cell.trim())
    .filter(Boolean);
  const dividerCells = lines[1]
    .split('|')
    .map((cell) => cell.trim())
    .filter(Boolean);

  if (
    headerCells.length === 0 ||
    dividerCells.length !== headerCells.length ||
    dividerCells.some((cell) => !/^:?-{3,}:?$/u.test(cell))
  ) {
    return null;
  }

  const parsedRows = lines.slice(2).map((line) => {
    const cells = line
      .split('|')
      .map((cell) => cell.trim())
      .filter((cell, index, values) => !(index === 0 && cell === '') && !(index === values.length - 1 && cell === ''));
    return cells;
  });
  const columns = headerCells.map((label, index) => {
    const id = slugifyColumnId(label, `column_${index + 1}`);
    const values = parsedRows.map((cells) => normalizeCellValue(cells[index] ?? ''));
    return {
      id,
      label,
      emphasis: index === 0 ? ('primary' as const) : ('none' as const),
      presentation: inferColumnPresentation(values)
    };
  });

  const rows = parsedRows.map((cells) => {
    const row: Record<string, RecipeCellValue> = {};
    columns.forEach((column, index) => {
      row[column.id] = normalizeCellValue(cells[index] ?? '');
    });
    return row;
  });

  return RecipeTableDataSchema.parse({
    columns,
    rows,
    emptyMessage: DEFAULT_TABLE_REPRESENTATION.emptyMessage
  });
}

function convertTableToMarkdown(tableData: RecipeTableData) {
  if (tableData.rows.length === 0) {
    return cloneMarkdownRepresentation(DEFAULT_MARKDOWN_REPRESENTATION);
  }

  const titleColumn =
    tableData.columns.find((column) => column.emphasis === 'primary') ??
    tableData.columns[0] ?? {
      id: 'value',
      label: 'Value',
      emphasis: 'primary' as const,
      presentation: 'text' as const
    };

  const markdown = tableData.rows
    .map((row, index) => {
      const title = renderCellValueAsMarkdown(row[titleColumn.id]) || `${titleColumn.label} ${index + 1}`;
      const detailLines = tableData.columns
        .filter((column) => column.id !== titleColumn.id)
        .map((column) => {
          const value = renderCellValueAsMarkdown(row[column.id]);
          return value ? `  - ${column.label}: ${value}` : null;
        })
        .filter((value): value is string => Boolean(value));

      if (detailLines.length === 0) {
        return `- ${title}`;
      }

      return [`- **${title}**`, ...detailLines].join('\n');
    })
    .join('\n\n');

  return cloneMarkdownRepresentation({
    markdown
  });
}

function convertCardToMarkdown(cardData: RecipeCardData) {
  if (cardData.cards.length === 0) {
    return cloneMarkdownRepresentation(DEFAULT_MARKDOWN_REPRESENTATION);
  }

  const markdown = cardData.cards
    .map((card) => {
      const detailLines = [
        card.eyebrow ? `  - Section: ${card.eyebrow}` : null,
        card.badges.length > 0 ? `  - Tags: ${card.badges.join(', ')}` : null,
        ...card.metadata.map((item) => {
          const link = item.link ?? normalizeLink({ label: item.value, url: item.value });
          return `  - ${item.label}: ${link ? `[${item.value}](${link.url})` : item.value}`;
        }),
        ...(card.image
          ? [
              `  - Image: [${card.image.alt ?? 'Preview'}](${
                normalizeLink({ label: card.image.alt ?? 'Preview', url: card.image.url })?.url ?? card.image.url
              })`
            ]
          : []),
        ...card.links.map((link) => `  - ${LINK_KIND_LABELS[link.kind]}: [${link.label}](${link.url})`)
      ].filter((value): value is string => Boolean(value));

      const header = card.description ? `- **${card.title}** — ${card.description}` : `- **${card.title}**`;
      return [header, ...detailLines].join('\n');
    })
    .join('\n\n');

  return cloneMarkdownRepresentation({
    markdown
  });
}

function convertMarkdownToTable(markdownData: RecipeMarkdownData) {
  const markdownTable = parseMarkdownPipeTable(markdownData.markdown);
  if (markdownTable) {
    return markdownTable;
  }

  const entries = extractStructuredMarkdownEntries(markdownData.markdown);
  if (entries.length > 0) {
    const metadataColumns: Array<{
      label: string;
      id: string;
      values: RecipeCellValue[];
    }> = [];
    const seenColumnIds = new Set<string>();
    let includesDescription = false;

    for (const entry of entries) {
      if (entry.description) {
        includesDescription = true;
      }

      for (const field of entry.fields) {
        const id = slugifyColumnId(field.label, `field_${metadataColumns.length + 1}`);
        const existing = metadataColumns.find((column) => column.id === id);
        if (existing) {
          existing.values.push(field.value);
          continue;
        }
        if (seenColumnIds.has(id)) {
          continue;
        }
        seenColumnIds.add(id);
        metadataColumns.push({
          label: field.label,
          id,
          values: [field.value]
        });
      }
    }

    const titleValues = entries.map((entry) =>
      entry.titleLink
        ? normalizeRichTextValue({
            text: entry.title,
            href: entry.titleLink.url,
            kind: entry.titleLink.kind === 'email' ? 'email' : 'link'
          })
        : entry.title
    );

    const columns = [
      {
        id: 'title',
        label: 'Title',
        emphasis: 'primary' as const,
        presentation: inferColumnPresentation(titleValues)
      },
      ...(includesDescription
        ? [
            {
              id: 'description',
              label: 'Description',
              emphasis: 'none' as const,
              presentation: 'text' as const
            }
          ]
        : []),
      ...metadataColumns.map((column) => ({
        id: column.id,
        label: column.label,
        emphasis: 'none' as const,
        presentation: inferColumnPresentation(column.values)
      }))
    ];

    return RecipeTableDataSchema.parse({
      columns,
      rows: entries.map((entry) => {
        const row: Record<string, RecipeCellValue> = {
          title: entry.titleLink
            ? normalizeRichTextValue({
                text: entry.title,
                href: entry.titleLink.url,
                kind: entry.titleLink.kind === 'email' ? 'email' : 'link'
              })
            : entry.title
        };
        if (includesDescription) {
          row.description = entry.description ?? '';
        }
        for (const column of metadataColumns) {
          row[column.id] = entry.fields.find((field) => slugifyColumnId(field.label, column.id) === column.id)?.value ?? '';
        }
        return row;
      }),
      emptyMessage: 'No rows yet.'
    });
  }

  const lines = markdownData.markdown
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 24);

  const values = lines.map((value) => normalizeCellValue(value));
  return RecipeTableDataSchema.parse({
    columns: [
      {
        id: 'value',
        label: 'Value',
        emphasis: 'primary',
        presentation: inferColumnPresentation(values)
      }
    ],
    rows: values.map((value) => ({
      value
    })),
    emptyMessage: 'No rows yet.'
  });
}

function convertCardToTable(cardData: RecipeCardData) {
  const metadataColumns: Array<{ label: string; id: string; values: RecipeCellValue[] }> = [];
  const seenMetadataColumns = new Set<string>();
  const linkKinds = new Set<RecipeLink['kind']>();
  let hasDescription = false;
  let hasEyebrow = false;
  let hasBadges = false;
  let hasImage = false;

  for (const card of cardData.cards) {
    hasDescription ||= Boolean(card.description);
    hasEyebrow ||= Boolean(card.eyebrow);
    hasBadges ||= card.badges.length > 0;
    hasImage ||= Boolean(card.image);

    for (const metadata of card.metadata) {
      const id = slugifyColumnId(metadata.label, `field_${metadataColumns.length + 1}`);
      const value = metadata.link
        ? normalizeRichTextValue({
            text: metadata.value,
            href: metadata.link.url,
            kind: metadata.link.kind === 'email' ? 'email' : 'link'
          })
        : metadata.value;
      const existing = metadataColumns.find((column) => column.id === id);
      if (existing) {
        existing.values.push(value);
        continue;
      }

      if (seenMetadataColumns.has(id)) {
        continue;
      }

      seenMetadataColumns.add(id);
      metadataColumns.push({
        id,
        label: metadata.label,
        values: [value]
      });
    }

    for (const link of card.links) {
      linkKinds.add(link.kind);
    }
  }

  const linkColumns = (['website', 'booking', 'menu', 'map', 'place', 'email', 'other'] as const)
    .filter((kind) => linkKinds.has(kind))
    .map((kind) => ({
      id: kind === 'other' ? 'link' : kind,
      label: LINK_KIND_LABELS[kind],
      emphasis: kind === 'booking' || kind === 'place' ? ('status' as const) : ('none' as const),
      presentation: kind === 'email' ? ('email' as const) : ('link' as const),
      kind
    }));

  return RecipeTableDataSchema.parse({
    columns: [
      { id: 'title', label: 'Title', emphasis: 'primary', presentation: 'text' },
      ...(hasDescription ? [{ id: 'description', label: 'Description', emphasis: 'none' as const, presentation: 'text' as const }] : []),
      ...(hasEyebrow ? [{ id: 'section', label: 'Section', emphasis: 'none' as const, presentation: 'text' as const }] : []),
      ...(hasBadges ? [{ id: 'tags', label: 'Tags', emphasis: 'status' as const, presentation: 'text' as const }] : []),
      ...(hasImage ? [{ id: 'image', label: 'Image', emphasis: 'none' as const, presentation: 'image' as const }] : []),
      ...linkColumns.map((column) => ({
        id: column.id,
        label: column.label,
        emphasis: column.emphasis,
        presentation: column.presentation
      })),
      ...metadataColumns.map((column) => ({
        id: column.id,
        label: column.label,
        emphasis: 'none' as const,
        presentation: inferColumnPresentation(column.values)
      }))
    ],
    rows: cardData.cards.map((card) => {
      const row: Record<string, RecipeCellValue> = {
        title: card.title
      };
      if (hasDescription) {
        row.description = card.description ?? '';
      }
      if (hasEyebrow) {
        row.section = card.eyebrow ?? '';
      }
      if (hasBadges) {
        row.tags = card.badges.join(', ');
      }
      if (hasImage) {
        row.image = card.image
          ? normalizeRichTextValue({
              text: card.image.alt ?? 'Preview',
              href: card.image.url,
              imageUrl: card.image.url,
              imageAlt: card.image.alt
            })
          : '';
      }
      for (const column of linkColumns) {
        const link = card.links.find((candidate) => candidate.kind === column.kind) ?? null;
        row[column.id] = link
          ? normalizeRichTextValue({
              text: link.label,
              href: link.url,
              kind: link.kind === 'email' ? 'email' : 'link'
            })
          : '';
      }
      for (const column of metadataColumns) {
        const item = card.metadata.find((candidate) => slugifyColumnId(candidate.label, column.id) === column.id);
        row[column.id] = item?.link
          ? normalizeRichTextValue({
              text: item.value,
              href: item.link.url,
              kind: item.link.kind === 'email' ? 'email' : 'link'
            })
          : item?.value ?? '';
      }
      return row;
    }),
    emptyMessage: cardData.emptyMessage || 'No rows yet.'
  });
}

function convertTableToCard(tableData: RecipeTableData) {
  if (tableData.rows.length === 0) {
    return cloneCardRepresentation(DEFAULT_CARD_REPRESENTATION);
  }

  const titleColumn =
    tableData.columns.find((column) => column.emphasis === 'primary') ??
    tableData.columns[0] ?? {
      id: 'value',
      label: 'Value',
      emphasis: 'primary' as const,
      presentation: 'text' as const
    };

  return RecipeCardDataSchema.parse({
    cards: tableData.rows.map((row, index) => {
      let description: string | undefined;
      let eyebrow: string | undefined;
      let image: RecipeImage | undefined;
      const badges: string[] = [];
      const metadata: Array<{ label: string; value: string; link?: RecipeLink }> = [];
      const links: RecipeLink[] = [];

      for (const column of tableData.columns) {
        if (column.id === titleColumn.id) {
          continue;
        }

        const value = row[column.id];
        const text = plainTextCellValue(value);
        const link = cellLink(value) ?? normalizeLink({ label: text, url: text });
        const valueImage = cellImage(value);

        if (column.id === 'description' || /^description|summary|details?$/iu.test(column.label)) {
          description = text || undefined;
          continue;
        }

        if (column.id === 'section' || /^section|category|area|neighborhood$/iu.test(column.label)) {
          eyebrow = text || undefined;
          continue;
        }

        if (column.presentation === 'image' || valueImage) {
          image = valueImage ?? normalizeImage({ url: text, alt: plainTextCellValue(row[titleColumn.id]) });
          continue;
        }

        if (column.emphasis === 'status' && text) {
          badges.push(text);
        }

        if ((column.presentation === 'link' || column.presentation === 'email') && link) {
          links.push(link);
          continue;
        }

        if (text) {
          metadata.push({
            label: column.label,
            value: text,
            link: link ?? undefined
          });
        }
      }

      return {
        id: `card-${index + 1}`,
        title: plainTextCellValue(row[titleColumn.id]) || `Card ${index + 1}`,
        description,
        eyebrow,
        badges: [...new Set(badges)],
        metadata,
        links: dedupeLinks(links),
        image
      };
    }),
    emptyMessage: tableData.emptyMessage || 'No cards yet.'
  });
}

function convertMarkdownToCard(markdownData: RecipeMarkdownData) {
  const markdownTable = parseMarkdownPipeTable(markdownData.markdown);
  if (markdownTable) {
    return convertTableToCard(markdownTable);
  }

  const entries = extractStructuredMarkdownEntries(markdownData.markdown);
  if (entries.length > 0) {
    return RecipeCardDataSchema.parse({
      cards: entries.map((entry, index) => ({
        id: `card-${index + 1}`,
        title: truncateRecipeText(entry.title || `Card ${index + 1}`, 80),
        description: entry.description ? truncateRecipeText(entry.description, 240) : undefined,
        eyebrow: entry.eyebrow,
        badges: entry.badges,
        metadata: entry.fields
          .map((field) => ({
            label: field.label,
            value: truncateRecipeText(plainTextCellValue(field.value), 240),
            link: field.link ?? cellLink(field.value) ?? undefined
          }))
          .filter((item) => item.value.length > 0),
        links: dedupeLinks([...(entry.titleLink ? [entry.titleLink] : []), ...entry.links, ...entry.fields.map((field) => field.link)]),
        image: entry.image
      })),
      emptyMessage: 'No cards yet.'
    });
  }

  const cards = splitMarkdownBlocks(markdownData.markdown)
    .slice(0, 16)
    .map((chunk, index) => {
      const fallbackTitle = `Card ${index + 1}`;
      const rawTitle = stripMarkdownFormatting(chunk.split('\n')[0]?.replace(/^#+\s*/u, '') || fallbackTitle);
      const title = truncateRecipeText(rawTitle, 80) || fallbackTitle;

      return {
        id: `card-${index + 1}`,
        title,
        description: truncateRecipeText(stripMarkdownFormatting(chunk.split('\n').slice(1).join(' ')), 240) || undefined,
        badges: [],
        metadata: [],
        links: extractLinksFromText(chunk),
        image: parseMarkdownImage(chunk)
      };
    });

  return RecipeCardDataSchema.parse({
    cards,
    emptyMessage: 'No cards yet.'
  });
}

function stableStringify(value: unknown): string {
  if (value === null || value === undefined) {
    return JSON.stringify(value);
  }

  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'string') {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(',')}]`;
  }

  if (isRecord(value)) {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(',')}}`;
  }

  return JSON.stringify(String(value));
}

function buildSynchronizedRepresentations(
  sourceView: RecipeContentFormat,
  sourceData: RecipeMarkdownData | RecipeTableData | RecipeCardData,
  options: {
    currentContent?: RecipeContentModel | null;
  } = {}
) {
  const currentEntries = options.currentContent?.entries ?? [];
  const entries =
    sourceView === 'markdown'
      ? convertMarkdownToEntries(sourceData as RecipeMarkdownData, currentEntries)
      : sourceView === 'table'
        ? convertTableToEntries(sourceData as RecipeTableData, currentEntries)
        : convertCardToEntries(sourceData as RecipeCardData, currentEntries);
  const markdownRepresentation = buildMarkdownFromEntries(entries);
  const tableRepresentation = buildTableFromEntries(entries, {
    sourceTable: sourceView === 'table' ? cloneTableRepresentation(sourceData as RecipeTableData) : null
  });
  const cardRepresentation = buildCardFromEntries(entries, {
    sourceCard: sourceView === 'card' ? cloneCardRepresentation(sourceData as RecipeCardData) : null
  });

  return {
    entries,
    markdownRepresentation,
    tableRepresentation,
    cardRepresentation
  };
}

function parseRepresentationData(
  format: RecipeContentFormat,
  rawData: unknown,
  fallbackContent?: RecipeContentModel | null
): RecipeMarkdownData | RecipeTableData | RecipeCardData {
  if (format === 'table') {
    return normalizeTableRepresentation(rawData);
  }

  if (format === 'card') {
    return normalizeCardRepresentation(rawData);
  }

  if (isRecord(rawData) && typeof rawData.markdown === 'string') {
    return cloneMarkdownRepresentation({
      markdown: rawData.markdown
    });
  }

  if (typeof rawData === 'string') {
    return cloneMarkdownRepresentation({
      markdown: rawData
    });
  }

  if (fallbackContent) {
    return getRecipeContentViewDataFromContent(fallbackContent, format);
  }

  return getDefaultRepresentation(format);
}

function getRecipeContentViewDataFromContent<TFormat extends RecipeContentFormat>(
  content: RecipeContentModel,
  format: TFormat
): RecipeContentViewDataMap[TFormat] {
  if (format === 'table') {
    return cloneTableRepresentation(content.tableRepresentation) as RecipeContentViewDataMap[TFormat];
  }

  if (format === 'card') {
    return cloneCardRepresentation(content.cardRepresentation) as RecipeContentViewDataMap[TFormat];
  }

  return cloneMarkdownRepresentation(content.markdownRepresentation) as RecipeContentViewDataMap[TFormat];
}

function recoverContentModel(rawContent: unknown, fallbackContent: RecipeContentModel): RecipeContentModel {
  if (isRecord(rawContent)) {
    if ('format' in rawContent) {
      const legacyFormat = parseRecipeContentFormat(rawContent.format) ?? fallbackContent.activeView;
      return synchronizeRecipeContentModel({
        currentContent: fallbackContent,
        activeView: legacyFormat,
        sourceView: legacyFormat,
        contentData: rawContent.data
      });
    }

    if (
      rawContent.activeView !== undefined ||
      rawContent.markdownRepresentation !== undefined ||
      rawContent.tableRepresentation !== undefined ||
      rawContent.cardRepresentation !== undefined
    ) {
      const sourceView =
        parseRecipeContentFormat((rawContent.sync as Record<string, unknown> | undefined)?.sourceView) ??
        parseRecipeContentFormat(rawContent.activeView) ??
        fallbackContent.activeView;
      return synchronizeRecipeContentModel({
        currentContent: fallbackContent,
        activeView: parseRecipeContentFormat(rawContent.activeView) ?? fallbackContent.activeView,
        sourceView,
        content: rawContent
      });
    }
  }

  const parsedContent = RecipeContentModelSchema.safeParse(rawContent);
  if (parsedContent.success) {
    return synchronizeRecipeContentModel({
      currentContent: fallbackContent,
      activeView: parsedContent.data.activeView,
      content: parsedContent.data
    });
  }

  return fallbackContent;
}

function recoverContentTab(
  rawTab: unknown,
  fallbackTab: RecipeContentTab
): RecipeContentTab | null {
  const parsedTab = RecipeTabSchema.safeParse(rawTab);
  if (parsedTab.success && parsedTab.data.kind === 'content') {
    const parsedContentTab = parsedTab.data as RecipeContentTab;
    const rawContent = isRecord(rawTab) ? rawTab.content : parsedContentTab.content;
    const rawMetadata = isRecord(rawTab) && isRecord(rawTab.metadata) ? rawTab.metadata : parsedContentTab.metadata;
    return {
      ...parsedContentTab,
      content: recoverContentModel(rawContent, fallbackTab.content),
      metadata: rawMetadata
    };
  }

  if (!isRecord(rawTab) || rawTab.kind !== 'content') {
    return null;
  }

  return {
    id: 'content',
    kind: 'content',
    label: typeof rawTab.label === 'string' && rawTab.label.trim().length > 0 ? rawTab.label : fallbackTab.label,
    content: recoverContentModel(rawTab.content, fallbackTab.content),
    metadata: isRecord(rawTab.metadata) ? rawTab.metadata : fallbackTab.metadata
  };
}

function recoverExtensionTab(rawTab: unknown): RecipeExtensionTab | null {
  const parsedTab = RecipeExtensionTabSchema.safeParse(rawTab);
  if (parsedTab.success) {
    return parsedTab.data;
  }

  if (!isRecord(rawTab)) {
    return null;
  }

  const id = typeof rawTab.id === 'string' ? rawTab.id.trim() : '';
  const kind = typeof rawTab.kind === 'string' ? rawTab.kind.trim() : '';
  if (!id || !kind || id === 'content' || id === 'todos' || kind === 'content' || kind === 'todos') {
    return null;
  }

  return {
    id,
    kind,
    label: typeof rawTab.label === 'string' && rawTab.label.trim().length > 0 ? rawTab.label : truncateRecipeText(kind, 32),
    data: isRecord(rawTab.data) ? rawTab.data : {},
    metadata: isRecord(rawTab.metadata) ? rawTab.metadata : {}
  };
}

function getTabsArray(input: Pick<Recipe, 'tabs'> | RecipeTab[]): RecipeTab[] {
  return Array.isArray(input) ? input : input.tabs;
}

function getFutureSafeExtensionTabs(input: Pick<Recipe, 'tabs'> | null | undefined) {
  if (!input) {
    return [] as RecipeExtensionTab[];
  }

  return getTabsArray(input).filter((tab): tab is RecipeExtensionTab => tab.kind !== 'content' && tab.id !== 'todos' && tab.kind !== 'todos');
}

export function getRecipeContentIntegrityFingerprint(
  content:
    | Pick<RecipeContentModel, 'entries' | 'markdownRepresentation' | 'tableRepresentation' | 'cardRepresentation'>
    | RecipeContentModel
) {
  return stableStringify({
    entries: content.entries,
    markdownRepresentation: content.markdownRepresentation,
    tableRepresentation: content.tableRepresentation,
    cardRepresentation: content.cardRepresentation
  });
}

export function synchronizeRecipeContentModel(options: {
  currentContent?: RecipeContentModel | null;
  activeView?: RecipeContentFormat;
  sourceView?: RecipeContentFormat;
  contentData?: unknown;
  content?: unknown;
} = {}): RecipeContentModel {
  const currentContent = options.currentContent ? RecipeContentModelSchema.parse(options.currentContent) : null;

  if (options.contentData === undefined && options.content === undefined) {
    if (currentContent) {
      return RecipeContentModelSchema.parse({
        ...currentContent,
        activeView: options.activeView ?? currentContent.activeView
      });
    }

    const defaultView = options.activeView ?? 'markdown';
    const sourceData = getDefaultRepresentation(defaultView);
    const representations = buildSynchronizedRepresentations(defaultView, sourceData, {
      currentContent
    });
    const fingerprint = getRecipeContentIntegrityFingerprint(representations);

    return RecipeContentModelSchema.parse({
      activeView: defaultView,
      ...representations,
      sync: {
        syncVersion: 1,
        sourceView: defaultView,
        fingerprint,
        entryCount: representations.entries.length
      }
    });
  }

  const providedContent = options.content !== undefined ? options.content : null;
  if (providedContent !== null) {
    const parsedProvidedContent = RecipeContentModelSchema.safeParse(providedContent);
    if (parsedProvidedContent.success) {
      const parsedContent = parsedProvidedContent.data;
      const sourceView = options.sourceView ?? parsedContent.sync.sourceView ?? parsedContent.activeView;
      const activeView = options.activeView ?? parsedContent.activeView;
      const contentExplicitlyIncludesEntries = isRecord(providedContent) && Array.isArray(providedContent.entries);
      const synchronizedEntries = contentExplicitlyIncludesEntries
        ? stabilizeEntries(parsedContent.entries, currentContent?.entries ?? parsedContent.entries)
        : parsedContent.entries.length > 0
          ? stabilizeEntries(parsedContent.entries, currentContent?.entries ?? parsedContent.entries)
          : null;
      const representations =
        synchronizedEntries !== null
          ? {
              entries: synchronizedEntries,
              markdownRepresentation: buildMarkdownFromEntries(synchronizedEntries),
              tableRepresentation: buildTableFromEntries(synchronizedEntries, {
                sourceTable: parsedContent.tableRepresentation
              }),
              cardRepresentation: buildCardFromEntries(synchronizedEntries, {
                sourceCard: parsedContent.cardRepresentation
              })
            }
          : buildSynchronizedRepresentations(sourceView, getRecipeContentViewDataFromContent(parsedContent, sourceView), {
              currentContent: currentContent ?? parsedContent
            });
      const fingerprint = getRecipeContentIntegrityFingerprint(representations);
      const currentFingerprint = currentContent ? getRecipeContentIntegrityFingerprint(currentContent) : null;
      const syncVersion =
        currentContent && currentFingerprint === fingerprint && currentContent.sync.sourceView === sourceView
          ? currentContent.sync.syncVersion
          : (currentContent?.sync.syncVersion ?? 0) + 1;

      return RecipeContentModelSchema.parse({
        activeView,
        entries: representations.entries,
        markdownRepresentation: representations.markdownRepresentation,
        tableRepresentation: representations.tableRepresentation,
        cardRepresentation: representations.cardRepresentation,
        sync: {
          syncVersion: Math.max(1, syncVersion),
          sourceView,
          fingerprint,
          entryCount: representations.entries.length
        }
      });
    }

    const normalizedContent = recoverContentModel(providedContent, currentContent ?? createDefaultRecipeContentModel(options.activeView));
    if (!options.activeView || normalizedContent.activeView === options.activeView) {
      return normalizedContent;
    }

    return RecipeContentModelSchema.parse({
      ...normalizedContent,
      activeView: options.activeView
    });
  }

  const sourceView = options.sourceView ?? options.activeView ?? currentContent?.activeView ?? 'markdown';
  const sourceData = parseRepresentationData(sourceView, options.contentData, currentContent);
  const representations = buildSynchronizedRepresentations(sourceView, sourceData, {
    currentContent
  });
  const fingerprint = getRecipeContentIntegrityFingerprint(representations);
  const currentFingerprint = currentContent ? getRecipeContentIntegrityFingerprint(currentContent) : null;
  const syncVersion =
    currentContent && currentFingerprint === fingerprint && currentContent.sync.sourceView === sourceView
      ? currentContent.sync.syncVersion
      : (currentContent?.sync.syncVersion ?? 0) + 1;

  return RecipeContentModelSchema.parse({
    activeView: options.activeView ?? currentContent?.activeView ?? sourceView,
    ...representations,
    sync: {
      syncVersion: Math.max(1, syncVersion),
      sourceView,
      fingerprint,
      entryCount: representations.entries.length
    }
  });
}

export function isRecipeContentSynchronized(content: RecipeContentModel) {
  const parsedContent = RecipeContentModelSchema.parse(content);
  const sourceView = parsedContent.sync.sourceView ?? parsedContent.activeView;
  const sourceData = getRecipeContentViewDataFromContent(parsedContent, sourceView);
  const synchronized = synchronizeRecipeContentModel({
    currentContent: parsedContent,
    activeView: parsedContent.activeView,
    sourceView,
    contentData: sourceData
  });

  return getRecipeContentIntegrityFingerprint(parsedContent) === getRecipeContentIntegrityFingerprint(synchronized);
}

export function isRecipeContentMeaningful(content: RecipeContentModel) {
  const parsedContent = RecipeContentModelSchema.parse(content);
  if (parsedContent.entries.length > 0) {
    return true;
  }
  if (parsedContent.markdownRepresentation.markdown.trim().length > 0) {
    return true;
  }

  if (parsedContent.tableRepresentation.rows.length > 0) {
    return true;
  }

  return parsedContent.cardRepresentation.cards.length > 0;
}

export function createDefaultRecipeContentModel(format: RecipeContentFormat = 'markdown') {
  return synchronizeRecipeContentModel({
    activeView: format
  });
}

export function createDefaultRecipeTabs(format: RecipeContentFormat = 'markdown'): RecipeNormalizedTabs {
  return [
    {
      id: 'content',
      kind: 'content',
      label: 'Content',
      content: createDefaultRecipeContentModel(format),
      metadata: {}
    }
  ];
}

export function getRecipeContentTab(input: Pick<Recipe, 'tabs'> | RecipeTab[]): RecipeContentTab {
  return (
    getTabsArray(input).find((tab): tab is RecipeContentTab => tab.kind === 'content') ?? createDefaultRecipeTabs()[0]
  );
}

export function getRecipeContentActiveView(input: Pick<Recipe, 'tabs'> | RecipeTab[]) {
  return getRecipeContentTab(input).content.activeView;
}

export function getRecipeContentFormat(input: Pick<Recipe, 'tabs'> | RecipeTab[]) {
  return getRecipeContentActiveView(input);
}

export function getRecipeContentEntries(input: Pick<Recipe, 'tabs'> | RecipeTab[] | RecipeContentTab) {
  const contentTab = Array.isArray(input)
    ? getRecipeContentTab(input)
    : 'kind' in input
      ? input
      : getRecipeContentTab(input.tabs);

  return contentTab.content.entries.map((entry) => cloneEntry(entry));
}

export function replaceRecipeContentEntries(
  input: Pick<Recipe, 'tabs'> | RecipeTab[],
  entries: RecipeContentEntry[]
) {
  const currentTabs = getTabsArray(input);
  const currentContentTab = getRecipeContentTab(currentTabs);
  const nextContent = synchronizeRecipeContentModel({
    currentContent: currentContentTab.content,
    activeView: currentContentTab.content.activeView,
    content: {
      ...currentContentTab.content,
      entries
    }
  });

  return [
    {
      ...currentContentTab,
      content: nextContent
    },
    ...currentTabs.filter((tab): tab is RecipeExtensionTab => tab.kind !== 'content')
  ] satisfies RecipeNormalizedTabs;
}

export function removeRecipeContentEntries(input: Pick<Recipe, 'tabs'> | RecipeTab[], entryIds: string[]) {
  const idsToRemove = new Set(entryIds.filter((value) => value.trim().length > 0));
  if (idsToRemove.size === 0) {
    return getTabsArray(input);
  }

  const remainingEntries = getRecipeContentEntries(input).filter((entry) => !idsToRemove.has(entry.id));
  return replaceRecipeContentEntries(input, remainingEntries);
}

export function getRecipeContentViewData<TFormat extends RecipeContentFormat | undefined>(
  input: Pick<Recipe, 'tabs'> | RecipeTab[] | RecipeContentTab,
  format?: TFormat
) {
  const contentTab = Array.isArray(input)
    ? getRecipeContentTab(input)
    : 'kind' in input
      ? input
      : getRecipeContentTab(input.tabs);
  const view = (format ?? contentTab.content.activeView) as RecipeContentFormat;
  return getRecipeContentViewDataFromContent(contentTab.content, view) as TFormat extends 'table'
    ? RecipeTableData
    : TFormat extends 'card'
      ? RecipeCardData
      : TFormat extends 'markdown'
        ? RecipeMarkdownData
        : RecipeTableData | RecipeCardData | RecipeMarkdownData;
}

export function normalizeRecipeUiState(uiState: Partial<RecipeUiState> | null | undefined) {
  const requestedActiveTab =
    typeof uiState?.activeTab === 'string' && uiState.activeTab.trim().length > 0 ? uiState.activeTab.trim() : 'content';
  return RecipeUiStateSchema.parse({
    activeTab: requestedActiveTab === 'todos' ? 'content' : requestedActiveTab
  });
}

export function normalizeRecipeTabs(options: {
  tabs?: unknown;
  contentFormat?: RecipeContentFormat;
  contentData?: Record<string, unknown>;
  currentRecipe?: Pick<Recipe, 'tabs'> | null;
}): RecipeNormalizedTabs {
  const currentContentTab = options.currentRecipe ? getRecipeContentTab(options.currentRecipe) : null;
  const currentExtensionTabs = getFutureSafeExtensionTabs(options.currentRecipe);
  const defaultTabs = createDefaultRecipeTabs(options.contentFormat ?? currentContentTab?.content.activeView ?? 'markdown');

  if (options.tabs !== undefined) {
    if (Array.isArray(options.tabs)) {
      const recoveredContentTab =
        options.tabs
          .map((tab) => recoverContentTab(tab, defaultTabs[0]))
          .find((tab): tab is RecipeContentTab => Boolean(tab)) ?? null;
      const recoveredExtensionTabs = options.tabs
        .map((tab) => recoverExtensionTab(tab))
        .filter((tab): tab is RecipeExtensionTab => Boolean(tab));

      if (recoveredContentTab || recoveredExtensionTabs.length > 0) {
        return [recoveredContentTab ?? defaultTabs[0], ...recoveredExtensionTabs];
      }
    }

    const parsedTabs = RecipeTabSchema.array().safeParse(options.tabs);
    if (parsedTabs.success) {
      const contentTab = parsedTabs.data.find((tab): tab is RecipeContentTab => tab.kind === 'content') ?? defaultTabs[0];
      const extensionTabs = parsedTabs.data.filter((tab): tab is RecipeExtensionTab => tab.kind !== 'content');

      return [
        {
          ...contentTab,
          content: synchronizeRecipeContentModel({
            currentContent: currentContentTab?.content ?? null,
            activeView: contentTab.content.activeView,
            content: contentTab.content
          })
        },
        ...extensionTabs
      ];
    }
  }

  const nextActiveView = options.contentFormat ?? currentContentTab?.content.activeView ?? 'markdown';
  const nextContent = synchronizeRecipeContentModel({
    currentContent: currentContentTab?.content ?? null,
    activeView: nextActiveView,
    sourceView: options.contentData !== undefined ? nextActiveView : undefined,
    contentData: options.contentData
  });

  return [
    {
      id: 'content',
      kind: 'content',
      label: 'Content',
      content: nextContent,
      metadata: currentContentTab?.metadata ?? {}
    },
    ...currentExtensionTabs
  ];
}

export function normalizeLegacyRecipeTabs(legacyViewType: string | null | undefined, legacyData: Record<string, unknown> | null | undefined) {
  if (legacyViewType === 'table') {
    return normalizeRecipeTabs({
      contentFormat: 'table',
      contentData: legacyData ?? {}
    });
  }

  if (legacyViewType === 'card') {
    return normalizeRecipeTabs({
      contentFormat: 'card',
      contentData: legacyData ?? {}
    });
  }

  if (legacyViewType === 'todo') {
    const items = Array.isArray(legacyData?.items) ? legacyData.items : [];
    const derivedMarkdown = items
      .map((item) => {
        const title = isRecord(item) && typeof item.title === 'string' ? item.title.trim() : '';
        const completed = isRecord(item) && item.completed === true;
        return title ? `- [${completed ? 'x' : ' '}] ${title}` : null;
      })
      .filter((value): value is string => Boolean(value))
      .join('\n');
    return normalizeRecipeTabs({
      contentFormat: 'markdown',
      contentData: {
        markdown: derivedMarkdown
      }
    });
  }

  if (legacyViewType === 'blank') {
    const fallbackMarkdown =
      typeof legacyData?.prompt === 'string'
        ? legacyData.prompt
        : typeof legacyData?.emptyMessage === 'string'
          ? legacyData.emptyMessage
          : '';
    return normalizeRecipeTabs({
      contentFormat: 'markdown',
      contentData: {
        markdown: fallbackMarkdown
      }
    });
  }

  return normalizeRecipeTabs({
    contentFormat: 'markdown',
    contentData: legacyData ?? {}
  });
}
