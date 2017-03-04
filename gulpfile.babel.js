import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import path from 'path';
import eslint from 'gulp-eslint';
import cache from 'gulp-cached';
import { Instrumenter } from 'isparta';
import lazypipe from 'lazypipe';
import process from 'process';
import del from 'del';
import runSequence from 'run-sequence';

const plugins = gulpLoadPlugins();

const serverPath = 'server';
const paths = {
  js: ['./**/*.js', '!dist/**', '!node_modules/**', '!coverage/**'],
  nonJs: ['./package.json', './.gitignore'],
  server: {
    all: [
      `${serverPath}/**/*.js`
    ],
    scripts: [
      `${serverPath}/**/!(*.spec).js`
    ],
    test: {
      integration: [`${serverPath}/**/*.integration.js`, 'mocha.global.js'],
      unit: [`${serverPath}/**/*.spec.js`, 'mocha.global.js']
    }
  }
};


const mocha = lazypipe()
  .pipe(plugins.mocha, {
    reporter: 'spec',
    ui: 'bdd',
    colors: true,
    timeout: 5000,
    require: [
      './mocha.conf'
    ]
  });

const istanbul = lazypipe()
  .pipe(plugins.istanbul.writeReports)
  .pipe(plugins.istanbulEnforcer, {
    thresholds: {
      global: {
        lines: 80,
        statements: 80,
        branches: 80,
        functions: 80
      }
    },
    coverageDirectory: './coverage',
    rootDirectory: ''
  });

  /**
   * Env
   */

  gulp.task('env:all', () => {
    let localConfig;
    try {
      localConfig = require('./config/env/development.js'); // eslint-disable-line global-require
    } catch (e) {
      localConfig = {};
    }
    plugins.env({
      vars: localConfig
    });
  });

  gulp.task('env:test', () => {
    plugins.env({
      vars: { NODE_ENV: 'test' }
    });
  });

  gulp.task('env:prod', () => {
    plugins.env({
      vars: { NODE_ENV: 'production' }
    });
  });

/**
 * Tasks
 */
// Clean up dist and coverage directory
gulp.task('clean', () =>
  del.sync(['dist/**', 'dist/.*', 'coverage/**', '!dist', '!coverage'])
);

// Copy non-js files to dist
gulp.task('copy', () =>
  gulp.src(paths.nonJs)
    .pipe(plugins.newer('dist'))
    .pipe(gulp.dest('dist'))
);

// Compile ES6 to ES5 and copy to dist
gulp.task('babel', () =>
  gulp.src([...paths.js, '!gulpfile.babel.js'], { base: '.' })
    .pipe(plugins.newer('dist'))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel())
    .pipe(plugins.sourcemaps.write('.', {
      includeContent: false,
      sourceRoot(file) {
        return path.relative(file.path, __dirname);
      }
    }))
    .pipe(gulp.dest('dist'))
);

// Start server with restart on file changes
gulp.task('nodemon', ['copy', 'babel'], () =>
  plugins.nodemon({
    script: path.join('dist', 'index.js'),
    ext: 'js',
    ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
    tasks: ['copy', 'babel']
  })
);

gulp.task('test', (cb) => {
  return runSequence(
    'env:all',
    'env:test',
    'mocha:unit',
    'mocha:integration',
    'mocha:coverage',
    cb
  );
});

gulp.task('mocha:unit', () => { // eslint-disable-line arrow-body-style
  return gulp.src(paths.server.test.unit)
    .pipe(mocha());
});

gulp.task('mocha:integration', () => {
  return gulp.src(paths.server.test.integration)
    .pipe(mocha())
    .once('end', () => {
      process.exit();
    });
});

gulp.task('mocha:coverage', (cb) => {
  return runSequence(
    'coverage:pre',
    'env:all',
    'env:test',
    'coverage:unit',
    cb
  );
});

gulp.task('coverage:pre', () => { // eslint-disable-line arrow-body-style
  return gulp.src(paths.server.test.unit)
  // Covering files
    .pipe(plugins.istanbul({
      instrumenter: Instrumenter, // Use the isparta instrumenter (code coverage for ES6)
      includeUntested: true
    }))
    // Force `require` to return covered files
    .pipe(plugins.istanbul.hookRequire());
});

gulp.task('coverage:unit', () => { // eslint-disable-line arrow-body-style
  return gulp.src(paths.server.test.unit)
    .pipe(mocha())
    .pipe(istanbul());
  // Creating the reports after tests ran
});
/**
 * Getting lint watching to work
 * https://github.com/adametry/gulp-eslint/blob/master/example/watch.js
 */

gulp.task('lint-watch', () => {
  const lintAndPrint = eslint();
  lintAndPrint.pipe(eslint.formatEach());

  return gulp.watch(paths.js, (event) => {
    if (event.type !== 'deleted') {
      gulp.src(event.path)
        .pipe(lintAndPrint, { end: false });
    }
  });
});

gulp.task('cached-lint', () => {
  return gulp.src(paths.js)
    .pipe(cache('eslint'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.result((result) => {
      if (result.warningCount > 0 || result.errorCount > 0) {
        delete cache.caches.eslint[path.resolve(result.filePath)];
      }
    }));
});

gulp.task('cached-lint-watch', ['cached-lint'], () => {
  return gulp.watch(paths.js, ['cached-lint'], (event) => {
    if (event.type === 'deleted' && cache.caches.eslint) {
      delete cache.caches.eslint[event.path];
    }
  });
});

gulp.task('watch', ['cached-lint-watch']);
// gulp serve for development
gulp.task('serve', ['clean'], () => runSequence('nodemon'));

// default task: clean dist, compile js files and copy non-js files.
gulp.task('default', ['clean'], () => {
  runSequence(
    ['copy', 'babel']
  );
});
