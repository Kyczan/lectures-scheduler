import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import path from 'path';
import babel from 'gulp-babel';
import del from 'del';
import Cache from 'gulp-file-cache';

const cache = new Cache();
const src = ['src/**/*'];
const dest = 'dist';
const entryScript = path.join(dest, 'app.js');

gulp.task('clean', () => {
  return del(`${dest}/**`, {force:true});
});

gulp.task('copy', ['clean'], () => {
  return gulp
      .src(src)
      .pipe(gulp.dest('./dist'));
});

gulp.task('js', () => {
  return gulp.src(src+'.js')
  .pipe(cache.filter())
  .pipe(babel({
    presets: ['env'],
    plugins: ['transform-async-to-generator']
  }))
  .pipe(cache.cache())
  .pipe(gulp.dest(dest));
});

gulp.task('observe', () => {
  gulp.watch(src+'.js', ['js']);
});

gulp.task('nodemon', ['js'], (done) => {
  return nodemon({
    script: entryScript,
    watch: 'src',
    tasks: ['js'],
    done: done
  });
});

gulp.task('build', ['copy'], () => {
  gulp.start(['js']);
});

gulp.task('watch', ['build'], () => {
  gulp.start(['observe']);
});

// to do - improve handling changes by nodemon
gulp.task('default', ['build'], () => {
  gulp.start(['nodemon']);
});
