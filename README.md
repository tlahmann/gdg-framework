# Grundlagen der Gestaltung Framework

## Universität Ulm
## Institut für Medienforschung und -entwicklung

---------------
Author: Tobias Lahmann

Date: May.2016

---------------
### Allgemeines
#### Getestet wurde das Framework unter folgenden Browsern: 
* Google Chrome 46+ 
* Mozilla Firefox 42+ 
* Opera 33+
* Safari 5+
* Microsoft Edge 20+
* InternetExplorer 11+

#### Hilfreiche Links für einsteiger
* [W3Schools - Html](http://www.w3schools.com/html/)
* [W3Schools - Javascript](http://www.w3schools.com/js/)
* [W3Schools - CSS](http://www.w3schools.com/css/)

### Anleitung
#### Html
> **Datei:** doku.html

Nachdem die die Reinzeichnung der ersten Werke erstellt wurden können diese direkt in die doku eingefügt werden. Die Datei *"doku.html"* im Hauptverzeichnis des Frameworks kann mit jedem beliebigen Texteditor geöffnet werden, in diesem Beispiel nutze ich Notepad++.

Innerhalb der Datei befindet sich ab Zeile 130 (Stand Mai 2016) der Abschnitt *\<xml id="data" name="Maximilian Mustermann" style="display:none;"\>[...]* Es handelt sich hierbei um den Abschnitt der Daten auf welche das Framework zugreift. Es ist daher wichtig, dass *id="data"* und *style="display:none;"* nicht verändert werden. Der Name unter *name="Maximilian Mustermann"* muss allerdings eurem eigenen Namen entsprechen.

Die Struktur der Dokumentation im Abschnitt *data*:

```xml
<doku>
  <abschnitt titel="Text">
    <inhalt titel="Text" typ="bild" rahmen="aus">
      <details>Text</details>
    </inhalt>
  </abschnitt>
</doku>
```
Es können beliebig viele Bereiche 'abschnitt' in der Dokumentation vorkommen. In jedem 'abschnitt' können beliebig viele 'inhalt' Bereiche zusammengefasst werden. Und in jedem dieser Bereiche können beliebig viele 'details' Bereiche eingeschlossen sein. Es bietet sich an hier etwas herum zu spielen und zu beobachten welche Änderungen in der Doku eintreten. 

Eine alternative Darstellung mittels dtd

```xml
<!ELEMENT doku (abschnitt)+>
<!ELEMENT abschnitt (inhalt)+>
<!ATTLIST abschnitt
  titel    CDATA   #REQUIRED
>
<!ELEMENT inhalt (details)+>
<!ATTLIST abschnitt
  titel    CDATA   #REQUIRED
  typ      CDATA   #REQUIRED
  rahmen   CDATA   #REQUIRED
>
<!ELEMENT details (#PCDATA)>
```
