/*
* zeniusEnglish Frontend Kit
* by Wisnu Mulya
*
* Copyright 2015 Zenius Education. All rights reserved
*
* Note: This is a modified version of Google Inc. Web Starter Kit
*       https://github.com/google/web-starter-kit
*/

'use strict';

// Inclue Gulp & tools we'll use
var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  del = require('del'),
  runSequence = require('run-sequence'),
  browserSync = require('browser-sync'),
  pageSpeed = require('psi'),
  reload = browserSync.reload,
  path = require('path'),
  paths = {
    source: './src/',
    templates: './src/.tpl/',
    distribution: './dist/'
  },
  AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

// Build HTML templates; Copyright 2014 Objects in Space (https://medium.com/objects-in-space/considering-a-static-site-tool-learn-gulp-2fd5f9821fc4)
gulp.task('fileInclude', function() {
  return gulp.src(path.join(paths.templates, '*.tpl.html'))
    .pipe(plugins.fileInclude())
    .pipe(plugins.rename({
      extname: ""
    }))
    .pipe(plugins.rename({
      extname: ".html"
    }))
    .pipe(gulp.dest(paths.source))
    .pipe(plugins.size({title: 'fileInclude'}));
});

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src(path.join(paths.source, 'scripts/**/*.js'))
    .pipe(reload({stream: true, once: true}))
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.if(!browserSync.active, plugins.jshint.reporter('fail')));
});

// Optimize images
gulp.task('images', function () {
  return gulp.src(path.join(paths.source, 'images/**/*'))
    .pipe(plugins.cache(plugins.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(path.join(paths.distribution, 'images')))
    .pipe(plugins.size({title: 'images'}));
});

// Copy all files at the root level (app)
gulp.task('copy', function () {
  return gulp.src([
    path.join(paths.source, "*"),
    '!' + path.join(paths.source, '*.html'),
    'node_modules/apache-server-configs/dist/.htaccess'
  ]).pipe(gulp.dest(paths.distribution))
    .pipe(plugins.size({title: 'copy'}));
});

// Copy web fonts to dist
gulp.task('fonts', function () {
  return gulp.src([path.join(paths.source, 'fonts/**')])
    .pipe(gulp.dest(path.join(paths.distribution, 'fonts')))
    .pipe(plugins.size({title: 'fonts'}));
});

// Compile and automatically prefix stylesheets
gulp.task('styles', function () {
  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
    path.join(paths.source, 'styles/**/*.scss')
  ])
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.changed('.tmp/styles', {extension: '.css'}))
    .pipe(plugins.sass({
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe(plugins.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    // Concatenate and minify styles
    .pipe(plugins.if('*.css', plugins.csso()))
    .pipe(gulp.dest(path.join(paths.distribution, 'styles')))
    .pipe(plugins.size({title: 'styles'}));
});

// Scan your HTML for assets & optimize them
gulp.task('html', function () {
  var assets = plugins.useref.assets({searchPath: '{.tmp,src}'});

  return gulp.src(path.join(paths.source, '*.html'))
    .pipe(assets)
    // Concatenate and minify JavaScript
    .pipe(plugins.if('*.js', plugins.uglify({preserveComments: 'some'})))
    // Output concatenated and minified scripts
    // .pipe(plugins.if('*.js', gulp.dest(paths.distribution)))
    // Compress scripts
    // .pipe(plugins.if('*.js', plugins.gzip({threshold: true})))
    // Remove any unused CSS
    .pipe(plugins.if('*.css', plugins.uncss({
      html: path.join(paths.source, '*.html')//,
      // CSS Selectors for UnCSS to ignore
      // ignore: [
      //   /.navdrawer-container.open/,
      //   /.app-bar.open/
      // ]
    })))
    // Concatenate and minify styles
    // In case you are still using useref build blocks
    .pipe(plugins.if('*.css', plugins.csso()))
    .pipe(assets.restore())
    .pipe(plugins.useref())
    // Minify any HTML
    .pipe(plugins.if('*.html', plugins.minifyHtml()))
    // Output files
    .pipe(gulp.dest(paths.distribution))
    .pipe(plugins.size({title: 'html'}));
});

// Clean output directory
gulp.task('clean', del.bind(null, ['.tmp', path.join(paths.distribution, '*'), path.join('!', paths.distribution, '.git')], {dot: true}));

// Watch files for changes & reload
gulp.task('serve', ['fileInclude', 'styles'], function () {
  browserSync({
    notify: false,
    // Customize the BrowserSync console logging prefix
    logPrefix: 'WSK',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['.tmp', paths.source]
  });

  gulp.watch([path.join(paths.templates, '**/*.tpl.html')], ['fileInclude', reload]);
  gulp.watch([path.join(paths.source, 'styles/**/*.scss')], ['styles', reload]);
  gulp.watch([path.join(paths.source, 'scripts/**/*.js')], ['jshint']);
  gulp.watch([path.join(paths.source, 'images/**/*')], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function () {
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: paths.distribution
  });
});

// Build production files, the default task
gulp.task('default', ['clean'], function (cb) {
  runSequence(['fileInclude', 'styles'], ['jshint', 'html', 'images', 'fonts', 'copy'], cb);
});

// Run PageSpeed Insights
gulp.task('pagespeed', function (cb) {
  // Update the below URL to the public URL of your site
  pageSpeed.output('https://zeniusenglish.com/', {
    strategy: 'mobile',
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
  }, cb);
});

// Load custom tasks from the `tasks` directory
// try { require('require-dir')('tasks'); } catch (err) { console.error(err); }
