'use strict';

var yeoman = require('yeoman-generator');
var tags = require('./tags.json');

module.exports = yeoman.generators.NamedBase.extend({
  init: function() {
    this.themeName = this.name;
    this.themeKoaName = 'koa-' + this.themeName + '-theme';
    this.destinationRoot(this.destinationPath() + '/_' + this.themeKoaName);
  }

});
