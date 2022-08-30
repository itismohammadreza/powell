# TODO

### Feature

- [ ] **navbar** - move `main.component` content to `navbar.component` and implement it like drawer in angular material.
- [ ] **navbar** - add ability to set default value for `sidebarLock` and `sidebarVisible`. also store in localStorage.
- [x] **switch** - add `onLabel` and `offLabel` inputs. by default both are equal.
- [x] **checkbox** - add `onLabel` and `offLabel` inputs. by default both are equal.
- [x] **multiCheckbox** - set disabled and readonly property for whole component. if set true, all options will be
  disabled or readonly.
- [x] **radio** - set disabled and readonly property for whole component. if set true, all options will be disabled or
  readonly.
- [ ] **dialogForm** - add hook support in config (just like angular formly to implement cascade mode).
- [ ] **toast** - fix preventDuplicate feature.
- [ ] **map** - implement `removeLastMarker` & `removeAllMarkers` buttons. also add an `@Input() multi: boolean` to allow
  choosing multiple marker.
- [ ] **all** - handle rtl direction in dropdowns panel (or etc.) when is appendTo body.
- [ ] **all** - fix error position absolute issue (overlap).
- [x] **all** - remove hint on showing error
- [x] **all** - add specific class to hint and error and icon elements and edit `.scss` file.
- [x] **all** - see where we need this snippet `&.rtl { text-align: rtl }` and where is extra. remove extras.
- [ ] **all** - use typescript utility-types (e.u `Partial<..>`) in components as need. for example in `knob.component`
  we can't have
  `labelPos = 'float'`, but it can accept now!
  fix this by using utility-types and exclude 'float' in `labelPos` input property.

### New

- [ ] **dualLabelSwitch** - implement (`labelLeft` and `labelRight`). take a couple of objects like:
  ```
  [{label:'roshan',value:'on'}, {label:'khamoosh',value:'off'}]
  ```
- [ ] **asyncSwitch** - have loading just like `buttonAsync.component`.
- [ ] **datepicker** - implement. also, this component has a `moment` variable in `onSelect` function that is in conflict
  with `moment` in import statement. check it!
- [x] **momentService**. implement moment utility service.
- [ ] **table** - implement `shamsi` and `miladi` renderer, filter and editor.
- [ ] **table** - add `templateString` and `templateHTML` support that accept a function returns a string or html template to
  render in cells. for example if we want display format like `item.date/item.month/item.year` in a cell, we use
  `templateString` and if want to show image url of item, we can use `templateHtml` like below:

  ```
  {
    templateString: (item) => `${item.startDate}/${item.startMonth}/${item.startYear}`
  },
  { 
    templateHtml: (item) => `<img src=${item.imageUrl} />`
  }
  ```

- [ ] **table** - add `ng-template` support. if user provide `ng-template`, use it. otherwise, use config renderer.
- [ ] **empty** - implement component just like `AntDisign-NG-ZORRRO`.
- [ ] **status** - implement component just like `AntDisign-NG-ZORRRO`.
- [ ] **whiteboard** implement component.
- [ ] **tree** implement component.
- [ ] **treeSelect** implement component.
- [ ] **avatar** implement component.
