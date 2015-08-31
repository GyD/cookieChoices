module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        uglify: {
            options: {
                mangle: true,
                sourceMap: true
            },
            def: {
                files: {
                    //'../yuyine.be/www/sites/all/themes/yuyine/js/cookieChoices.js': [
                    'dist/cookieChoices.js': [
                        // do not use *.js as order is important
                        'src/cookieChoices.js'
                    ]
                }
            }
        },
        watch: {
            scripts: {
                files: 'src/*.js',
                tasks: ['uglify'],
                options: {
                    interrupt: true,
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', [
        'uglify'
    ]);
};
