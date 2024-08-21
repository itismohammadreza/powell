import {Checkbox, CheckboxChangeEvent, CheckboxModule, CheckboxTemplates} from "primeng/checkbox";

export {CheckboxModule as PrimeCheckboxModule};
export {Checkbox as PrimeCheckbox};
export {CheckboxTemplates as PrimeCheckboxTemplates};
export {CheckboxChangeEvent as PrimeCheckboxChangeEvent};
export type PrimeCheckboxGroupChangeEvent = {
  originalEvent: Event;
  value: any[];
}
