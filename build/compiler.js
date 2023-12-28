const fs = require('fs');
const gulp = require('gulp');
const yaml = require('js-yaml');
const insert = require('gulp-insert');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const prettier = require('gulp-plugin-prettier');
const util = require('util');
const path = require('path');
const ts = require('gulp-typescript');
const gulpif = require('gulp-if');
const merge2 = require('merge2');
const transformApiDoc = require('./transformApiDoc');

const exec = util.promisify(require('child_process').exec);
const componentPrefix = 'wan';
const srcConfig = path.resolve(__dirname, '../tsconfig.example.json');
const src = path.resolve(__dirname, '../packages');
const srcPageJsonPath = path.resolve(__dirname, '../src/pages.json');
const srcDistDir = path.resolve(
  __dirname,
  '../src/uni_modules/want/components'
);

const examplePagesDir = path.resolve(__dirname, '../src/pages/components');

const fileRename = () =>
  rename((path) => {
    if (path.dirname.indexOf('common') === -1) {
      const componentName = path.dirname;
      path.dirname = `${componentPrefix}-${componentName}`;
      if (path.basename === 'index' && path.extname === '.vue') {
        path.basename = `${componentPrefix}-${componentName}`;
      }
    }
  });

const addJsDoc = () =>
  insert.transform((contents, file) => {
    const readmePath = file.dirname + '\\README.md';
    try {
      fs.accessSync(readmePath, fs.constants.R_OK);
      const readmeContent = fs.readFileSync(readmePath, { encoding: 'utf8' });
      const matchStr = readmeContent.match(/---([\s\S]+)---/);
      if (!matchStr) return contents;
      const index = contents.indexOf('export default {');
      const frontmatter = yaml.load(matchStr[1]);
      const apiDoc = transformApiDoc(frontmatter);
      if (index > -1) {
        const start = contents.substring(0, index);
        const end = contents.substring(index);
        return start + apiDoc + end;
      }
    } catch (e) {
      /* empty */
    }
    return contents;
  });

const tsCompiler = (dist, config) =>
  function compilerTs() {
    const tsProject = ts.createProject(config, {
      declaration: true
    });
    const tsResult = tsProject.src().pipe(tsProject());

    return merge2(
      tsResult.js
        .pipe(fileRename())
        .pipe(
          prettier.format(
            { singleQuote: true, semi: true },
            { reporter: 'none' }
          )
        )
        .pipe(gulp.dest(dist)),
      tsResult.dts
        .pipe(fileRename())
        .pipe(gulpif(dist !== srcDistDir, gulp.dest(dist)))
    );
  };

const copier = (dist, ext) =>
  function copy() {
    const srcPath = [`${src}/**/*.${ext}`];
    srcPath.push(`!${src}/**/demo/**/*.${ext}`);
    return merge2(
      ext === 'vue'
        ? gulp
            .src(srcPath)
            .pipe(addJsDoc())
            .pipe(fileRename())
            .pipe(replace('<script lang="ts">', '<script>'))
            .pipe(gulp.dest(dist))
        : gulp.src(srcPath).pipe(fileRename()).pipe(gulp.dest(dist)),
      gulp
        .src([`${src}/**/demo/**/*.${ext}`])
        .pipe(
          rename((path) => {
            path.dirname = path.dirname.replace('\\demo', '');
          })
        )
        .pipe(gulp.dest(examplePagesDir))
    );
  };

const staticCopier = (dist) =>
  gulp.parallel(
    copier(dist, 'vue'),
    copier(dist, 'js'),
    copier(dist, 'json'),
    copier(dist, 'scss')
  );

const cleaner = (path) =>
  function clean() {
    return exec(`npx rimraf ${path}`);
  };

const tasks = {};

tasks.buildExample = gulp.series(
  cleaner(srcDistDir),
  gulp.parallel(
    tsCompiler(srcDistDir, srcConfig),
    staticCopier(srcDistDir),
    () => {
      gulp.watch(`../packages/**/*.ts`, tsCompiler(srcDistDir, srcConfig));
      gulp.watch(`../packages/**/*.vue`, copier(srcDistDir, 'vue'));
      gulp.watch(`../packages/**/*.js`, copier(srcDistDir, 'js'));
      gulp.watch(`../packages/**/*.scss`, copier(srcDistDir, 'scss'));
    }
  )
);

module.exports = tasks;
