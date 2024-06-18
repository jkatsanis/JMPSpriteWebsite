# Systemdokumentation: Sprite Engine Website

**Autoren:** Jannis Katsanis, Moritz Passenbrunner, Paul Achleitner

## 1. Einleitung
Die Sprite Engine Website ist eine Website welche die Sprite Engine, eine C++ Game Engine, repräsentieren soll. Die Website bietet die Möglichkeit für Benutzer, die Engine zu lernen und sie zu verstehen. Durch die interaktiven Docs können User die verschiedenen Features kennenlernen und haben somit einen einfacheren Einstieg in das Programmieren mit C++. Außerdem kann man als Benutzer die Website dafür nutzen, sich mit anderen Entwicklern über die Threads Funktion auszutauschen oder sich Inspiration für sein eigenes Projekt mithilfe der Project-Sharing Funktion einzuholen.

Die verwendeten Technologien sind:
- TypeScript
- React
- Express
- Multer
- SQLite

## 2. Projektstruktur
```
/root
├── frontend (React-App)
├── backend (Express-App)
├── tsconfig.json (TypeScript-Konfigurationsdatei)
└── README.md (Projektbeschreibung und Anweisungen)
```
## 3. Einrichtung und Installation
/TODO
## 4. Konfiguration
Umgebungsvariablen: Benutzerverwaltung
```
REACT_APP_GITHUB_CLIENT_ID (Github OAuth Client Id)
REACT_APP_GITHUB_CLIENT_SECRET (Github OAuth Client Secret)
```

## 5. Architektur
### Client-Seite (React)
/TODO

### Server-Seite (Express)
Hauptendpunkte:
- `/api/accounts` (Verwendet für die Benutzerverwaltung)
- `/api/threads` (Verwendet für die Threads Funktion)
- `/api/projects` (Verwendet für die Project-Sharing Funktion)

## 6. Typisierung mit TypeScript
- Client
- Server

## 7. Tests
- **Unit-Tests:** Es werden Unit-Tests verwendet, um die Funktionalität der Klassen und Methoden zu testen.
- **HTTP-Requests:** Es werden .http Request Files verwendet, um die Routen zu den Endpoints zu testen.

## 8. Deployment
/TODO