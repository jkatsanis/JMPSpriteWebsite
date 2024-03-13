# Pflichtenheft 

## Ausgangslage
Wir wollen eine Website erstellen die Benutzern es vereinfacht die SpriteEngine zu benützen und ein klares Bild schafft was mit der Enginge alles möglich ist.

## Ist Zustand
Ein alter Prototyp (siehe Github) hilft uns diese Website besser und lebhafter zu designen. 

## Zielssetzung
Das Ziel dieses Projekts ist es, eine benutzerfreundliche Website zu entwickeln, die es Benutzern erleichtert, die SpriteEngine zu verwenden und ein umfassendes Verständnis darüber zu erlangen, was mit der Engine möglich ist. Dies wird umgesetzt mit Docs & Threads.

## Anforderungen
- Benutzerfreundlichkeit
- Login System sowie die Sicherheit
- Dokumentation
- Tutorials
- Minispiele
- Threads-Management
- Documentation des SpriteEngine quellcode

## Tools 
VS Code & Webstorm
- Diese ID's werden hauptsächlich zum programmieren genutz

React & CSS
- Als frontent wird React & Css benutzt

Typescript (TS)
- Wir haben uns für die Programmiersprache TS entschieden

Express
- Unser Backend wird in Express erstellt

## Features
- Docs
- Login System um Threads / Kommentare zu erstellen
- Forum
- Tutorials: Videos, Guide, Auto-Guide
- Minigames: Man sieht spiele die man z.b in der SpriteEngine erstellen kann. 
- Github Status: Mit Github api verbinden und neueste commits z.b anzeigen
- Threads: Die Threads werden mit Labels ausgestattet werden, man kann sie filtern, up/down voten, suchen und die Threads mit den meisten up-votes wird in einer "Common asked Question" section displayed. Ein Thread ist eine Frage von einen User über die Engine.

## Prozessmethode
Wir haben uns für das Wasserfallprozessmodul entschieden da wir am Anfang eine Anforderung haben und dann unser Projekt ausarbeiten. Am Schluss wird dann alles überprüft um nachzusehen ob alle Anforderungen erfüllt wurden.

## Kriterienkatalog
- Login System
    - Das Login-System muss sicher sein und angemessene Maßnahmen zum Schutz der Benutzerdaten implementieren
- Benutzerfreundlichkeit
    - Die Benutzeroberfläche muss intuitiv und benutzerfreundlich sein, um eine einfache Navigation und Interaktion zu ermöglichen, das ist vorallem sehr wichtig beim Docs lesen oder Issues suchen. 

## Mengengerüst
- Anzahl aktiver user: 0-1
- Anzahl accounts: 0-100
- Anzahl an Daten: 1MB - 10MB (in der Datenbank werden nur Accounts & strings gespeichert)

## Meilenstine
- 13.03 Pflichtenheft & Mockup
- 30.03 Server rennt & aufgesetzt 
- 7.04 Erste demo threads können erstellt werden
- 7.05 Alles funktioniert & man kann noch ausbauen (z.b like system)
- Ende: Semester-Ende