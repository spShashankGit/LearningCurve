/**
 * Builds JavaScript files found in /src/assets/scripts
 * Uses watchify for fast incremental builds
 *
 * @usage gulp scripts
 */

import buffer from "vinyl-buffer";
import browserify from "browserify";
import browserSync from "browser-sync";
import gulp from "gulp";
import pkg from "./../package.json";
import source from "vinyl-source-stream";
import sourcemaps from "gulp-sourcemaps";
import watchify from "watchify";
const tsConfig = require("./../tsconfig.json");

const plugins = [];
const vendorArray = [...Object.keys(pkg.dependencies)];

function buildScripts() {
  const options = {
    cache: {},
    packageCache: {},
    plugin: plugins,
    extensions: [".js", ".ts"],
    debug: "true",
    entries: ["src/assets/scripts/main.ts"],
    paths: ["src/assets/scripts/app"],
    node: true
  };

  const bundler = browserify(options)
    .external(vendorArray)
    .plugin("tsify", tsConfig.compilerOptions)
    .transform("babelify", { extensions: [".js", ".ts"] });

  bundler.on("update", () => {
    onUpdate(bundler);
  });
  return onUpdate(bundler);
}

function onUpdate(bundler) {
  const browser = browserSync.get("local");

  return bundler
    .bundle()
    .pipe(source("main.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dist/assets/scripts/"))
    .on("end", browser.reload);
}

export default function scripts() {
  return buildScripts();
}
