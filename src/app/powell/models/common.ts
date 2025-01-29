import {$ButtonProps, $Preset} from "@powell/primeng";
import {NgButtonAppearance} from "@powell/models/button";

export type NgSeverity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warn'
  | 'help'
  | 'danger'
  | 'contrast';
export type NgDirection = 'rtl' | 'ltr';
export type NgSize = 'small' | 'large';
export type NgOrientation = 'horizontal' | 'vertical';
export type NgTableSelectionMode = 'single' | 'multiple';
export type NgTreeSelectionMode = Exclude<NgTableSelectionMode, 'radio'>;
export type NgTreeLoadingMode = 'mask' | 'icon';
export type NgStatusIcon = 'success' | 'info' | 'warning' | 'error' | '403' | '404' | '500';
export type NgEmptyIcon = 'box1' | 'box2' | 'magnifier';
export type NgPosition = 'left' | 'right' | 'top' | 'bottom';
export type NgCssObject = Partial<CSSStyleDeclaration>;
export type NgButtonProps = Omit<$ButtonProps, 'link' | 'outlined' | 'text' | 'plain'> & {
  appearance?: NgButtonAppearance;
  fluid?: boolean;
  responsiveSize?: NgButtonResponsiveSize;
};

export interface NgButtonResponsiveSize {
  xs: NgSize;
  sm: NgSize;
  md: NgSize;
  lg: NgSize;
  xl: NgSize;
}

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
