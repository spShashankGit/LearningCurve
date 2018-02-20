/**
 * Builds all source code in /src, and outputs to /web
 *
 * @usage gulp
 */

import del from "del";
import gulp from "gulp";
import runSequence from "run-sequence";

function clean() {
  return del("dist/", {
    force: "true"
  });
}

export default function build(done) {
  return runSequence("clean", ["markup", "styles", "scripts", "vendor"], () => {
    done();
  });
}

gulp.task("clean", clean);
