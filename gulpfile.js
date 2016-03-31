var gulp = require('gulp'),
    sass = require('gulp-sass'),
    tsc = require('gulp-typescript'),
    Builder = require('systemjs-builder');

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

gulp.task('build', function () {
    var jserBuilder = new Builder('build/js/', { defaultJSExtensions: true });
    var jscriptcoderBuilder = new Builder('build/js/api/', { defaultJSExtensions: true });
    
    jserBuilder.bundle('jser/jser.js', 'dist/jser/jser.js');
    jserBuilder.bundle('api/jscriptcoder-api.js', 'dist/api/jscriptcoder-api.js');
});

gulp.task('compile', ['sass', 'tsc', 'build']);