### Tips

- table filter on datepicker mode, value clears after select and close popup. also, what should be the cells actual
  value if we want to datepicker filter works properly?

### Feature
- 
- implement config change (and read from config) in dialog component
- remove extra styles for rtl (it supports built in). also in overlay.scss file.
- add [dir="rtl"] attribute instead of rtl class in components (and apply it using a directive)
- implement live theme changing
- fix bottomsheet fullscreen issue
- implement ifta label and input group base on new syntax (use this template):
<ng-container *ngIf="useFloatLabel">
  <p-floatLabel variant="in">
    <ng-container *ngTemplateOutlet="commonContent"></ng-container>
  </p-floatLabel>
</ng-container>

<ng-container *ngIf="!useFloatLabel">
  <ng-container *ngTemplateOutlet="commonContent"></ng-container>
</ng-container>

<ng-template #commonContent>
  <input pInputText id="in_label" [(ngModel)]="value1" autocomplete="off" />
  <label for="in_label">In Label</label>
</ng-template>
