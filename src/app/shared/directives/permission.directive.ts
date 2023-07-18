import {Directive, Input, TemplateRef, ViewContainerRef,} from '@angular/core';

@Directive({
  selector: '[ngPermission]',
})
export class PermissionDirective {
  @Input() set hasPermission(val: string[]) {
    this.permissions = val;
    this.updateView();
  }

  @Input() set hasPermissionOp(val: 'AND' | 'OR') {
    this.logicalOp = val;
    this.updateView();
  }

  currentUser: any;
  permissions: string[] = [];
  logicalOp: 'AND' | 'OR' = 'AND';
  isHidden: boolean = true;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {
  }

  updateView() {
    if (this.checkPermission()) {
      if (this.isHidden) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainer.clear();
    }
  }

  checkPermission() {
    let hasPermission = false;
    if (this.currentUser && this.currentUser.permissions) {
      for (const checkPermission of this.permissions) {
        const permissionFound = this.currentUser.permissions.find(
          (x) => x.toUpperCase() === checkPermission.toUpperCase()
        );

        if (permissionFound) {
          hasPermission = true;

          if (this.logicalOp === 'OR') {
            break;
          }
        } else {
          hasPermission = false;
          if (this.logicalOp === 'AND') {
            break;
          }
        }
      }
    }

    return hasPermission;
  }
}

/*
Usage Sample :
  <strong>AND concatenation:</strong>
  <div *hasPermission="['can_write', 'can_read']">
    Only users with can_write AND can_read can see this.
  </div>

  <strong>OR concatenation:</strong>
  <div *hasPermission="['can_write', 'can_read']; op 'OR'">
    Only users with can_write OR can_read can see this.
  </div>
*/


/*
Mode 2 for this directive :
  ngOnInit() {
    if (this.authService.hasPermission(this.ngPermission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  Usage Sample :
  sapose current user role is 'user' and this section is visible just for admins :
  <div *ngPermission="'Admin'">
  </div>

  and user with role 'user' cant see this div.
*/
