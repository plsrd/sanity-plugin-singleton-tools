export const getSingletonDocuments = schema =>
  schema._original?.types
    .filter(({ options }) => options?.singleton)
    .map(s => s.name);

export const getIsSingleton = (schema, schemaType) => {
  const documentSchema = schema._original?.types?.find(
    ({ name }) => name == schemaType
  );

  return documentSchema?.options?.singleton ?? false;
};
