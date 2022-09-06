# TODO

### TIPS
- we just have two type of table renderer. text and image. other renderers will available in templateString and ng-template options.
- is it necessary to remove styles relative to having both (icon and dropdown) in autocomplete OR (icon and showIcon) in datepicker?
- table filter on datepicker mode, value clears after select and close popup. also, what should be the cells actual value if we want to datepicker filter works properly? 

### Feature

- [ ] **dialogForm** - add hook support in config (just like angular formly to implement cascade mode). set a valid type
  for labelPos in models.
- [ ] **dialog** - complete utils service.
- [ ] **map** - implement `removeLastMarker` & `removeAllMarkers` buttons. also add an `@Input() multi: boolean` to
  allow choosing multiple marker.
- [ ] **all** - handle rtl direction in dropdowns panel (or etc.) when is appendTo body.
- [ ] **inputNumber** - complete component.
- [ ] **async** - add an async @Input to button, switch, checkbox, dual-switch instead of implementing new component.
- [x] **utilsService** - break service to sub services. remove extras.

### New

- [ ] **empty** - implement component just like `AntDisign-NG-ZORRRO`.
- [ ] **status** - implement component just like `AntDisign-NG-ZORRRO`.
- [ ] **bottomSheet** - implement component.
- [ ] **tree** - implement component.
- [ ] **treeSelect** - implement component.
- [ ] **jalaliDatepicker** - implement component.
- [ ] **whiteboard** - implement component.
- [ ] **enableCachingPerApi** - implement interceptor & config.
- [ ] **animation** - add animation to routes.
- [ ] **table** 
- implement `jalali` and `miladi` filter. 
- add configurable caption elements (like title and global filter). plus, apply localMode in global filter also.
- add `templateString` and `templateHTML` support that accept a function returns a string or html template to render in cells.
  for example if we want display format like `item.date/item.month/item.year` in a cell, we use
  `templateString` and if want to show image url of item, we can use `templateHtml` like below:

  ```
  {
    templateString: (item) => `${item.startDate}/${item.startMonth}/${item.startYear}`
  },
  { 
    templateHtml: (item) => `<img src=${item.imageUrl} />`
  }
  ```
  
