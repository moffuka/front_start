var gulp = require('gulp'),
    path = require('path'),
    sass = require('gulp-sass'),
    spritesmith = require('gulp.spritesmith'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    browserSync = require('browser-sync'),
    fileincluder = require('gulp-file-includer');

var paths = {
    source: {
        sass: 'src/css/',
        images: 'src/img/',
        sprites: 'src/sprites/',
        js: 'src/js/',
        concat: 'src/js/**/*.js',
        html: 'src/html/',
        svg: 'src/svg/*.svg'
    },
    sourceConcatJS: [
        'src/js/libs/jquery/*.js',
        'src/js/libs/backbone/*.js',
        'src/js/libs/common/**/*.js',

        'src/js/config/*.js',
        'src/js/framework/**/*.js',
        'src/js/models/**/*.js',
        'src/js/controllers/**/*.js',
    ],
    build: {
        css: 'css/',
        sprites: 'img/common/',
        js: 'js/',
        html: '',
        spriteSVG: 'img/common/svg-sprite'
    },
    bs_reload: {
        html: "*.html",
        css: "css/*.css",
        js: "js/*.js",
        images: "img/**"
    }
};

gulp.task('default', [
    'watch',
    'sprites',
    'sass',
    'fileincluder',
    'svgstore',
    'concatJS',
    'compressJS',
    'browser-sync'
]);



/************************************** WATCH *************************************/



gulp.task('watch', function () {
    gulp.watch(paths.source.sass + '**/*.scss', ['sass']);

    gulp.watch(paths.source.sprites + '*', ['sprites']);
    gulp.watch(paths.source.svg, ['svgstore']);

    gulp.watch(paths.source.html + '*.html', ['fileincluder']);

    gulp.watch(paths.source.concat, ['concatJS']);
    //gulp.watch(paths.source.js + '*.js', ['compressJS']);

    gulp.watch([paths.bs_reload.html, paths.bs_reload.js], ['bs-reload']);
    gulp.watch(paths.bs_reload.css, ['bs-reload']);
});



/************************************** BROWSER SYNC *****************************/



gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: ""
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});



/**************************************** HTML ***********************************/



gulp.task('fileincluder', function () {
    gulp.src([paths.source.html + '*.html', '!' + paths.source.html + '_*.html'])
        .pipe(fileincluder())
        .pipe(gulp.dest(paths.build.html))
});



/*************************************** IMAGES **********************************/



gulp.task('svgstore', function () {
    return gulp
        .src(paths.source.svg)
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest(paths.build.sprites));
});

gulp.task('sprites', function () {
    var spriteData = gulp.src(paths.source.sprites + '*').pipe(spritesmith({
        imgName: 'sprite.png',
        cssFormat: 'sass',
        cssName: '_sprite.scss',
        algorithm: 'binary-tree',
        padding: 10,
        cssTemplate: 'scss.template.mustache',
        cssVarMap: function (sprite) {
            sprite.name = 's-' + sprite.name
        }
    }));
    spriteData.img.pipe(gulp.dest(paths.build.sprites));
    spriteData.css.pipe(gulp.dest(paths.source.sass));
});



/************************************ SCRIPTS *******************************************/



gulp.task('concatJS', function () {
    gulp.src(paths.sourceConcatJS)
        .pipe(concat('all.min.js'))
       // .pipe(uglify())
        .pipe(gulp.dest(paths.build.js))
});

gulp.task('compressJS', function () {
    return gulp.src(paths.source.js + '*.js')
       // .pipe(uglify())
        .pipe(gulp.dest(paths.build.js));
});



/************************************ STYLES ******************************************/



gulp.task('sass', function () {
    return gulp.src(paths.source.sass + '*.scss')
        .pipe(sass({
            //outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest(paths.build.css));
});























