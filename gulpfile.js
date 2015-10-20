var gulp = require('gulp'),
    sass = require('gulp-sass'),
    tsc = require('gulp-typescript');

gulp.task('sass', function () {
    gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/css'));
});

gulp.task('tsc', function () {
    gulp.src('./src/ts/**/*.ts')
        .pipe(tsc({
            target: 'ES5',
            module: 'system'
        }))
        .pipe(gulp.dest('build/js'));
});

gulp.task('compile', ['sass', 'tsc']);

gulp.task('default', function () {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/ts/**/*.ts', ['tsc']);
});