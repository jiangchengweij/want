const fs = require('fs');
const gulp = require('gulp');
const rename = require('gulp-rename');
const util = require('util');
const path = require('path');
const ts = require('gulp-typescript');
const gulpif = require('gulp-if');
const merge2 = require('merge2');

const exec = util.promisify(require('child_process').exec);
const componentPrefix = 'wan';
const exampleConfig = path.resolve(__dirname, '../tsconfig.example.json');
const src = path.resolve(__dirname, '../packages');

const examplePageJsonPath = path.resolve(__dirname, '../example/pages.json');

const exampleDistDir = path.resolve(
  __dirname,
  '../example/uni_modules/want/components'
);

const examplePagesDir = path.resolve(__dirname, '../example/pages/components');

const fileRename = () =>
  rename((path) => {
    if (path.dirname.indexOf('common') === -1) {
      path.dirname = `${componentPrefix}-${path.dirname}`;
      if (path.basename === 'index' && path.extname === '.vue') {
        path.basename = `${componentPrefix}-${path.basename}`;
      }
    }
  });

const tsCompiler = (dist, config) =>
  function compilerTs() {
    const tsProject = ts.createProject(config, {
      declaration: true
    });
    const tsResult = tsProject.src().pipe(tsProject());

    return merge2(
      tsResult.js.pipe(fileRename()).pipe(gulp.dest(dist)),
      tsResult.dts
        .pipe(fileRename())
        .pipe(gulpif(dist !== exampleDistDir, gulp.dest(dist)))
    );
  };

const copier = (dist, ext) =>
  function copy() {
    const srcPath = [`${src}/**/*.${ext}`];
    srcPath.push(`!${src}/**/demo/**/*.${ext}`);
    return gulp.src(srcPath).pipe(fileRename()).pipe(gulp.dest(dist));
  };

const staticCopier = (dist) =>
  gulp.parallel(
    copier(dist, 'vue'),
    copier(dist, 'json'),
    copier(dist, 'scss')
  );

const cleaner = (path) =>
  function clean() {
    return exec(`npx rimraf ${path}`);
  };

const tasks = {};

tasks.buildExample = gulp.series(
  cleaner(exampleDistDir),
  gulp.parallel(
    tsCompiler(exampleDistDir, exampleConfig),
    staticCopier(exampleDistDir),
    () => {
      const pageJson = JSON.parse(fs.readFileSync(examplePageJsonPath));
    }
    // () => {
    //   gulp.watch(`${src}/**/*.vue`, copier(exampleDistDir, "vue"));
    //   gulp.watch(`${src}/**/*.scss`, copier(exampleDistDir, "scss"));
    // }
  )
);

module.exports = tasks;
