const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProjectNode = ts.createProject('tsconfig.node.json');
const tsProjectBrowser = ts.createProject('tsconfig.browser.json');
const del = require("del");
const sourcemaps = require("gulp-sourcemaps");
// const browserify = require("browserify");
// const source = require("vinyl-source-stream");
// const buffer = require("vinyl-buffer");
// const uglify = require("gulp-uglify");
// const log = require("gulplog");

// const paths = {
//   tscPath: "dist/node",
//   tcsCompiledEntryPoint: "dist/node/index.js"
// };

function clean() {
  return del(["dist/*"]);
}

// function transpileTypescript() {
//   return gulp
//     .src("src/**/*.ts")
//     .pipe(sourcemaps.init())
//     .pipe(
//       ts({
//         module: "commonjs",
//         target: "es5",
//         noImplicitAny: true,
//         removeComments: true,
//         preserveConstEnums: true,
//         esModuleInterop: true,
//         lib: ["ES2015"],
//         declaration: true
//       })
//     )
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest("dist/node"));
// }

function transpileTypescriptNode() {
  return tsProjectNode.src()
  .pipe(sourcemaps.init())
  .pipe(tsProjectNode())
  .pipe(sourcemaps.write())
  // .js.pipe(gulp.dest('dist/node'));
  .pipe(gulp.dest('dist/node'));
}

function transpileTypescriptBrowser() {
  return tsProjectBrowser.src()
  .pipe(sourcemaps.init())
  .pipe(tsProjectBrowser())
  .pipe(sourcemaps.write())
  // .js.pipe(gulp.dest('dist/node'));
  .pipe(gulp.dest('dist/browser'));
}

// function browserifyCompiledSources() {
//   const b = browserify({ entries: paths.tcsCompiledEntryPoint, debug: true });
//   return (
//     b
//       .bundle()
//       .pipe(source("index.js"))
//       .pipe(buffer())
//       .pipe(sourcemaps.init({ loadMaps: true }))
//       // Add transformation tasks to the pipeline here.
//       .pipe(uglify())
//       .on("error", log.error)
//       .pipe(sourcemaps.write("./"))
//       .pipe(gulp.dest("./dist/browser/"))
//   );
// }

exports.build = transpileTypescriptNode;
// exports.default = gulp.series(clean, transpileTypescript, browserifyCompiledSources);
// exports.default = gulp.series(clean, transpileTypescript, browserifyCompiledSources);
exports.default = gulp.series(clean, transpileTypescriptNode, transpileTypescriptBrowser);
