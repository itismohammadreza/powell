import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {$dt, $Preset} from '@powell/primeng/api';
import {$DrawerModule} from '@powell/primeng/drawer';
import {$TabsModule} from '@powell/primeng/tabs';
import {$DividerModule} from '@powell/primeng/divider';
import {$TagModule} from '@powell/primeng/tag';
import {$SkeletonModule} from '@powell/primeng/skeleton';
import {ConfigService, OverlayService, ThemeService} from "@powell/api";
import {SelectButtonModule} from "@powell/components/select-button";
import {ButtonModule} from "@powell/components/button";
import {$AccordionModule, $SelectChangeEvent} from "@powell/primeng";
import {FileUploadModule} from "primeng/fileupload";
import {NgPresetName} from "@powell/models";
import {globalConfig} from "@core/config";
import {SelectModule} from "@powell/components/select";
import {ToggleSwitchModule} from "@powell/components/toggle-switch";
import {TranslateModule} from "@ngx-translate/core";
import {lastValueFrom} from "rxjs";
import {TranslationService} from "@core/utils";
import {
  DesignerService,
  PrimitiveBorderRadiusComponent,
  PrimitiveColorsComponent,
  SemanticCommonFormFieldComponent,
  SemanticCommonGeneralComponent,
  SemanticCommonListComponent,
  SemanticCommonNavigationComponent,
  SemanticCommonOverlayComponent,
  SemanticCsComponent
} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-designer',
  standalone: true,
  imports: [
    CommonModule,
    SelectButtonModule,
    ButtonModule,
    FileUploadModule,
    $DrawerModule,
    $TabsModule,
    $DividerModule,
    $TagModule,
    $SkeletonModule,
    $AccordionModule,
    FormsModule,
    PrimitiveBorderRadiusComponent,
    PrimitiveColorsComponent,
    SemanticCommonGeneralComponent,
    SemanticCommonFormFieldComponent,
    SemanticCommonListComponent,
    SemanticCommonNavigationComponent,
    SemanticCommonOverlayComponent,
    SemanticCsComponent,
    SelectModule,
    ToggleSwitchModule,
    TranslateModule,
  ],
  template: `
    <p-tabs [(value)]="activeTab">
      <p-tablist>
        <p-tab value="0">Base</p-tab>
        <p-tab value="1">Primitive</p-tab>
        <p-tab value="2">Semantic</p-tab>
        <p-tab value="3">Custom</p-tab>
      </p-tablist>

      <p-tabpanels>
        @defer (when activeTab == '0') {
          <p-tabpanel value="0">
            <div class="mb-3 space-y-2">
              <div>Base Theme</div>
              <ng-select-button
                [ngModel]="selectedPreset"
                (ngModelChange)="onPresetChange($event)"
                [options]="presetOptions"
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
                    [style.backgroundColor]="primaryColor.name === 'noir' ? 'var(--text-color)' : primaryColor?.palette['500']"
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
                    [style.backgroundColor]="surface.name === 'noir' ? 'var(--text-color)' : surface?.palette['500']"
                  ></button>
                }
              </div>
            </div>

            <div class="grid gap-3 md:grid-cols-2">
              <ng-select
                [label]="'lang' | translate"
                labelPosition="float-in"
                [followConfig]="false"
                [fluid]="true"
                [value]="config.lang"
                [options]="[{label:'EN',value:'en'},{label:'FA',value:'fa'}]"
                (onChange)="changeLang($event)"/>
              <ng-select
                [label]="'selectiveSize' | translate"
                labelPosition="float-in"
                [followConfig]="false"
                [fluid]="true"
                [value]="config.powellConfig.inputSize"
                [options]="[{label:'sm',value:'sm'},{label:'md',value:'md'},{label:'lg',value:'lg'}]"
                (onChange)="changeGlobalConfig('inputSize',$event.value)"/>
              <ng-select
                [label]="'labelPosition' | translate"
                [followConfig]="false"
                labelPosition="float-in"
                [fluid]="true"
                [value]="config.powellConfig.labelPosition"
                [options]="[{label:'side',value:'side'},{label:'top',value:'top'},{label:'float',value:'float'}]"
                (onChange)="changeGlobalConfig('labelPosition',$event.value)"/>
              <ng-select
                [label]="'fixLabelPosition' | translate"
                labelPosition="float-in"
                [followConfig]="false"
                [fluid]="true"
                [value]="config.powellConfig.fixLabelPosition"
                [options]="[{label:'side',value:'side'},{label:'top',value:'top'}]"
                (onChange)="changeGlobalConfig('fixLabelPosition',$event.value)"/>
              <ng-select
                [label]="'inputStyle' | translate"
                labelPosition="float-in"
                [followConfig]="false"
                [fluid]="true"
                [value]="config.powellConfig.inputStyle"
                [options]="[{label:'outlined',value:'outlined'},{label:'filled',value:'filled'}]"
                (onChange)="changeGlobalConfig('inputStyle',$event.value)"/>
            </div>
            <div class="mt-3 space-y-3">
              <ng-toggle-switch
                [label]="'showRequiredStar' | translate"
                labelPosition="side"
                [labelWidth]="170"
                [followConfig]="false"
                [value]="config.powellConfig.showRequiredStar"
                (onChange)="changeGlobalConfig('showRequiredStar',$event.checked)"/>
              <ng-toggle-switch
                [label]="'ripple' | translate"
                labelPosition="side"
                [labelWidth]="170"
                [followConfig]="false"
                [value]="config.powellConfig.ripple"
                (onChange)="changeGlobalConfig('ripple',$event.checked)"/>
              <ng-toggle-switch
                [label]="'rtl' | translate"
                labelPosition="side"
                [labelWidth]="170"
                [followConfig]="false"
                [value]="config.rtl"
                (onChange)="changeGlobalConfig('rtl',$event.checked)"/>
            </div>
          </p-tabpanel>
        } @loading {
          <p-skeleton width="40%" styleClass="my-2"/>
          <p-skeleton width="100%" styleClass="my-2"/>
          <p-skeleton width="25%" styleClass="my-2"/>
          <p-skeleton width="100%" height="8rem" styleClass="mt-4"/>
          <p-skeleton width="100%" styleClass="my-4"/>
          <p-skeleton width="100%" height="8rem" styleClass="mt-4"/>
          <p-skeleton width="100%" styleClass="my-4"/>
          <p-skeleton width="100%" height="8rem" styleClass="mt-4"/>
        }
        @defer (when activeTab == '1') {
          <p-tabpanel value="1">
            <form (keydown)="onKeyDown($event)" class="flex flex-col gap-3">
              <ng-primitive-border-radius/>
              <ng-primitive-colors/>
            </form>
          </p-tabpanel>
        } @loading {
          <p-skeleton width="100%" height="15rem" styleClass="mt-4"/>
          <p-skeleton width="100%" height="15rem" styleClass="mt-4"/>
        }
        @defer (when activeTab == '2') {
          <p-tabpanel value="2">
            <p-accordion [value]="['0', '1']" [multiple]="true">
              <p-accordion-panel value="0">
                <p-accordion-header>Common</p-accordion-header>
                <p-accordion-content>
                  <div class="flex flex-col gap-3">
                    <form (keydown)="onKeyDown($event)" class="flex flex-col gap-3">
                      <ng-semantic-common-general/>
                      <ng-semantic-common-form-field/>
                      <ng-semantic-common-list/>
                      <ng-semantic-common-navigation/>
                      <ng-semantic-common-overlay/>
                    </form>
                  </div>
                </p-accordion-content>
              </p-accordion-panel>

              <p-accordion-panel value="1">
                <p-accordion-header>Color Scheme</p-accordion-header>
                <p-accordion-content>
                  <p-tabs value="cs-0">
                    <p-tablist>
                      <p-tab value="cs-0">Light</p-tab>
                      <p-tab value="cs-1">Dark</p-tab>
                    </p-tablist>
                    <p-tabpanels class="!px-0">
                      <p-tabpanel value="cs-0">
                        <form (keydown)="onKeyDown($event)">
                          <ng-semantic-cs [value]="designerService.preset().semantic.colorScheme.light"/>
                        </form>
                      </p-tabpanel>
                      <p-tabpanel value="cs-1">
                        <form (keydown)="onKeyDown($event)">
                          <ng-semantic-cs [value]="designerService.preset().semantic.colorScheme.dark"/>
                        </form>
                      </p-tabpanel>
                    </p-tabpanels>
                  </p-tabs>
                </p-accordion-content>
              </p-accordion-panel>
            </p-accordion>
          </p-tabpanel>
        } @loading {
          <p-skeleton width="100%" height="8rem" styleClass="mt-4"/>
          <p-skeleton width="100%" height="30rem" styleClass="mt-4"/>
        }
        @defer (when activeTab == '3') {
          <p-tabpanel value="3">
              <span class="leading-6 text-muted-color">Extend the theming system with your own design tokens e.g. <span
                class="font-medium">accent.color</span>. Do not use curly braces in the name field.</span>
            <ul class="flex flex-col gap-4 list-none p-0 mx-0 my-4">
              @for (token of customTokens; track token; let index = $index) {
                <li class="first:border-t border-b border-surface-200 dark:border-surface-300 py-2">
                  <div class="flex items-center gap-4">
                    <label class="flex items-center gap-2 flex-auto">
                      <span class="text-sm">Name</span>
                      <input [(ngModel)]="token['name']" type="text"
                             class="border border-surface-300 dark:border-surface-600 rounded-lg py-2 px-2 w-full"/>
                    </label>
                    <label class="flex items-center gap-2 flex-auto">
                      <span class="text-sm">Value</span>
                      <input [(ngModel)]="token['value']" type="text"
                             class="border border-surface-300 dark:border-surface-600 rounded-lg py-2 px-2 w-full"/>
                    </label>
                    <ng-button icon="pi pi-times" (click)="removeToken(index)"/>
                  </div>
                </li>
              }
            </ul>
            <div class="flex justify-between">
              <ng-button label="Add New" (click)="addToken()"/>
              @if (customTokens?.length) {
                <ng-button (click)="saveTokens()" label="Save"/>
              }
            </div>
          </p-tabpanel>
        } @loading {
          <p-skeleton width="100%" styleClass="mt-2"/>
          <p-skeleton width="10%" styleClass="mt-4"/>
          <p-skeleton width="6rem" height="2rem" styleClass="mt-6"/>
        }
      </p-tabpanels>
    </p-tabs>

    <ng-template #footer>
      <div class="flex justify-between gap-2">
        <ng-button label="Download" (click)="download()" icon="pi pi-download"/>
        @if (activeTab !== '0') {
          <ng-button label="Apply" (click)="apply()"/>
        }
      </div>
    </ng-template>
  `,
})
export class DesignerComponent implements OnInit {
  public designerService = inject(DesignerService);
  private overlayService = inject(OverlayService)
  private themeService = inject(ThemeService);
  private translationService = inject(TranslationService);
  private configService = inject(ConfigService);
  selectedPreset = this.themeService.currentPreset.name;
  preset = this.themeService.currentPreset.preset;
  customTokens = [];
  acTokens = [];
  activeTab = '0';
  presetOptions = Object.keys(this.themeService.presets).map(p => ({label: p, value: p}))
  config = globalConfig;
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
  selectedPrimaryColor: string = 'noir';
  selectedSurfaceColor: string;
  primaryColors: any[] = [
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

  getPresetExt(): $Preset<any> {
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

  ngOnInit() {
    this.generateACTokens(null, this.preset);
    this.replaceColorPalette();
    this.designerService.setPreset(this.preset);
    this.designerService.setAcTokens(this.acTokens);
  }

  apply() {
    this.saveTheme();
    this.designerService.preset.update((state) => ({...state, ...this.preset}));
  }

  saveTheme() {
    const localState = {
      themes: {
        defaultTheme: {
          name: this.selectedPreset,
          preset: this.preset,
          customTokens: this.customTokens
        }
      }
    };
  }

  onPresetChange(value: NgPresetName) {
    this.preset = this.themeService.presets[value];
    this.preset.semantic.primary = this.preset.primitive.emerald;
    this.preset.semantic.colorScheme.light.surface = {...{0: '#ffffff'}, ...this.preset.primitive.slate};
    this.preset.semantic.colorScheme.dark.surface = {...{0: '#ffffff'}, ...this.preset.primitive.zinc};
    this.selectedPreset = value;
    this.configService.update({theme: {name: value, preset: this.preset}})
    this.designerService.setPreset(this.preset);
  }

  generateACTokens(parentPath, obj) {
    for (let key in obj) {
      if (key === 'dark') {
        continue;
      }

      if (key === 'primitive' || key === 'semantic' || key === 'colorScheme' || key === 'light' || key === 'extend') {
        this.generateACTokens(null, obj[key]);
      } else {
        if (typeof obj[key] === 'object') {
          this.generateACTokens(parentPath ? parentPath + '.' + key : key, obj[key]);
        } else {
          const regex = /\.\d+$/;
          const tokenName = this.camelCaseToDotCase(parentPath ? parentPath + '.' + key : key);
          const tokenValue = $dt(tokenName).value;
          const isColor = tokenName.includes('color') || tokenName.includes('background') || regex.test(tokenName);
          this.acTokens.push({
            token: tokenName,
            label: '{' + tokenName + '}',
            variable: $dt(tokenName).variable,
            value: tokenValue,
            isColor: isColor
          });
          this.designerService.setAcTokens(this.acTokens);
        }
      }
    }
  }

  changeGlobalConfig(config: string, value: any) {
    this.config[config] = value;
    this.configService.update({[config]: value});
  }

  async changeLang(event: $SelectChangeEvent) {
    await lastValueFrom(this.translationService.use(event.value));
  }

  addToken() {
    this.customTokens = [...this.customTokens, ...[{}]];
  }

  removeToken(index) {
    this.customTokens.splice(index, 1);
  }

  saveTokens() {
    this.preset.extend = {};
    this.customTokens.forEach((token) => {
      this.preset.extend[this.transformTokenName(token.name)] = token.value;
    });
    this.refreshACTokens();
    this.saveTheme();
    this.overlayService.showToast({severity: 'success', summary: 'Success', detail: 'Tokens saved', life: 3000});
  }

  replaceColorPalette() {
    this.preset.semantic.primary = this.preset.primitive.emerald;
    this.preset.semantic.colorScheme.light.surface = {...{0: '#ffffff'}, ...this.preset.primitive.slate};
    this.preset.semantic.colorScheme.dark.surface = {...{0: '#ffffff'}, ...this.preset.primitive.zinc};
  }

  transformTokenName(name) {
    if (name && name.trim().length) {
      let tokenNameSections = name.split('.');
      let transformedName = '';
      tokenNameSections.forEach((section, index) => {
        transformedName += index === 0 ? section : section.charAt(0).toUpperCase() + section.substring(1);
      });
      return transformedName;
    } else {
      return name;
    }
  }

  camelCaseToDotCase(name) {
    return name.replace(/([a-z])([A-Z])/g, '$1.$2').toLowerCase();
  }

  refreshACTokens() {
    this.acTokens = [];
    this.generateACTokens(null, this.preset);
  }

  onKeyDown(event) {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      this.apply();
      event.preventDefault();
    }
  }

  download() {
    const basePreset = this.themeService.currentPreset.name;
    const theme = JSON.stringify(this.preset, null, 4).replace(/"([^"]+)":/g, '$1:');
    const textContent = `
        import { ApplicationConfig } from '@angular/core';
        import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
        import { providePrimeNG } from 'primeng/config';
        import ${basePreset} from "@primeng/themes/${basePreset.toLowerCase()}";
        import { definePreset } from "@primeng/themes";
        const MyPreset = definePreset(${basePreset}, ${theme});
        export const appConfig: ApplicationConfig = {
            providers: [
                provideAnimationsAsync(),
                providePrimeNG({
                    theme: {
                       preset: MyPreset,
                    }
                })
            ]
        };
    `;
    const blob = new Blob([textContent], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mytheme.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
