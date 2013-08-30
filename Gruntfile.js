module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower-requirejs');

    /***************************************************************************
     * Configuration
     */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            compile: {
                options: {
                    baseUrl: "res",
                    name: "main",
                    out: "res-min/main.js",
                    mainConfigFile: 'res/main.js',
                    optimize: "uglify2",
                    uglify2: {
                        output: {
                            beautify: true,
                            indent_level: 1,
                        },
                    },
                    excludeShallow: [
                        'css/css-builder',
                        'less/lessc-server',
                        'less/lessc'
                    ],
                }
            }
        },
        less: {
            compile: {
                files: [
                    {
                        expand: true,
                        cwd: 'res/themes',
                        src: [
                            '*.less'
                        ],
                        dest: 'res-min/themes',
                        ext: '.css',
                    }
                ]
            },
            compress: {
                options: {
                    compress: true,
                    paths: 'res/styles'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'res-min/themes',
                        src: [
                            '*.css'
                        ],
                        dest: 'res-min/themes',
                    }
                ]
            },
        },
        'string-replace': {
            'css-import': {
                files: {
                    './': 'res-min/themes/*.css',
                },
                options: {
                    replacements: [
                        {
                            pattern: /@import /g,
                            replacement: '@import (less) '
                        }
                    ]
                }
            },
            'cache-manifest': {
                files: {
                    'cache.manifest': 'cache.manifest'
                },
                options: {
                    replacements: [
                        {
                            pattern: /(#Date ).*/,
                            replacement: '$1<%= grunt.template.today() %>'
                        },
                        {
                            pattern: /(#DynamicResourcesBegin\n)[\s\S]*(\n#DynamicResourcesEnd)/,
                            replacement: '$1<%= resources %>$2'
                        },
                    ]
                }
            }
        },
        copy: {
            resources: {
                files: [
                    // Fonts
                    {
                        expand: true,
                        cwd: 'res/libs/fontello/font',
                        src: [
                            '**'
                        ],
                        dest: 'res-min/font/'
                    },
                    // Images
                    {
                        expand: true,
                        cwd: 'res/img',
                        src: [
                            '**'
                        ],
                        dest: 'res-min/img/'
                    },
                    // Libraries
                    {
                        expand: true,
                        cwd: 'res/bower-libs/requirejs',
                        src: [
                            'require.js'
                        ],
                        dest: 'res-min/'
                    },
                ]
            }
        },
        // Inject bower dependencies into RequireJS configuration
        bower: {
            target: {
                rjsConfig: 'res/main.js'
            }
        }
    });

    /***************************************************************************
     * Clean
     */
    grunt.registerTask('clean', function() {

        // Remove res-min/ folder
        grunt.file['delete']('res-min');

    });

    /***************************************************************************
     * Build JavaScript
     */
    grunt.registerTask('build-js', function() {

        // Run r.js optimization
        grunt.task.run('requirejs');

    });

    /***************************************************************************
     * Build CSS
     */
    grunt.registerTask('build-css', function() {

        // First compile less files
        grunt.task.run('less:compile');
        // Then force evaluation of CSS imports
        grunt.task.run('string-replace:css-import');
        // Run less another time with CSS evaluation and compression
        grunt.task.run('less:compress');

    });

    /***************************************************************************
     * Resources
     */
    grunt.registerTask('build-res', function() {

        // Copy some resources (images, fonts...)
        grunt.task.run('copy:resources');

        // List resources and inject them in cache.manifest
        var resFolderList = [
            'res-min',
            'lib/MathJax/extensions',
            'lib/MathJax/fonts/HTML-CSS/TeX/woff',
            'lib/MathJax/jax/output/HTML-CSS/fonts/TeX',
            'lib/MathJax/jax/output/HTML-CSS/fonts/STIX'
        ];
        grunt.task.run('list-res:' + resFolderList.join(':'));
        grunt.task.run('string-replace:cache-manifest');

    });

    /***************************************************************************
     * Other tasks
     */
    grunt.registerTask('list-res', function() {
        var resourceList = [];
        grunt.util.recurse(arguments, function(arg) {
            grunt.log.writeln('Listing resources: ' + arg);
            grunt.file.recurse(arg, function(abspath) {
                resourceList.push(abspath);
            });
        });
        grunt.config.set('resources', resourceList.join('\n'));
    });

    function getResources(folder) {
        return result;
    }

    grunt.registerTask('default', function() {
        grunt.task.run('clean');
        grunt.task.run('build-js');
        grunt.task.run('build-css');
        grunt.task.run('build-res');
    });
};