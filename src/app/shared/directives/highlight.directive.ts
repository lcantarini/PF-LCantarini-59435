import { Directive, ElementRef, input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {

color = 'yellow';

  constructor(private el: ElementRef<HTMLElement>) {
    
    this.el.nativeElement.style.backgroundColor = 'yellow';
   }

   ngOnChanges(changes: SimpleChanges): void {
     if (changes['color']){
      this.applyStyles()
     }
   }

   applyStyles(): void {
    this.el.nativeElement.style.backgroundColor = this.color;
   }

}
