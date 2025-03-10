### Feature

- implement label as template in form elements
- change
  <ng-template [pTemplate]="t.type">
    <ng-container *ngTemplateOutlet="templateMap[t.type]"/>
  </ng-template>
  to this
  <ng-template [pTemplate]="t.type" [ngTemplateOutlet]="templateMap[t.type]"/>
