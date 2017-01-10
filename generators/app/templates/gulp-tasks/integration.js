'use strict';

var gulp = require('gulp'),
	jsonTransform = require('gulp-json-transform'),
	beautify = require('gulp-beautify'),
	gutil = require('gulp-util');

require('gulp-watch');

var moduleSetup = {};

gulp.task('watch-bower', function() {
    gulp.watch('bower.json', function() {
      gutil.log(gutil.colors.yellow('Remember! You have to include the changes also in config.json'));
      gutil.log(gutil.colors.yellow('- More info: http://docs.kingofapp.com/modules/'));
    });
});


gulp.task('install', function() {

  var theme = {
    "identifier": "<%= themeKoaName %>",
    "path": "themes/<%= themeKoaName %>/<%= themeKoaName %>.html"
  };

  gulp.src('../../core/structure.json')
    .pipe(jsonTransform(function(data) {
        data.config.theme = theme;
        return data;
    }))
    .pipe(beautify({indentSize: 2}))
    .pipe(gulp.dest('../../core/'));

});

gulp.task('watch-config', ['install'], function() {
    gulp.watch('config.json', ['install']);
});