import { NewDocumentOptionsContext, NewDocumentOptionsResolver } from 'sanity';
import { getSingletonDocuments } from './helpers';

export const newDocumentOptions: NewDocumentOptionsResolver = (
  prev,
  { schema, creationContext: { type, schemaType } }: NewDocumentOptionsContext
) => {
  const singletons = getSingletonDocuments(schema);

  const filterSingletons = ({ templateId }: { templateId: string }) =>
    !singletons?.includes(templateId);

  if (type == 'global') return prev.filter(filterSingletons);

  return singletons?.includes(schemaType ?? '')
    ? prev.filter(filterSingletons)
    : prev;
};
