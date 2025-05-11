import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ConfigService, ThemeService} from "@powell/api";
import {SelectButtonModule} from "@powell/components/select-button";
import {ButtonModule} from "@powell/components/button";
import {$SelectChangeEvent} from "@powell/primeng";
import {NgPresetName} from "@powell/models";
import {globalConfig} from "@core/config";
import {SelectModule} from "@powell/components/select";
import {ToggleSwitchModule} from "@powell/components/toggle-switch";
import {TranslateModule} from "@ngx-translate/core";
import {lastValueFrom} from "rxjs";
import {TranslationService} from "@core/utils";

@Component({
  selector: 'ng-designer',
  standalone: true,
  imports: [
    SelectButtonModule,
    ButtonModule,
    FormsModule,
    SelectModule,
    ToggleSwitchModule,
    TranslateModule,
  ],
  template: `
    <div class="mb-4 space-y-2">
      <div>Base Theme</div>
      <ng-select-button
        [ngModel]="config.powellConfig.theme.name"
        (ngModelChange)="changePreset($event)"
        [options]="presets"
        optionLabel="label"
        optionValue="value"
        [allowEmpty]="false"/>
    </div>
    <div class="mb-4 space-y-2">
      <div>Primary</div>
      <div class="flex justify-start gap-2 flex-wrap">
        @for (primaryColor of primaryColors; track primaryColor.name) {
          <button
            class="size-5 rounded-full [outline-style:solid] outline-transparent outline-2 outline-offset-1"
            type="button"
            [title]="primaryColor.name"
            (click)="updateColors($event, 'primary', primaryColor)"
            [class.!outline-black]="primaryColor.name === selectedPrimaryColor"
            [style.backgroundColor]="primaryColor.name === 'noir' ? 'var(--p-text-color)' : primaryColor?.palette['500']"
          ></button>
        }
      </div>
    </div>
    <div class="mb-4 space-y-2">
      <div>Surface</div>
      <div class="flex justify-start gap-2 flex-wrap">
        @for (surface of surfaces; track surface.name) {
          <button
            class="size-5 rounded-full [outline-style:solid] outline-transparent outline-2 outline-offset-1"
            type="button"
            [title]="surface.name"
            (click)="updateColors($event, 'surface', surface)"
            [class.!outline-black]="selectedSurfaceColor ? selectedSurfaceColor === surface.name : config.powellConfig.theme.mode === 'dark' ? surface.name === 'zinc' : surface.name === 'slate'"
            [style.backgroundColor]="surface.name === 'noir' ? 'var(--p-text-color)' : surface?.palette['500']"
          ></button>
        }
      </div>
    </div>
    <div class="mb-4 grid gap-3 md:grid-cols-2">
      <ng-select
        [label]="'lang' | translate"
        [fluid]="true"
        [value]="config.lang"
        [options]="[{label:'EN',value:'en'},{label:'FA',value:'fa'}]"
        (onChange)="changeLang($event)"/>
      <ng-select
        [label]="'mode' | translate"
        [fluid]="true"
        [value]="config.powellConfig.theme.mode"
        [options]="[{label:'dark',value:'dark'},{label:'light',value:'light'},{label:'system',value:'system'}]"
        (onChange)="changeGlobalConfig('theme',{mode:$event.value})"/>
      <ng-select
        [label]="'fixLabelPosition' | translate"
        [fluid]="true"
        [value]="config.powellConfig.fixLabelPosition"
        [options]="[{label:'side',value:'side'},{label:'top',value:'top'}]"
        (onChange)="changeGlobalConfig('fixLabelPosition',$event.value)"/>
      <ng-select
        [label]="'labelPosition' | translate"
        [fluid]="true"
        [value]="config.powellConfig.labelPosition"
        [options]="[{label:'side',value:'side'},{label:'top',value:'top'},{label:'ifta',value:'ifta'},{label:'float-in',value:'float-in'},{label:'float-on',value:'float-on'},{label:'float-over',value:'float-over'}]"
        (onChange)="changeGlobalConfig('labelPosition',$event.value)"/>
      <ng-select
        [label]="'size' | translate"
        [fluid]="true"
        [value]="config.powellConfig.inputSize ?? 'medium'"
        [options]="[{label:'small',value:'small'},{label:'medium',value:'medium'},{label:'large',value:'large'}]"
        (onChange)="changeGlobalConfig('size',$event.value)"/>
      <ng-select
        [label]="'inputStyle' | translate"
        [fluid]="true"
        [value]="config.powellConfig.inputStyle"
        [options]="[{label:'outlined',value:'outlined'},{label:'filled',value:'filled'}]"
        (onChange)="changeGlobalConfig('inputStyle',$event.value)"/>
    </div>
    <div class="space-y-3">
      <ng-toggle-switch
        [label]="'showRequiredStar' | translate"
        labelPosition="side"
        [labelWidth]="170"
        [value]="config.powellConfig.showRequiredStar"
        (onChange)="changeGlobalConfig('showRequiredStar',$event.checked)"/>
      <ng-toggle-switch
        [label]="'ripple' | translate"
        labelPosition="side"
        [labelWidth]="170"
        [value]="config.powellConfig.ripple"
        (onChange)="changeGlobalConfig('ripple',$event.checked)"/>
      <ng-toggle-switch
        [label]="'rtl' | translate"
        labelPosition="side"
        [labelWidth]="170"
        [value]="config.rtl"
        (onChange)="changeGlobalConfig('rtl',$event.checked)"/>
    </div>
  `,
})
export class DesignerComponent {
  private themeService = inject(ThemeService);
  private translationService = inject(TranslationService);
  private configService = inject(ConfigService);

  config = globalConfig;
  presets = Object.keys(this.themeService.presets).map(p => ({label: p, value: p}))
  surfaces = [
    {
      name: 'slate',
      palette: {
        0: '#ffffff',
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#020617'
      }
    },
    {
      name: 'gray',
      palette: {
        0: '#ffffff',
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
        950: '#030712'
      }
    },
    {
      name: 'zinc',
      palette: {
        0: '#ffffff',
        50: '#fafafa',
        100: '#f4f4f5',
        200: '#e4e4e7',
        300: '#d4d4d8',
        400: '#a1a1aa',
        500: '#71717a',
        600: '#52525b',
        700: '#3f3f46',
        800: '#27272a',
        900: '#18181b',
        950: '#09090b'
      }
    },
    {
      name: 'neutral',
      palette: {
        0: '#ffffff',
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#e5e5e5',
        300: '#d4d4d4',
        400: '#a3a3a3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
        950: '#0a0a0a'
      }
    },
    {
      name: 'stone',
      palette: {
        0: '#ffffff',
        50: '#fafaf9',
        100: '#f5f5f4',
        200: '#e7e5e4',
        300: '#d6d3d1',
        400: '#a8a29e',
        500: '#78716c',
        600: '#57534e',
        700: '#44403c',
        800: '#292524',
        900: '#1c1917',
        950: '#0c0a09'
      }
    },
    {
      name: 'soho',
      palette: {
        0: '#ffffff',
        50: '#ececec',
        100: '#dedfdf',
        200: '#c4c4c6',
        300: '#adaeb0',
        400: '#97979b',
        500: '#7f8084',
        600: '#6a6b70',
        700: '#55565b',
        800: '#3f4046',
        900: '#2c2c34',
        950: '#16161d'
      }
    },
    {
      name: 'viva',
      palette: {
        0: '#ffffff',
        50: '#f3f3f3',
        100: '#e7e7e8',
        200: '#cfd0d0',
        300: '#b7b8b9',
        400: '#9fa1a1',
        500: '#87898a',
        600: '#6e7173',
        700: '#565a5b',
        800: '#3e4244',
        900: '#262b2c',
        950: '#0e1315'
      }
    },
    {
      name: 'ocean',
      palette: {
        0: '#ffffff',
        50: '#fbfcfc',
        100: '#F7F9F8',
        200: '#EFF3F2',
        300: '#DADEDD',
        400: '#B1B7B6',
        500: '#828787',
        600: '#5F7274',
        700: '#415B61',
        800: '#29444E',
        900: '#183240',
        950: '#0c1920'
      }
    }
  ];
  primaryColors = [
    {name: 'noir', palette: {}},
    {name: 'amber', palette: this.themeService.currentPreset.preset.primitive['amber']},
    {name: 'blue', palette: this.themeService.currentPreset.preset.primitive['blue']},
    {name: 'cyan', palette: this.themeService.currentPreset.preset.primitive['cyan']},
    {name: 'emerald', palette: this.themeService.currentPreset.preset.primitive['emerald']},
    {name: 'fuchsia', palette: this.themeService.currentPreset.preset.primitive['fuchsia']},
    {name: 'green', palette: this.themeService.currentPreset.preset.primitive['green']},
    {name: 'indigo', palette: this.themeService.currentPreset.preset.primitive['indigo']},
    {name: 'lime', palette: this.themeService.currentPreset.preset.primitive['lime']},
    {name: 'orange', palette: this.themeService.currentPreset.preset.primitive['orange']},
    {name: 'pink', palette: this.themeService.currentPreset.preset.primitive['pink']},
    {name: 'purple', palette: this.themeService.currentPreset.preset.primitive['purple']},
    {name: 'rose', palette: this.themeService.currentPreset.preset.primitive['rose']},
    {name: 'sky', palette: this.themeService.currentPreset.preset.primitive['sky']},
    {name: 'teal', palette: this.themeService.currentPreset.preset.primitive['teal']},
    {name: 'violet', palette: this.themeService.currentPreset.preset.primitive['violet']},
    {name: 'yellow', palette: this.themeService.currentPreset.preset.primitive['yellow']},
  ];
  selectedPrimaryColor: string;
  selectedSurfaceColor: string;

  getPresetExt() {
    const color = this.primaryColors.find((c) => c.name === this.selectedPrimaryColor);
    if (color.name === 'noir') {
      return {
        semantic: {
          primary: {
            50: '{surface.50}',
            100: '{surface.100}',
            200: '{surface.200}',
            300: '{surface.300}',
            400: '{surface.400}',
            500: '{surface.500}',
            600: '{surface.600}',
            700: '{surface.700}',
            800: '{surface.800}',
            900: '{surface.900}',
            950: '{surface.950}'
          },
          colorScheme: {
            light: {
              primary: {
                color: '{primary.950}',
                contrastColor: '#ffffff',
                hoverColor: '{primary.800}',
                activeColor: '{primary.700}'
              },
              highlight: {
                background: '{primary.950}',
                focusBackground: '{primary.700}',
                color: '#ffffff',
                focusColor: '#ffffff'
              }
            },
            dark: {
              primary: {
                color: '{primary.50}',
                contrastColor: '{primary.950}',
                hoverColor: '{primary.200}',
                activeColor: '{primary.300}'
              },
              highlight: {
                background: '{primary.50}',
                focusBackground: '{primary.300}',
                color: '{primary.950}',
                focusColor: '{primary.950}'
              }
            }
          }
        }
      };
    } else {
      if (this.themeService.currentPreset.name === 'Nora') {
        return {
          semantic: {
            primary: color.palette,
            colorScheme: {
              light: {
                primary: {
                  color: '{primary.600}',
                  contrastColor: '#ffffff',
                  hoverColor: '{primary.700}',
                  activeColor: '{primary.800}'
                },
                highlight: {
                  background: '{primary.600}',
                  focusBackground: '{primary.700}',
                  color: '#ffffff',
                  focusColor: '#ffffff'
                }
              },
              dark: {
                primary: {
                  color: '{primary.500}',
                  contrastColor: '{surface.900}',
                  hoverColor: '{primary.400}',
                  activeColor: '{primary.300}'
                },
                highlight: {
                  background: '{primary.500}',
                  focusBackground: '{primary.400}',
                  color: '{surface.900}',
                  focusColor: '{surface.900}'
                }
              }
            }
          }
        };
      } else if (this.themeService.currentPreset.name === 'Material') {
        return {
          semantic: {
            primary: color.palette,
            colorScheme: {
              light: {
                primary: {
                  color: '{primary.500}',
                  contrastColor: '#ffffff',
                  hoverColor: '{primary.400}',
                  activeColor: '{primary.300}'
                },
                highlight: {
                  background: 'color-mix(in srgb, {primary.color}, transparent 88%)',
                  focusBackground: 'color-mix(in srgb, {primary.color}, transparent 76%)',
                  color: '{primary.700}',
                  focusColor: '{primary.800}'
                }
              },
              dark: {
                primary: {
                  color: '{primary.400}',
                  contrastColor: '{surface.900}',
                  hoverColor: '{primary.300}',
                  activeColor: '{primary.200}'
                },
                highlight: {
                  background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
                  focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
                  color: 'rgba(255,255,255,.87)',
                  focusColor: 'rgba(255,255,255,.87)'
                }
              }
            }
          }
        };
      } else {
        return {
          semantic: {
            primary: color.palette,
            colorScheme: {
              light: {
                primary: {
                  color: '{primary.500}',
                  contrastColor: '#ffffff',
                  hoverColor: '{primary.600}',
                  activeColor: '{primary.700}'
                },
                highlight: {
                  background: '{primary.50}',
                  focusBackground: '{primary.100}',
                  color: '{primary.700}',
                  focusColor: '{primary.800}'
                }
              },
              dark: {
                primary: {
                  color: '{primary.400}',
                  contrastColor: '{surface.900}',
                  hoverColor: '{primary.300}',
                  activeColor: '{primary.200}'
                },
                highlight: {
                  background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
                  focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
                  color: 'rgba(255,255,255,.87)',
                  focusColor: 'rgba(255,255,255,.87)'
                }
              }
            }
          }
        };
      }
    }
  }

  updateColors(event: any, type: string, color: any) {
    if (type === 'primary') {
      this.selectedPrimaryColor = color.name;
    } else if (type === 'surface') {
      this.selectedSurfaceColor = color.name;
    }
    if (type === 'primary') {
      this.configService.update({theme: {preset: this.getPresetExt()}})
    } else if (type === 'surface') {
      this.themeService.updateSurfacePalette(color.palette);
    }
    event.stopPropagation();
  }

  changePreset(value: NgPresetName) {
    this.configService.update({theme: {name: value}});
    this.selectedPrimaryColor = null;
    this.selectedSurfaceColor = null;
  }

  changeGlobalConfig(config: string, value: any) {
    this.config[config] = value;
    this.configService.update({[config]: value});
  }

  async changeLang(event: $SelectChangeEvent) {
    await lastValueFrom(this.translationService.use(event.value));
  }
}
