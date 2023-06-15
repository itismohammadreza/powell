import {Component} from '@angular/core';
import {NgSize, NgTableActionsConfig, NgTableColDef} from '@powell/models';
import {DataService} from "@core/http";
import {ConfigService} from "@powell/api";

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
  styleUrls: ['./table.page.scss'],
})
export class TablePage {
  rtl: boolean = this.configService.getConfig().rtl;
  size: NgSize = 'md';
  header: string = 'Customers';
  disableConfigChangeEffect: boolean = this.configService.getConfig().disableConfigChangeEffect;
  gridlines: boolean = true;
  striped: boolean = false;
  simpleCustomers = [
    {
      "id": 1000,
      "name": "James Butt",
      "country": {
        "name": "Algeria",
        "code": "dz"
      },
      "company": "Benton, John B Jr",
      "date": "2015-09-13",
      "status": "unqualified",
      "verified": true,
      "activity": 17,
      "representative": {
        "name": "Ioni Bowcher",
        "image": "ionibowcher.png"
      },
      "balance": 70663,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1001,
      "name": "Josephine Darakjy",
      "country": {
        "name": "Egypt",
        "code": "eg"
      },
      "company": "Chanay, Jeffrey A Esq",
      "date": "2019-02-09",
      "status": "proposal",
      "verified": true,
      "activity": 0,
      "representative": {
        "name": "Amy Elsner",
        "image": "amyelsner.png"
      },
      "balance": 82429,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1002,
      "name": "Art Venere",
      "country": {
        "name": "Panama",
        "code": "pa"
      },
      "company": "Chemel, James L Cpa",
      "date": "2017-05-13",
      "status": "qualified",
      "verified": false,
      "activity": 63,
      "representative": {
        "name": "Asiya Javayant",
        "image": "asiyajavayant.png"
      },
      "balance": 28334,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1003,
      "name": "Lenna Paprocki",
      "country": {
        "name": "Slovenia",
        "code": "si"
      },
      "company": "Feltz Printing Service",
      "date": "2020-09-15",
      "status": "new",
      "verified": false,
      "activity": 37,
      "representative": {
        "name": "Xuxue Feng",
        "image": "xuxuefeng.png"
      },
      "balance": 88521,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1004,
      "name": "Donette Foller",
      "country": {
        "name": "South Africa",
        "code": "za"
      },
      "company": "Printing Dimensions",
      "date": "2016-05-20",
      "status": "proposal",
      "verified": true,
      "activity": 33,
      "representative": {
        "name": "Asiya Javayant",
        "image": "asiyajavayant.png"
      },
      "balance": 93905,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1005,
      "name": "Simona Morasca",
      "country": {
        "name": "Egypt",
        "code": "eg"
      },
      "company": "Chapman, Ross E Esq",
      "date": "2018-02-16",
      "status": "qualified",
      "verified": false,
      "activity": 68,
      "representative": {
        "name": "Ivan Magalhaes",
        "image": "ivanmagalhaes.png"
      },
      "balance": 50041,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1006,
      "name": "Mitsue Tollner",
      "country": {
        "name": "Paraguay",
        "code": "py"
      },
      "company": "Morlong Associates",
      "date": "2018-02-19",
      "status": "renewal",
      "verified": true,
      "activity": 54,
      "representative": {
        "name": "Ivan Magalhaes",
        "image": "ivanmagalhaes.png"
      },
      "balance": 58706,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
  ]
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
      render: {
        as: (item) => {
          return 'Render By Function :' + item.country.name
        }
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
  ]
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
      render: {
        as: (item) => {
          return 'Render By Function :' + item.country.name
        }
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
        type: 'gregorian-datepicker',
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
        type: 'dropdown',
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
        return item.status == 'proposal' ? 'bg-danger' : 'bg-warning'
      }
    },
    {
      header: 'activity',
      field: 'activity',
      render: {as: 'ng-template'},
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
      render: {as: 'image'},
      sort: false,
    },
    {
      header: 'bool',
      field: 'bool',
      sort: true,
      filter: {type: 'boolean'},
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
        color: 'info',
        onClick: (item) => {
          alert(`Info : ${item.name}`)
        }
      }
    ]
  }
  selectedCustomers: any[];
  totalRecords: number;
  selectAll: boolean = false;
  customers: Customer[];

  constructor(private userService: DataService, private configService: ConfigService) {
  }

  onRowSelect(event: any) {
  }

  rowSelectable(data, index) {
    return data.index == 0 || data.index == 1;
  }

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
      this.userService.getCustomers({lazyEvent: JSON.stringify(filters)}).then(res => {
        this.customers = res.customers;
        this.totalRecords = res.totalRecords;
        loadingCallback()
      })
    }, 1000);
  }

  onSelectionChange(value = []) {
    this.selectAll = value.length === this.totalRecords;
    this.selectedCustomers = value;
  }

  onSelectAllChange(event) {
    const checked = event.checked;

    if (checked) {
      this.userService.getCustomers().then(res => {
        this.selectedCustomers = res.customers;
        this.selectAll = true;
      });
    } else {
      this.selectedCustomers = [];
      this.selectAll = false;
    }
  }
}
