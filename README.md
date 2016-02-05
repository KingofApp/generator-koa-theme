# Install

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

# Getting started

1. Create a new theme with the generator.

  ```
  yo koa-theme mythemename
  ```

  Note: `mythemename` will be the ID of the theme.

  Now, you have a scaffold like this:

  ```
  koa-theme-mythemename
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
  ├── .gitignore
  ├── bower.json
  ├── css-variables.json
  └── koa-theme-mythemename.html
  ```

2. Serve all the files with a basic HTTP serve.

  For example with [serve](https://www.npmjs.com/package/serve):

  ```
  npm install -g serve
  ```

  ```
  serve koa-theme-mythemename
  ```

3. Begins to change all elements as you want!
