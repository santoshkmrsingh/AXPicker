import { Directive, ElementRef, Renderer, HostListener } from '@angular/core';

/**
 * Generated class for the AutoTabDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 * we can use ElementRef to change appearance. 
 * To listen event we can use @HostListener() decorator. 
 * To behave our directive like structural directive, we can use TemplateRef and ViewContainerRef.
 */

@Directive({
  selector: '[auto-tab]', // Attribute selector  
})

export class AutoTabDirective {  

  @HostListener('keyup', ['$event']) onKeyDown(e) {
    console.log(e.keyCode);
    var elem, evt = e ? e:event;
    if (evt.srcElement)  elem = evt.srcElement;
    else if (evt.target) elem = evt.target;
    
    
    if ((e.which == 13 || e.keyCode == 13)) {
      e.preventDefault();
      let control:any;
      let textBoxes = document.getElementsByTagName("input");
    
      for (var index = 0; index < textBoxes.length; ++index) {        
        control = textBoxes[index];
        if ( control == elem )
        {          
          index = index >= ( textBoxes.length -1 ) ? 0: ++index;
          control = textBoxes[index];
          control.focus();
          break;
        }
      }
                      
    }
  }

  constructor(public element: ElementRef, public renderer: Renderer) {
    console.log('Hello AutoTabDirective Directive');
  }

  
}
