# TODO

### TIPS

- search for TODO comments in project.
- table filter on datepicker mode, value clears after select and close popup. also, what should be the cells actual
  value if we want to datepicker filter works properly?

### Feature

- [ ] **all** - handle rtl direction in panels when append them to body. from component take a querySelector to panel and add a class to it.
- [ ] **all** - manage addon.
- [ ] **async** - add an async @Input to button, switch, checkbox, dual-switch instead of creating new component.
  `<p-progressSpinner [style]="{width: '30px', height: '30px'}"></p-progressSpinner>`
- [ ] **dialogForm**
- add hook support in config (just like angular formly to implement cascade mode).

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

### PRIMENG ISSUES

- paneStyleClass does not exist in all components that have panel. such cascadeSelect.
- worst documentation I have ever seen. 
