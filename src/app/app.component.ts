import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, ActivationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

/* TODO:
01- (feature) navbar: move main.component content to navbar component and implement it like drawer in angular material.
02- (feature) navbar: add ability to set default value for sidebarLock and sidebarVisible. also store in localStorage.
03- (feature) switch: add onLabel and offLabel inputs. by default both are equal.
04- (feature) checkbox: add onLabel and offLabel inputs. by default both are equal.
05- (feature) multiCheckbox: set disabled and readonly property for whole component. if set true, all options will disabled or readonly.
06- (feature) radio: set disabled and readonly property for whole component. if set true, all options will disabled or readonly.
07- (feature) dialogForm: add hook support in config (just like angular formly to implement cascade mode).
08- (feature) toast: fix preventDuplicate feature.
09- (feature) map: implement removeLastMarker & removeAllMarkers buttons. also add an @Input() multi:boolean to allow choose multiple marker.
10- (feature) ALL: place hint in top of component instead of bottom. also add question icon before it.
11- (feature) ALL: add specific class to hint and error and icon elements and edit .scss file.
12- (feature) ALL: see where we need this snippet (&.rtl { text-align: rtl }) and where is extra. remove extras.
13- (feature) ALL: categorize components folder structure. create overlay & forms folders and add relative components to them.
14- (feature) ALL: use typescript utility-types (e.u Partial<..>) in components as need.
    for example in knob we can't have labelPos = 'float', but it can accept now!
    fix this by using utility-types and exclude 'float' in labelPos input property.

15- (new) dualLabelSwitch: implement (label left and label right).
    take couple of objects like [{label:'roshan',value:'on'}, {label:'khamoosh',value:'off'}]
16- (new) asyncSwitch: have loading just like buttonAsync component.
17- (new) datepicker: implement. also this component has a 'moment' variable in 'onSelect' function that is in conflict with 'moment' in import statement. check it!
18- (new) momentService.
    (new) table: implement shamsi/miladi RENDERER + FILTER + EDITOR.
19- (new) table: add templateString and templateHTML support (that accept a function returns a string or htmlTemplate to render in cells)
    for example if we want display item.startDate+/+item.startMonth+/+item.startYear in a cell, we use templateString
    and if want to show item.ImageUrl we can use templateHtml like below:
    {
      templateString: (item)=>{ return item.startDate+/+item.startMonth+/+item.startYear}
    },
    {
      templateHtml: (item)=>{ return `<img src=${item.imageUrl} />`}
    }
20- (new) table: add ng-template support. if user provide ng-template, use it. otherwise use config renderer.
21- (new) empty: implement component just like AntDisign-NG-ZORRRO.
22- (new) status: implement component just like AntDisign-NG-ZORRRO.
23- (new) whiteboard component.

24- (check) DOMHandler service methods.
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
