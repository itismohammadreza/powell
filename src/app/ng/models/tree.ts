export type NgTreeFilterMode = 'strict' | 'lenient';
export class NgTree {
  label?: string;
  data?: any;
  icon?: any;
  expandedIcon?: any;
  collapsedIcon?: any;
  children?: NgTree[];
  leaf?: boolean;
  expanded?: boolean;
  type?: string;
  parent?: NgTree;
  partialSelected?: boolean;
  styleClass?: string;
  draggable?: boolean;
  droppable?: boolean;
  selectable?: boolean;
  key?: string;
}
