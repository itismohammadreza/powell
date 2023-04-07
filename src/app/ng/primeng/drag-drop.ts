import {NgModule} from '@angular/core';
import {DragDropModule, Draggable, Droppable} from "primeng/dragdrop";

@NgModule({
  exports: [DragDropModule]
})
export class PrimeDragDropModule {
}

export const PrimeDraggable = Draggable;
export const PrimeDroppable = Droppable;
