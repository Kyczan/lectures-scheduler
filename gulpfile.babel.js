import gulp from 'gulp';
import nodemon from 'nodemon';
import babel from 'gulp-babel';
import del from 'del';
import cache from 'gulp-cached';
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
    .pipe(gulp.dest('./dist'));
});

/**
 * Takes all .js files, transpiles to ES5
 */
gulp.task('js', () => {
  return gulp.src(['src/**/*.js'])
    .pipe(cache('js'))
    .pipe(babel({
      presets: ['env'],
      plugins: ['transform-async-to-generator']
    }))
    .pipe(gulp.dest('dist'));
});

/**
 * Reruns js task when file changes.
 * Restarts nodemon
 */
gulp.task('watch', () => {
  gulp.watch(['src/**/*.js'], (ev) => {
    sequence('js', () => nodemon.emit('restart', `${ev.type} file: ${ev.path}`));
  });
});

/**
 * Runs local server
 */
gulp.task('nodemon', ['js'], () => {
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
  gulp.start(['js']);
});

/**
 * Default task for development
 */
gulp.task('default', ['build'], () => {
  gulp.start(['watch', 'nodemon']);
});
