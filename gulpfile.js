import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import sassGlob from 'gulp-sass-glob';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import rename from 'gulp-rename';
import pug from 'gulp-pug';
import svgmin from 'gulp-svgmin';
import svgSprite from 'gulp-svg-sprite';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import del from 'del';
import htmlmin from 'gulp-htmlmin';
import gcmq from 'gulp-group-css-media-queries';
import webpackStream from 'webpack-stream';
import ghpages from 'gh-pages';

// Заливка на git hub pages
export const pages = (cb) => ghpages.publish('./build', cb);

// Scripts
export const script = () => gulp.src('source/scripts/main.js')
  .pipe(webpackStream({
    mode: 'production',
    output: {
      filename: 'main.js',
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader'
        }
      ]
    }
  }))
  .pipe(plumber())
  .pipe(terser())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('./build/scripts'));

// Styles

export const styles = () => gulp.src('source/styles/styles.sass', { sourcemaps: true })
  .pipe(plumber())
  .pipe(sassGlob())
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(gcmq())
  .pipe(postcss([
    autoprefixer(),
    csso()
  ]))
  .pipe(rename('styles.min.css'))
  .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
  .pipe(browserSync.stream());

// Pug

export const template = () => gulp.src('source/pages/*.pug')
  .pipe(plumber())
  .pipe(
    pug({
      basedir: 'source',
      pretty: true
    })
  )
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'));

// Images

const optimizeImages = () => gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/images'));

const copyImages = () => gulp.src('source/img/**/*.{jpg,png}')
  .pipe(gulp.dest('build/images'));

// WebP

const createWebp = () => gulp.src(['source/img/**/*.{jpg,png}', '!source/img/favicons/*{png,svg}'])
  .pipe(squoosh({
    webp: {}
  }))
  .pipe(gulp.dest('build/images'));

// SVG

const svg = () => gulp.src(['source/img/**/*.svg'])
  .pipe(svgmin())
  .pipe(gulp.dest('build/images'));

// SVG Sprite

const config = {
  mode: {
    stack: true
  }
};

export const svgSprites = () => gulp.src('source/svg-sprites/*.svg')
  .pipe(svgSprite(config))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/images/svg-sprites'));

// Copy fonts, ico, webmanifest

export const copy = (done) => {
  gulp.src([
    'source/fonts/*woff2',
    'source/*.ico',
    'source/*.webmanifest'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
  done();
};

// Clean

const clean = () => del('build');

// Server

const server = (done) => {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
    online: true
  });
  done();
};

// Reload

const reload = (done) => {
  browserSync.reload();
  done();
};

// Watcher

const watcher = () => {
  gulp.watch([
    './source/styles/**/*.sass',
    './source/blocks/**/*.sass'
  ], gulp.series(styles));
  gulp.watch([
    'source/pages/*.pug',
    'source/blocks/**/*.pug'
  ], gulp.series(template, reload));
  gulp.watch([
    'source/blocks/**/*.js',
    'source/scripts/**/*.js'
  ], gulp.series(script, reload));
};

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    template,
    // script,
    createWebp,
    svg,
    svgSprites
  ),
  gulp.series(
    server,
    watcher
  ));

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel (
    styles,
    template,
    // script,
    svg,
    svgSprites,
    createWebp
  ));
