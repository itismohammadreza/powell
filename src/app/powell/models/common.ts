import {$ButtonProps} from "@powell/primeng";
import {ButtonAppearance} from "@powell/models";

export type Severity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warn'
  | 'help'
  | 'danger'
  | 'contrast';

export type Size = 'small' | 'large';
export type Orientation = 'horizontal' | 'vertical';
export type TableSelectionMode = 'single' | 'multiple';
export type TreeSelectionMode = Exclude<TableSelectionMode, 'radio'>;
export type TreeLoadingMode = 'mask' | 'icon';
export type EmptyIcon = 'box1' | 'box2' | 'magnifier';
export type Position = 'left' | 'right' | 'top' | 'bottom';
export type CssObject = Partial<CSSStyleDeclaration>;
export type ButtonProps = Omit<$ButtonProps, 'link' | 'outlined' | 'text' | 'plain'> & {
  appearance?: ButtonAppearance;
  fluid?: boolean;
  responsiveSize?: ButtonResponsiveSize;
};

export interface ButtonResponsiveSize {
  xs: Size;
  sm: Size;
  md: Size;
  lg: Size;
  xl: Size;
}
