var webpack = require('webpack');

module.exports = function (grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Metadata.
    meta: {
      srcPath:        'public/',
      entryPath:      'public/src/',
      distPath:       'public/src/dist/',
      // docsPath:       'docs/',
      // docsAssetsPath: 'docs/assets/',
      hotelEntry:   'entry/hotel/',
      channelEntry: 'entry/channel/',
      wxqbh5Entry: 'entry/wxqbh5/',
      zdwsEntry: 'entry/zdws/',
      hotelDist:    'dist/hotel/',
      libPath:      'lib/',
    },

    banner: '/*!\n' +
            ' * =====================================================\n' +
            ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' *\n' +
            ' * v<%= pkg.version %> designed by @elong.\n' +
            ' * =====================================================\n' +
            ' */\n',

    uglify: {

      build: {
        src: '<%= meta.entryPath%>js/app.js',//压缩源文件是之前合并的buildt.js文件
        dest: '<%= meta.distPath %>js/app.min.js'//压缩文件为built.min.js
      }

    },

    sass: {
      options: {
        banner: '<%= banner %>',
        sourceMap: false,
        style: 'expanded',
        unixNewlines: true
      },
      dist: {
        files: {
          '<%= meta.entryPath %>css/app.css': '<%= meta.srcPath%>src/sass/app.scss'
        }
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: '<%= meta.entryPath %>css/',
        src: ['*.css'],
        dest: '<%= meta.distPath %>css/',
        ext: '.min.css'
      }
    },

    webpack: {
      hotel:{
        entry: {
          app: ['./public/js/app.js'],
        },
        output: {
          path: 'public/src/js', // 图片和 JS 会到这里来
          // publicPath:"/dist/hotel/",
          filename: '[name].js'
        },
        module: {
          loaders:[
            {
              test: /\.scss$/,
              loader: 'style-loader!css-loader?minimize!sass-loader'
            },
            {
              test: /\.vue$/,
              loader: 'vue'
            },
            {
              test: /\.js$/,
              exclude: /node_modules|vue\/dist/,
              loader: 'babel?optional[]=runtime&loose=true'
            },
            {
              test: /\.css$/,
              loader: 'style-loader!css-loader'
            },
            { test: /\.(png|jpg)$/,
              loader: 'url-loader'
            }
          ]
        },
        stats: {
            // Configure the console output
            colors: false,
            modules: false,
            reasons: true
        },
        plugins: [
          // new webpack.DefinePlugin({__DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))}),
          // new webpack.DefinePlugin({__DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))}),
          // new webpack.EnvironmentPlugin(['NODE_ENV'])
        ],
        storeStatsTo: "xyz", // writes the status to a variable named xyz
        progress: false, // Don't show progress
        failOnError: false, // don't report error to grunt if webpack find errors
        inline: true,  // embed the webpack-dev-server runtime into the bundle
      }
    },

    tmod: {
        hotel: {
            src: '<%= meta.srcPath%>js/html/tpl/*.tpl',
            dest: '<%= meta.srcPath%>js/html/template.js',
            options: {
                base:'<%= meta.srcPath%>js/html/tpl',
                combo: true
            }
        }
    },
  });

  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks("grunt-webpack");
  grunt.registerTask('default', ['sass', 'cssmin', 'webpack:hotel', 'uglify']);
  grunt.registerTask('css', ['sass', 'cssmin']);
  grunt.registerTask('webpack-hotel', ['webpack:hotel', 'uglify']);

}
