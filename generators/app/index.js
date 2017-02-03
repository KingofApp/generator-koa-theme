'use strict';

var fs          = require('fs');
var path        = require('path');
var packageJson = require('../../package.json');
var yeoman      = require('yeoman-generator');
var chalk       = require('chalk');
var yosay       = require('yosay');
var tools       = require('koapp');

var themeInput = {};

module.exports = yeoman.Base.extend({

  init: function () {
    var self = this;

    this.argument('pluginName',       {type: String, desc: 'Module name',         alias: 'n', required: true});
    this.option('homepage',           {type: String, desc: 'Author\'s homepage',  alias: 'w'});
    this.option('userName',           {type: String, desc: 'Author\'s name',      alias: 'u'});
    this.option('spanishDescription', {type: String, desc: 'Spanish description', alias: 's'});
    this.option('englishDescription', {type: String, desc: 'English description', alias: 'e'});
    this.option('price',              {type: Number, desc: 'Price',               alias: 'p', default: 0});
    this.option('license',            {type: String, desc: 'License',             alias: 'l', default: 'MIT'});
    this.option('categories',         {type: tools.parseCategories, desc: 'Categories (comma to split)', alias: 'c'});

    ['homepage', 'userName', 'spanishDescription', 'englishDescription', 'license', 'price'].forEach(function(id){
      self[id] = self.options[id] || '';
    });
    var pluginName = this.arguments[0].toLowerCase();
    this.elements         = [];
    this.generatorVersion = 'v' + packageJson.version;
    this.categories       = tools.fixPluginCategories(this.options.categories || 'others');
    this.pluginName       = tools.fixPluginName(pluginName, '-');
    this.varpluginName    = tools.camelize(pluginName);
    this.themeKoaName     = 'koapp-theme-' + pluginName;
    this.destinationRoot(this.destinationPath() + '/' + this.themeKoaName);
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
      'pluginName',
      'homepage',
      'varpluginName',
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
      {item: 'badge',         position: 2},
      {item: 'button',        position: 3},
      {item: 'card',          position: 4},
      {item: 'checkbox',      position: 5},
      {item: 'dialog',        position: 6},
      {item: 'dropdown-menu', position: 8},
      {item: 'grid',          position: 10},
      {item: 'icon-button',   position: 11},
      {item: 'item',          position: 13},
      {item: 'menu-button',   position: 15},
      {item: 'progress',      position: 17},
      {item: 'radio-button',  position: 18},
      {item: 'slider',        position: 19},
      {item: 'spinner',       position: 20},
      {item: 'tabs',          position: 21},
      {item: 'toggle-button', position: 22},
      {item: 'toolbar',       position: 23}
    ];

    var originalFiles = [
      ['_bowerrc',                    '.bowerrc'],
      ['_gitignore',                  '.gitignore'],
      ['Gulpfile.js',                 'Gulpfile.js'],
      ['gulp-tasks/lint.js',          'gulp-tasks/lint.js'],
      ['gulp-tasks/testing.js',       'gulp-tasks/testing.js'],
      ['gulp-tasks/distribution.js',  'gulp-tasks/distribution.js'],
      ['tests/protractor.conf.js',    'tests/protractor.conf.js']
    ];

    var templatedFiles = [
      ['bower.json',                'bower.json'],
      ['config.json',               'config.json'],
      ['package.json',              'package.json'],
      ['tests/e2e/spec.js',         'tests/e2e/spec.js'],
      ['gulp-tasks/integration.js', 'gulp-tasks/integration.js'],
      ['koa-theme.html',             this.themeKoaName + '.html']
    ];

    originalFiles.forEach(function(originDestinyPair) {
      tools.copy(_self, 'copy', originDestinyPair[0], originDestinyPair[1]);
    });

    templatedFiles.forEach(function(originDestinyPair) {
      tools.copy(_self, 'copyTpl', originDestinyPair[0], originDestinyPair[1], themeInput);
    });

    this.directory(
      this.templatePath('styles'),
      this.destinationPath('styles')
    );
  },

  writingElements: function () {
    var pluginName = this.pluginName;
    function replaceKoa(text) {
      return text.replace(new RegExp('koa-', 'g'), pluginName + '-');
    }

    this.elements.forEach(function (element) {
      element.files.forEach(function (file) {
        var templatePath = 'elements/' + element.name + '/' + file;
        var destinationPath = replaceKoa(templatePath);
        var tagName = replaceKoa(file.replace('.html', ''));

        tools.copy( this,
                    'copyTpl',
                    this.templatePath(templatePath),
                    this.destinationPath(destinationPath),
                    {tagName: tagName, pluginName: this.pluginName}
                  );
      }.bind(this));

      var tagName = replaceKoa(element.name);

      tools.copy( this,
                  'copyTpl',
                  this.templatePath('elements/' + element.name + '/demo/index.html'),
                  this.destinationPath('elements/' + tagName + '/demo/index.html'),
                  {tagName: tagName, pluginName: this.pluginName}
                );
    }.bind(this));
  },

  install: function () {
    this.installDependencies({npm: true, bower: false});
  }
});
