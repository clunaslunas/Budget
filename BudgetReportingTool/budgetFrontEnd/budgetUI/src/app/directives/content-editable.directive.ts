import { 
          Directive, 
          ElementRef, 
          Input, 
          HostListener, 
          Output, 
          EventEmitter, 
          OnChanges } from '@angular/core';


@Directive({
  selector: '[appContentEditable]',
  host: {
    '(click)': 'onClick()'
  }
})

export class ContentEditableDirective{
  //@Input('editMyContent') button;

  constructor(private el: ElementRef) { }


  onClick() {
    console.log("We made it!");
    
  }

  private edit(editable: string) {
    
    this.el.nativeElement.contenteditable = editable;
  }

  private refreshView() {
	
	}

}
