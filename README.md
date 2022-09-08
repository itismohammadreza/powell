# TODO

### TIPS
- search for TODO comments in project.
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
- [ ] **async** - add an async @Input to button, switch, checkbox, dual-switch instead of creating new component.

### New

- [ ] **bottomSheet** - implement component.
- [ ] **jalaliDatepicker** - implement component.
- [ ] **whiteboard** - implement component.
- [ ] **table** 
- implement `jalali` and `miladi` filter. 
- add configurable caption elements (like title and global filter). plus, apply localMode in global filter also.
- implement actions and functions to render + switch action
- check that let- variables on ng-templates are setting properly. some is missed or some is wrong.
- implement empty message if user not provided
- implement default table header (include a title) if user not provided
- implement grid lines or other style classes configurations
