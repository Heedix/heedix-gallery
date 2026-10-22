# HeedixGallery

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.3.

## Admin-Panel

Unter `/admin` können Administratoren neue Anmeldungen und Registrierungen sperren, den Wartungsmodus für die gesamte Galerie schalten und den Wartungstext anpassen. Änderungen werden erst mit **Änderungen speichern** aktiv. Bestehende Sitzungen bleiben bei einer Login-Sperre erhalten.

Der separate Zugang `/admin/login` bleibt auch während der Wartung erreichbar. Er verwendet vorhandene Konten mit `permissionlevel > 5`. Im Account-Menü sehen diese Nutzer einen Link zum Admin-Panel. Die API prüft die Berechtigung unabhängig vom Frontend.

Voraussetzung ist die aktualisierte `heedix-gallery-api` mit den Endpunkten `/v1/site-status` und `/v1/admin/*`. Die API legt die dauerhaften Einstellungen beim Start in PostgreSQL an; Details stehen in der API-README. Frontend und API müssen zusammen aktualisiert werden. Es wurden keine Live-Einstellungen verändert.

Besucher sehen im Wartungsmodus auf allen Galerie-Routen die Wartungsseite. Bereits geöffnete Seiten prüfen alle 15 Sekunden auf Änderungen und geben die Galerie nach Ende der Wartung automatisch wieder frei. Bei nicht erreichbarem Seitenstatus wird eine Seite mit Wiederholungsoption und Admin-Zugang angezeigt.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
