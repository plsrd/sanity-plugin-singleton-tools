import { definePlugin } from 'sanity';
import { newDocumentOptions } from './newDocumentOptions';
import { actions } from './actions';

export const singletonTools = definePlugin(options => {
  return {
    name: 'singleton-tools',
    document: {
      newDocumentOptions,
      actions,
    },
  };
});
