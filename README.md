<a href="https://www.patreon.com/vladimirkharlampidi"><img src="https://cdn.framework7.io/i/support-badge.png" height="20"></a>

# Framework7

Full Featured Mobile HTML Framework For Building iOS & Android Apps

## What's different
  * Issue 3146 fix - Swipeback pageFrom data is undefined
  * Encrypt page component promise
  * Popup - add swipe-to-close feature like in 4.4.0 in commit fd988b909846dd2f8b9205e669fb8b3f37b7d927
  * Smart select sheet enable backdrop
  * Fix smart select data-option-color

## Supporting Framework7

Framework7 is an MIT-licensed open source project with its ongoing development made possible entirely by the support of these awesome [backers](https://github.com/framework7io/framework7/blob/master/BACKERS.md). If you'd like to join them, please consider:

* [Become a backer or sponsor on Patreon.](https://www.patreon.com/vladimirkharlampidi)

## Getting Started
  * [Getting Started Guide](https://framework7.io/docs/introduction.html)

## Framework7 Development

Framework7 uses `gulp` and `rollup` to build a development (build) and production versions.

First you need to have `gulp-cli` which you should install globally.

```
$ npm install --global gulp
```

Then install all dependencies, in repo's root:

```
$ npm install
```

## Development Builds

The following npm scripts are available to create development builds:

* `build:dev` - build development versions of all packages (Core, Vue, React)
* `build-core:dev` - build development version of Core (vanilla JS) Framework7
* `build-react:dev` - build development version of Framework7 React package
* `build-vue:dev` - build development version of Framework7 Vue package

Compiled results will be available in `build/` folder.

## Production builds

To build production versions the following npm scripts are available:

* `build:prod` - build production versions of all packages (Core, Vue, React)
* `build-core:prod` - build production version of Core (vanilla JS) Framework7
* `build-react:prod` - build production version of Framework7 React package
* `build-vue:prod` - build production version of Framework7 Vue package

Compiled results will be available in `packages/` folder.

## Kitchen Sink

To run Kitchen Sink with development environment (development version will be built first) use the following npm scripts:

* `dev` - build development versions of all packages (Core, Vue, React) and run local server. With this common script it will watch for changes in all `src/` files and rebuild all packages (Core, Vue, React)
* `core:dev` - build development version of Core (vanilla JS) Framework7 package and run core Kitchen Sink
* `react:dev` - build development version of Framework7 React package and run React Kitchen Sink
* `vue:dev` - build development version of Framework7 Vue package and run Vue Kitchen Sink

To Run Kitchen Sink with production builds (already compiled `/packages/` will be used), use the following npm scripts:

* `prod` - build Kitchen Sinks with production versions
* `core:prod` - run core Kitchen Sink with production Framework7 core package
* `react:prod` - run React Kitchen Sink with production build of Framework7 React
* `vue:prod` - run Vue Kitchen Sink with production build of Framework7 Vue

## Source Code

Whole source code is located under `/src/` folder.

Framework7 uses Phenome compiler to generate React & Vue components. So all the React & Vue related code is under the `/src/phenome/` folder

Framework7 core library source code is under `/src/core/` folder

## Contributing

Before you open an issue please review the [contributing](https://github.com/framework7io/framework7/blob/master/CONTRIBUTING.md) guideline.

**All changes should be commited to `src/` files only!**.

Framework7 uses LESS for CSS compilations, and ES modules JS files.

The project uses [.editorconfig](http://editorconfig.org/) and [ESLint](https://eslint.org/) to define and lint the coding style of each file. We recommend that you install the Editor Config and ESLint extension for your preferred IDE.

If you want to help in Framework7 development and make it event better visit this page: http://framework7.io/contribute/

## Forum

If you have questions about Framework7 or want to help others you are welcome to special forum at http://forum.framework7.io/

## Docs

Documentation available at http://framework7.io/docs/

## Tutorials

Tutorials available at http://framework7.io/tutorials/

## Showcase

Appstore apps made with Framework7: http://framework7.io/showcase/

## Previous Versions

* [v2 branch](https://github.com/framework7io/Framework7/tree/v2)
* [v1 branch](https://github.com/framework7io/Framework7/tree/v1)
