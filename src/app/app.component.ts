import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, ActivationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

/*
  TODO:
01- use custom sidebar instead of p-sidebar.
02- add size support to addOnDirective (when change input size, addon size also should be changed).
03- add show/hide password feature to password component.
04- implement dual labeled switch component (label left and label right).
    take couple of objects like : [{label:'roshan',value:'on'},{label:'khamoosh',value:'off'}]
05- add onLabel and offLabel for switch and checkbox component.
06- add async feature for switch component (just like button async).
07- add hook support in dialog form config (just like angular formly to implement cascade mode).
08- datepicker component has a 'moment' variable in 'onSelect' function that is in conflict with 'moment' in import statement. check it!
09- add whiteboard component.
10- in table component, add templateString and templateHTML support (that accept a function returns a string or htmlTemplate to render in cells)
    for example if we want display item.startDate+/+item.startMonth+/+item.startYear in a cell, we use templateString
    and if want to show item.ImageUrl we can use templateHtml like below:
    {
      templateString: (item)=>{ return item.startDate+/+item.startMonth+/+item.startYear}
    },
    {
      templateHtml: (item)=>{ return `<img src=${item.imageUrl} />`}
    }
    also implement shamsi-miladi date RENDERER + FILTER + EDITOR for table.
11- add ng-template support for table. if user provide ng-template, use it. otherwise  use config renderer.
12- add preventDuplicate support for toast.
13- place hint in top of component instead of bottom.
14- use typescript utility-types (e.u Partial<..>) in components as need. for example in knob we can't have labelPos = 'float', but it can accept now!
    fix this by using utility-types and exclude 'float' in labelPos input property.
15- implement moment utility service.
16- implement ng-empty component just like AntDisign-NG-ZORRRO.
17- implement ng-status component just like AntDisign-NG-ZORRRO.
18- add specific class to hint and error and icon elements and edit .scss file.
19- add ability to set default value for sidebarLock and sidebarVisible
    (now even you set default value, it changed in the window resizeEvent and override). also body by default get a 'p-overflow-hidden' class. fix it!
20- in map: implement removeLastMarker & removeAllMarkers buttons. also add an @Input() multi:boolean to allow choose multiple marker.
21- see where wee need this piece of code (&.rtl { text-align: rtl }) and where is extra. remove extras.
22- multi checkbox: set disabled and readonly property for whole component. if set true, all options will disabled or readonly
23- add category to components structure. create overlay & forms folders and add relative components to them.
24- move main.component content to navbar component and implement it like drawer in angular material.
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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
