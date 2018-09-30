import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

const bracketPairs = {
  '(': ')',
  '[': ']',
  '{': '}',
};
const openingBrackets = ['(', '[', '{'];
const notBracketsRegex = /[^(\{\[\(\)\]\}\)]/g;

@Directive({
  selector: '[validate-brackets]',
})
export class ValidateBracketsDirective {
  @Output() areBracketsInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener('keyup') onKeyup() { this.areBracketsInvalid.emit(this.areInvalid()); }

  constructor(private el: ElementRef) { }

  /**
   * Method to check if a string has an invalid bracket structure
   * It will ignore all other characters that are not brackets
   * Considered brackets: (, ), [, ], { or }
   * @param {string} value
   * @returns {boolean}
   */
  public areInvalid(): boolean {
    const value: string = this.el.nativeElement.value;
    if (!value) { return; }

    const brackets: string = value.replace(notBracketsRegex, '');

    const bracketHistory: Array<string> = [];

    /**
     * Checks if it's an opening bracket
     * If true, includes it in `bracketHistory`, returning true (a valid bracket)
     * If false, pop the last bracket in `bracketHistory` and return 'last opening bracket pair' !== 'closing bracket'
     * @param {string} bracket
     * @returns {boolean}
     */
    const invalidBracket = (bracket: string): boolean => openingBrackets.includes(bracket)
      ? !bracketHistory.push(bracket)
      : bracketPairs[bracketHistory.pop()] !== bracket;

    /** Checks if `brackets` structure is invalid and assign it to `invalidStructure` */
    const invalidStructure: boolean = brackets.split('').reduce((invalid, bracket) => invalid || invalidBracket(bracket), false);

    /** Checks if there are any unclosed brackets ans assign it to `unclosedBrackets` */
    const unclosedBrackets: boolean = bracketHistory.length > 0;

    return invalidStructure || unclosedBrackets;
  }
}
