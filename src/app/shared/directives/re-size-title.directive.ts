import { Directive, ElementRef, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appReSizeTitle]'
})
export class ReSizeTitleDirective implements OnInit {

  fontSize = '20px';

  constructor(private el: ElementRef<HTMLElement>) {
    console.log(this.el)
    this.applyStyles();
   }
  ngOnInit(): void {
    this.applyStyles();
  }

   applyStyles(): void {
    this.el.nativeElement.style.fontSize = this.fontSize;
   }

}