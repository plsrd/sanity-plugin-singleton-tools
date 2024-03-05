import { getSingletonDocuments } from '../helpers';
import { DocumentIcon } from '@sanity/icons';
import { StructureBuilder, StructureContext } from 'sanity/structure';
import { SingletonDocumentListItemConfig } from '../types';

const singletonDocumentListItem = (config: SingletonDocumentListItemConfig) => {
  const { S, schemaType, title, icon, id } = config;
  const listTitle = title ?? schemaType;
  const listIcon = icon ?? DocumentIcon;
  const listId = id ?? schemaType;

  return S.listItem()
    .title(listTitle)
    .icon(listIcon)
    .child(S.document().schemaType(schemaType).id(listId));
};

const singletonDocumentListItems = (
  S: StructureBuilder,
  { schema }: StructureContext
) => {
  const singletons = getSingletonDocuments(schema);

  return singletons?.map(schemaType =>
    singletonDocumentListItem({ S, schemaType })
  );
};

const filteredDocumentListItems = (
  S: StructureBuilder,
  { schema }: StructureContext
) => {
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
