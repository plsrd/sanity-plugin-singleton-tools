# sanity-plugin-singleton-tools

> This is a **Sanity Studio v3** plugin.

## What does this plugin do?

This plugin adds convenience functions to reduce the overhead of creating [single edit](https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list) (singleton) documents in the [Sanity Studio](https://www.sanity.io).

In short, this does the following:

- Limits a singleton document's actions to Publish, Unpublish, and Discard Changes.
- Removes the ability to create new versions of the singleton document in both the global Create menu and Structure.
- Adds simple methods for customizing the way your singletons are listed in your Studio's Structure.

## Installation

```sh
npm install sanity-plugin-singleton-tools
```

## Usage

### 1. Add the plugin to your `sanity.config`

```js
//sanity.config.js
import { defineConfig } from 'sanity';
import { singletonTools } from 'sanity-plugin-singleton-tools';

export default defineConfig({
  //...
  plugins: [singletonTools()],
});
```

### 2. Configure your singleton's schema

```js
//mySingleton.js
export const mySingleton = {
  name: 'mySingleton',
  title: 'My Singleton',
  type: 'document',
  options: {
    singleton: true, // Identify this document as a singleton
  },
};
```

### 3. Customize how your singleton is shown in your Structure:

```js
// structure.js
import {
  singletonDocumentListItem,
  singletonDocumentListItems,
  filteredDocumentListItems,
} from 'sanity-plugin-singleton-tools';
import { PlugIcon } from '@sanity/icons';

export const structure = (S, context) =>
  S.list()
    .title('Sanity Love Content')
    .items([
      // Create a list item for each singleton document in your schema that links directly to a document view
      ...singletonDocumentListItems({ S, context }),
      // Create a list item for a specific singleton
      singletonDocumentListItem({
        S,
        context,
        // Schema type
        type: 'mySingleton',
        // Required for showing multiple singletons of the same schema type
        title: 'My Singleton',
        // Required for showing multiple singletons of the same schema type
        id: 'mySingleton',
        // Specify a custom icon
        icon: PlugIcon,
      }),
      S.divider(),
      // Filter singleton documents out of the default S.documentTypeListItems() to prevent them from being rendered as lists or as duplicates
      ...filteredDocumentListItems({ S, context }),
    ]);
```

## Notes

**Notice something wrong with my TS?**
I'm stubborn and refuse to use TS, therefore I am a TS baby. If you notice something wrong with my implementation please let me know!

## License

[MIT](LICENSE) © RD Pennell

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
