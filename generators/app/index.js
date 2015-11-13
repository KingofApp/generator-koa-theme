'use strict';

var yeoman = require('yeoman-generator');
var tags = require('./tags.json');

module.exports = yeoman.generators.NamedBase.extend({
  init: function() {
    this.themeName = this.name;
    this.themeKoaName = 'koa-' + this.themeName + '-theme';
    this.destinationRoot(this.destinationPath() + '/_' + this.themeKoaName);
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'),
      {themeName: this.themeName, themeKoaName: this.themeKoaName}
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

    this.directory(
      this.templatePath('styles'),
      this.destinationPath('styles')
    );
  }

});
