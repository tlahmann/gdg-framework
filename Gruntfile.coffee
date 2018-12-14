sass = require('node-sass')

module.exports = (grunt)->
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    
    coffee:
      dist:
        options:
          bare: true
        files: [
          expand: true
          cwd: 'asset/lib/'
          src: '*.coffee'
          dest: 'asset/lib/'
          ext: '.js'
        ]
    
    sass:
      dist:
        options:
          implementation: sass
          sourceMap: false
        files: [
          'asset/css/main.css': 'asset/css/main.scss'
          'asset/css/animation.css': 'asset/css/vendor/animation.scss'
        ]
      toggle:
        options:
          implementation: sass
          sourceMap: false
        files: [
          'asset/css/toggle.css': 'asset/css/vendor/toggle.scss'
        ]
      radio:
        options:
          implementation: sass
          sourceMap: false
        files: [
          'asset/css/radio.css': 'asset/css/vendor/radio.scss'
        ]
    
    cssmin:
      dist:
        files: [
          expand: true
          cwd: 'asset/css'
          src: [
            '*.css'
            '!*.min.css'
            '!animation.css'
          ]
          dest: 'asset/css'
          ext: '.min.css'
        ]
    
    uglify:
      options:
        mangle: false
      dist:
        files: [
          'asset/lib/default.min.js': [
            'asset/lib/default.js'
            'asset/lib/simplebar.js'
          ]
        ]
  
    watch:
      coffee:
        files: ["asset/lib/*.coffee"]
        tasks: ["coffee"]
      uglify:
        files: [
          "asset/lib/*.js"
          "!asset/lib/*.min.js"
        ]
        tasks: ["uglify"]
      sass:
        files: ["asset/**/*.scss"]
        tasks: ["sass"]
      toggle:
        files: ["asset/css/vendor/toggle.scss"]
        tasks: ["sass:toggle"]
      radio:
        files: ["asset/css/vendor/radio.scss"]
        tasks: ["sass:radio"]
      cssmin:
        files: [
          "asset/css/*.css"
          "!asset/css/*.min.css"
        ]
        tasks: ["cssmin"]
  
  
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-sass"
  grunt.loadNpmTasks "grunt-contrib-cssmin"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-notify"
  
  grunt.registerTask "default", [
    "coffee"
    "uglify"
    "sass"
    "cssmin"
    "watch"
  ]
  
  grunt.registerTask "compile", [
    "coffee"
    "uglify"
    "sass"
    "cssmin"
  ]
