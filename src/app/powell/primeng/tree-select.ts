import {
  TreeSelect,
  TreeSelectModule,
  TreeSelectNodeCollapseEvent,
  TreeSelectNodeExpandEvent,
  TreeSelectTemplates
} from "primeng/treeselect";
import {$TreeNode} from "@powell/primeng/api";

export {TreeSelectModule as $TreeSelectModule}
export {TreeSelect as $TreeSelect}
export {type TreeSelectTemplates as $TreeSelectTemplates}
export {type TreeSelectNodeCollapseEvent as $TreeSelectNodeCollapseEvent}
export {type TreeSelectNodeExpandEvent as $TreeSelectNodeExpandEvent}
export type $TreeSelectionChangeEvent = $TreeNode<SafeAny> | $TreeNode<SafeAny>[];
export type $TreeSelectFilterEvent = {
  originalEvent: Event;
  filteredValue: SafeAny;
}
