import {NgModule} from '@angular/core';
import {Terminal, TerminalModule} from "primeng/terminal";

@NgModule({
  exports: [TerminalModule]
})
export class PrimeTerminalModule {
}

export const PrimeTerminal = Terminal;
export type PrimeTerminal = Terminal;
