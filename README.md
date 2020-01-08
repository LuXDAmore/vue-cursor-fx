# 🎉 Vue Cursor Fx

[DEMO](https://luxdamore.github.io/vue-cursor-fx)

> An animated custom cursor effects for interactive elements like navigation - w/ VueJS - SSR Compatible

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

## Installation

This package is available on npm.

```bash

    # Deps
    npm install --save @luxdamore/vue-cursor-fx

```

### Usage

#### As a component

```js

    // Component
    import { CursorFx } from '@luxdamore/vue-cursor-fx';
    import '@luxdamore/vue-cursor-fx/dist/CursorFx.css';

    // Install
    Vue.component(
        CursorFx.name,
        CursorFx
    );

    // Or in a .vue file
    export default {
        components: {
            'cursor-fx': CursorFx,
        },
    };

```

#### As a plugin

```js

    // Plugin
    import CursorFx from '@luxdamore/vue-cursor-fx';
    import '@luxdamore/vue-cursor-fx/dist/CursorFx.css';

    // Install
    Vue.use(
        CursorFx
    );

```

#### Browser's way

```html

    <!doctype html>
    <html>
        <head>

            <!-- CursorFx style -->

                <!-- Old way -->
                <link rel="stylesheet" href="https://unpkg.com/@luxdamore/vue-cursor-fx@latest/dist/CursorFx.css" />
                <!-- end old way -->

                <!-- New way -->
                <link rel="preload" href="https://unpkg.com/@luxdamore/vue-cursor-fx@latest/dist/CursorFx.css" as="style" onload="this.rel='stylesheet'" />
                <link rel="preload" href="https://unpkg.com/@luxdamore/vue-cursor-fx@latest/dist/CursorFx.umd.min.js" as="script" />
                <!-- end new way -->

            <!-- end CursorFx style -->

        </head>
        <body>

            <!--
                Others script (ex. VueJs) and html.
            -->

            <!-- CursorFx script -->
                <script src="https://unpkg.com/@luxdamore/vue-cursor-fx@latest/dist/CursorFx.umd.min.js"></script>
            <!-- end CursorFx script -->

        </body>
    </html>

```

#### Markup

_Use it just one time in the main file of your project or in every views where you want it._

```html

    <button
        type="button"
        data-cursor-hover
    >
        Add `data-cursor-hover` to an every html elements that you want to see the cursor bigger on hover
    </button>

    <button
        type="button"
        data-cursor-hidden
    >
        Add `data-cursor-hidden` to an every html elements that you want to hide the cursor on hover
    </button>

    <button
        type="button"
        data-cursor-hover
        data-cursor-mix-blend-mode="difference"
    >
        Add `data-cursor-mix-blend-mode` to an every html elements that you want to change the mix-blend-mode value, default value is 'darken'
    </button>

    <cursor-fx />

```

### Options

_N.B.: (disabled on touchscreen devices)_

#### Slots

```bash

    # Available
    slot="default"  # Add some content in the middle of the cursor

```

#### Props

| Attribute | Type | Default | Required | About |
|:--------------------:|--------------------|:-------:|:--------:|-------------------------------------|
| config | Object | {} | false | The default options applied to cursor, see below the `BASE_CONFIG` |
| color | String | #333333 | false | Color for the cursor |
| color-hover | String | #333333 | false | Color, on hover, for the cursor |
| outside-size | String | null | false | The size of outer circle |
| inside-size | String | null | false | The size of inner dot |
| shape | String | null | false | Only available shapes are `circle` and `square` |
| delay | String, Number | 60 | false | Activate cursor after x seconds |
| mix-blend-mode | String | null | false | Set the global `mix-blend-mode` style |
| force-custom-slot | Boolean | false | false | Show or hide the internal default slot |
| allow-on-mobile | Boolean | false | false | Allow the cursor on mobile devices |
| hide-outside | Boolean | false | false | Hide outer circle |
| hide-inside | Boolean | false | false | Hide inner dot |

```js

    const BASE_CONFIG = {
        lerps: {
            dot: 1,
            circle: 0.18,
            custom: 0.23,
        },
        scale: {
            ratio: 0.18,
            min: 0.5,
            max: 1,
        },
        opacity: 0.1,
    };

```

#### Integrations

##### VueRouter

```html

    <!-- App.vue -->
    <template>
        <div>

            <router-view></router-view>

            <cursor-fx />

        </div>
    </template>

```

##### NuxtJs

- For the entire website: place the component in the desired layouts (ex. layouts/default.vue);
- For some pages only: place the component in the desired pages (ex. pages/index.vue).

```html

    <!-- layout/default.vue -->
    <template>
        <div>

            <nuxt />

            <cursor-fx />

        </div>
    </template>

```

___

[npm-version-src]: https://img.shields.io/npm/v/@luxdamore/vue-cursor-fx/latest.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/@luxdamore/vue-cursor-fx

[npm-downloads-src]: https://img.shields.io/npm/dt/@luxdamore/vue-cursor-fx.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@luxdamore/vue-cursor-fx

[license-src]: https://img.shields.io/npm/l/@luxdamore/vue-cursor-fx.svg?style=flat-square
[license-href]: https://npmjs.com/package/@luxdamore/vue-cursor-fx

## 🐞 Issues

Please make sure to read the [Issue Reporting Checklist](/.github/ISSUE_TEMPLATE/bug_report.md) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## 👥 Contribution

Please make sure to read the [Contributing Guide](/.github/ISSUE_TEMPLATE/feature_request.md) before making a pull request.

## 📖 Changelog

Details changes for each release are documented in the [**release notes**](./CHANGELOG.md).

### 📃 License

[MIT License](./LICENSE) // Copyright (©) 2019-present [Luca Iaconelli](https://lucaiaconelli.it)

#### 💸 Are you feeling generous today?  :)

Do you want to share a beer? We can be good friends.. __[Paypal](https://www.paypal.me/luxdamore) // [Patreon](https://www.patreon.com/luxdamore)__

> _It's always a good day to be magnanimous - cit_

#### 💼 Hire me

[![Otechie](https://api.otechie.com/consultancy/luxdamore/badge.svg)](https://otechie.com/luxdamore)

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/luxdamore)

#### 💘 Inspired by

[CustomCursors by Tympanus](https://tympanus.net/Tutorials/CustomCursors/index3.html)
