import gulp from 'gulp';
import nodemon from 'nodemon';
import babel from 'gulp-babel';
import del from 'del';
import cache from 'gulp-cached';
import sequence from 'run-sequence';
import colors from 'colors';

function nodemonLog(message){
  console.log('[' + new Date().toString().split(' ')[4].gray + '] ' + '[nodemon] '.yellow + message.yellow);
}

gulp.task('clean', () => {
  return del('dist/**', {force:true});
});

gulp.task('copy', ['clean'], () => {
  return gulp
    .src(['src/**/*'])
    .pipe(gulp.dest('./dist'));
});

gulp.task('js', () => {
  return gulp.src(['src/**/*.js'])
    .pipe(cache('js'))
    .pipe(babel({
      presets: ['env'],
      plugins: ['transform-async-to-generator']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
  gulp.watch(['src/**/*.js'], (ev) => {
    sequence('js', () => nodemon.emit('restart', `${ev.type} file: ${ev.path}`));
  });
});

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

gulp.task('build', ['copy'], () => {
  gulp.start(['js']);
});

gulp.task('default', ['build'], () => {
  gulp.start(['watch', 'nodemon']);
});
