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
  return del('dist/**', {force:true});
});

/**
 * Copy all files from /src to /dist
 */
gulp.task('copy', ['clean'], () => {
  return gulp
    .src(['src/**/*'])
    .pipe(gulp.dest('dist'));
});

/**
 * Takes all node .js files, 
 * lints them, transpiles to ES5
 */
gulp.task('nodeJs', () => {
  return gulp.src(['src/**/*.js', '!src/{public,public/**}'])
    .pipe(cache('nodeJs'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(babel({
      presets: ['env'],
      plugins: ['transform-async-to-generator']
    }))
    .pipe(gulp.dest('dist'));
});

/**
 * Takes all client .js files, 
 * transpiles to ES5, concatenates
 */
gulp.task('clientJs', () => {
  const stream = gulp.src(['src/public/js/**'])
    .pipe(cache('clientJs'))
    .pipe(babel({
      presets: ['env'],
      plugins: ['transform-async-to-generator']
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist/public'));
    
  del('dist/public/js/**');

  return stream;
});

/**
 * Reruns js task when file changes.
 * Restarts nodemon
 */
gulp.task('watch', () => {
  gulp.watch(['src/**/*.js'], (ev) => {
    sequence(['nodeJs', 'clientJs'], () => nodemon.emit('restart', `${ev.type} file: ${ev.path}`));
  });
});

/**
 * Runs local server
 */
gulp.task('nodemon', ['nodeJs', 'clientJs'], () => {
  nodemon({
    script: 'dist/app.js',
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
