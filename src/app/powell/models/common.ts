export type NgColor =
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'help'
  | 'primary';
export type NgDirection = 'rtl' | 'ltr';
export type NgSize = 'sm' | 'md' | 'lg';
export type NgOrientation = 'horizontal' | 'vertical';
export type NgTableSelectionMode = 'single' | 'multiple' | 'checkbox' | 'radio';
export type NgTreeSelectionMode = Exclude<NgTableSelectionMode, 'radio'>;
export type NgStatusIcon = 'success' | 'info' | 'warning' | 'error' | '403' | '404' | '500';
export type NgEmptyIcon = 'box1' | 'box2' | 'magnifier';
export type NgPosition = 'left' | 'right' | 'top' | 'bottom';
export type NgIconPosition = Exclude<NgPosition, 'top' | 'bottom'>;
export type NgToastPosition =
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center'
    | 'center';
export type NgDialogPosition =
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'topleft'
    | 'topright'
    | 'bottomleft'
    | 'bottomright'
    | 'center';

export type NgCssObject = Partial<CSSStyleDeclaration>;
