export type NgDirection = 'rtl' | 'ltr';
export type NgSize = 'sm' | 'md' | 'lg';
export type NgOrientation = 'horizontal' | 'vertical';
export type NgSelectionMode = 'single' | 'multiple' | 'checkbox' | 'radio';
export type NgPosition = 'left' | 'right' | 'top' | 'bottom';
export type NgIconPosition = Exclude<NgPosition, 'top' | 'bottom'>;
export type NgStatus = 'success' | 'info' | 'warning' | 'error' | '403' | '404' | '500';
export type NgEmptyIcon = 'box1' | 'box2' | 'magnifier';
export type NgPlace =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center'
  | 'center';
