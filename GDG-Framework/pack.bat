:: overwriting
SET COPYCMD=/Y

:: html
xcopy .\doku.html ..\Abgabe\GDG-Framework\doku.html*

:: css
xcopy .\asset\css\main.min.css ..\Abgabe\GDG-Framework\asset\css\main.min.css*
xcopy .\asset\css\animation.css ..\Abgabe\GDG-Framework\asset\css\animation.css*

:: javascript
xcopy .\asset\lib\default.min.js ..\Abgabe\GDG-Framework\asset\lib\default.min.js*
xcopy .\asset\lib\animation.js ..\Abgabe\GDG-Framework\asset\lib\animation.js*
xcopy .\asset\lib\jquery-2.2.0.min.js ..\Abgabe\GDG-Framework\asset\lib\jquery-2.2.0.min.js*

:: fonts
xcopy ".\asset\font\Apache License.txt" "..\Abgabe\GDG-Framework\asset\font\Apache License.txt"*
xcopy .\asset\font\Roboto-Regular.ttf ..\Abgabe\GDG-Framework\asset\font\Roboto-Regular.ttf*

:: readme
copy .\tutorial_style.txt+.\tutorial.html ..\Abgabe\GDG-Framework\tutorial.html

:: inhalte
xcopy .\inhalte\png\A1a_1.png ..\Abgabe\GDG-Framework\inhalte\png\A1a_1.png*
xcopy .\inhalte\png\skizze.png ..\Abgabe\GDG-Framework\inhalte\png\skizze.png*
xcopy .\inhalte\swf\ball.swf ..\Abgabe\GDG-Framework\inhalte\swf\ball.swf*
xcopy .\inhalte\animation ..\Abgabe\GDG-Framework\inhalte\animation /S
xcopy .\inhalte\buttons ..\Abgabe\GDG-Framework\inhalte\buttons /exclude:.\packexclude.txt
xcopy .\inhalte\fotos\foto.jpg ..\Abgabe\GDG-Framework\inhalte\fotos\foto.jpg*
