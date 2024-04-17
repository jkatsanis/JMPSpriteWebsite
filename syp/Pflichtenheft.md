# Pflichtenheft

## Ausgangslage

Wir wollen eine Website erstellen die Benutzern es vereinfacht die SpriteEngine zu benützen und ein klares Bild schafft was mit der Enginge alles möglich ist. Zusätzlich soll es ansprechend aussehen.

## Ist Zustand

Ein alter Prototyp (siehe Github) hilft uns diese Website besser und lebhafter zu designen. Im Moment gibt es nur eine einfache Version die auf unser damaliges Wissen basiert.

## Zielssetzung

Das Ziel dieses Projekts ist es, eine benutzerfreundliche Website zu entwickeln, die es Benutzern erleichtert, die SpriteEngine zu verwenden und ein umfassendes Verständnis darüber zu erlangen, was mit der Engine möglich ist und warum man diese benutzen sollte. Dies wird umgesetzt mit Docs & Threads.

## Anforderungen

- Benutzerfreundlichkeit
- Login System sowie die Sicherheit
- Dokumentation
- Tutorials
- Minispiele
- Projektverwaltung
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
- Projects: Man kann Projekte runter laden und hochladen.
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

## Use Case

Ein Benutzer möchte sich auf der Website anmelden, um Zugriff auf alle Funktionen zu erhalten.
Benutzer gibt Benutzernamen und Passwort ein.
Das System überprüft die eingegebenen Anmeldeinformationen.
Bei erfolgreicher Überprüfung wird der Benutzer zur Hauptseite weitergeleitet.
Dokumentation lesen:

Ein Benutzer möchte die Dokumentation zur SpriteEngine lesen, um mehr über deren Funktionalität zu erfahren.
Benutzer navigiert zur Dokumentationsseite.
Das System zeigt eine Liste von verfügbaren Dokumenten an.
Benutzer wählt ein Dokument aus und liest es.
Tutorial ansehen:

Ein Benutzer möchte ein Tutorial ansehen, um zu lernen, wie man die SpriteEngine verwendet.
Benutzer navigiert zur Tutorial-Seite.
Das System zeigt eine Liste verfügbarer Tutorials an.
Benutzer wählt ein Tutorial aus (Video, Guide oder Auto-Guide) und schaut es sich an.
Minispiel spielen:

Ein Benutzer möchte ein Minispiel spielen, das mit der SpriteEngine erstellt wurde.
Benutzer navigiert zur Minispiel-Seite.
Das System zeigt eine Liste von verfügbaren Minispielen an.
Benutzer wählt ein Minispiel aus und spielt es.
Thread erstellen:

Ein Benutzer möchte einen neuen Thread erstellen, um eine Frage über die SpriteEngine zu stellen.
Benutzer navigiert zur Thread-Erstellungsseite.
Benutzer gibt den Titel und die Beschreibung des Threads ein.
Benutzer fügt optional Labels hinzu.
Benutzer sendet den Thread ab.
Thread durchsuchen und filtern:

Ein Benutzer möchte Threads nach bestimmten Kriterien durchsuchen und filtern.
Benutzer navigiert zur Thread-Übersichtsseite.
Das System zeigt eine Liste von Threads an.
Benutzer verwendet Filteroptionen (z.B. nach Labels, Upvotes) und sucht nach spezifischen Threads.
Thread upvoten/downvoten:

Ein Benutzer möchte die Qualität eines Threads bewerten, indem er ihn upvotet oder downvotet.
Benutzer navigiert zu einem bestimmten Thread.
Benutzer klickt auf den Upvote- oder Downvote-Button.
Das System aktualisiert die Upvote/Downvote-Zähler des Threads.

Ein Benutzer möchte seine eigenen Spriteengineprojekte hochladen können.
Benutzer geht zum Project Reiter.
Benutzer gibt seine Projektdaten an.
Das Projekt wird hochgeladen und gespeichert.

Ein Benutzer kann Projekte von anderen herunterladen.
Benutzer geht zum Project Reiter.
Benutzer wählt das Projekt aus welches er haben möchte.
Er lädt das Projekt herunter und kann nun drann arbeiten.

## Meilenstine

- 13.03 Pflichtenheft & Mockup
- 30.03 Server rennt & aufgesetzt
- 7.04 Erste demo threads können erstellt werden
- 1.05 User können sich einloggen und neue Benutzer erstellen
- 7.06 Alles funktioniert & man kann noch ausbauen (z.b like system)
- Ende: Semester-Ende
