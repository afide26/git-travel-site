var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create();

//Preview docs files

gulp.task('previewDist', function(){
  browserSync.init({
    notify:false,
    server:{
      baseDir:'docs'
    }
  })
})

//Delete docs folder
gulp.task('deleteDistFolder',['icons'], function(){
  return del('./docs');
});

//Make build flexible

gulp.task('copyGeneralFiles',['deleteDistFolder'], function(){
  var pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/styles/**',
    '!./app/assets/js/**',
    '!./app/temp',
    '!./app/temp/**'
  ];

  return gulp.src(pathsToCopy)
    .pipe(gulp.dest('./docs'))
})
// Compress image files
gulp.task('optimizeImages',['deleteDistFolder'], function(){
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
      progressive:true,
      interlaced: true,
      multipath:true
    }))
    .pipe(gulp.dest('./docs/assets/images'));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function(){
  gulp.start("usemin");
})
gulp.task('usemin', ['styles', 'scripts'],function(){
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [function(){return rev()}, function(){ return cssnano()}],
      js: [function(){ return rev()}, function(){ return uglify()}]
    }))
    .pipe(gulp.dest("./docs"))
})


gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles','optimizeImages', 'useminTrigger']);
