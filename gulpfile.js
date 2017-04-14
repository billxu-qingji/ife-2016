/*
* @Author: Administrator
* @Date:   2017-03-18 12:20:45
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-18 12:22:07
*/

'use strict';
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
