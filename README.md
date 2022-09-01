# TODO

### Feature

- [x] **navbar** - add ability to set default value for `sidebarLock` and `sidebarVisible`. also store in localStorage.
- [ ] **dialogForm** - add hook support in config (just like angular formly to implement cascade mode).
- [ ] **toast** - fix preventDuplicate feature.
- [ ] **map** - implement `removeLastMarker` & `removeAllMarkers` buttons. also add an `@Input() multi: boolean` to allow
  choosing multiple marker.
- [ ] **all** - handle rtl direction in dropdowns panel (or etc.) when is appendTo body.
- [ ] **all** - use typescript utility-types (e.u `Exclude<..>`) in components as need. for example in `knob.component`
  we can't have `labelPos = 'float'`, but it can accept now!
  fix this by using utility-types and exclude 'float' in `labelPos` input property.

### New

- [ ] **dualLabelSwitch** - implement (`labelLeft` and `labelRight`). take a couple of objects like:
  ```
  [{label:'roshan',value:'on'}, {label:'khamoosh',value:'off'}]
  ```
- [ ] **asyncSwitch** - have loading just like `buttonAsync.component`.
- [ ] **datepicker** - implement. also, this component has a `moment` variable in `onSelect` function that is in conflict
  with `moment` in import statement. check it!
- [ ] **table** - implement `jalali` and `miladi` renderer, filter and editor.
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

- [ ] **empty** - implement component just like `AntDisign-NG-ZORRRO`.
- [ ] **status** - implement component just like `AntDisign-NG-ZORRRO`.
- [ ] **whiteboard** implement component.
- [ ] **tree** implement component.
- [ ] **treeSelect** implement component.
- [ ] **enableCachingPerApi** implement interceptor & config.
