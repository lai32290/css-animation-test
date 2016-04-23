const gulp = require('gulp')
    , include = require('gulp-include')
    , clean = require('gulp-clean')
    , stylus = require('gulp-stylus')
    ;

gulp.task('default', defaultTask);
gulp.task('copy', ['clean'], copyTask);
gulp.task('clean', cleanTask);

gulp.task('build', ['copy'], buildTask);
gulp.task('include', ['copy'], includeTask);
gulp.task('stylus', ['copy'], stylusTask);
gulp.task('watch', watchTask);

function defaultTask() {
    gulp.start('build', 'watch');
}

function buildTask() {
    gulp.start('include', 'stylus');
}

function cleanTask() {
    return gulp.src('dest')
        .pipe(clean());
}

function copyTask() {
    return gulp.src([
        'src/**/*'
        , '!src/**/*.styl'
    ])
        .pipe(gulp.dest('dest'));
}

function includeTask() {
    gulp.src('src/index.html')
        .pipe(include())
        .pipe(gulp.dest('dest'));
}

function watchTask() {
    gulp.watch('src/**/*', ['build']);
}

function stylusTask() {
    gulp.src('src/css/style.styl')
        .pipe(stylus())
        .pipe(gulp.dest('dest/css'));
}