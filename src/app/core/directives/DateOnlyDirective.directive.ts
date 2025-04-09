import { Directive, ElementRef, Host, HostListener } from '@angular/core';

@Directive({
  selector: '[appDateOnlyDirective]',
  standalone: true
})
export class DateOnlyDirectiveDirective {

  constructor(private el:ElementRef) { }

  @HostListener("input",['$event'])
  onInputChange(){
    let current: string = this.el.nativeElement.value;
    let next: string = current.replace(/\D/g,'').substring(0,8);
    if(next.length >= 5)
      next = next.substring(0,2) + '/' + next.substring(2,4) + "/" + next.substring(4);

    else if(next.length >=3 )
      next = next.substring(0,2) + "/" + next.substring(2);

    this.el.nativeElement.value = next;
  }
}
