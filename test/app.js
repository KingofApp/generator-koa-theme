'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-koapp-Theme:app', function () {
  this.timeout(15000);

  var anwsers = {
    themeName: '   new theme',
    userName: 'Yo Mismo',
    spanishDescription: 'Mi nuevo tema',
    englishDescription: 'My new theme',
    license: 'MIT',
    homepage: 'http://kingofapp.com',
    categories: '   themes,DOCumentation, demo',
    price: '0'
  };

  var anwsersExpected = {
    themeName: 'new-theme',
    varModuleName: 'newTheme',
    homepage: 'http://kingofapp.com',
    userName: 'Yo Mismo',
    spanishDescription: 'Mi nuevo tema',
    englishDescription: 'My new theme',
    license: 'MIT',
    categories: ['themes', 'documentation', 'demo'],
    price: 0,
    generatorVersion: 'v0.15.0'
  };

  anwsersExpected.themeKoaName = 'koapp-theme-' + anwsersExpected.themeName;

  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts(anwsers)
      .toPromise();
  });

  var filesCreated = [
    'elements/' + anwsersExpected.themeName + '-badge/demo/index.html',
    'elements/' + anwsersExpected.themeName + '-badge/' + anwsersExpected.themeName + '-badge.html',
    'elements/' + anwsersExpected.themeName + '-button/demo/index.html',
    'elements/' + anwsersExpected.themeName + '-button/' + anwsersExpected.themeName + '-button.html',
    'elements/' + anwsersExpected.themeName + '-card/demo/index.html',
    'elements/' + anwsersExpected.themeName + '-card/' + anwsersExpected.themeName + '-card.html',
    'elements/' + anwsersExpected.themeName + '-checkbox/demo/index.html',
    'elements/' + anwsersExpected.themeName + '-checkbox/' + anwsersExpected.themeName + '-checkbox.html',
    'elements/' + anwsersExpected.themeName + '-dialog/demo/index.html',
    'elements/' + anwsersExpected.themeName + '-dialog/' + anwsersExpected.themeName + '-dialog.html',
    'elements/' + anwsersExpected.themeName + '-dropdown-menu/demo/index.html',
    'elements/' + anwsersExpected.themeName + '-dropdown-menu/' + anwsersExpected.themeName + '-dropdown-menu.html',
    'elements/' + anwsersExpected.themeName + '-grid/demo/index.html',
    'elements/' + anwsersExpected.themeName + '-grid/' + anwsersExpected.themeName + '-grid.html',
    'elements/' + anwsersExpected.themeName + '-icon-button/demo/index.html',
    'elements/' + anwsersExpected.themeName + '-icon-button/' + anwsersExpected.themeName + '-icon-button.html',
    'elements/' + anwsersExpected.themeName + '-input/demo/index.html',
    'elements/' + anwsersExpected.themeName + '-input/' + anwsersExpected.themeName + '-input-char-counter.html',
    'elements/' + anwsersExpected.themeName + '-input/' + anwsersExpected.themeName + '-input-container.html',
    'elements/' + anwsersExpected.themeName + '-input/' + anwsersExpected.themeName + '-input-error.html',
    'elements/' + anwsersExpected.themeName + '-input/' + anwsersExpected.themeName + '-input.html',
    'elements/' + anwsersExpected.themeName + '-input/' + anwsersExpected.themeName + '-textarea.html',
    'elements/' + anwsersExpected.themeName + '-item/demo/index.html',
    'elements/' + anwsersExpected.themeName + '-item/' + anwsersExpected.themeName + '-item-body.html',
    'elements/' + anwsersExpected.themeName + '-item/' + anwsersExpected.themeName + '-item.html',
    'elements/' + anwsersExpected.themeName + '-menu/demo/index.html',
    'elements/' + anwsersExpected.themeName + '-menu/' + anwsersExpected.themeName + '-menu-shared-styles.html',
    'elements/' + anwsersExpected.themeName + '-menu/' + anwsersExpected.themeName + '-menu.html',
    'elements/' + anwsersExpected.themeName + '-menu/' + anwsersExpected.themeName + '-submenu.html',
    'elements/' + anwsersExpected.themeName + '-menu-button/demo/index.html',
    'elements/' + anwsersExpected.themeName + '-menu-button/' + anwsersExpected.themeName + '-menu-button.html',
    'elements/' + anwsersExpected.themeName + '-progress/demo/index.html',
    'elements/' + anwsersExpected.themeName + '-progress/' + anwsersExpected.themeName + '-progress.html',
    'elements/' + anwsersExpected.themeName + '-radio-button/demo/index.html',
    'elements/' + anwsersExpected.themeName + '-radio-button/' + anwsersExpected.themeName + '-radio-button.html',
    'elements/' + anwsersExpected.themeName + '-slider/demo/index.html',
    'elements/' + anwsersExpected.themeName + '-slider/' + anwsersExpected.themeName + '-slider.html',
    'elements/' + anwsersExpected.themeName + '-tabs/demo/index.html',
    'elements/' + anwsersExpected.themeName + '-tabs/' + anwsersExpected.themeName + '-tab.html',
    'elements/' + anwsersExpected.themeName + '-tabs/' + anwsersExpected.themeName + '-tabs.html',
    'elements/' + anwsersExpected.themeName + '-toggle-button/demo/index.html',
    'elements/' + anwsersExpected.themeName + '-toggle-button/' + anwsersExpected.themeName + '-toggle-button.html',
    'elements/' + anwsersExpected.themeName + '-toolbar/demo/index.html',
    'elements/' + anwsersExpected.themeName + '-toolbar/' + anwsersExpected.themeName + '-toolbar.html',
    'bower.json',
    '.bowerrc',
    'config.json',
    '.gitignore',
    'styles/default-theme.html',
    'styles/main.css',
    'Gulpfile.js',
    'package.json',
    'gulp-tasks/distribution.js',
    'gulp-tasks/integration.js',
    'gulp-tasks/lint.js',
    'gulp-tasks/testing.js',
    'tests/protractor.conf.js',
    'tests/e2e/spec.js',
    'koapp-theme-' + anwsersExpected.themeName + '.html'
  ];

  filesCreated.forEach(function (file) {
    it('creates file ' + file, function () {
      assert.file([
        file
      ]);
    });
  });

  it('checks content package.json', function () {
    assert.jsonFileContent('package.json', {
      name: anwsersExpected.themeName,
      author: anwsersExpected.userName,
      description: anwsersExpected.englishDescription,
      license: anwsersExpected.license
    });
  });

  it('checks content bower.json', function () {
    assert.jsonFileContent('bower.json', {
      name: anwsersExpected.themeKoaName,
      authors: anwsersExpected.userName,
      description: anwsersExpected.englishDescription,
      main: anwsersExpected.themeKoaName + '.html',
      license: anwsersExpected.license,
      homepage: anwsersExpected.homepage
    });
  });

  it('checks content config.json', function () {
    assert.jsonFileContent('config.json', {
      name: anwsersExpected.themeKoaName,
      identifier: anwsersExpected.themeKoaName,
      description: {
        'es-ES': anwsersExpected.spanishDescription,
        'en-US': anwsersExpected.englishDescription
      },
      author: anwsersExpected.userName,
      category: anwsersExpected.categories,
      price: anwsersExpected.price,
      images: {
        list: 'themes/' + anwsersExpected.themeKoaName + '/images/list.png',
        screenshots: [
          'themes/' + anwsersExpected.themeKoaName + '/images/screenshot01.png',
          'themes/' + anwsersExpected.themeKoaName + '/images/screenshot02.png'
        ],
        popover: 'themes/' + anwsersExpected.themeKoaName + '/images/popover.png',
        banner: 'themes/' + anwsersExpected.themeKoaName + '/images/banner.png'
      },
      main: 'themes/' + anwsersExpected.themeKoaName + '/' + anwsersExpected.themeKoaName + '.html'
    });
  });
});
