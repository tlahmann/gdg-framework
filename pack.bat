:: overwriting
SET COPYCMD=/Y

:: html
xcopy .\GDG-Framework\doku.html .\Abgabe\GDG-Framework\doku.html*

:: css
xcopy .\GDG-Framework\asset\css\main.min.css .\Abgabe\GDG-Framework\asset\css\main.min.css*
xcopy .\GDG-Framework\asset\css\animation.css .\Abgabe\GDG-Framework\asset\css\animation.css*

:: javascript
xcopy .\GDG-Framework\asset\lib\default.min.js .\Abgabe\GDG-Framework\asset\lib\default.min.js*
xcopy .\GDG-Framework\asset\lib\animation.js .\Abgabe\GDG-Framework\asset\lib\animation.js*
xcopy .\GDG-Framework\asset\lib\jquery-2.2.0.min.js .\Abgabe\GDG-Framework\asset\lib\jquery-2.2.0.min.js*

:: fonts
xcopy ".\GDG-Framework\asset\font\Apache License.txt" ".\Abgabe\GDG-Framework\asset\font\Apache License.txt"*
xcopy .\GDG-Framework\asset\font\Roboto-Regular.ttf .\Abgabe\GDG-Framework\asset\font\Roboto-Regular.ttf*

:: readme
xcopy .\GDG-Framework\tutorial.html .\Abgabe\GDG-Framework\tutorial.html*

:: inhalte
xcopy .\GDG-Framework\inhalte\png\A1a_1.png .\Abgabe\GDG-Framework\inhalte\png\A1a_1.png*
xcopy .\GDG-Framework\inhalte\png\skizze.png .\Abgabe\GDG-Framework\inhalte\png\skizze.png*
xcopy .\GDG-Framework\inhalte\swf\ball.swf .\Abgabe\GDG-Framework\inhalte\swf\ball.swf*
xcopy .\GDG-Framework\inhalte\animation .\Abgabe\GDG-Framework\inhalte\animation /S
xcopy .\GDG-Framework\inhalte\buttons .\Abgabe\GDG-Framework\inhalte\buttons /exclude:.\packexclude.txt
xcopy .\GDG-Framework\inhalte\fotos\foto.jpg .\Abgabe\GDG-Framework\inhalte\fotos\foto.jpg*
