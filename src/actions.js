import { getIsSingleton } from './helpers';

export const actions = (prev, { schema, schemaType }) => {
  return getIsSingleton(schema, schemaType)
    ? prev.filter(({ action }) =>
        ['publish', 'unpublish', 'discardChanges', 'restore'].includes(action)
      )
    : prev;
};
