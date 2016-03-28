[![npm](https://img.shields.io/npm/v/generator-koa-theme.svg)](https://www.npmjs.com/package/generator-koa-theme)

# generator-koa-theme

Scaffold out a King of App theme.

## Install

1. If you haven't, install Yeoman and Bower:

  ```
  npm install -g bower
  ```

  ```
  npm install -g yo
  ```

2. Then, install the generator-koa-theme:

  ```
  npm install -g generator-koa-theme
  ```

## Getting started

1. Download and start the [King of App visualizer](https://github.com/KingofApp/com.kingofapp.visualizer).

  ```
  git clone -b dev git@github.com:KingofApp/com.kingofapp.visualizer.git
  ```

  ```
  cd com.kingofapp.visualizer
  ```

  ```
  npm start
  ```

2. Go to themes path and create a new theme with the generator.

  ```
  cd com.kingofapp.visualizer/app/themes
  ```

  ```
  yo koa-theme mythemename
  ```

  Note: `mythemename` will be the ID of the theme.

  Now, you have a scaffold like this:

  ```
  koapp-theme-mythemename
  ├── elements
  │   ├── mythemename-badge
  │   │    ├── demo
  │   │    │   └── index.html
  │   │    └── mythemename-badge.html
  │   ├── ...
  │
  ├── styles
  │   ├── default-theme.html
  │   └── main.css
  ├── .bowerrc
  ├── .gitignore
  ├── bower.json
  ├── config.json
  └── koapp-theme-mythemename.html
  ```

3. Begins to change all elements as you want!

You can see the changes:
* In the visualizer app: `http://localhost:9001`
* In each element demo. Example: `http://localhost:9001/themes/koapp-theme-mythemename/elements/mythemename-button/demo/`
