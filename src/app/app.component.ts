import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, ActivationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

/*
  TODO:
01- use custom sidebar instead of p-sidebar.
02- add size support to addOnDirective (when change input size, addon size also should be changed).
03- and add disable state support for addon button when the input is disabled.
04- add show/hide password feature to password component.
05- implement dual labeled switch component (label left and label right).
    take couple of objects like : [{label:'roshan',value:'on'},{label:'khamoosh',value:'off'}]
06- add onLabel and offLabel for switch component.
07- add async feature for switch component (just like button async).
08- add hook support in dialog form config (just like angular formly to implement cascade mode).
09- datepicker component has a 'moment' variable in 'onSelect' function that is in conflict with 'moment' in import statement. check it!
10- add whiteboard component.
11- in table component, add templateString and templateHTML support (that accept a function returns a string or htmlTemplate to render in cells)
    for example if we want display item.startDate+/+item.startMonth+/+item.startYear in a cell, we use templateString
    and if want to show item.ImageUrl we can use templateHtml like below:
    {
      templateString: (item)=>{ return item.startDate+/+item.startMonth+/+item.startYear}
    },
    {
      templateHtml: (item)=>{ return `<img src=${item.imageUrl} />`}
    }
    also implement shamsi-miladi date RENDERER + FILTER + EDITOR for table.
12- add ng-template support for table.
13- add preventDuplicate support for toast.
14- place hint in top of component instead of bottom.
17- use typescript utility-types (e.u Partial<..>) in components as need. for example in knob we can't have labelPos = 'float', but it can accept now!
    fix this by using utility-types and exclude 'float' in labelPos input property.
18- implement moment utility service.
19- implement ng-devider component just like AntDisign-NG-ZORRRO.
20- implement ng-empty component just like AntDisign-NG-ZORRRO.
21- implement ng-status component just like AntDisign-NG-ZORRRO.
22- check showClear functionality that may forget to add, and also check showClear when icon is provided.
23- add specific class to hint and error and icon elements and edit .scss file.
24- add ability to set default value for sidebarLock and sidebarVisible
    (now even you set default value, it changed in the window resizeEvent and override). also body by default get a 'p-overflow-hidden' class. fix it!
25- in map: implement removeLastMarker & removeAllMarkers buttons. also add an @Input() multi:boolean to allow choose multiple marker.
26- see where wee need this piece of code (&.rtl { text-align: rtl }) and where is extra. remove extras.
27- multi checkbox: set disabled and readonly property for whole component. if set true, all options will disabled or readonly
28- add category to components structure. create overlay & forms folders and add relative components to them.
29- this.onModelChange(this.value) is NOT safe. replace this.value with value get from event.
30- move main.component content to navbar component and implement it like drawer in angular material.
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
