import {NgModule} from '@angular/core';
import {Accordion, AccordionModule, AccordionTab} from "primeng/accordion";

@NgModule({
  exports: [AccordionModule]
})
export class PrimeAccordionModule {
}

export const PrimeAccordion = Accordion;
export const PrimeAccordionTab = AccordionTab;
