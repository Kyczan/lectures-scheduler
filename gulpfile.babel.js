import gulp from 'gulp';
import babel from 'gulp-babel';
import cache from 'gulp-cached';
import concat from 'gulp-concat';
import eslint from 'gulp-eslint';
//import uglify from 'gulp-uglify';
import del from 'del';
import nodemon from 'nodemon';
import sequence from 'run-sequence';
import 'colors';

const babelOptions = {
  presets: ['env'],
  plugins: ['transform-async-to-generator']
};

const paths = {
  src: 'src/**/*',
  srcJs: 'src/**/*.js',
  srcClientExcl: '!src/{public,public/**}',
  srcClientJs: 'src/public/js/**',

  dist: 'dist',
  distClient: 'dist/public',
  
  delDist: 'dist/**',
  delDistClientJs: 'dist/public/js/**',

  entryPoint: 'dist/app.js'
};

/**
 * Colored console log
 * @param {string} message 
 */
function nodemonLog(message){
  console.log('[' + new Date().toString().split(' ')[4].gray + '] ' + '[nodemon] '.yellow + message.yellow);
}

/**
 * Clean up dist/ folder
 */
gulp.task('clean', () => {
  return del(paths.delDist, {force:true});
});

/**
 * Copy all files from /src to /dist
 */
gulp.task('copy', ['clean'], () => {
  return gulp
    .src([paths.src])
    .pipe(gulp.dest(paths.dist));
});

/**
 * Takes all node .js files, 
 * lints them, transpiles to ES5
 */
gulp.task('nodeJs', () => {
  return gulp.src([paths.srcJs, paths.srcClientExcl])
    .pipe(cache('nodeJs'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(babel(babelOptions))
    .pipe(gulp.dest(paths.dist));
});

/**
 * Takes all client .js files, 
 * transpiles to ES5, concatenates
 */
gulp.task('clientJs', () => {
  const stream = gulp.src([paths.srcClientJs])
    .pipe(cache('clientJs'))
    .pipe(babel(babelOptions))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(paths.distClient));
    
  del(paths.delDistClientJs);

  return stream;
});

/**
 * Reruns js task when file changes.
 * Restarts nodemon
 */
gulp.task('watch', () => {
  gulp.watch([paths.srcJs], (ev) => {
    sequence(
      ['nodeJs', 'clientJs'], 
      () => nodemon.emit('restart', `${ev.type} file: ${ev.path}`)
    );
  });
});

/**
 * Runs local server
 */
gulp.task('nodemon', ['nodeJs', 'clientJs'], () => {
  nodemon({
    script: paths.entryPoint,
    ignore: '*'
  });
  nodemon.on('start', () => 
    nodemonLog('started')
  ).on('quit', () => {
    nodemonLog('quit');
    process.exit();
  }).on('restart', (files) => 
    nodemonLog(`detected ${files}`)
  );
});

/**
 * Creates production ready build
 */
gulp.task('build', ['copy'], () => {
  gulp.start(['nodeJs', 'clientJs']);
});

/**
 * Default task for development
 */
gulp.task('default', ['build'], () => {
  gulp.start(['watch', 'nodemon']);
});
