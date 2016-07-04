module.exports = function (grunt) {

    grunt.initConfig({
        folder_list: {
            images_to_json: {
                options: {
                    files: true,
                    folder: true
                },
                files: [
                    // ----------------- for main preloader ------------------
                    {
                        src: [
                            'frontend/web/img/_dev/*.*',
                            'frontend/web/img/_dev/*/*.*',
                            'frontend/web/img/_dev/*/*/*.*',
                            'frontend/web/img/_dev/*/*/*/*.*',
                            'frontend/web/img/common/*.*',
                            'frontend/web/img/common/*/*.*',
                            'frontend/web/img/common/*/*/*.*',
                            'frontend/web/img/common/*/*/*/*.*',
                            'frontend/web/img/desktop/*.*',
                            'frontend/web/img/desktop/*/*.*',
                            'frontend/web/img/desktop/*/*/*.*',
                            'frontend/web/img/desktop/*/*/*/*.*'
                        ],
                        dest: 'frontend/web/json/img_desktop.json'
                    },
                    // --------------------- for mobile preloader ------------------------
                    {
                        src: [
                            'frontend/web/img/_dev/*.*',
                            'frontend/web/img/_dev/*/*.*',
                            'frontend/web/img/_dev/*/*/*.*',
                            'frontend/web/img/_dev/*/*/*/*.*',
                            'frontend/web/img/common/*.*',
                            'frontend/web/img/common/*/*.*',
                            'frontend/web/img/common/*/*/*.*',
                            'frontend/web/img/common/*/*/*/*.*',
                            'frontend/web/img/mobile/*.*',
                            'frontend/web/img/mobile/*/*.*',
                            'frontend/web/img/mobile/*/*/*.*',
                            'frontend/web/img/mobile/*/*/*/*.*'
                        ],
                        dest: 'frontend/web/json/img_mobile.json'
                    },
                    // ------------------- for deferred preload -------------------------
                    {
                        src: [
                            'frontend/web/img/deferred/*.*',
                            'frontend/web/img/deferred/*/*.*',
                            'frontend/web/img/deferred/*/*/*.*',
                            'frontend/web/img/deferred/*/*/*/*.*'
                        ],
                        dest: 'frontend/web/json/img_deferred.json'
                    }
                ]
            }
        },







        cssmin: {
            options: {
                advanced: false,
                keepBreaks: true
            },
            all_css: {
                files: {
                    'frontend/web/css/all.css': [
                        'frontend/web/css/main.css',
                        'frontend/web/css/media-desktop.css',
                        'frontend/web/css/media-mobile.css',
                        'frontend/web/css/media-tablet.css',
                        'frontend/web/css/media-phone.css'
                    ]
                }
            }
        },







        uglify : {
            options: {
                compress: false,
                mangle: false
            },
            models : {
                options: {
                    compress: false,
                    mangle: false
                },
                files: [{
                    src: 'frontend/web/js/models/**/*.js',
                    dest: 'frontend/web/js/min/models.min.js'
                }]
            },
            controllers : {
                options: {
                    compress: false,
                    mangle: false
                },
                files: [{
                    src: 'frontend/web/js/controllers/**/*.js',
                    dest: 'frontend/web/js/min/controllers.min.js'
                }]
            },
            framework : {
                options: {
                    compress: false,
                    mangle: false
                },
                files: [{
                    src: 'frontend/web/js/framework/**/*.js',
                    dest: 'frontend/web/js/min/framework.min.js'
                }]
            },
            libs_common: {
                options: {
                    mangle: false
                },
                files: [{
                    src: 'frontend/web/js/libs/common/**/*.js',
                    dest: 'frontend/web/js/min/libs.common.min.js'
                }]
            }
        },






        concat : {
            options: {

            },
            models : {
                files: [{
                    src: 'frontend/web/js/models/**/*.js',
                    dest: 'frontend/web/js/min/models.min.js'
                }]
            },
            controllers : {
                files: [{
                    src: 'frontend/web/js/controllers/**/*.js',
                    dest: 'frontend/web/js/min/controllers.min.js'
                }]
            },
            framework : {
                files: [{
                    src: 'frontend/web/js/framework/**/*.js',
                    dest: 'frontend/web/js/min/framework.min.js'
                }]
            },
            libs_common: {
                files: [{
                    src: 'frontend/web/js/libs/common/**/*.js',
                    dest: 'frontend/web/js/min/libs.common.min.js'
                }]
            }
        },






        watch: {
            watch_models: {
                files: ['frontend/web/js/models/**/*.js'],
                tasks: ['concat:models']
            },
            watch_controllers: {
                files: ['frontend/web/js/controllers/**/*.js'],
                tasks: ['concat:controllers']
            },
            watch_framework: {
                files: ['frontend/web/js/framework/**/*.js'],
                tasks: ['concat:framework']
            },
            watch_libs_common: {
                files: ['frontend/web/js/libs/common/**/*.js'],
                tasks: ['uglify:libs_common']
            },
            watch_all_css: {
                files: ['frontend/web/css/*.css'],
                tasks: ['cssmin:all_css']
            }
        }
    });

    grunt.loadNpmTasks('grunt-folder-list');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['folder_list']);

};