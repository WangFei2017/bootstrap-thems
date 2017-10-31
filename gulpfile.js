var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var data = require('gulp-data');


gulp.task('watch', function(){
	browserSync({
		port: process.env.PORT || 3005,
		open: false,
		notify: false,
		files: ['./dist/bootstrap.min.css', "index.html"],
		server: {
			baseDir: './',
			index: "index.html",
		},
	});

	gulp.watch(['./v3.3.7.less'], function(event){
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...' )
		gulp.src([ 'node_modules/bootstrap/less/bootstrap.less'])
		.pipe(data(function(file){
			console.log('file');
			if ( file.isBuffer() ) {
		        file.contents = new Buffer(
		        	String(file.contents)
		        	.replace('variables.less', '../../../v3.3.7.less')
	        	);
		  	}
		}))
		.pipe(concat('bootstrap.min.css'))
		.pipe(less())
		.pipe(gulp.dest('./dist'));
	});
});

gulp.task('default', ['watch']);