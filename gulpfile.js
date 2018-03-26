var gulp         =  require('gulp'),
    uglify       =  require('gulp-uglify'),
    sass         =  require('gulp-sass'),
    plumber      =  require('gulp-plumber'),
 	browserSync  =	require('browser-sync').create(),
 	autoprefixer =  require('gulp-autoprefixer'),
 	reload       =  browserSync.reload,
    gulp         =  require('gulp'),
    gulpDi       =  require('gulp-dependency-install');

//Server Task
//Creates static server
//servers file from base directory
//Watches for Changes in .js, .css, and .html
gulp.task('server', function() {
	browserSync.init({
        server: {
       		 baseDir: "./"
        }
    });

    console.log('Initializing..');
	gulp.watch("**/*.html").on("change", reload);
	gulp.watch("./css/*.css").on("change", reload);
	gulp.watch("./js/*.js").on('change', reload);
    console.log('Devlopment Enviorment Initialized');

});

gulp.task('prefix', function() {
		gulp.src('**.*.css')
		.pipe(autoprefixer({
            browsers: ['last 2 versions']}))
		.pipe(gulp.dest('/css'))
});

//Uglify Task
gulp.task('scripts', function () {

	 gulp.src('js/*.js')
	   .pipe(uglify())
	   .pipe(gulp.dest('minjs'))

	});


//Compiles sass -> css
gulp.task('sass', function () {

	 gulp.src('scss/**/.scss')
	 	.pipe(plumber())
	    .pipe(sass())
	    .pipe(gulp.dest('css/'));

	});
 
gulp.task('install', function () {
    return gulpDi.install();
	});

//Default Task
//Launces static server and begins watching for changes
//also compiles sass and minifies javascript
gulp.task('default',[ 'server','sass','scripts'])