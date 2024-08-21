import {
  TreeSelect,
  TreeSelectModule,
  TreeSelectNodeCollapseEvent,
  TreeSelectNodeExpandEvent,
  TreeSelectTemplates
} from "primeng/treeselect";
import {PrimeTreeNode} from "@powell/primeng/api";

export {TreeSelectModule as PrimeTreeSelectModule};
export {TreeSelect as PrimeTreeSelect};
export {TreeSelectTemplates as PrimeTreeSelectTemplates};
export {TreeSelectNodeCollapseEvent as PrimeTreeSelectNodeCollapseEvent};
export {TreeSelectNodeExpandEvent as PrimeTreeSelectNodeExpandEvent};
export type PrimeTreeSelectionChangeEvent = PrimeTreeNode<any> | PrimeTreeNode<any>[];
export type PrimeTreeSelectFilterEvent = {
  originalEvent: Event;
  filteredValue: any;
}
