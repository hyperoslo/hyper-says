var gulp = require('gulp');
var serve = require('gulp-serve');
 
gulp.task('serve', serve({
  root: 'public',
  host: '0.0.0.0'
}));
