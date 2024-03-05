import { getSingletonDocuments } from './helpers';

export const newDocumentOptions = (
  prev,
  { schema, creationContext: { type, schemaType } }
) => {
  const singletons = getSingletonDocuments(schema);

  const filterSingletons = ({ templateId }) =>
    !singletons?.includes(templateId);

  if (type == 'global') return prev.filter(filterSingletons);

  return singletons?.includes(schemaType)
    ? prev.filter(filterSingletons)
    : prev;
};
