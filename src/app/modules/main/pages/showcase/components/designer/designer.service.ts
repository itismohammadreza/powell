import {Injectable, signal} from '@angular/core';
import {$Preset} from "@powell/primeng";

@Injectable({
  providedIn: 'root'
})
export class DesignerService {
  preset = signal<$Preset<any>>({primitive: null, semantic: null});
  acTokens = signal([]);

  setPreset(preset: $Preset<any>) {
    this.preset.set(preset);
  }

  setAcTokens(token: any[]) {
    this.acTokens.set(token);
  }
}
