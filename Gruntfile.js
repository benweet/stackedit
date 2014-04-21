module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
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
        jshint: {
            options: {
                curly: true,
                browser: true,
                devel: true,
                indent: 4,
                latedef: true,
                undef: true,
                unused: true,
                expr: true,
                globals: {
                    "define": false,
                    "require": false,
                },
                ignores: [
                    'node_modules/**/*.js',
                    'public/libs/**/*.js',
                    'public/res/libs/**/*.js',
                    'public/res/bower-libs/**/*.js',
                    'public/res-min/**/*.js'
                ]
            },
            client: ['public/**/*.js'],
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "public/res",
                    name: "main",
                    out: "public/res-min/main.js",
                    mainConfigFile: 'public/res/main.js',
                    optimize: "uglify2",
                    inlineText: true,
                    /*
                    uglify2: {
                        output: {
                            beautify: true,
                            indent_level: 1,
                        },
                    },
                    */
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
                options: {
                    compress: true,
                },
                files: [
                    {
                        expand: true,
                        cwd: 'public/res/themes',
                        src: [
                            '*.less'
                        ],
                        dest: 'public/res-min/themes',
                        ext: '.css',
                    },
                    {
                        src: 'public/res/styles/base.less',
                        dest: 'public/res-min/themes/base.css',
                    }
                ],
            },
        },
        'string-replace': {
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
            'constants': {
                files: {
                    'public/res/constants.js': 'public/res/constants.js'
                },
                options: {
                    replacements: [
                        {
                            pattern: /constants\.VERSION = .*/,
                            replacement: 'constants.VERSION = "<%= pkg.version %>";'
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

        // JSHint validation
        grunt.task.run('jshint');

        // Run r.js optimization
        grunt.task.run('requirejs');

    });

    /***************************************************************************
     * Build CSS
     */
    grunt.registerTask('build-css', function() {

        // First compile less files
        grunt.task.run('less:compile');
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
            'public/libs/MathJax/jax/element',
            'public/libs/MathJax/jax/output/HTML-CSS/autoload',
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
    grunt.registerTask('tag', function(versionType) {
        grunt.task.run('bump-only:' + (versionType || 'patch'));
        grunt.task.run('string-replace:constants');
        grunt.task.run('default');
        grunt.task.run('bump-commit');
    });
};
