/**
 * Builds vendor files found in /src/assets/vendor
 *
 * @usage gulp vendor
 */

import browserify from "browserify";
import buffer from "vinyl-buffer";
import gulp from "gulp";
import pkg from "./../package.json";
import source from "vinyl-source-stream";

export default function vendor() {
  const vendorArray = [...Object.keys(pkg.dependencies)];
  const bundler = browserify({ debug: false });

  // individually require all libs specified in vendor list
  vendorArray.forEach(vendor => {
    try {
      require.resolve(vendor);
      bundler.require(vendor);
    } catch (err) {
      // ignore non-js modules
    }
  });

  return bundler
    .bundle()
    .pipe(source("vendor.js"))
    .pipe(buffer())
    .pipe(gulp.dest("dist/assets/scripts/"));
}
