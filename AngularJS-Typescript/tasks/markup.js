/**
 * Builds HTML markup found in /src/assets/
 *
 * @usage gulp markup
 */

/* eslint-disable camelcase, no-param-reassign */
import browserSync from "browser-sync";
import gulp from "gulp";
import pkg from "./../package.json";

function watchMarkup() {}

function buildMarkup() {
  const browser = browserSync.get("local");
  const src = ["src/**/*.html"];

  return gulp
    .src(src)
    .pipe(gulp.dest("dist/"))
    .on("end", browser.reload);
}

export default function markup() {
  return buildMarkup();
}
