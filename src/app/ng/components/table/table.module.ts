import {NgModule} from "@angular/core";
import {TableModule as PTableModule} from 'primeng/table';
import {CommonModule} from "@angular/common";
import {ConfigHandlerModule} from "@ng/directives/config-handler";
import {TableComponent} from "@ng/components/table";

@NgModule({
  declarations: [TableComponent],
  imports: [PTableModule, ConfigHandlerModule, CommonModule],
  exports: [TableComponent]
})
export class TableModule {
}
