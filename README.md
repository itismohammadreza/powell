### Tips

- table filter on datepicker mode, value clears after select and close popup. also, what should be the cells actual
  value if we want to datepicker filter works properly?

### Feature

- replace css colors with variables and make theme colors configurable
- move themes and style files inside powell directory
- create datepicker base that locale based on shamsi and gregorian datepicker and use it in gregorian.datepicker and jalali.datepicker components for managing error and label etc.
- implement config change (and read from config) in dialog component
- fix dialogForm autocomplete issue (prevent opening dialog)
- pass Inputs to components through ts file in dialogForm (by using ViewChild to each component and pass it's inputs from received config in afterViewInit cycle)
