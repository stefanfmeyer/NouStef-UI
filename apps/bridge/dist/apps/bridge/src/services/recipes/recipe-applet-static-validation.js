import ts from 'typescript';
const disallowedGlobals = new Set([
    'document',
    'window',
    'globalThis',
    'localStorage',
    'sessionStorage',
    'navigator',
    'process',
    'require'
]);
const disallowedCalls = new Set(['eval', 'fetch']);
const disallowedConstructors = new Set(['Function', 'XMLHttpRequest', 'WebSocket']);
const sdkComponentExports = new Set([
    'Stack',
    'Inline',
    'Grid',
    'Card',
    'Stat',
    'Badge',
    'Heading',
    'Text',
    'Markdown',
    'Tabs',
    'Tab',
    'Table',
    'List',
    'DetailPanel',
    'EmptyState',
    'ErrorState',
    'LoadingState',
    'SkeletonSection',
    'Paginator',
    'Image',
    'Button',
    'ButtonGroup',
    'Input',
    'Select',
    'Textarea',
    'Divider',
    'Callout'
]);
const sdkHookExports = new Set([
    'useRecipe',
    'useCollection',
    'useEntity',
    'useRecipeData',
    'useAppletState',
    'useSelection',
    'usePagination',
    'useFilters',
    'useFormState',
    'useTabState'
]);
const actionHelperExports = new Set([
    'runPromptAction',
    'runPrompt',
    'callApprovedApi',
    'refreshRecipe',
    'openLink',
    'confirmAction'
]);
const recipeMutationExports = new Set(['patchRecipe']);
const sdkUtilityExports = new Set(['defineApplet', 'Tab', 'updateLocalState']);
const allowedSdkNamedExports = new Set([
    ...sdkComponentExports,
    ...sdkHookExports,
    ...actionHelperExports,
    ...recipeMutationExports,
    ...sdkUtilityExports
]);
const collectionHookExports = new Set(['useCollection', 'useSelection', 'usePagination', 'useFilters']);
const datasetComponentExports = new Set(['Table', 'List', 'DetailPanel', 'Paginator']);
const formExports = new Set(['Input', 'Select', 'Textarea', 'useFormState']);
const componentNodeKindByExport = new Map([
    ['Stack', 'stack'],
    ['Inline', 'inline'],
    ['Grid', 'grid'],
    ['Card', 'card'],
    ['Stat', 'stat'],
    ['Badge', 'badge'],
    ['Heading', 'heading'],
    ['Text', 'text'],
    ['Markdown', 'markdown'],
    ['Tabs', 'tabs'],
    ['Table', 'table'],
    ['List', 'list'],
    ['DetailPanel', 'detail_panel'],
    ['EmptyState', 'empty_state'],
    ['ErrorState', 'error_state'],
    ['LoadingState', 'loading_state'],
    ['SkeletonSection', 'skeleton_section'],
    ['Paginator', 'paginator'],
    ['Image', 'image'],
    ['Button', 'button'],
    ['ButtonGroup', 'button_group'],
    ['Input', 'input'],
    ['Select', 'select'],
    ['Textarea', 'textarea'],
    ['Divider', 'divider'],
    ['Callout', 'callout']
]);
function createEmptyFeatures() {
    return {
        usesButtons: false,
        usesCards: false,
        usesDetails: false,
        usesFilters: false,
        usesForms: false,
        usesImages: false,
        usesLists: false,
        usesLocalState: false,
        usesMarkdown: false,
        usesPatching: false,
        usesPagination: false,
        usesSelection: false,
        usesTables: false,
        usesTabs: false
    };
}
function createValidationResult(input) {
    return {
        ok: input.errors.length === 0,
        imports: input.imports,
        sdkImports: input.sdkImports,
        usedSdkExports: [...input.usedSdkExports].sort(),
        usedComponents: [...input.usedComponents].sort(),
        usedHooks: [...input.usedHooks].sort(),
        actionUsages: input.actionUsages,
        patchUsages: input.patchUsages,
        datasetIds: [...input.datasetIds].sort(),
        collectionIds: [...input.collectionIds].sort(),
        entityIds: [...input.entityIds].sort(),
        tabIds: [...input.tabIds].sort(),
        imageUsages: input.imageUsages,
        nodeKinds: [...input.nodeKinds].sort(),
        features: input.features,
        errors: [...new Set(input.errors)],
        warnings: [...new Set(input.warnings)]
    };
}
function extractStringLiteralValue(expression) {
    if (!expression) {
        return null;
    }
    if (ts.isParenthesizedExpression(expression)) {
        return extractStringLiteralValue(expression.expression);
    }
    if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) {
        return expression.text.trim();
    }
    return null;
}
function extractStringLikeJsxAttribute(node, attributeName) {
    const attribute = node.attributes.properties.find((property) => ts.isJsxAttribute(property) && ts.isIdentifier(property.name) && property.name.text === attributeName);
    if (!attribute?.initializer) {
        return {
            value: null,
            dynamic: false
        };
    }
    if (ts.isStringLiteral(attribute.initializer)) {
        return {
            value: attribute.initializer.text.trim(),
            dynamic: false
        };
    }
    if (ts.isJsxExpression(attribute.initializer)) {
        return {
            value: extractStringLiteralValue(attribute.initializer.expression),
            dynamic: attribute.initializer.expression != null && extractStringLiteralValue(attribute.initializer.expression) == null
        };
    }
    return {
        value: null,
        dynamic: true
    };
}
function extractStringLikeJsxAttributeFromNames(node, attributeNames) {
    for (const attributeName of attributeNames) {
        const result = extractStringLikeJsxAttribute(node, attributeName);
        if (result.value || result.dynamic) {
            return result;
        }
    }
    return {
        value: null,
        dynamic: false
    };
}
function inferImageKind(source) {
    if (!source) {
        return 'dynamic';
    }
    if (/^https?:\/\//iu.test(source)) {
        return 'network';
    }
    return 'local';
}
function isImportBindingIdentifier(node) {
    return (ts.isImportSpecifier(node.parent) ||
        ts.isImportClause(node.parent) ||
        ts.isNamespaceImport(node.parent) ||
        ts.isImportEqualsDeclaration(node.parent));
}
function actionIdFromCall(expression, helper, errors, fileName) {
    if (helper === 'refreshRecipe' && expression.arguments.length === 0) {
        return 'refresh-recipe';
    }
    const actionId = extractStringLiteralValue(expression.arguments[0]);
    if (!actionId) {
        errors.push(`${helper}() in ${fileName} requires a literal action id so the bridge can synthesize the manifest locally.`);
        return null;
    }
    return actionId;
}
function extractObjectLiteralProperty(node, name) {
    return node.properties.find((property) => ts.isPropertyAssignment(property) &&
        ((ts.isIdentifier(property.name) && property.name.text === name) ||
            (ts.isStringLiteral(property.name) && property.name.text === name)));
}
function literalObjectPropertyValue(node, name) {
    return extractStringLiteralValue(extractObjectLiteralProperty(node, name)?.initializer);
}
function analyzePatchRecipeCall(expression, fileName, errors, patchUsages, collectionIds, entityIds, tabIds, actionUsages) {
    const [operationsArgument] = expression.arguments;
    if (!operationsArgument || !ts.isArrayLiteralExpression(operationsArgument)) {
        errors.push(`patchRecipe() in ${fileName} requires a literal array of patch operations.`);
        return;
    }
    for (const element of operationsArgument.elements) {
        if (!ts.isObjectLiteralExpression(element)) {
            errors.push(`patchRecipe() in ${fileName} requires each patch operation to be an object literal.`);
            continue;
        }
        const operation = literalObjectPropertyValue(element, 'op');
        if (!operation) {
            errors.push(`patchRecipe() in ${fileName} requires each patch operation to declare a literal op value.`);
            continue;
        }
        patchUsages.push({ op: operation });
        switch (operation) {
            case 'update_collection':
                {
                    const collectionInitializer = extractObjectLiteralProperty(element, 'collection')?.initializer;
                    if (!collectionInitializer || !ts.isObjectLiteralExpression(collectionInitializer)) {
                        errors.push(`patchRecipe() update_collection in ${fileName} requires a literal collection object.`);
                        break;
                    }
                    const collectionId = literalObjectPropertyValue(collectionInitializer, 'id');
                    if (!collectionId) {
                        errors.push(`patchRecipe() update_collection in ${fileName} requires a literal collection id.`);
                        break;
                    }
                    collectionIds.add(collectionId);
                }
                break;
            case 'remove_collection':
            case 'reorder_collection':
            case 'set_selection':
                {
                    const collectionId = literalObjectPropertyValue(element, 'collectionId');
                    if (!collectionId) {
                        errors.push(`patchRecipe() ${operation} in ${fileName} requires a literal collectionId.`);
                        break;
                    }
                    collectionIds.add(collectionId);
                }
                break;
            case 'create_tab':
            case 'update_tab':
                {
                    const tabInitializer = extractObjectLiteralProperty(element, 'tab')?.initializer;
                    if (!tabInitializer || !ts.isObjectLiteralExpression(tabInitializer)) {
                        errors.push(`patchRecipe() ${operation} in ${fileName} requires a literal tab object.`);
                        break;
                    }
                    const tabId = literalObjectPropertyValue(tabInitializer, 'id');
                    if (!tabId) {
                        errors.push(`patchRecipe() ${operation} in ${fileName} requires a literal tab id.`);
                        break;
                    }
                    tabIds.add(tabId);
                }
                break;
            case 'remove_tab':
                {
                    const tabId = literalObjectPropertyValue(element, 'tabId');
                    if (!tabId) {
                        errors.push(`patchRecipe() remove_tab in ${fileName} requires a literal tabId.`);
                        break;
                    }
                    tabIds.add(tabId);
                }
                break;
            case 'replace_view':
                {
                    const viewInitializer = extractObjectLiteralProperty(element, 'view')?.initializer;
                    if (!viewInitializer || !ts.isObjectLiteralExpression(viewInitializer)) {
                        errors.push(`patchRecipe() replace_view in ${fileName} requires a literal view object.`);
                    }
                }
                break;
            case 'replace_section':
                {
                    const sectionInitializer = extractObjectLiteralProperty(element, 'section')?.initializer;
                    if (!sectionInitializer || !ts.isObjectLiteralExpression(sectionInitializer)) {
                        errors.push(`patchRecipe() replace_section in ${fileName} requires a literal section object.`);
                        break;
                    }
                    const collectionId = literalObjectPropertyValue(sectionInitializer, 'collectionId');
                    const entityId = literalObjectPropertyValue(sectionInitializer, 'entityId');
                    if (collectionId) {
                        collectionIds.add(collectionId);
                    }
                    if (entityId) {
                        entityIds.add(entityId);
                    }
                }
                break;
            case 'upsert_entities':
            case 'remove_entities':
            case 'append_notes':
                {
                    const entityId = literalObjectPropertyValue(element, 'entityId');
                    if (entityId) {
                        entityIds.add(entityId);
                    }
                }
                break;
            case 'replace_actions':
            case 'set_action_state':
                {
                    const actionId = literalObjectPropertyValue(element, 'actionId');
                    if (actionId) {
                        actionUsages.push({
                            helper: 'runPromptAction',
                            actionId
                        });
                    }
                }
                break;
            default:
                break;
        }
    }
}
export function analyzeRecipeAppletModule(source, options) {
    const errors = [];
    const warnings = [];
    const imports = [];
    const sdkImports = [];
    const usedSdkExports = new Set();
    const usedComponents = new Set();
    const usedHooks = new Set();
    const actionUsages = [];
    const patchUsages = [];
    const datasetIds = new Set();
    const collectionIds = new Set();
    const entityIds = new Set();
    const tabIds = new Set();
    const imageUsages = [];
    const nodeKinds = new Set();
    const features = createEmptyFeatures();
    const allowedImports = options.kind === 'source'
        ? new Set(['recipe-applet-sdk'])
        : new Set(['recipe-applet-sdk', 'recipe-applet-test-sdk']);
    const sdkBindings = new Map();
    const sourceFile = ts.createSourceFile(options.fileName, source, ts.ScriptTarget.ES2022, true, options.kind === 'source' ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    const recordSdkExport = (exportName) => {
        usedSdkExports.add(exportName);
        if (sdkComponentExports.has(exportName)) {
            usedComponents.add(exportName);
            const nodeKind = componentNodeKindByExport.get(exportName);
            if (nodeKind) {
                nodeKinds.add(nodeKind);
            }
        }
        if (sdkHookExports.has(exportName)) {
            usedHooks.add(exportName);
        }
        switch (exportName) {
            case 'Button':
            case 'ButtonGroup':
                features.usesButtons = true;
                break;
            case 'Card':
                features.usesCards = true;
                break;
            case 'DetailPanel':
                features.usesDetails = true;
                break;
            case 'Image':
                features.usesImages = true;
                break;
            case 'List':
                features.usesLists = true;
                break;
            case 'Markdown':
                features.usesMarkdown = true;
                break;
            case 'Paginator':
            case 'usePagination':
                features.usesPagination = true;
                break;
            case 'Table':
                features.usesTables = true;
                break;
            case 'Tabs':
                features.usesTabs = true;
                break;
            case 'useFilters':
                features.usesFilters = true;
                break;
            case 'useSelection':
                features.usesSelection = true;
                break;
            case 'patchRecipe':
                features.usesPatching = true;
                break;
            case 'useAppletState':
                features.usesLocalState = true;
                break;
            default:
                break;
        }
        if (formExports.has(exportName)) {
            features.usesForms = true;
        }
    };
    const resolveSdkExport = (localName) => sdkBindings.get(localName) ?? null;
    const visit = (node) => {
        if (ts.isImportDeclaration(node)) {
            const specifier = ts.isStringLiteral(node.moduleSpecifier) ? node.moduleSpecifier.text.trim() : '';
            imports.push(specifier);
            if (!allowedImports.has(specifier)) {
                errors.push(`Disallowed import "${specifier}" in ${options.fileName}.`);
            }
            if (specifier === 'recipe-applet-sdk') {
                sdkImports.push(specifier);
                if (node.importClause?.name) {
                    errors.push(`Default import "${node.importClause.name.text}" is not allowed in ${options.fileName}; use named SDK imports only.`);
                }
                if (node.importClause?.namedBindings && ts.isNamespaceImport(node.importClause.namedBindings)) {
                    errors.push(`Namespace imports are not allowed in ${options.fileName}; import only the SDK symbols you use.`);
                }
                if (node.importClause?.namedBindings && ts.isNamedImports(node.importClause.namedBindings)) {
                    for (const element of node.importClause.namedBindings.elements) {
                        const importedName = element.propertyName?.text ?? element.name.text;
                        if (!allowedSdkNamedExports.has(importedName)) {
                            errors.push(`Unsupported recipe SDK export "${importedName}" in ${options.fileName}.`);
                        }
                        sdkBindings.set(element.name.text, importedName);
                    }
                }
            }
        }
        if (ts.isCallExpression(node)) {
            if (node.expression.kind === ts.SyntaxKind.ImportKeyword) {
                errors.push(`Dynamic import() is not allowed in ${options.fileName}.`);
            }
            if (ts.isIdentifier(node.expression)) {
                if (disallowedCalls.has(node.expression.text)) {
                    errors.push(`Disallowed call "${node.expression.text}" in ${options.fileName}.`);
                }
                const sdkExport = resolveSdkExport(node.expression.text);
                if (sdkExport) {
                    recordSdkExport(sdkExport);
                    if (actionHelperExports.has(sdkExport)) {
                        const actionId = actionIdFromCall(node, sdkExport, errors, options.fileName);
                        if (actionId) {
                            actionUsages.push({
                                helper: sdkExport,
                                actionId
                            });
                        }
                    }
                    if (recipeMutationExports.has(sdkExport)) {
                        analyzePatchRecipeCall(node, options.fileName, errors, patchUsages, collectionIds, entityIds, tabIds, actionUsages);
                    }
                    if (collectionHookExports.has(sdkExport)) {
                        const collectionId = extractStringLiteralValue(node.arguments[0]);
                        if (!collectionId) {
                            errors.push(`${sdkExport}() in ${options.fileName} requires a literal collection id so the bridge can synthesize the manifest locally.`);
                        }
                        else {
                            collectionIds.add(collectionId);
                            datasetIds.add(collectionId);
                        }
                    }
                    if (sdkExport === 'useEntity') {
                        const entityId = extractStringLiteralValue(node.arguments[0]);
                        if (!entityId) {
                            errors.push(`${sdkExport}() in ${options.fileName} requires a literal entity id so the bridge can synthesize the manifest locally.`);
                        }
                        else {
                            entityIds.add(entityId);
                        }
                    }
                    if (sdkExport === 'useTabState') {
                        const tabId = extractStringLiteralValue(node.arguments[0]);
                        if (!tabId) {
                            errors.push(`${sdkExport}() in ${options.fileName} requires a literal tab id so the bridge can synthesize the manifest locally.`);
                        }
                        else {
                            tabIds.add(tabId);
                        }
                    }
                }
            }
        }
        if (ts.isNewExpression(node) && ts.isIdentifier(node.expression) && disallowedConstructors.has(node.expression.text)) {
            errors.push(`Disallowed constructor "${node.expression.text}" in ${options.fileName}.`);
        }
        if (ts.isIdentifier(node) && !isImportBindingIdentifier(node) && disallowedGlobals.has(node.text)) {
            errors.push(`Disallowed global "${node.text}" in ${options.fileName}.`);
        }
        if (options.kind === 'source' && (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node))) {
            const sdkTagName = ts.isIdentifier(node.tagName) ? resolveSdkExport(node.tagName.text) : null;
            const tagName = sdkTagName
                ? sdkTagName
                : ts.isJsxNamespacedName(node.tagName)
                    ? `${node.tagName.namespace.text}:${node.tagName.name.text}`
                    : node.tagName.getText(sourceFile);
            const normalizedTagName = tagName.trim();
            if (ts.isIdentifier(node.tagName)) {
                const sdkExport = resolveSdkExport(node.tagName.text);
                if (sdkExport) {
                    recordSdkExport(sdkExport);
                    if (datasetComponentExports.has(sdkExport)) {
                        const collection = extractStringLikeJsxAttributeFromNames(node, ['collectionId', 'datasetId']);
                        if (!collection.value) {
                            errors.push(`${sdkExport} in ${options.fileName} requires a literal collectionId so the bridge can synthesize the manifest locally.`);
                        }
                        else {
                            collectionIds.add(collection.value);
                            datasetIds.add(collection.value);
                        }
                    }
                    if (sdkExport === 'Tab') {
                        const tabId = extractStringLikeJsxAttribute(node, 'id');
                        if (!tabId.value) {
                            errors.push(`Tab in ${options.fileName} requires a literal id so the bridge can synthesize the manifest locally.`);
                        }
                        else {
                            tabIds.add(tabId.value);
                        }
                    }
                    if (sdkExport === 'Image') {
                        const src = extractStringLikeJsxAttribute(node, 'src');
                        if (src.dynamic) {
                            imageUsages.push({
                                kind: 'dynamic',
                                source: '(dynamic)'
                            });
                        }
                        else if (src.value) {
                            imageUsages.push({
                                kind: inferImageKind(src.value),
                                source: src.value
                            });
                        }
                    }
                }
                else if (normalizedTagName.length > 0 && normalizedTagName[0] === normalizedTagName[0]?.toLowerCase()) {
                    errors.push(`Intrinsic HTML element "${normalizedTagName}" is not allowed in recipe applets.`);
                }
            }
            else if (normalizedTagName.length > 0 && normalizedTagName[0] === normalizedTagName[0]?.toLowerCase()) {
                errors.push(`Intrinsic HTML element "${normalizedTagName}" is not allowed in recipe applets.`);
            }
        }
        ts.forEachChild(node, visit);
    };
    visit(sourceFile);
    if (!source.includes('defineApplet(') && options.kind === 'source') {
        warnings.push(`Expected ${options.fileName} to export defineApplet(...).`);
    }
    if (features.usesImages && imageUsages.length === 0) {
        imageUsages.push({
            kind: 'dynamic',
            source: '(unknown)'
        });
    }
    return createValidationResult({
        imports,
        sdkImports,
        usedSdkExports,
        usedComponents,
        usedHooks,
        actionUsages,
        patchUsages,
        datasetIds,
        collectionIds,
        entityIds,
        tabIds,
        imageUsages,
        nodeKinds,
        features,
        errors,
        warnings
    });
}
export function validateRecipeAppletModule(source, options) {
    return analyzeRecipeAppletModule(source, options);
}
