'use strict';

var fs = require('fs');
var path = require('path');
var packageJson = require('../../package.json');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var themeInput = {};

module.exports = yeoman.Base.extend({

  prompting: function () {
    this.log(yosay(
      'Welcome to ' + chalk.red('King of App ') + chalk.blue('Theme Generator') + '!'
    ));

    return this.prompt([{
      type: 'input',
      name: 'themeName',
      message: 'Theme name',
      required: true
    }, {
      type: 'input',
      name: 'userName',
      message: 'Author\'s name'
    }, {
      type: 'input',
      name: 'homepage',
      message: 'Author\'s homepage'
    }, {
      type: 'input',
      name: 'spanishDescription',
      message: 'Spanish description'
    }, {
      type: 'input',
      name: 'englishDescription',
      message: 'English description'
    }, {
      type: 'inpt',
      name: 'license',
      message: 'License',
      default: 'MIT'
    }, {
      type: 'input',
      name: 'categories',
      message: 'Categories (comma to split)'
    }, {
      type: 'input',
      name: 'price',
      message: 'Price'
    }]).then(function (answers) {
      this.log('Thanks! The process will start now...');

      this.homepage = answers.homepage;
      this.themeName = fixThemeName(answers.themeName, '-');
      this.varthemeName = camelize(answers.themeName);
      this.userName = answers.userName;
      this.spanishDescription = answers.spanishDescription;
      this.englishDescription = answers.englishDescription;
      this.license = answers.license;
      this.categories = fixThemeCategories(answers.categories);
      this.price = answers.price;
      this.generatorVersion = 'v' + packageJson.version;
      this.themeKoaName = 'koapp-theme-' + this.themeName;
      this.destinationRoot(this.destinationPath() + '/' + this.themeKoaName);
      this.elements = [];
    }.bind(this));
  },

  getElementsTree: function () {
    var elementsPath = path.join(__dirname, '/templates/elements/');
    var elementsFolders = fs.readdirSync(elementsPath).filter(function (file) {
      return fs.statSync(elementsPath + '/' + file).isDirectory();
    });

    elementsFolders.forEach(function (elementFolder) {
      var elementsFiles = fs.readdirSync(elementsPath + '/' + elementFolder);

      this.elements.push({
        name: elementFolder,
        files: elementsFiles
      });
    }.bind(this));
  },

  writing: function () {
    var _self = this;

    var keys = [
      'themeName',
      'homepage',
      'varthemeName',
      'userName',
      'spanishDescription',
      'englishDescription',
      'license',
      'categories',
      'price',
      'generatorVersion',
      'themeKoaName',
      'elements'
    ];

    keys.forEach(function (key) {
      themeInput[key] = _self[key];
    });

    themeInput.elements = [
      {item: 'badge', position: 2},
      {item: 'button', position: 3},
      {item: 'card', position: 4},
      {item: 'checkbox', position: 5},
      {item: 'dialog', position: 6},
      {item: 'dropdown-menu', position: 8},
      {item: 'grid', position: 10},
      {item: 'icon-button', position: 11},
      {item: 'item', position: 13},
      {item: 'menu-button', position: 15},
      {item: 'progress', position: 17},
      {item: 'radio-button', position: 18},
      {item: 'slider', position: 19},
      {item: 'spinner', position: 20},
      {item: 'tabs', position: 21},
      {item: 'toggle-button', position: 22},
      {item: 'toolbar', position: 23}
    ];

    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'),
      themeInput
    );

    this.fs.copy(
      this.templatePath('_bowerrc'),
      this.destinationPath('.bowerrc')
    );

    this.fs.copyTpl(
      this.templatePath('config.json'),
      this.destinationPath('config.json'),
      themeInput
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      themeInput
    );

    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('Gulpfile.js'),
      this.destinationPath('Gulpfile.js')
    );

    this.fs.copy(
      this.templatePath('gulp-tasks/distribution.js'),
      this.destinationPath('gulp-tasks/distribution.js')
    );

    this.fs.copy(
      this.templatePath('gulp-tasks/lint.js'),
      this.destinationPath('gulp-tasks/lint.js')
    );

    this.fs.copy(
      this.templatePath('gulp-tasks/testing.js'),
      this.destinationPath('gulp-tasks/testing.js')
    );

    this.fs.copyTpl(
      this.templatePath('gulp-tasks/integration.js'),
      this.destinationPath('gulp-tasks/integration.js'),
      themeInput
    );

    this.fs.copy(
      this.templatePath('tests/protractor.conf.js'),
      this.destinationPath('tests/protractor.conf.js')
    );

    this.fs.copyTpl(
      this.templatePath('tests/e2e/spec.js'),
      this.destinationPath('tests/e2e/spec.js'),
      themeInput
    );

    this.directory(
      this.templatePath('styles'),
      this.destinationPath('styles')
    );

    this.fs.copyTpl(
      this.templatePath('koa-theme.html'),
      this.destinationPath(this.themeKoaName + '.html'),
      themeInput
    );
  },

  writingElements: function () {
    var themeName = this.themeName;
    function replaceKoa(text) {
      return text.replace(new RegExp('koa-', 'g'), themeName + '-');
    }

    this.elements.forEach(function (element) {
      element.files.forEach(function (file) {
        var templatePath = 'elements/' + element.name + '/' + file;
        var destinationPath = replaceKoa(templatePath);
        var tagName = replaceKoa(file.replace('.html', ''));

        this.fs.copyTpl(
          this.templatePath(templatePath),
          this.destinationPath(destinationPath),
          {tagName: tagName, themeName: this.themeName}
        );
      }.bind(this));

      var tagName = replaceKoa(element.name);

      this.fs.copyTpl(
        this.templatePath('elements/' + element.name + '/demo/index.html'),
        this.destinationPath('elements/' + tagName + '/demo/index.html'),
        {tagName: tagName, themeName: this.themeName}
      );
    }.bind(this));
  },

  install: function () {
    this.installDependencies({npm: true, bower: false});
  }
});

/** Function that validate the theme name
* @returns {String}
*/
function fixThemeName(name, ReplaceSymbol) {
  name = name.toLowerCase().trim();
  return name.replace(/ /g, ReplaceSymbol);
}

/** Function that validate the Categories
* @returns {String}
*/
function fixThemeCategories(list) {
  list = list.replace(/ /g, '').toLowerCase().trim();
  var arrayCategories = list.split(',');
  return JSON.stringify(arrayCategories);
}

/** Function that converts a string into camel case using javascript regex
 * @author Christian C. Salvadó
 * @see http://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
 * @param {string} user's input
 * @returns {string} camelCase
*/
function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
    return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}
