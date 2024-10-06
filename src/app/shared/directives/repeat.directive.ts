import { Directive, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRepeat]'
})
export class RepeatDirective implements OnChanges {

  @Input()
  appRepeat: number = 1;

  constructor(private viewContainer: ViewContainerRef) {
    private viewContainer: ViewContainerRef;
    private template: TemplateRef<HTMLElement>;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appRepeat']){

    }
  }

  repeat(): void {
    this.viewContainer.clear();
    for (let i = 0; i < this.appRepeat; i++){
      this.viewContainer.createEmbeddedView(this.template);
    }
  }

}
