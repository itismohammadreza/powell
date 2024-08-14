# Powell

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.4.

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

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

### Tips

- table filter on datepicker mode, value clears after select and close popup. also, what should be the cells actual
  value if we want to datepicker filter works properly?

### Feature

- replace css colors with variables and make theme colors configurable
- move themes and style files inside powell directory

- remove filled property and replace with inputStyle (in global config) and variant (in per component)
- create datepicker base that locale based on shamsi and gregorian datepicker and use it in gregorian.datepicker and jalali.datepicker components for managing error and label etc.
- add rtl to bottomSheet and handle header
- implement config change (and read from config) in dialog component
- update navbar (handle backdrop visibility with modal property, like react-powell)
- remove toPromise() methods
- add tailwindcss
