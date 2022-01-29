import options from './config.js'

import gulp from 'gulp'
import babel from 'gulp-babel'
import del from 'del'

import browserSync from 'browser-sync'

import dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass)

import minifyHTML from 'gulp-htmlmin'

import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import postcss from 'gulp-postcss'
import concat from 'gulp-concat'
import cleanCSS from 'gulp-clean-css'
import purgeCSS from 'gulp-purgecss'

import minifyJS from 'gulp-terser'

import sharpResponsive from 'gulp-sharp-responsive'
import replace from 'gulp-replace'

import logSymbols from 'log-symbols'

// Browser previews (development)
const server = browserSync.create()

function livePreview(done) {
  server.init({
    server: {
      baseDir: options.paths.dist.base,
    },
    port: options.config.port || 5000,
  })
  done()
}

// Browser reloads
function previewReload(done) {
  console.log('\n\t' + logSymbols.info, 'Reloading browser preview.\n')
  server.reload()
  done()
}

// Modern image replacement
const imageOptions = {
  formats: [
    { width: 640, format: 'jpeg', rename: { suffix: '-sm' } },
    { width: 768, format: 'jpeg', rename: { suffix: '-md' } },
    { width: 1024, format: 'jpeg', rename: { suffix: '-lg' } },
    { width: 640, format: 'webp', rename: { suffix: '-sm' } },
    { width: 768, format: 'webp', rename: { suffix: '-md' } },
    { width: 1024, format: 'webp', rename: { suffix: '-lg' } },
    { width: 640, format: 'avif', rename: { suffix: '-sm' } },
    { width: 768, format: 'avif', rename: { suffix: '-md' } },
    { width: 1024, format: 'avif', rename: { suffix: '-lg' } },
  ],
  includeOriginalFile: true,
}
const imageMarkup = `
<picture>
  <source srcset="$1-sm.avif" media="(max-width: 640px)" type="image/avif" />
  <source srcset="$1-md.avif" media="(max-width: 768px)" type="image/avif" />
  <source srcset="$1-lg.avif" media="(max-width: 1024px)" type="image/avif" />
  <source srcset="$1-sm.webp" media="(max-width: 640px)" type="image/webp" />
  <source srcset="$1-md.webp" media="(max-width: 768px)" type="image/webp" />
  <source srcset="$1-lg.webp" media="(max-width: 1024px)" type="image/webp" />
  <source srcset="$1-sm.jpg" media="(max-width: 640px)" type="image/jpeg" />
  <source srcset="$1-md.jpg" media="(max-width: 768px)" type="image/jpeg" />
  <source srcset="$1-lg.jpg" media="(max-width: 1024px)" type="image/jpeg" />
  $&
</picture>
`

//
// Development tasks
//

function devHTML() {
  return gulp
    .src(`${options.paths.src.base}/**/*.html`)
    .pipe(
      replace(
        /<img\s[^>]*?src\s*=\s*['\"]([^'\"\.]*?)\.([^'\"\.]*?)['\"][^>]*?>/g,
        imageMarkup
      )
    )
    .pipe(gulp.dest(options.paths.dist.base))
}

function devStyles() {
  return gulp
    .src(`${options.paths.src.styles}/**/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(options.paths.src.styles))
    .pipe(postcss([tailwindcss(options.config.tailwindjs), autoprefixer]))
    .pipe(concat({ path: 'style.css' }))
    .pipe(gulp.dest(options.paths.dist.styles))
}

function devScripts() {
  return gulp
    .src([
      `${options.paths.src.js}/lib/**/*.js`,
      `${options.paths.src.js}/**/*.js`,
      `!${options.paths.src.js}/**/vendor/*`,
    ])
    .pipe(concat({ path: 'scripts.js' }))
    .pipe(gulp.dest(options.paths.dist.js))
}

function devImages() {
  return gulp
    .src(`${options.paths.src.img}/**/*`)
    .pipe(sharpResponsive(imageOptions))
    .pipe(gulp.dest(options.paths.dist.img))
}

function watchFiles() {
  gulp.watch(
    `${options.paths.src.base}/**/*.html`,
    gulp.series(devHTML, devStyles, previewReload)
  )
  gulp.watch(
    [options.config.tailwindjs, `${options.paths.src.styles}/**/*.scss`],
    gulp.series(devStyles, previewReload)
  )
  gulp.watch(
    `${options.paths.src.js}/**/*.js`,
    gulp.series(devScripts, previewReload)
  )
  gulp.watch(
    `${options.paths.src.img}/**/*`,
    gulp.series(devImages, previewReload)
  )
  console.log('\n\t' + logSymbols.info, 'Watching for changes...\n')
}

function devClean() {
  console.log('\n\t' + logSymbols.info, 'Cleaning generated files.\n')
  return del([options.paths.dist.base])
}

//
// Production tasks
//

function prodHTML() {
  return gulp
    .src(`${options.paths.src.base}/**/*.html`)
    .pipe(
      replace(
        /<img\s[^>]*?src\s*=\s*['\"]([^'\"\.]*?)\.([^'\"\.]*?)['\"][^>]*?>/g,
        imageMarkup
      )
    )
    .pipe(minifyHTML({ collapseWhitespace: true }))
    .pipe(gulp.dest(options.paths.build.base))
}

function prodStyles() {
  return gulp
    .src(`${options.paths.dist.styles}/**/*`)
    .pipe(
      purgeCSS({
        content: ['src/**/*.{html,js}'],
        defaultExtractor: (content) => {
          const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
          const innerMatches =
            content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []
          return broadMatches.concat(innerMatches)
        },
      })
    )
    .pipe(cleanCSS({ compatibility: '*' }))
    .pipe(gulp.dest(options.paths.build.styles))
}

function prodScripts() {
  return gulp
    .src([
      `${options.paths.src.js}/lib/**/*.js`,
      `${options.paths.src.js}/**/*.js`,
    ])
    .pipe(concat({ path: 'scripts.js' }))
    .pipe(minifyJS())
    .pipe(gulp.dest(options.paths.build.js))
}

function prodImages() {
  return gulp
    .src(options.paths.src.img + '/**/*')
    .pipe(sharpResponsive(imageOptions))
    .pipe(gulp.dest(options.paths.build.img))
}

function prodClean() {
  console.log('\n\t' + logSymbols.info, 'Cleaning generated files.\n')
  return del([options.paths.build.base])
}

function prodFinish(done) {
  console.log(
    '\n\t' + logSymbols.info,
    `Production build complete at ${options.paths.build.base}\n`
  )
  done()
}

//
// Exports
//

const dev = gulp.series(
  devClean,
  gulp.parallel(devStyles, devScripts, devImages, devHTML),
  livePreview,
  watchFiles
)

const prod = gulp.series(
  prodClean,
  gulp.parallel(prodStyles, prodScripts, prodImages, prodHTML),
  prodFinish
)

export { dev as default, prod }
