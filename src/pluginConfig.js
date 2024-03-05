import { definePlugin } from 'sanity';
import { newDocumentOptions } from './newDocumentOptions';
import { actions } from './actions';

export const singletonPlugin = definePlugin(options => {
  return {
    name: 'singleton-plugin',
    document: {
      newDocumentOptions,
      actions,
    },
  };
});
