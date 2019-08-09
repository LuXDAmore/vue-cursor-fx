# Vue Cursor Fx

[DEMO](https://luxdamore.github.io/vue-cursor-fx)

## Installation

```bash

    # Deps
    npm install --save @luxdamore/vue-cursor-fx

```

### Usage

#### As component

```js

    // Component
    import { CursorFx } from '@luxdamore/vue-cursor-fx';

    // Install
    Vue.component(
        CursorFx.name,
        CursorFx
    );

```

#### As plugin

```js

    // Plugin
    import CursorFx from '@luxdamore/vue-cursor-fx';

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
                <link rel="stylesheet" href="../dist/CursorFx.css" />
                <!-- end old way -->

                <!-- New way -->
                <link rel="preload" href="./dist/CursorFx.css" as="style" onload="this.rel='stylesheet'" />
                <link rel="preload" href="./dist/CursorFx.umd.min.js" as="script" />
                <!-- end new way -->

            <!-- end CursorFx style -->

        </head>
        <body>

            <!--
                Others script (ex. VueJs) and html.
            -->

            <!-- CursorFx script -->
                <script src="./dist/CursorFx.umd.min.js"></script>
            <!-- end CursorFx script -->

        </body>
    </html>

```

#### Markup

_Use it just one time in the main file of your project or in every views where you want it._

```html

    <cursor-fx />

```

##### Integrations

###### VueRouter

```html

    <!-- App.vue -->
    <div id="app">

        <router-view></router-view>

        <cursor-fx />

    </div>

```

###### NuxtJs

- For the entire website: place the component in the desired layouts (ex. layouts/default.vue);
- For some pages only: place the component in the desired pages (ex. pages/index.vue).

## Issues

Please make sure to read the [Issue Reporting Checklist](https://github.com/LuXDAmore/vue-cursor-fx/blob/master/.github/ISSUE_TEMPLATE/bug_report.md) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## Contribution

Please make sure to read the [Contributing Guide](https://github.com/LuXDAmore/vue-cursor-fx/blob/master/.github/ISSUE_TEMPLATE/feature_request.md) before making a pull request.

## Changelog

Details changes for each release are documented in the [release notes](https://github.com/LuXDAmore/vue-cursor-fx/blob/master/CHANGELOG.md).

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present Luca Iaconelli

### Inspired by

[CustomCursors by Tympanus](https://tympanus.net/Tutorials/CustomCursors/index3.html)
