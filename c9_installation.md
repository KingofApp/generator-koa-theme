## Installation in C9.io

1. Check versions (Node & Npm)
  ```
    node --version && npm --version
  ```
  
  Expected:
  ```
    v4.5.0
    2.15.9
  ```

2. We use the node version to solve the [sudo issue](https://c9.io/blog/how-to-use-yeoman-on-cloud9/).
  ```
    echo "export NODE_PATH=$NODE_PATH:/home/ubuntu/.nvm/versions/node/v4.5.0/lib/node_modules" >> ~/.bashrc && source ~/.bashrc
  ```


3. Update Npm
  ```
    npm update -g npm
  ```

4. Install all the Global dependencies (Gulp, Grunt, Bower, Yo)
  ```
    npm install -g gulp && npm install -g grunt && npm install -g bower && npm install -g yo
  ```

5. Check Yeoman
  ```
    yo doctor
  ```

  - Expected:
  ```
    Yeoman Doctor
    Running sanity checks on your system
  
    ✔ Global configuration file is valid
    ✔ Node.js version
    ✔ No .bowerrc file in home directory
    ✔ No .yo-rc.json file in home directory
    ✔ npm version
    ✔ NODE_PATH matches the npm root
  ```


6. Then, install the [generator-koa-theme](https://www.npmjs.com/package/generator-koa-theme):

  ```
    npm install -g generator-koa-theme
  ```


7. Download and start the [King of App visualizer](https://github.com/KingofApp/com.kingofapp.visualizer).

  ```
    git clone -b dev https://git@github.com/KingofApp/com.kingofapp.visualizer.git
  ```
  
  ```
    cd com.kingofapp.visualizer
  ```


## Getting started

1. Customize it for c9

  - Replace *Grunfile.js* with the data from *[this file](https://gist.github.com/UlisesGascon/54acff02948964554726708f04a25937#file-gruntfile-js)*
  - Replace *gulp-tasks/serve.js* with the data from *[this file](https://gist.github.com/UlisesGascon/54acff02948964554726708f04a25937#file-serve-js)*
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

3. Update the `theme` object in the `app/core/structure.json`:

  ```json
    {
      "config": {
        ...
        "theme": {
          "identifier": "koapp-theme-mythemename",
          "path": "themes/koapp-theme-mythemename/koapp-theme-mythemename.html"
        },
        ...
      },
      ...
    }
  ```

4. Begins to change all elements as you want!

  You can see the changes:
  * In the visualizer app: `https://<workspacename>-<username>.c9users.io`
  * In each element demo. Example: `https://<workspacename>-<username>.c9users.io/themes/koapp-theme-mythemename/elements/mythemename-button/demo/`
