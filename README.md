# Grundlagen der Gestaltung Framework

## Universität Ulm
## Institut für Medienforschung und -entwicklung

---------------
Author: Tobias Lahmann

Date: May 2016

---------------
### Inhalt
* [Allgemeines](#allgemein)
* [Anleitung](#anleitung)
  * [HTML - hypertext markup language](#html-hypertext-markup-language)
  * [JavaScript](#javascript)
  * [CSS - cascading style sheet](#css-cascading-style-sheet)
* [Fragen und Antworten](#fragen-und-antworten)
* [Hilfreiche Links](#hilfreiche-links)

---------------
### Allgemeines
#### Test: 
* Google Chrome 46+ 
* Mozilla Firefox 42+ 
* Opera 33+
* Safari 5+
* Microsoft Edge 20+
* InternetExplorer 11+

### Anleitung
#### HTML - hypertext markup language
> **Datei:** doku.html

Nachdem die die Reinzeichnung der ersten Werke erstellt wurden können diese direkt in die doku eingefügt werden. Die Datei *"doku.html"* im Hauptverzeichnis des Frameworks kann mit jedem beliebigen Texteditor geöffnet werden, in diesem Beispiel nutze ich Notepad++.

Innerhalb der Datei befindet sich ab Zeile 130 (Stand Mai 2016) der Abschnitt 

*\<xml id="data" name="Maximilian Mustermann" style="display:none;"\>[...]* 

Es handelt sich hierbei um den Abschnitt der Daten auf welche das Framework zugreift. Es ist daher wichtig, dass *id="data"* und *style="display:none;"* nicht verändert werden. Der Name unter *name="Maximilian Mustermann"* muss allerdings eurem eigenen Namen entsprechen.

Die Struktur der Dokumentation im Abschnitt *data*:

```xml
<doku>
  <abschnitt titel="text">
    <inhalt titel="text" quelle="pfad"  typ="bild" rahmen="aus">
      <details>text</details>
      ...
    </inhalt>
    ...
  </abschnitt>
  ...
</doku>
```
Es können beliebig viele Bereiche 'abschnitt' in der Dokumentation vorkommen. In jedem 'abschnitt' können beliebig viele 'inhalt' Bereiche zusammengefasst werden. Und in jedem dieser Bereiche können beliebig viele 'details' Bereiche eingeschlossen sein. Es bietet sich an hier etwas herum zu spielen und zu beobachten welche Änderungen in der Doku eintreten. 

* Die Attribute *abschnitt: titel* und *inhalt: titel* können beliebigen Text beinhalten. Beispielsweise den Titel der Aufgabe.
* Das Attribut *inhalt: quelle* **muss** einer gültigen, realtiven URL zum gewünschten Bild, zur Flash-Animation oder zum Ordner der Animation entsprechen.
* Das Attribut *inhalt: typ* **muss** einem der folgenden Werte entsprechen: 'bild', 'flash' oder 'animation'.
* Das Attribut *inhalt: rahmen* **muss** einem der folgenden Werte entsprechen: 'ein' oder 'aus'.

Eine alternative Darstellung mittels [Dokumenttypdefinition](https://de.wikipedia.org/wiki/Dokumenttypdefinition)

```xml
<!ELEMENT doku (abschnitt)+>
<!ELEMENT abschnitt (inhalt)+>
<!ATTLIST abschnitt
  titel    CDATA   #REQUIRED
>
<!ELEMENT inhalt (details)+>
<!ATTLIST inhalt
  titel    CDATA   #REQUIRED
  quelle   CDATA   #REQUIRED
  typ      CDATA   #REQUIRED
  rahmen   CDATA   #REQUIRED
>
<!ELEMENT details (#PCDATA)>
```
Die Struktur des Ordners 'inhalte' kann beliebig gewählt werden. Wichtig für die Anzeige der Inhalte ist die verlinkung im *quelle* Attribut des inhalte Tags. Ein Link muss [relativ](https://de.wikipedia.org/wiki/Uniform_Resource_Locator#Relative_URLs) sein. Beispiele für die korrekte Verlinkung können dem Framework entnommen werden.

Der Typ des Inhalts muss im *typ* Attribut angegeben werden. Wenn dies nicht, oder falsch geschehen ist weden die Inhalte vom Framework falsch behandelt und werden nicht angezeigt.

Bildformate sind nicht auf PNGs beschränkt. Es können beliebige Bildformate gewählt und vom Framework angezeigt werden. Für Reinzeichnungen empfohlen ist .png. Für Fotos empfohlen ist .jpg.

##### Typische Fehler
* Falsche Schreibweise im Pfad, oder im Dateinamen sowie eine fehlende Dateiendung.
* Typ des Inhalts falsch angegeben.
* Unzulässige Zeichen im Pfad.
* Inhalt ist nicht im Format 720 px * 540 px

#### JavaScript 
##### Typische Fehler

#### CSS - cascading style sheet
##### Typische Fehler

### Fragen und Antworten
**F:** Darf ich die Farbe des Frameworks in der css verändern?

**A:** Nein. Das Framework darf nicht verändert werden, nur die Inhalte.

### Hilfreiche Links
* [W3Schools - Html](http://www.w3schools.com/html/)
* [W3Schools - JavaScript](http://www.w3schools.com/js/)
* [W3Schools - CSS](http://www.w3schools.com/css/)
