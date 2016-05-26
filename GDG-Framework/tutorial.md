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
* [Beispiele](#beispiele)
  * [Beispiel 1](#beispiel-1)
  * [Beispiel 2](#beispiel-2)  
  * [Beispiel 3](#beispiel-3)
* [Fragen und Antworten](#fragen-und-antworten)
* [Hilfreiche Links](#hilfreiche-links)
  * [Tutorials](#Tutorials)
  * [Downloads](#downloads)
* [Zusätzliche Infos](#zusätzliche-infos)
  * [Test](#test)
* [Lizenz](#lizenz)

---------------
### Allgemeines
Alle Dateien können mit beliebigen Texteditoren geöffnet und manipuliert werden. Oft nutzen Entwickler Texteditoren die syntax highlighting anbieten. Für Microsoft Windows nutze ich meistens den Notepad++ Texteditor oder SublimeText. Unter Apple OSX ist der TextMate zu empfehlen. Und unter Unix bietet VIM bzw. GVIM viele hilfreiche Funktionen. 

Links zum Download sind weiter unten eingetragen. Auch wenn dort immer die Entwicklerseite angegeben ist besteht jedoch keine Garantie über die Sicherheit dieser Downloads.

### Anleitung

#### HTML - hypertext markup language
> **Datei:** doku.html

Nachdem die die Reinzeichnung der ersten Werke erstellt wurden können diese direkt in die Doku eingefügt werden. Die Datei *"doku.html"* im Hauptverzeichnis des Frameworks kann mit jedem beliebigen Texteditor geöffnet werden.

Innerhalb der Datei befindet sich ab Zeile 130 (Stand Mai 2016) der Abschnitt 

*\< xml id="data" name="Maximilian Mustermann" style="display:none;" \>[...]* 

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

* Die Attribute *abschnitt: titel* und *inhalt: titel* **können** beliebigen Text beinhalten. Beispielsweise den Titel der Aufgabe.
* Das Attribut *inhalt: quelle* **muss** einer gültigen, relativen URL zum gewünschten Bild, zur Flash-Animation oder zum Ordner der Animation entsprechen.
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
Die Struktur des Ordners 'inhalte' kann beliebig gewählt werden. Wichtig für die Anzeige der Inhalte ist die Verlinkung im *quelle* Attribut des inhalte Tags. Ein Link muss [relativ](https://de.wikipedia.org/wiki/Uniform_Resource_Locator#Relative_URLs) sein. Beispiele für die korrekte Verlinkung können dem Framework entnommen werden.

Der Typ des Inhalts muss im *typ* Attribut angegeben werden. Wenn dies nicht, oder falsch geschehen ist werden die Inhalte vom Framework falsch behandelt und werden nicht angezeigt.

Bildformate sind nicht auf PNGs beschränkt. Es können beliebige Bildformate gewählt und vom Framework angezeigt werden. Für Reinzeichnungen empfohlen ist .png. Für Fotos empfohlen ist .jpg.

##### Typische Fehler
* Falsche Schreibweise im Pfad, oder im Dateinamen sowie eine fehlende Dateiendung.
  -- *Pfad prüfen und richtig eintragen.*

* Typ des Inhalts falsch angegeben. 
  -- *"animation"/"flash" ändern in "bild" oder umgekehrt*

* Unzulässige Zeichen im Pfad. 
  -- *\< \> \: \" \\ \/ \| \* \? entfernen*

* Inhalt ist nicht im Format 720 px * 540 px. 
  -- *Bildgröße anpassen*

* Bildformat wird nicht unterstützt.  
  -- *[Wikipedia - Von Browsern unterstützte Bildformate](https://en.wikipedia.org/wiki/Comparison_of_web_browsers#Image_format_support)*

#### JavaScript 
> **Datei:** asset/lib/animation.js

Die Datei *"animation.js"* im Unterverzeichnis asset -> lib des Frameworks kann mit jedem beliebigen Texteditor geöffnet werden.

Innerhalb der Datei befindet sich ab Zeile 60 (Stand Mai 2016) der Abschnitt 

```javascript
// Permutationen
var permutationen =
[[
    [8, 7, 6, 5, 4, 3, 2, 1],
    [7, 8, 7, 6, 5, 4, 3, 2],
    [6, 7, 8, 7, 6, 5, 4, 3],
    [5, 6, 7, 8, 7, 6, 5, 4],
    [4, 5, 6, 7, 8, 7, 6, 5],
    [3, 4, 5, 6, 7, 8, 7, 6],
    [2, 3, 4, 5, 6, 7, 8, 7],
    [1, 2, 3, 4, 5, 6, 7, 8]
], [
    [5, 1],
    [1, 5]
], 
...
```

Die Permutationen können beliebig groß oder klein sein. Sie werden vom Framework auf die weiter unten angegebene Größe erweitert. Hierbei kopiert das Framework die Zeilen und oder Spalten nach Bedarf um eine quadratische Matrix zu erhalten. Sollte die eingegebene Permutation also nur 2 Zeilen und 2 Spalten umfassen, aber eine benötigte Größe von 7x7 benötigt sein, werden die Zeilen und Spalten rotationsmäßig erweitert. 
Aus dem zweiten Beispiel oben 

```javascript
... [
    [5, 1],
    [1, 5]
], 
...
```
wird dementsprechend intern die folgende Matrix abgeleitet:
```javascript
... [
    [5, 1, 5, 1, 5, 1, 5],
    [1, 5, 1, 5, 1, 5, 1],
    [5, 1, 5, 1, 5, 1, 5],
    [1, 5, 1, 5, 1, 5, 1],
    [5, 1, 5, 1, 5, 1, 5],
    [1, 5, 1, 5, 1, 5, 1]
], 
...
```

Demnach sollten Permutationen mindestens 7-8 Zeilen und/oder Spalten beinhalten, da ansonsten die Darstellung darunter leiden kann. Es kann zu unschönen Sprüngen in der Anzeige kommen, da das Verfahren keine ästhetischen Gesichtspunkte berücksichtigt.

Die Angabe der Objekte, welche angezeigt werden sollen, erfolgt ebenfalls in der Datei *"animation.js"*. Es handelt sich hier um eine verschachtelte JSON. 

JSON Schema
```javascript
{
    "numberOfObjects": "n",
    "elements": [
        { "name": "folder1" },
        ...
    ]
}, 
...
```
Unter *numberOfObjects* wird angegeben wie viele Objekte aus einem Ordner gelesen werden. Diese Angabe ist wichtig, damit das Framework weiß wieviele Objekte sich im Ordner befinden. Hiermit kann außerdem die Darstellung feiner eingestellt werden. Sollte in der Entwicklung dieser Permutationsreihe beispielsweise 8 Objekte entstanden sein, die Darstellung aber mit 6 Objekten ästhetischer sein können die letzten 2 Objekte hiermit ausgeschlossen werden.

Unter *elements* werden die Ordner der Permutationsreihen angegeben. Der Wunsch bestand, dass man unterschiedliche Versionen der Permutationsreihe darstellen kann. Insbesondere die Reinzeichnung im Vergleich zur eingescannten Skizze. Hierbei ist wichtig, dass unter dem *name* Attribut nur die Namen der Ordner in denen sich Objekte befinden angegeben wird. 

Ab Zeile 112 folgt:
```javascript
var objekte =
[{
    "numberOfObjects": "7",
    "elements": [
        { "name": "group1" }
    ]
},
{
    "numberOfObjects": "6",
    "elements": [
        { "name": "group2" },
        { "name": "group2_reinzeichnung" }
    ]
}];
...
```
Hier sehen wir ein Beispiel für Permutationsreihen. 

Die erste Permutationsreihe besitzt 1 Version (angegeben in *elements*) mit dem Namen "group1". Diese Reihe ist 7 Elemente groß. Also befinden sich 7 Bilder (1.png, 2.png, ..., 7.png) im Ordner ./inhalte/animation/group1 .

Die zweite Permutationsreihe besitzt 2 Versionen (angegeben in *elements*) mit den Namen "group2" und "group2\_reinzeichnung". Diese Reihe ist 6 Elemente groß. Es befinden sich demnach 6 Bilder (1.png, ..., 6.png) im Ordner ./inhalte/animation/group2 und 6 Bilder (1.png, ..., 6.png) im Ordner ./inhalte/animation/group2\_reinzeichnung.

###### Motivation

Die Angabe der Elemente in *numberOfObjects* ist notwendig, da im Kontext von Webseiten nicht auf ein Dateisystem zugegriffen werden kann. Das Skript hat also keine Möglichkeit zu erfahren wie viele Bilder in dem angegebenen Ordner sind. Die Behelfslösung ist hier also mittels JavaScript Image-Objekte zu erstellen, welche einen Link zum Bild darstellen. Um zu erfahren wie viele Bilder das Skript erstellen soll geben wir diese Info an.

Unter *elements* **können** mehrere Versionen der Permutationsreihe angegeben werden. Falls unterschiedliche Varianten der Permutationsreihe erstellt wurden, wie beispielsweise eine "gefüllte" Version und eine Strich­zeich­nung.

##### Typische Fehler
* Angegebene Permutation ist nicht quadratisch.
  -- *gleiche Anzahl der Spalten und Zeilen einhalten.*

* Dateien befinden sich nicht angegebenen Ordner.
  -- *Ordner Umbenennen oder Dateien verschieben*

* Dateien sind nicht richtig benannt.
  -- *Bilder mit 1.png … n.png durchnummerieren*

* Anzahl der Objekte ist nicht (richtig) angegeben.
  -- *Angeben wie viele Bilder sich im Ordner befinden*

* Anzahl der darzustellenden Objekte ist nicht angegeben.
  -- *Angeben wie viele Kacheln angezeigt werden sollen*

* Falsche Ordnernamen, oder Schreibfehler in den Ordnernamen.
  -- *Prüfen, ob die Ordner existieren und so heißen, wie angegeben.*

* Unzulässige Zeichen im Pfad. 
  -- *\< \> \: \" \\ \/ \| \* \? entfernen*

* Inhalt ist nicht im Format 50 px * 50 px. 
  -- *Bildgröße anpassen*

* Bildformat wird nicht unterstützt.  
  -- *[Wikipedia - Von Browsern unterstützte Bildformate](https://en.wikipedia.org/wiki/Comparison_of_web_browsers#Image_format_support)*


#### CSS - cascading style sheet
> **Datei:** asset/css/animation.css

Die Datei *"animation.css"* im Unterverzeichnis asset -> css des Frameworks kann mit jedem beliebigen Texteditor geöffnet werden.

CSS Regeln werden von einem Webbrowser gelesen und dazu verwendet die zugehörigen Elemente in ihrem Aussehen zu verändern. In css wird zwischen Klassen und IDs unterschieden. Hierbei steht in der css-Datei die Raute *(#)* für eine ID und der Punkt *(.)* für eine Klasse. IDs sind in einem html-Dokument eindeutige Bezeichner für ein Element und können nur ein Mal vergeben werden. Klassen sind Gruppierungen von verschiedenen Elementen, welche alle dieselbe Form haben sollen. 

In dieser Dokumentation ist es wichtig, dass jeder Button eine eigene Position erhält. Aus diesem Grund werden die Buttons mit eigenen IDs belegt und jede dieser IDs muss in der css-Datei definiert werden. 

Innerhalb der Datei befindet sich ab Zeile 40 (Stand Mai 2016) der Abschnitt 

```css
#button1 {
  background-image: url("../../inhalte/buttons/play_1.png");
  width: 75px;
  height: 30px;
  left: 50px;
  top: 50px;
}
#button1:hover {
  /* Das Bild ändert sich, wenn die Maus über dem Button 'schwebt' */
  background-image: url("../../inhalte/buttons/play_2.png");
}
#button1:active {
  /* Das Bild ändert sich, solange der Button gedrückt (und gehalten) wird */
  background-image: url("../../inhalte/buttons/play_3.png");
}
```

Es werden eigene Abschnitte für jeden Button definiert. Im Beispiel oben sehen wir die zum ersten Button gehörende Definition. Dieser Button ist 75px breit und 30 px hoch. Er befindet sich 50px von der linken Kante des Animationsbereichs und 50px von der oberen Kante entfernt.

Css-Regeln können auch gruppiert auf mehrere IDs oder Klassen gleichzeitig angewendet werden, wie es beispielsweise einige Zeilen Darüber geschehen ist. Zeile 15-18 gruppiert mehrere Buttons und wendet die darunter befindlichen regeln auf alle an. Die IDs sind mit Komma getrennt.

In css werden die verfügbaren Regeln von oben nach unten gelesen und eventuell später im Dokument vorkommende Regeln überschreiben weiter oben befindliche.

Wenn weniger Buttons benötigt werden können beispielsweise die Links zu den Bildern verändert werden. Falls mehr Buttons als hier mitgeliefert benötigt werden sollte das Beispiel weiter unten beachtet werden.

##### Typische Fehler
* Falsche Schreibweise im Pfad, oder im Dateinamen sowie eine fehlende Dateiendung.
  -- *[Relative Pfade](https://de.wikipedia.org/wiki/Uniform_Resource_Locator#Relative_URLs)*

* Falsche Schreibweise der Regeln. 
  -- *HTML-Element muss gleiche ID haben wie der zugehörige CSS-Selektor*

* Einheiten vergessen 
  -- *[..]px hinzufügen* [-> alternativen](https://www.w3.org/Style/Examples/007/units.de.html)

* Falsche Ordnernamen, oder Schreibfehler in den Ordnernamen.
  -- *Prüfen, ob die Ordner existieren und so heißen, wie angegeben.*

* Unzulässige Zeichen im Pfad. 
  -- *\< \> \: \" \\ \/ \| \* \? entfernen*

* Bilder sind nicht in der angegebenen Größe
  -- *Bildgröße anpassen* oder *angegebene Größe ändern*

* Bildformat wird nicht unterstützt.  
  -- *[Wikipedia - Von Browsern unterstützte Bildformate](https://en.wikipedia.org/wiki/Comparison_of_web_browsers#Image_format_support)*

### Beispiele

#### Beispiel 1
Animation: Button löschen

1. (HTML) Lösche das Element *\< imput id="..* aus der Datei doku.html
2. (CSS) Darstellung anpassen
  * Passe die Positionierung der übrigen Buttons an. Hierzu könnten die css-Regeln umbenannt werden.
  * Alternativ könnten die übrigen Buttons die freiwerdenden IDs übernehmen und damit auch deren Positionen. Hier muss allerdings darauf geachtet werden, dass auch die Referenzen auf die Bilder verändert werden.  

#### Beispiel 2
Animation: Button hinzufügen

1. (HTML) Kopiere ein Button-Element *\< imput id="..* in der Datei doku.html und vergebe eine neue, eindeutige ID.
2. (CSS) Darstellung anpassen
  * Kopiere die css-Regeln von einem bestehenden Button und achte darauf auch die Regel entsprechend der ID zu benennen, z.B. *"#button100"*
  * Passe die Referenz auf das dargestellt Bild an.
  * Passe die Positionierung mittels der Werte in *top* und *left* an.

<!--#### Beispiel 3
Ich möchte gerne einen separaten Pause-Button haben:

1. (HTML) Ich kopiere den „button1“ im HTML und benenne das id-Attribut um in bspw. „button9“
2. (HTML/JS) Ich ändere das Verhalten des „button1“ beim clicken (oncklick-Methode) auf „playAnimation()“ (zu finden ist die Methode in der animation.js)
3. (HTML/JS) Ich ändere das Verhalten des „button9“ beim clicken (oncklick-Methode) auf „pauseAnimation()“ 
4. (CSS) Ich kopiere alle CSS-Regeln welche für den Button 1 bestimmt sind und benenne auch diese um in „button9“
5. (CSS) Ich ändere die positionswerte für meinen neuen „button9“ (top, left)-->

#### Beispiel 3
Doku: Eine zweite Animations "Folie" wird benötigt

1. Leider gibt es hierfür keine direkte Lösung. Wer sich damit auskennt kann gerne die Aufgabe in Angriff nehmen. Wer sich nicht so gut damit auskennt kann auch gerne eine [email schreiben](mailto:tobias.lahmann@uni-ulm.de).

### Fragen und Antworten
**F: Darf ich die Farbe des Frameworks in der css verändern?**

**A:** Nein. Das Framework darf nicht verändert werden, nur die Inhalte.

**F: Darf ich Musik in meinem Framework verwenden?**

**A:** Nein. Es geht hier um visuelle Effekte und nicht um Musik. Mach dafür einfach GdG II mit.

**F: In meiner Animation möchte ich gerne 10 Buttons haben. Wie geht das?**

**A:** Buttons können in der doku.html hinzugefügt werden. Die animation.css muss angepasst werden, damit der Button eigene Positionen und das gleiche Aussehen wie die Anderen erhält. Die animation.js muss angepasst werden, damit der Button auch eine Funktion erhält.

**F: Wie kann ich eine zweite Animation in meine Doku einfügen?**

**A:** Dieses Vorhaben benötigt sogar etwas mehr Aufwand und Verständnis der Materie. TODO!

### Hilfreiche Links

#### Tutorials
* [W3Schools - Html](http://www.w3schools.com/html/)
* [W3Schools - JavaScript](http://www.w3schools.com/js/)
* [W3Schools - CSS](http://www.w3schools.com/css/)

---------------
#### Downloads
* [Notepad++](https://notepad-plus-plus.org/)
* [SublimeText](https://www.sublimetext.com/)
* [TextMate](http://macromates.com/)
* [VIM](http://www.vim.org/)

### Zusätzliche Infos

#### Test: 
Framework wurde in folgenden Browsern getestet und die Funktionsweise bestätigt:

* Google Chrome 46+ 
* Mozilla Firefox 42+ 
* Opera 33+
* Safari 5+
* Microsoft Edge 20+
* InternetExplorer 11+

---------------
### Lizenz
Grundlagen der Gestaltung 1 Framework (c) by Institut für Medienforschung und Medienentwicklung, Ulm

Grundlagen der Gestaltung 1 Framework is licensed under a
Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License.

You should have received a copy of the license along with this
work.  If not, see [http://creativecommons.org/licenses/by-nc-nd/3.0/](http://creativecommons.org/licenses/by-nc-nd/3.0/).
