import { definePlugin } from 'sanity';

const getIsSingleton = (schema, schemaType) => {
  const documentSchema = schema._original?.types?.find(
    ({ name }) => name == schemaType
  );

  return documentSchema?.options?.singleton;
};

export const singletonPlugin = definePlugin(options => {
  return {
    name: 'singleton-plugin',
    document: {
      newDocumentOptions: (
        prev,
        { schema, creationContext: { type, schemaType } }
      ) => {
        const singletons = schema._original?.types
          .filter(({ options }) => options?.singleton)
          .map(s => s.name);

        const filterSingletons = ({ templateId }) =>
          !singletons?.includes(templateId);

        if (type == 'global') return prev.filter(filterSingletons);

        return singletons?.includes(schemaType)
          ? prev.filter(filterSingletons)
          : prev;
      },
      actions: (prev, { schema, schemaType }) => {
        return getIsSingleton(schema, schemaType)
          ? prev.filter(({ action }) =>
              ['publish', 'unpublish', 'discardChanges', 'restore'].includes(
                action
              )
            )
          : prev;
      },
    },
  };
});
