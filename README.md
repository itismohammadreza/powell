# TODOs

---

### Tips

- table filter on datepicker mode, value clears after select and close popup. also, what should be the cells actual
  value if we want to datepicker filter works properly?
- check components label that WON't be 100px due to css flex issues (maybe good to change labelWidth to minWidth).

### Feature

- fix below issue:
  - 1- change sidebarType
  - 2- responsive until mobile view
  - 3- change size to desktop view
  - 4- the sidebarType is reset to its default value
- replace css colors with variables and make theme colors configurable
- fix AOS bug
- add bootstrap 5
- use gap instead of margin left and right
- ----------------------------------------------------
- add pinch-zoom component properties in dialogForm & showcase page.
- how should disableConfigChangeEffect use in overlay.service like toast etc...? 
- add ability to change showRequiredStart in run time

  handleLabelStar() {
  const addStarTo = (value: string) => {
  return value ? value.concat(' *') : '';
  }
  const removeStarFrom = (value: string) => {
  return value ? value.slice(0, -2) : '';
  }
  if (this.showRequiredStar && this.isRequired()) {
  this.label = addStarTo(this.label);
  this.placeholder = addStarTo(this.placeholder);
  } else {
  this.label = removeStarFrom(this.label);
  this.placeholder = removeStarFrom(this.placeholder);
  }
  this.cd.detectChanges();
  }

### New

- [ ] **whiteboard** - implement component.
