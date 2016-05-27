:: overwriting
SET COPYCMD=/Y

:: html
xcopy .\typo.html ..\Abgabe\Typo-Framework\doku.html*

:: css
xcopy .\asset\css\main.css ..\Abgabe\Typo-Framework\asset\css\main.css*
xcopy .\asset\css\vendor\video-js.min.css ..\Abgabe\Typo-Framework\asset\css\vendor\video-js.min.css*

:: javascript

:: fonts
xcopy ".\asset\font\Apache License.txt" "..\Abgabe\Typo-Framework\asset\font\Apache License.txt"*
xcopy .\asset\font\Roboto-Regular.ttf ..\Abgabe\Typo-Framework\asset\font\Roboto-Regular.ttf*

:: readme

:: inhalte
xcopy .\exercise ..\Abgabe\Typo-Framework\exercise /S
