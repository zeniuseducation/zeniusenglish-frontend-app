# [![zeniusEnglish](https://zeniusenglish.com/)] Frontend Kit

## Overview

This frontend kit is an extension of Google Inc. [Web Starter Kit](https://developers.google.com/web/starter-kit), an opinionated boilerplate for web development. It uses [gulp](http://gulpjs.com/) as tasks runner.

## Dependencies

1. [NPM](https://www.npmjs.com/) and [nodejs](https://nodejs.org/) and its plugins:
  * apache-server-configs
  * browser-sync
  * del
  * gulp
  * opn
  * psi
  * require-dir
  * run-sequence
2. [Gulp](http://gulpjs.com/) and its plugins:
  * gulp-autoprefixer
  * gulp-cache
  * gulp-changed
  * gulp-csso
  * gulp-file-include
  * gulp-flatten
  * gulp-if
  * gulp-imagemin
  * gulp-jshint
  * gulp-load-plugins
  * gulp-minify-html
  * gulp-rename
  * gulp-replace
  * gulp-sass
  * gulp-size
  * gulp-sourcemaps
  * gulp-uglify
  * gulp-uncss
  * gulp-useref

## Quickstart

1. Install NPM and Nodejs:
```sh
$ brew install node
``'

2. Install Gulp:
```sh
npm install -g gulp
```

3. Inside your working directory where package.json is:
```sh
npm install
```

# API

* Build production:
```sh
gulp
```

* Watch:
```sh
gulp serve
```

* Pagespeed Insight:
```sh
gulp pagespeed
```
