# generator-koapp-theme

![Koa-logo](http://kingofapp.es/wp-content/uploads/2015/02/logoking-r1.png)

> Scaffold out a King of App Theme

### Installation

First, install [Yeoman](http://yeoman.io) and generator-koapp-theme using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g gulp
npm install -g generator-koapp-theme
```

Generate your new theme:

```bash
yo koapp-theme -n themeName
```

Optionally, you can include the following flags:

* `-u authorName`
* `-w authorHomepage`
* `-s spanishDescription`
* `-e englishDescription`
* `-p price`
* `-l license`
* `-c categories` separated by comma

Then start your new theme:

```bash
cd {Project-name} && gulp
```

### Automated Tasks (Gulp)

**Main Tasks**

- `gulp` It runs `watch-config`, `watch-bower`
- `gulp distribution` It runs `dist-zip`

**All Tasks**

- `gulp lint` Linter for your code.
- `gulp e2e` It runs integration test with Protractor.
- `gulp dist-zip` It generates a compression file ready to upload
- `gulp watch-bower` It's monitoring for changes in bower.json.
- `gulp watch-config` It's monitoring for changes in config.json,  also it will update a../../app/core/structure.json

### Contribution

Please open an issue with your suggestion/question.

If you want to improve the code, please follow these steps and submit a pull request.

- Download
```bash
git clone https://github.com/KingofApp/generator-koapp-theme.git && cd generator-koapp-theme
```

- Install all dependencies
```bash
npm install
```

- Added to local NPM
```bash
npm link
```

- Execute it
```bash
yo
```

- Test your changes ;-)
```bash
npm test
```

### License

MIT © [King of App](https://github.com/KingofApp)
