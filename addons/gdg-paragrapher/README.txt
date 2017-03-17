Grundlagen der Gestaltung Framework
Univerität Ulm
Institut für Medienforschung und -entwicklung
Tobias Lahmann

---------------
### Allgemeines

Die in diesem AddOn zum GdG-Framework verfügbare Datei 'paragraph.css' bewirkt, dass die beschreibungen der Bilder mit Paragraphen ausgestattet werden können.

Die wesentliche Änderung umfasst wie der Browser auf Linebreaks (Zeilenumbrüche) reagiert. Sobald ein Linebreak im Text auftaucht wird dieser auch in die Darstellung des Textes übernommen. 

Folgendes Beispiel soll verdeutlichen was geschieht. Als Referenz dient das Bild 'gdg-Framework-Linebreaks_in_description.png'. Hierbei steht <LB> für einen Zeilenumbruch, welcher nicht als HTML-Element eingegeben werden muss sondern nur der Verdeutlichung dient. (Zeilenumbrüche werden üblicherweise mit der Eingabetaste eingefügt.)

---------------
### Beispiel

##### Beispiel #####

<detail><LB>
Weit hinten, hinter den Wortbergen, fern der Länder Vokalien und Konsonantien leben die Blindtexte.<LB>
Abgeschieden wohnen Sie in Buchstabhausen an der Küste des Semantik, eines großen Sprachozeans. Ein kleines Bächlein namens Duden fließt durch ihren Ort und versorgt sie mit den nötigen Regelialien.<LB>
<LB>
Es ist ein paradiesmatisches Land, in dem einem gebratene Satzteile in den [...]
</detail>

#######

Der Zeilenumbruch direkt nach dem <detail>-Tag verursacht die im Bild 'gdg-Framework-Linebreaks_in_description.png' zu sehende oberste rote Fläche. Diese muss(!) beim einbinden dieses Addons unbedingt entfert werden, da dies eine Falsche darstellung der Texte verursacht! Die resultierende Beschreibung ist also etwa:

##### Beispiel #####

<detail>Weit hinten, hinter den [...]

#######

Jeder weitere Zeilenumbruch, der mittem im Text auftaucht, verursacht auch einen Zeilenumbruch im dargestellten Text im Framework. 
Hierfür gibt es 2 mögliche Resultate:
1. Ein Zeilenumbruch verursacht einen Absatz, wie im Bild mit der blauen Fläche dargestellt ist.
2. Zwei Zeilenumbrüche verursachen, dass eine leere Zeile eingefügt wird. Dies ist im Bild mit der grünen Fläche gekennzeichnet.

---------------
### Installation

Indem im head-Bereich der doku.html eine weitere Verlinkung auf die css-Datei des Paragraphers hinzugefügt wird kann diese css-Regel eingebunden werden. 
Die einfachste Vorgehensweise ist eine Zeile der Verlinkung auf css-Dateien zu kopieren (bspw. Zeile 28 [Stand. März 2017]) und den Link auf die Paragrapher-Datei umzubiegen.

Das ganze könnte in etwa so aussehen:

<link type="text/css" href="addons/gdg-paragrapher/paragraph.css" rel="stylesheet" />
