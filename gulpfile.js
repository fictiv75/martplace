let gulp = require("gulp"),
  sass = require("gulp-sass"),
  rename = require("gulp-rename"),
  browserSync = require("browser-sync").create(),
  autoprefixer = require("gulp-autoprefixer"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  cssmin = require("gulp-cssmin"),
  include = require("gulp-file-include");


gulp.task("sass", function () {
  return gulp
    .src("app/scss/**/*.scss")
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 8 version"],
      })
    )
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("style", function () {
  return gulp
    .src([
      'node_modules/normalize.css/normalize.css',
      'node_modules/slick-carousel/slick/slick.css',
      'node_modules/magnific-popup/dist/magnific-popup.css',
      'node_modules/rateyo/src/jquery.rateyo.css',
      'node_modules/ion-rangeslider/css/ion.rangeSlider.css',
      'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css',
      'node_modules/jquery-form-styler/dist/jquery.formstyler.css',
      'node_modules/jquery-form-styler/dist/jquery.formstyler.theme.css'
    ])
    .pipe(concat("libs.min.css"))
    .pipe(cssmin())
    .pipe(gulp.dest("app/css"));
});

gulp.task("script", function () {
  return gulp
    .src([
      'node_modules/slick-carousel/slick/slick.js',
      'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
      'node_modules/mixitup/dist/mixitup.js',
      'node_modules/rateyo/src/jquery.rateyo.js',
      'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
      'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
      'node_modules/jquery-form-styler/dist/jquery.formstyler.min.js'
    ])
    .pipe(concat("libs.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("app/js"));
});

gulp.task("html", function () {
  return gulp
    .src(['app/html/**/*.html' ,'!app/html/components/**/*.html'])
    .pipe(
      include({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest('app/'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("js", function () {
  return gulp.src("app/*.js").pipe(browserSync.reload({ stream: true }));
});

gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
    browser: ["chrome"]
  });
});


gulp.task("watch", function () {
  gulp.watch("app/scss/**/*.scss", gulp.parallel("sass"));
  gulp.watch("app/html/**/*.html", gulp.parallel("html"));
  gulp.watch("app/js/*.js", gulp.parallel("js"));
});

gulp.task(
  "default",
  gulp.parallel("style", "html", "script", "sass", "watch", "browser-sync")
);
