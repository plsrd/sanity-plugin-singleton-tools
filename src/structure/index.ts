import { getSingletonDocuments } from '../helpers';
import { DocumentIcon } from '@sanity/icons';
import {
  SingletonDocumentListItemConfig,
  SingletonPluginListItemsConfig,
} from '../types';

const singletonDocumentListItem = (config: SingletonDocumentListItemConfig) => {
  if (!config?.S || !config?.type || !config.context) {
    throw new Error(`
      S, context, and type must be provided to your singletonDocumentListItem
      Ex: singletonDocumentListItem({ S, context, type: 'product'})
    `);
  }
  const { S, type, title, icon, id, context } = config;
  const { schema } = context;
  const listTitle = title ?? schema.get(type)?.title ?? type;
  const listIcon = icon ?? DocumentIcon;
  const listId = id ?? type;

  return S.listItem()
    .title(listTitle)
    .icon(listIcon)
    .child(S.document().schemaType(type).title(listTitle).id(listId));
};

const singletonDocumentListItems = (config: SingletonPluginListItemsConfig) => {
  if (!config.S || !config.context) {
    throw new Error(`
      S and context must be provided
      Ex: singletonDocumentListItems({ S, context })
    `);
  }

  const { S, context } = config;
  const { schema } = context;

  const singletons = getSingletonDocuments(schema);

  return singletons?.map(schemaType =>
    singletonDocumentListItem({ S, context, type: schemaType })
  );
};

const filteredDocumentListItems = (config: SingletonPluginListItemsConfig) => {
  if (!config.S || !config.context) {
    throw new Error(`
      S and context must be provided
      Ex: filteredDocumentListItems({ S, context })
    `);
  }
  const { S, context } = config;
  const { schema } = context;

  const singletons = getSingletonDocuments(schema);

  return S.documentTypeListItems().filter(
    type => singletons && !singletons.includes(type.getId() as string)
  );
};

export {
  singletonDocumentListItem,
  singletonDocumentListItems,
  filteredDocumentListItems,
};
