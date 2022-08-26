import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, ActivationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

/* TODO:
01- (feature) navbar: move main.component content to navbar component and implement it like drawer in angular material.
02- (feature) switch: add onLabel and offLabel inputs. by default both are equal.
03- (feature) checkbox: add onLabel and offLabel inputs. by default both are equal.
04- (feature) dialogForm: add hook support in config (just like angular formly to implement cascade mode).
05- (feature) toast: fix preventDuplicate feature.
06- (feature) navbar: add ability to set default value for sidebarLock and sidebarVisible. also store in localStorage.
07- (feature) map: implement removeLastMarker & removeAllMarkers buttons. also add an @Input() multi:boolean to allow choose multiple marker.
08- (feature) multiCheckbox: set disabled and readonly property for whole component. if set true, all options will disabled or readonly.
09- (feature) ALL: place hint in top of component instead of bottom.
10- (feature) ALL: add specific class to hint and error and icon elements and edit .scss file.
11- (feature) ALL: see where we need this piece of code (&.rtl { text-align: rtl }) and where is extra. remove extras.
12- (feature) ALL: categorize components folder structure. create overlay & forms folders and add relative components to them.
13- (feature) ALL: use typescript utility-types (e.u Partial<..>) in components as need.
    for example in knob we can't have labelPos = 'float', but it can accept now!
    fix this by using utility-types and exclude 'float' in labelPos input property.

14- (new) dualLabelSwitch: implement (label left and label right).
    take couple of objects like [{label:'roshan',value:'on'}, {label:'khamoosh',value:'off'}]
15- (new) asyncSwitch: have loading just like buttonAsync component.
16- (new) datepicker: implement. also this component has a 'moment' variable in 'onSelect' function that is in conflict with 'moment' in import statement. check it!
17- (new) momentService.
    (new) table: implement shamsi/miladi RENDERER + FILTER + EDITOR.
18- (new) table: add templateString and templateHTML support (that accept a function returns a string or htmlTemplate to render in cells)
    for example if we want display item.startDate+/+item.startMonth+/+item.startYear in a cell, we use templateString
    and if want to show item.ImageUrl we can use templateHtml like below:
    {
      templateString: (item)=>{ return item.startDate+/+item.startMonth+/+item.startYear}
    },
    {
      templateHtml: (item)=>{ return `<img src=${item.imageUrl} />`}
    }
19- (new) table: add ng-template support. if user provide ng-template, use it. otherwise  use config renderer.
20- (new) empty: implement component just like AntDisign-NG-ZORRRO.
21- (new) status: implement component just like AntDisign-NG-ZORRRO.
22- (new) whiteboard component.
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
