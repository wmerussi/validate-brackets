# Validate Brackets Directive

Directive to validate if a string is an invalid bracket structure.

The reason it checks for "invalid", instead of a "valid" structure, is because validators will adapt better with an invalid value.

### How to import it in your project
Download the `validate-brackets.directive.ts` file and place it in your projects `directives` folder.
Import and declare it in your `app.module.ts`.

### Usage example
`<input validate-brackets (areBracketsInvalid)="isInvalid($event)" type="text">`
