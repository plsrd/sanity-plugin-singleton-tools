import { getSingletonDocuments } from '../helpers';

const singletonDocumentListItem = config => {
  const { S, schemaType, title, icon, id } = config;
  const listTitle = title ?? schemaType;
  const listIcon = icon ?? DocumentIcon;
  const listId = id ?? schemaType;

  return S.listItem()
    .title(listTitle)
    .icon(listIcon)
    .child(S.document().schemaType(schemaType).id(listId));
};

const singletonDocumentListItems = (S, { schema }) => {
  const singletons = getSingletonDocuments(schema);

  return singletons?.map(schemaType =>
    singletonDocumentListItem({ S, schemaType })
  );
};

const filteredDocumentListItems = (S, { schema }) => {
  const singletons = getSingletonDocuments(schema);

  return S.documentTypeListItems().filter(
    type => !singletons?.includes(type.getId())
  );
};

export {
  singletonDocumentListItem,
  singletonDocumentListItems,
  filteredDocumentListItems,
};
