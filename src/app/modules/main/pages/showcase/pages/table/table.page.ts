import {Component, inject, ViewChild} from '@angular/core';
import {NgTableActionsConfig, NgTableColDef} from '@powell/models';
import {DataService} from "@core/http";
import {TableComponent, TableModule} from "@powell/components/table";
import {PreviewBase, PreviewComponent, PreviewOption} from "@modules/main/pages/showcase/components";
import {$TableSelectAllChangeEvent} from "@powell/primeng";

interface Customer {
  id: any,
  name: string,
  country: any,
  company: string,
  date: string,
  status: string,
  verified: boolean,
  activity: number,
  representative: any,
  balance: number,
  image: string,
  bool: boolean,
}

@Component({
  selector: 'ng-table-page',
  templateUrl: './table.page.html',
  imports: [
    TableModule,
    PreviewComponent
  ]
})
export class TablePage extends PreviewBase {
  @ViewChild(TableComponent) declare cmpRef: TableComponent;

  private dataService = inject(DataService);

  override previewOptions: PreviewOption[] = [
    {field: 'rtl', value: this.config.rtl},
    {field: 'size', selectOptions: 'sizes', value: 'large'},
    {field: 'followConfig', value: this.config.followConfig},
    {field: 'gridlines', value: true},
    {field: 'striped', value: false},
  ];

  simpleCustomers = this.dataService.getData().slice(0, 5)
  simpleColDef: NgTableColDef<Customer>[] = [
    {
      header: 'name',
      field: 'name',
      sort: true,
      filter: {
        type: 'slider',
        range: true,
        rowFilterShowMenu: true
      },
    },
    {
      header: 'country',
      field: 'country.name',
      sort: true,
      render: (item) => {
        return 'Render By Function :' + item.country.name
      },
      filter: {
        type: 'text',
      },
    },
    {
      header: 'representative',
      field: 'representative.name',
      sort: true,
      filter: {
        type: 'multi-select',
        options: [
          {name: 'Amy Elsner', image: 'amyelsner.png'},
          {name: 'Anna Fali', image: 'annafali.png'},
          {name: 'Asiya Javayant', image: 'asiyajavayant.png'},
          {name: 'Bernardo Dominic', image: 'bernardodominic.png'},
          {name: 'Elwin Sharvill', image: 'elwinsharvill.png'},
          {name: 'Ioni Bowcher', image: 'ionibowcher.png'},
          {name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png'},
          {name: 'Onyama Limba', image: 'onyamalimba.png'},
          {name: 'Stephen Shaw', image: 'stephenshaw.png'},
          {name: 'XuXue Feng', image: 'xuxuefeng.png'},
        ],
        placeholder: 'any',
        optionLabel: 'name',
        optionValue: 'name',
      },
    },
    {
      header: 'date',
      field: 'date',
      sort: true,
      filter: {
        type: 'datepicker',
      },
    },
    {
      header: 'balance',
      field: 'balance',
      sort: true,
      filter: {
        type: 'text',
      },
    },
    {
      header: 'status',
      field: 'status',
      sort: true,
      filter: {
        type: 'select',
        options: [
          {label: 'Unqualified', value: 'unqualified'},
          {label: 'Qualified', value: 'qualified'},
          {label: 'New', value: 'new'},
          {label: 'Negotiation', value: 'negotiation'},
          {label: 'Renewal', value: 'renewal'},
          {label: 'Proposal', value: 'proposal'},
        ]
      },
      cellStyleClass: (item) => {
        return item.status == 'proposal' ? 'bg-green-300' : 'bg-rose-300'
      }
    },
    {
      header: 'activity',
      field: 'activity',
      render: 'ng-template',
      sort: true,
      filter: {
        type: 'slider',
        range: true,
        matchMode: 'in',
        min: 0,
        max: 100,
      },
    },
    {
      header: 'image',
      field: 'image',
      sort: false,
    },
    {
      header: 'bool',
      field: 'bool',
      sort: true,
      filter: {type: 'boolean'},
    },
  ];

  lazyCustomers: Customer[];
  lazyColDef: NgTableColDef<Customer>[] = [
    {
      header: 'name',
      field: 'name',
      sort: true,
      filter: {
        type: 'slider',
        range: true,
        rowFilterShowMenu: true
      },
    },
    {
      header: 'country',
      field: 'country.name',
      sort: true,
      render: (item) => {
        return 'Render By Function :' + item.country.name
      },
      filter: {
        type: 'text',
      },
    },
    {
      header: 'company',
      field: 'company',
      sort: true,
      filter: {
        type: 'slider',
        range: true,
        rowFilterShowMenu: true
      },
    },
    {
      header: 'representative',
      field: 'representative.name',
      sort: true,
      filter: {
        type: 'multi-select',
        options: [
          {name: 'Amy Elsner', image: 'amyelsner.png'},
          {name: 'Anna Fali', image: 'annafali.png'},
          {name: 'Asiya Javayant', image: 'asiyajavayant.png'},
          {name: 'Bernardo Dominic', image: 'bernardodominic.png'},
          {name: 'Elwin Sharvill', image: 'elwinsharvill.png'},
          {name: 'Ioni Bowcher', image: 'ionibowcher.png'},
          {name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png'},
          {name: 'Onyama Limba', image: 'onyamalimba.png'},
          {name: 'Stephen Shaw', image: 'stephenshaw.png'},
          {name: 'XuXue Feng', image: 'xuxuefeng.png'},
        ],
        placeholder: 'any',
        optionLabel: 'name',
        optionValue: 'name',
      },
    },
  ]

  paginationCustomers = this.dataService.getData()
  paginatorColDef: NgTableColDef<Customer>[] = [
    {
      header: 'name',
      field: 'name',
    },
    {
      header: 'country',
      field: 'country.name',
    },
    {
      header: 'company',
      field: 'company',
    },
    {
      header: 'representative',
      field: 'representative.name',
    },
  ];
  actionsConfig: NgTableActionsConfig<Customer> = {
    inSameColumn: false,
    header: 'actions',
    actions: [
      {
        header: 'edit',
        icon: 'pi pi-pencil',
        onClick: (item) => {
          alert(`Edit : ${item.name}`)
        }
      },
      {
        header: 'info',
        icon: 'pi pi-info',
        severity: 'info',
        onClick: (item) => {
          alert(`Info : ${item.name}`)
        }
      }
    ]
  }
  totalRecords: number;
  selectAll: boolean = null;
  selectedCustomers: any[];

  loadCustomers({event, loadingCallback}) {
    const filters = {
      first: event.first,
      rows: event.rows,
      sortOrder: event.sortOrder,
      filters: {
        name: {value: event.filters.name?.value || null, matchMode: 'startsWith'},
        country: {value: event.filters.country?.value || null, matchMode: 'startsWith'},
        company: {value: event.filters.company?.value || null, matchMode: 'startsWith'},
        representative: {value: event.filters.representative?.value || null, matchMode: 'in'}
      },
      globalFilter: event.globalFilter
    }
    setTimeout(() => {
      this.dataService.getCustomers({lazyEvent: JSON.stringify(filters)}).then(res => {
        this.lazyCustomers = res.customers;
        this.totalRecords = res.totalRecords;
        loadingCallback()
      })
    }, 1000);
  }

  onSelectionChange(value = []) {
    this.selectAll = value.length === this.totalRecords;
    this.selectedCustomers = value;
  }

  onSelectAllChange(event: $TableSelectAllChangeEvent) {
    const checked = event.checked;
    if (checked) {
      this.dataService.getCustomers().then(res => {
        this.selectedCustomers = res.customers;
        this.selectAll = true;
      });
    } else {
      this.selectedCustomers = [];
      this.selectAll = false;
    }
  }
}
