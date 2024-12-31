import {Component, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NgAddon, NgIconPosition, NgInputVariant, NgLabelPosition, NgSize} from '@powell/models';
import {AutoCompleteComponent, AutoCompleteModule} from "@powell/components/auto-complete";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";

@Component({
  selector: 'ng-auto-complete-page',
  templateUrl: './auto-complete.page.html',
  styleUrls: ['./auto-complete.page.scss'],
  imports: [
    AutoCompleteModule,
    PreviewComponent,
    ReactiveFormsModule,
  ]
})
export class AutoCompletePage extends PreviewBase {
  @ViewChild(AutoCompleteComponent, {static: true}) declare cmpRef: AutoCompleteComponent;

  override previewOptions: PreviewOption[] = [
    {field: '', value: ''},
  ];

  label: string = 'label';
  labelWidth: number = 100;
  hint: string = '';
  rtl: boolean = this.config.rtl;
  showRequiredStar: boolean = this.config.showRequiredStar;
  icon: string = '';
  labelPos: NgLabelPosition = this.config.labelPos;
  iconPos: NgIconPosition = 'left';
  addon: NgAddon;
  followConfig: boolean = this.config.followConfig;
  placeholder: string = '';
  readonly: boolean = false;
  disabled: boolean = false;
  maxlength: number = 100;
  size: NgSize = this.config.inputSize;
  unique: boolean = true;
  showClear: boolean = true;
  dropdown: boolean = false;
  multiple: boolean = false;
  emptyMessage: string = '';
  variant: NgInputVariant = this.config.inputStyle;

  filteredSuggestions: any[] = [];
  suggestions = [
    {name: 'Afghanistan', code: 'AF'},
    {name: 'Albania', code: 'AL'},
    {name: 'Algeria', code: 'DZ'},
    {name: 'American Samoa', code: 'AS'},
    {name: 'Andorra', code: 'AD'},
    {name: 'Angola', code: 'AO'},
    {name: 'Anguilla', code: 'AI'},
    {name: 'Antarctica', code: 'AQ'},
    {name: 'Antigua and Barbuda', code: 'AG'},
    {name: 'Argentina', code: 'AR'},
    {name: 'Armenia', code: 'AM'},
    {name: 'Aruba', code: 'AW'},
    {name: 'Australia', code: 'AU'},
    {name: 'Austria', code: 'AT'},
    {name: 'Azerbaijan', code: 'AZ'},
    {name: 'Bahamas', code: 'BS'},
    {name: 'Bahrain', code: 'BH'},
    {name: 'Bangladesh', code: 'BD'},
    {name: 'Barbados', code: 'BB'},
    {name: 'Belarus', code: 'BY'},
    {name: 'Belgium', code: 'BE'},
    {name: 'Belize', code: 'BZ'},
    {name: 'Benin', code: 'BJ'},
    {name: 'Bermuda', code: 'BM'},
    {name: 'Bhutan', code: 'BT'},
    {name: 'Bolivia', code: 'BO'},
    {name: 'Bosnia and Herzegovina', code: 'BA'},
    {name: 'Botswana', code: 'BW'},
    {name: 'Bouvet Island', code: 'BV'},
    {name: 'Brazil', code: 'BR'},
    {name: 'British Indian Ocean Territory', code: 'IO'},
    {name: 'Brunei Darussalam', code: 'BN'},
    {name: 'Bulgaria', code: 'BG'},
    {name: 'Burkina Faso', code: 'BF'},
    {name: 'Burundi', code: 'BI'},
    {name: 'Cambodia', code: 'KH'},
    {name: 'Cameroon', code: 'CM'},
    {name: 'Canada', code: 'CA'},
    {name: 'Cape Verde', code: 'CV'},
    {name: 'Cayman Islands', code: 'KY'},
    {name: 'Central African Republic', code: 'CF'},
    {name: 'Chad', code: 'TD'},
    {name: 'Chile', code: 'CL'},
    {name: 'China', code: 'CN'},
    {name: 'Christmas Island', code: 'CX'},
    {name: 'Cocos (Keeling) Islands', code: 'CC'},
    {name: 'Colombia', code: 'CO'},
    {name: 'Comoros', code: 'KM'},
    {name: 'Congo', code: 'CG'},
    {name: 'Congo, The Democratic Republic of the', code: 'CD'},
    {name: 'Cook Islands', code: 'CK'},
    {name: 'Costa Rica', code: 'CR'},
    {name: 'Cote DIvoire', code: 'CI'},
    {name: 'Croatia', code: 'HR'},
    {name: 'Cuba', code: 'CU'},
    {name: 'Cyprus', code: 'CY'},
    {name: 'Czech Republic', code: 'CZ'},
    {name: 'Denmark', code: 'DK'},
    {name: 'Djibouti', code: 'DJ'},
    {name: 'Dominica', code: 'DM'}
  ];

  filter(event) {
    const filtered: any[] = [];
    const query = event.query;
    for (const s of this.suggestions) {
      if (s.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(s);
      }
    }
    this.filteredSuggestions = filtered;
  }
}
