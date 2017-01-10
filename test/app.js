'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-koapp-Theme:app', function () {
  this.timeout(15000);

  var anwsers = {
    pluginName: '   new theme',
    userName: 'Yo Mismo',
    spanishDescription: 'Mi nuevo tema',
    englishDescription: 'My new theme',
    license: 'MIT',
    homepage: 'http://kingofapp.com',
    categories: '   themes,DOCumentation, demo',
    price: '0'
  };

  var anwsersExpected = {
    pluginName: 'new-theme',
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

  anwsersExpected.themeKoaName = 'koapp-theme-' + anwsersExpected.pluginName;

  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts(anwsers)
      .toPromise();
  });

  var filesCreated = [
    'elements/' + anwsersExpected.pluginName + '-badge/demo/index.html',
    'elements/' + anwsersExpected.pluginName + '-badge/' + anwsersExpected.pluginName + '-badge.html',
    'elements/' + anwsersExpected.pluginName + '-button/demo/index.html',
    'elements/' + anwsersExpected.pluginName + '-button/' + anwsersExpected.pluginName + '-button.html',
    'elements/' + anwsersExpected.pluginName + '-card/demo/index.html',
    'elements/' + anwsersExpected.pluginName + '-card/' + anwsersExpected.pluginName + '-card.html',
    'elements/' + anwsersExpected.pluginName + '-checkbox/demo/index.html',
    'elements/' + anwsersExpected.pluginName + '-checkbox/' + anwsersExpected.pluginName + '-checkbox.html',
    'elements/' + anwsersExpected.pluginName + '-dialog/demo/index.html',
    'elements/' + anwsersExpected.pluginName + '-dialog/' + anwsersExpected.pluginName + '-dialog.html',
    'elements/' + anwsersExpected.pluginName + '-dropdown-menu/demo/index.html',
    'elements/' + anwsersExpected.pluginName + '-dropdown-menu/' + anwsersExpected.pluginName + '-dropdown-menu.html',
    'elements/' + anwsersExpected.pluginName + '-grid/demo/index.html',
    'elements/' + anwsersExpected.pluginName + '-grid/' + anwsersExpected.pluginName + '-grid.html',
    'elements/' + anwsersExpected.pluginName + '-icon-button/demo/index.html',
    'elements/' + anwsersExpected.pluginName + '-icon-button/' + anwsersExpected.pluginName + '-icon-button.html',
    'elements/' + anwsersExpected.pluginName + '-input/demo/index.html',
    'elements/' + anwsersExpected.pluginName + '-input/' + anwsersExpected.pluginName + '-input-char-counter.html',
    'elements/' + anwsersExpected.pluginName + '-input/' + anwsersExpected.pluginName + '-input-container.html',
    'elements/' + anwsersExpected.pluginName + '-input/' + anwsersExpected.pluginName + '-input-error.html',
    'elements/' + anwsersExpected.pluginName + '-input/' + anwsersExpected.pluginName + '-input.html',
    'elements/' + anwsersExpected.pluginName + '-input/' + anwsersExpected.pluginName + '-textarea.html',
    'elements/' + anwsersExpected.pluginName + '-item/demo/index.html',
    'elements/' + anwsersExpected.pluginName + '-item/' + anwsersExpected.pluginName + '-item-body.html',
    'elements/' + anwsersExpected.pluginName + '-item/' + anwsersExpected.pluginName + '-item.html',
    'elements/' + anwsersExpected.pluginName + '-menu/demo/index.html',
    'elements/' + anwsersExpected.pluginName + '-menu/' + anwsersExpected.pluginName + '-menu-shared-styles.html',
    'elements/' + anwsersExpected.pluginName + '-menu/' + anwsersExpected.pluginName + '-menu.html',
    'elements/' + anwsersExpected.pluginName + '-menu/' + anwsersExpected.pluginName + '-submenu.html',
    'elements/' + anwsersExpected.pluginName + '-menu-button/demo/index.html',
    'elements/' + anwsersExpected.pluginName + '-menu-button/' + anwsersExpected.pluginName + '-menu-button.html',
    'elements/' + anwsersExpected.pluginName + '-progress/demo/index.html',
    'elements/' + anwsersExpected.pluginName + '-progress/' + anwsersExpected.pluginName + '-progress.html',
    'elements/' + anwsersExpected.pluginName + '-radio-button/demo/index.html',
    'elements/' + anwsersExpected.pluginName + '-radio-button/' + anwsersExpected.pluginName + '-radio-button.html',
    'elements/' + anwsersExpected.pluginName + '-slider/demo/index.html',
    'elements/' + anwsersExpected.pluginName + '-slider/' + anwsersExpected.pluginName + '-slider.html',
    'elements/' + anwsersExpected.pluginName + '-tabs/demo/index.html',
    'elements/' + anwsersExpected.pluginName + '-tabs/' + anwsersExpected.pluginName + '-tab.html',
    'elements/' + anwsersExpected.pluginName + '-tabs/' + anwsersExpected.pluginName + '-tabs.html',
    'elements/' + anwsersExpected.pluginName + '-toggle-button/demo/index.html',
    'elements/' + anwsersExpected.pluginName + '-toggle-button/' + anwsersExpected.pluginName + '-toggle-button.html',
    'elements/' + anwsersExpected.pluginName + '-toolbar/demo/index.html',
    'elements/' + anwsersExpected.pluginName + '-toolbar/' + anwsersExpected.pluginName + '-toolbar.html',
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
    'koapp-theme-' + anwsersExpected.pluginName + '.html'
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
      name: anwsersExpected.pluginName,
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
