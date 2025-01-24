import {Component, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DesignerService} from './designerservice';
import {FormsModule} from '@angular/forms';
import {$dt} from '@powell/primeng/api';
import {DesignBorderRadius} from './primitive/designborderradius';
import {DesignColors} from './primitive/designcolors';
import {DesignGeneral} from './semantic/designgeneral';
import {DesignFormField} from './semantic/designformfield';
import {DesignList} from './semantic/designlist';
import {DesignNavigation} from './semantic/designnavigation';
import {DesignOverlay} from './semantic/designoverlay';
import {DesignCS} from './semantic/colorscheme/designcs';
import {AppConfiguratorComponent} from "@modules/main/pages/showcase/components/designer/app.configurator.component";
import {$DrawerModule} from '@powell/primeng/drawer';
import {$TabsModule} from '@powell/primeng/tabs';
import {$DividerModule} from '@powell/primeng/divider';
import {$TagModule} from '@powell/primeng/tag';
import {$SkeletonModule} from '@powell/primeng/skeleton';
import {ConfigService, OverlayService, ThemeService} from "@powell/api";
import {SelectButtonModule} from "@powell/components/select-button";
import {ButtonModule} from "@powell/components/button";
import {$AccordionModule} from "@powell/primeng";
import {FileUploadModule} from "primeng/fileupload";
import {NgPresetName} from "@powell/models";

@Component({
  selector: 'app-designer',
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
    DesignBorderRadius,
    DesignColors,
    DesignGeneral,
    DesignFormField,
    DesignList,
    DesignNavigation,
    DesignOverlay,
    DesignCS,
    AppConfiguratorComponent,
  ],
  template: `
    <p-drawer [(visible)]="showDesigner"
              header="Theme Designer"
              position="right"
              styleClass="designer !w-screen md:!w-[48rem]"
              [modal]="false"
              [dismissible]="true">
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
              <app-configurator/>
              <div class="text-lg font-semibold mb-2">Choose a Theme to Get Started</div>
              <span class="block text-muted-color leading-6 mb-4">Begin by selecting a built-in theme as a foundation, continue editing your current theme, or import a Figma tokens file.</span>
              <div class="flex flex-col">
                <div class="flex flex-col gap-4 border border-surface-200 dark:border-surface-700 rounded-md p-4">
                  <span class="font-semibold">Base Theme</span>
                  <span class="text-muted-color">Variety of built-in themes with distinct characteristics.</span>
                  <ng-select-button
                    [ngModel]="selectedPreset"
                    (ngModelChange)="onPresetChange($event)"
                    [options]="presetOptions"
                    optionLabel="label"
                    optionValue="value"
                    [allowEmpty]="false"/>
                </div>
                <p-divider>OR</p-divider>
                <div
                  class="flex flex-col gap-4 border border-surface-200 dark:border-surface-700 rounded-md p-4 items-start">
                  <span class="font-semibold">Load Theme</span>
                  <span class="text-muted-color">Continue editing the theme files stored locally.</span>
                  <ng-button
                    label="Restore from local storage"
                    severity="secondary"
                    (click)="loadFromLocalStorage()"/>
                </div>
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
              <div class="flex flex-col gap-3">
                <form (keydown)="onKeyDown($event)" class="flex flex-col gap-3">
                  <design-border-radius/>
                  <design-colors/>
                </form>
              </div>
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
                        <design-general/>
                        <design-form-field/>
                        <design-list/>
                        <design-navigation/>
                        <design-overlay/>
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
                            <design-cs [value]="designerService.preset().semantic.colorScheme.light"/>
                          </form>
                        </p-tabpanel>
                        <p-tabpanel value="cs-1">
                          <form (keydown)="onKeyDown($event)">
                            <design-cs [value]="designerService.preset().semantic.colorScheme.dark"/>
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
    </p-drawer>
  `,
})
export class AppDesignerComponent implements OnInit {
  @Input() showDesigner: boolean;

  public designerService = inject(DesignerService);
  private overlayService = inject(OverlayService)
  private themeService = inject(ThemeService);
  configService = inject(ConfigService);
  selectedPreset = this.themeService.currentPreset.name;
  preset = this.themeService.currentPreset.preset;
  customTokens = [];
  acTokens = [];
  activeTab = '0';
  presetOptions = Object.keys(this.themeService.presets).map(p => ({label: p, value: p}))

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
    localStorage.setItem('primeng-designer-theme', JSON.stringify(localState));
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

  loadFromLocalStorage() {
    const localState = localStorage.getItem('primeng-designer-theme');
    if (localState) {
      const parsedLocalState = JSON.parse(localState);
      if (parsedLocalState?.themes?.defaultTheme) {
        const defaultTheme = parsedLocalState.themes.defaultTheme;
        if (defaultTheme.preset) {
          this.preset = defaultTheme.preset;
          const mergedPreset = {
            ...this.preset,
            components: {...this.themeService.presets[defaultTheme.name].components}
          };
          this.configService.update({theme: {preset: mergedPreset}});
        }
        if (defaultTheme.customTokens) {
          this.customTokens = defaultTheme.customTokens;
          this.refreshACTokens();
        }
        this.overlayService.showToast({
          severity: 'success',
          summary: 'Success',
          detail: 'Theme loaded to Designer',
          life: 3000
        });
      }
    }
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
