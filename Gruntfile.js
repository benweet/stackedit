module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower-requirejs');
    grunt.loadNpmTasks('grunt-bump');

    /***************************************************************************
     * Configuration
     */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            compile: {
                options: {
                    baseUrl: "public/res",
                    name: "main",
                    out: "public/res-min/main.js",
                    mainConfigFile: 'public/res/main.js',
                    optimize: "uglify2",
                    inlineText: true,
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
                        cwd: 'public/res/themes',
                        src: [
                            '*.less'
                        ],
                        dest: 'public/res-min/themes',
                        ext: '.css',
                    }
                ]
            },
            compress: {
                options: {
                    compress: true,
                    paths: 'public/res/styles'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'public/res-min/themes',
                        src: [
                            '*.css'
                        ],
                        dest: 'public/res-min/themes',
                    }
                ]
            },
        },
        'string-replace': {
            'css-import': {
                files: {
                    './': 'public/res-min/themes/*.css',
                },
                options: {
                    replacements: [
                        {
                            pattern: /@import /g,
                            replacement: '@import (less) '
                        },
                    ]
                }
            },
            'font-parameters': {
                files: {
                    './': 'public/res-min/themes/*.css',
                },
                options: {
                    replacements: [
                        {
                            pattern: /(font\/fontello\.\w+)\?\w+/g,
                            replacement: '$1'
                        }
                    ]
                }
            },
            'config': {
                files: {
                    'public/res/config.js': 'public/res/config.js'
                },
                options: {
                    replacements: [
                        {
                            pattern: /(var VERSION = ).*/,
                            replacement: 'var VERSION = "<%= pkg.version %>";'
                        },
                    ]
                }
            },
            'cache-manifest': {
                files: {
                    'public/cache.manifest': 'public/cache.manifest'
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
            },
        },
        copy: {
            resources: {
                files: [
                    // Fonts
                    {
                        expand: true,
                        cwd: 'public/res/font',
                        src: [
                            '**'
                        ],
                        dest: 'public/res-min/font/'
                    },
                    {
                        expand: true,
                        cwd: 'public/res/libs/fontello/font',
                        src: [
                            '**'
                        ],
                        dest: 'public/res-min/font/'
                    },
                    // Images
                    {
                        expand: true,
                        cwd: 'public/res/img',
                        src: [
                            '**'
                        ],
                        dest: 'public/res-min/img/'
                    },
                    // Libraries
                    {
                        expand: true,
                        cwd: 'public/res/bower-libs/requirejs',
                        src: [
                            'require.js'
                        ],
                        dest: 'public/res-min/'
                    },
                ]
            }
        },
        // Inject bower dependencies into RequireJS configuration
        bower: {
            target: {
                rjsConfig: 'public/res/main.js'
            }
        },
        bump: {
            options: {
                files: [
                    'package.json',
                    'bower.json'
                ],
                updateConfigs: [
                    'pkg'
                ],
                commitFiles: [
                    '-a'
                ],
                pushTo: 'origin'
            }
        },
    });

    /***************************************************************************
     * Clean
     */
    grunt.registerTask('clean', function() {

        // Remove public/res-min folder
        grunt.file['delete']('public/res-min');

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
        // Remove fontello checksum arguments
        grunt.task.run('string-replace:font-parameters');

    });

    /***************************************************************************
     * Resources
     */
    grunt.registerTask('build-res', function() {

        // Copy some resources (images, fonts...)
        grunt.task.run('copy:resources');

        // List resources and inject them in cache.manifest
        var resFolderList = [
            'public/res-min',
            'public/libs/dictionaries',
            'public/libs/MathJax/extensions',
            'public/libs/MathJax/fonts/HTML-CSS/TeX/woff',
            'public/libs/MathJax/jax/output/HTML-CSS/fonts/TeX',
            'public/libs/MathJax/jax/output/HTML-CSS/fonts/STIX'
        ];
        grunt.task.run('list-res:' + resFolderList.join(':'));
        grunt.task.run('string-replace:cache-manifest');

    });

    grunt.registerTask('list-res', function() {
        var resourceList = [];
        grunt.util.recurse(arguments, function(arg) {
            grunt.log.writeln('Listing resources: ' + arg);
            grunt.file.recurse(arg, function(abspath) {
                resourceList.push(abspath.replace(/^public\//, ''));
            });
        });
        grunt.config.set('resources', resourceList.join('\n'));
    });

    /***************************************************************************
     * Default task
     */
    grunt.registerTask('default', function() {
        grunt.task.run('clean');
        grunt.task.run('build-js');
        grunt.task.run('build-css');
        grunt.task.run('build-res');
    });

    /***************************************************************************
     * Tag task
     */
    grunt.registerTask('tag', function() {
        grunt.task.run('bump-only');
        grunt.task.run('string-replace:config');
        grunt.task.run('default');
        grunt.task.run('bump-commit');
    });
};