import {
  TreeSelect,
  TreeSelectModule,
  TreeSelectNodeCollapseEvent,
  TreeSelectNodeExpandEvent,
  TreeSelectTemplates
} from "primeng/treeselect";
import {$TreeNode} from "@powell/primeng/api";

export {TreeSelectModule as $TreeSelectModule};
export {TreeSelect as $TreeSelect};
export {TreeSelectTemplates as $TreeSelectTemplates};
export {TreeSelectNodeCollapseEvent as $TreeSelectNodeCollapseEvent};
export {TreeSelectNodeExpandEvent as $TreeSelectNodeExpandEvent};
export type $TreeSelectionChangeEvent = $TreeNode<any> | $TreeNode<any>[];
export type $TreeSelectFilterEvent = {
  originalEvent: Event;
  filteredValue: any;
}
