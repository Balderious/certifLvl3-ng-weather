import {Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appHightlightText]'
})
export class HightlightTextDirective implements OnChanges{
  @Input() highlightingClass: string;
  @Input() targetedCharacters: string;
  @Input() content: string;

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.content) {
      return;
    }

    if (!this.targetedCharacters || !this.targetedCharacters.length || !this.highlightingClass) {
      this.renderer.setProperty(this.element.nativeElement, 'innerHTML', this.content);
      return;
    }

    this.renderer.setProperty(
        this.element.nativeElement,
        'innerHTML',
        this.getHighlightingText()
    );
  }

  getHighlightingText() {
    const filterRe = new RegExp(`(${this.targetedCharacters})`, 'gi');
    return this.content.replace(filterRe, `<span class="${this.highlightingClass}">$1</span>`);
  }
}
