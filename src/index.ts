import { definePlugin, SanityDocument } from 'sanity';

interface SingletonSchema extends SanityDocument {
  options: {
    singleton?: boolean;
  };
}

const getIsSingleton = (schema: any, schemaType: string): boolean => {
  const documentSchema: SingletonSchema | undefined =
    schema._original?.types?.find(
      ({ name }: SingletonSchema) => name == schemaType
    );

  return documentSchema?.options?.singleton ?? false;
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
          .filter(({ options }: any) => options?.singleton)
          .map(s => s.name);

        const filterSingletons = ({ templateId }: { templateId: string }) =>
          !singletons?.includes(templateId);

        if (type == 'global') return prev.filter(filterSingletons);

        return singletons?.includes(schemaType as string)
          ? prev.filter(filterSingletons)
          : prev;
      },
      actions: (prev, { schema, schemaType }) => {
        return getIsSingleton(schema, schemaType as string)
          ? prev.filter(({ action }: { action?: string }) =>
              ['publish', 'unpublish', 'discardChanges', 'restore'].includes(
                action as string
              )
            )
          : prev;
      },
    },
  };
});
