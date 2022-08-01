import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
/*
  TODO:
- use custom sidebar instead of p-sidebar
- add size support to addOnDirective (when change input size, addon size also should be changed).
- and add disable state support for addon button when the input is disabled.
- remove extra styles in components if exist.
- add show/hide password feature to password component.
- add onLabel and offLabel for switch component.
- add async feature for switch component (just like button async).
- add hook support in dialog form config (just like angular formly to implement cascade mode).
- datepicker component has a 'moment' variable in 'select' function that conflict with 'moment' in import statement. check it!
- add whiteboard component.
- add knob component.
- in table component, add templateString and templateHTML support (that accept a function returns a string or htmlTemplate to render in cells)
  for example if we want display item.startDate+/+item.startMonth+/+item.startYear in a cell, we use templateString
  and if want to show item.ImageUrl we can use templateHtml like below:
  {
    templateString: (item)=>{ return item.startDate+/+item.startMonth+/+item.startYear}
  },
  {
    templateHtml: (item)=>{ return `<img src=${item.imageUrl} />`}
  }
  also implement shamsi-miladi date RENDERER + FILTER + EDITOR for table and grid.
- add ng-template support for table.
- add ng-template support for image slider.
- add preventDefault support for toast.
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private router: Router,
    private title: Title,
  ) {
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((e: any) => e instanceof ActivationStart))
      .subscribe((event: ActivatedRoute) => {
        const data = event.snapshot.data;
        this.title.setTitle(data['title']);
      });
  }
}
