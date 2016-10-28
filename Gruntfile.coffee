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
          sourceMap: false
        files: [
          'asset/css/main.css': 'asset/css/main.scss'
          'asset/css/animation.css': 'asset/css/vendor/animation.scss'
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
    
    watch:
      coffee:
        files: ["asset/lib/*.coffee"]
        tasks: ["coffee"]
      sass:
        files: ["asset/css/*.scss"]
        tasks: ["sass"]
      cssmin:
        files: ["asset/css/*.css"]
        tasks: ["cssmin"]
  
  
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-sass"
  grunt.loadNpmTasks "grunt-contrib-cssmin"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-notify"
  
  grunt.registerTask "default", [
    "coffee"
    "sass"
    "cssmin"
    "watch"
  ]
  
  grunt.registerTask "compile", [
    "coffee"
    "sass"
    "cssmin"
  ]
  
  grunt.registerTask "wtch", [
    "watch"
  ]
