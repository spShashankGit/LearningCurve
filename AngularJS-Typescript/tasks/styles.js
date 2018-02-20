/**
 * Builds CSS files found in /src/assets/styles
 *
 * @usage gulp styles
 */

import browserSync from "browser-sync";
import gulp from "gulp";
import sourcemaps from "gulp-sourcemaps";

function watchStyles() {
  gulp.watch("src/assets/styles/**/*", () => {
    buildStyles();
  });
}

function buildStyles() {
  const browser = browserSync.get("local");

  return gulp
    .src("src/assets/styles/*.css")
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dist/"))
    .on("end", browser.reload);
}

export default function styles() {
  return buildStyles();
}
