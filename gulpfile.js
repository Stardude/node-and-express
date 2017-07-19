var gulp = require('gulp');
var inject = require('gulp-inject');
var nodemon = require('gulp-nodemon');
var wiredep = require('wiredep').stream;

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('inject', function () {
    var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {read: false});

    var optionsWiredep = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };

    var optionsInject = {
        ignorePath: '/public'
    };

    return gulp.src('./src/views/*.ejs')
        .pipe(wiredep(optionsWiredep))
        .pipe(inject(injectSrc, optionsInject))
        .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['inject'], function () {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env:{
            'PORT': 3000
        },
        watch: jsFiles
    };

    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting...');
        });
});