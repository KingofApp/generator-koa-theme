'use strict';

var yeoman = require('yeoman-generator');
var fs = require('fs');

module.exports = yeoman.generators.NamedBase.extend({
  init: function() {
    this.themeName = this.name;
    this.themeKoaName = 'koa-' + this.themeName + '-theme';
    this.destinationRoot(this.destinationPath() + '/' + this.themeKoaName);
    this.tags = [];
  },

  getTags: function() {
    var elements = [];
    var elementsPath = '../generators/app/templates/elements';
    var elementsFolders = fs.readdirSync(elementsPath).filter(function(file) {
      return fs.statSync(elementsPath + '/' + file).isDirectory();
    });

    elementsFolders.forEach(function(elementFolder) {
      var elementsFiles = fs.readdirSync(elementsPath + '/' + elementFolder);

      elementsFiles.forEach(function(elementFile) {
        var elementName = elementFile.replace('.html', '');

        if (elementsFiles.length === 1) {
          elements.push(elementName);
        } else {
          if (elementFolder === elementName) {
            elements.push(elementName);
          } else {
            elements.push(elementFolder + '/' + elementName);
          }
        }
      });
    });

    elements.forEach(function(element) {
      var tag = element.replace(new RegExp('koa-', 'g'), '');
      this.tags.push(tag);
    }.bind(this));
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'),
      {
        themeName: this.themeName,
        themeKoaName: this.themeKoaName,
        authorName: this.user.git.name(),
        authorEmail: this.user.git.email()
      }
    );

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    this.directory(
      this.templatePath('styles'),
      this.destinationPath('styles')
    );

    this.fs.copyTpl(
      this.templatePath('koa-theme.html'),
      this.destinationPath(this.themeKoaName + '.html'),
      {themeName: this.themeName}
    );

    this.fs.copyTpl(
      this.templatePath('dist/koa-theme.html'),
      this.destinationPath('dist/' + this.themeKoaName + '.html'),
      {themeName: this.themeName}
    );
  },

  writingElements: function() {
    this.tags.forEach(function(tag) {
      var isSubElement = tag.search('/') !== -1;

      if (!isSubElement) {
        var tagName = this.themeName + '-' + tag;

        this.fs.copyTpl(
          this.templatePath('elements/koa-' + tag + '/koa-' + tag + '.html'),
          this.destinationPath('elements/' + tagName + '/' + tagName + '.html'),
          {tagName: tagName, themeName: this.themeName}
        );

        this.fs.copyTpl(
          this.templatePath('elements/demo.html'),
          this.destinationPath('elements/' + tagName + '/demo/index.html'),
          {tagName: tagName}
        );
      } else {
        var parentTag = tag.split('/')[0];
        var childTag = tag.split('/')[1];
        var parentTagName = this.themeName + '-' + parentTag;
        var tagName = this.themeName + '-' + childTag;
        var tPath = 'elements/koa-' + parentTag + '/koa-' + childTag + '.html';
        var dPath = 'elements/' + parentTagName + '/' + tagName + '.html';

        this.fs.copyTpl(
          this.templatePath(tPath),
          this.destinationPath(dPath),
          {tagName: tagName, themeName: this.themeName}
        );
      }
    }.bind(this));
  },

  install: function() {
    this.installDependencies({npm: false, bower: true});
  }
});
