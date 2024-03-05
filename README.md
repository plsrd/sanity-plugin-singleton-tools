# sanity-plugin-singleton

> This is a **Sanity Studio v3** plugin.

## What does this plugin do?

This plugin adds convenience functions to reduce the overhead of creating [single edit](https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list) (singleton) documents in the Sanity Studio.

Usually, creating a singleton requires you to alter both the `document.actions` and `document.newDocumentOptions` functions in your `sanity.config`. With this plugin, you simply need to add `singleton: true` to your document's schema to automatically handle it for you!

In addition, this plugin also adds simple methods for customizing the way your singletons are listed in your Studio's Structure.

## Installation

```sh
npm install sanity-plugin-singleton-tools
```

## Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import { defineConfig } from 'sanity';
import { myPlugin } from 'sanity-plugin-singleton-tools';

export default defineConfig({
  //...
  plugins: [myPlugin({})],
});
```

## License

[MIT](LICENSE) © RD Pennell

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
