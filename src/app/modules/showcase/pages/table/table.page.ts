import {Component, OnInit} from '@angular/core';
import {NgColDef} from '@ng/models/table';
import {LanguageChecker} from '@core/utils';
import {MenuItem} from 'primeng/api';

export interface Country {
  name?: string;
  code?: string;
}

export interface Representative {
  name?: string;
  image?: string;
}

export interface Customer {
  id?: number;
  name?: string;
  country?: Country;
  company?: string;
  date?: any;
  status?: string;
  activity: any;
  representative?: Representative;
  image?: string;
  bool?: boolean;
}

@Component({
  selector: 'ng-table-page',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})
export class TablePage {
  representatives: Representative[] = [
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
  ];
  statuses: any[] = [
    {label: 'Unqualified', value: 'unqualified'},
    {label: 'Qualified', value: 'qualified'},
    {label: 'New', value: 'new'},
    {label: 'Negotiation', value: 'negotiation'},
    {label: 'Renewal', value: 'renewal'},
    {label: 'Proposal', value: 'proposal'},
  ];
  contextMenu: MenuItem[] = [
    {
      label: 'View',
      icon: 'pi pi-fw pi-search',
      command: (item) => {
      },
    },
  ];
  customers: Customer[] = [
    {
      id: 1000,
      name: 'James Butt',
      country: {
        name: 'Algeria',
        code: 'dz',
      },
      company: 'Benton, John B Jr',
      date: new Date('01-01-2020'),
      status: 'unqualified',
      activity: 17,
      representative: {
        name: 'Ioni Bowcher',
        image: 'ionibowcher.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: false,
    },
    {
      id: 1001,
      name: 'Josephine Darakjy',
      country: {
        name: 'Egypt',
        code: 'eg',
      },
      company: 'Chanay, Jeffrey A Esq',
      date: new Date('09-13-2015'),
      status: 'proposal',
      activity: 0,
      representative: {
        name: 'Amy Elsner',
        image: 'amyelsner.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1002,
      name: 'Art Venere',
      country: {
        name: 'Panama',
        code: 'pa',
      },
      company: 'Chemel, James L Cpa',
      date: new Date('09-13-2015'),
      status: 'qualified',
      activity: 63,
      representative: {
        name: 'Asiya Javayant',
        image: 'asiyajavayant.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1003,
      name: 'Lenna Paprocki',
      country: {
        name: 'Slovenia',
        code: 'si',
      },
      company: 'Feltz Printing Service',
      date: new Date('09-13-2015'),
      status: 'new',
      activity: 37,
      representative: {
        name: 'Xuxue Feng',
        image: 'xuxuefeng.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1004,
      name: 'Donette Foller',
      country: {
        name: 'South Africa',
        code: 'za',
      },
      company: 'Printing Dimensions',
      date: new Date('09-13-2015'),
      status: 'proposal',
      activity: 33,
      representative: {
        name: 'Asiya Javayant',
        image: 'asiyajavayant.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1005,
      name: 'Simona Morasca',
      country: {
        name: 'Egypt',
        code: 'eg',
      },
      company: 'Chapman, Ross E Esq',
      date: new Date('09-13-2015'),
      status: 'qualified',
      activity: 68,
      representative: {
        name: 'Ivan Magalhaes',
        image: 'ivanmagalhaes.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1006,
      name: 'Mitsue Tollner',
      country: {
        name: 'Paraguay',
        code: 'py',
      },
      company: 'Morlong Associates',
      date: new Date('09-13-2015'),
      status: 'renewal',
      activity: 54,
      representative: {
        name: 'Ivan Magalhaes',
        image: 'ivanmagalhaes.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1007,
      name: 'Leota Dilliard',
      country: {
        name: 'Serbia',
        code: 'rs',
      },
      company: 'Commercial Press',
      date: new Date('09-13-2015'),
      status: 'renewal',
      activity: 69,
      representative: {
        name: 'Onyama Limba',
        image: 'onyamalimba.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1008,
      name: 'Sage Wieser',
      country: {
        name: 'Egypt',
        code: 'eg',
      },
      company: 'Truhlar And Truhlar Attys',
      date: new Date('09-13-2015'),
      status: 'unqualified',
      activity: 76,
      representative: {
        name: 'Ivan Magalhaes',
        image: 'ivanmagalhaes.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1009,
      name: 'Kris Marrier',
      country: {
        name: 'Mexico',
        code: 'mx',
      },
      company: 'King, Christopher A Esq',
      date: new Date('09-13-2015'),
      status: 'proposal',
      activity: 3,
      representative: {
        name: 'Onyama Limba',
        image: 'onyamalimba.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1010,
      name: 'Minna Amigon',
      country: {
        name: 'Romania',
        code: 'ro',
      },
      company: 'Dorl, James J Esq',
      date: new Date('09-13-2015'),
      status: 'qualified',
      activity: 38,
      representative: {
        name: 'Anna Fali',
        image: 'annafali.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1011,
      name: 'Abel Maclead',
      country: {
        name: 'Singapore',
        code: 'sg',
      },
      company: 'Rangoni Of Florence',
      date: new Date('09-13-2015'),
      status: 'qualified',
      activity: 87,
      representative: {
        name: 'Bernardo Dominic',
        image: 'bernardodominic.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1012,
      name: 'Kiley Caldarera',
      country: {
        name: 'Serbia',
        code: 'rs',
      },
      company: 'Feiner Bros',
      date: new Date('09-13-2015'),
      status: 'unqualified',
      activity: 80,
      representative: {
        name: 'Onyama Limba',
        image: 'onyamalimba.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1013,
      name: 'Graciela Ruta',
      country: {
        name: 'Chile',
        code: 'cl',
      },
      company: 'Buckley Miller \u0026 Wright',
      date: new Date('09-13-2015'),
      status: 'negotiation',
      activity: 59,
      representative: {
        name: 'Amy Elsner',
        image: 'amyelsner.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1014,
      name: 'Cammy Albares',
      country: {
        name: 'Philippines',
        code: 'ph',
      },
      company: 'Rousseaux, Michael Esq',
      date: new Date('09-13-2015'),
      status: 'new',
      activity: 90,
      representative: {
        name: 'Asiya Javayant',
        image: 'asiyajavayant.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1015,
      name: 'Mattie Poquette',
      country: {
        name: 'Venezuela',
        code: 've',
      },
      company: 'Century Communications',
      date: new Date('09-13-2015'),
      status: 'negotiation',
      activity: 52,
      representative: {
        name: 'Anna Fali',
        image: 'annafali.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1016,
      name: 'Meaghan Garufi',
      country: {
        name: 'Malaysia',
        code: 'my',
      },
      company: 'Bolton, Wilbur Esq',
      date: new Date('09-13-2015'),
      status: 'unqualified',
      activity: 31,
      representative: {
        name: 'Ivan Magalhaes',
        image: 'ivanmagalhaes.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1017,
      name: 'Gladys Rim',
      country: {
        name: 'Netherlands',
        code: 'nl',
      },
      company: 'T M Byxbee Company Pc',
      date: new Date('09-13-2015'),
      status: 'renewal',
      activity: 48,
      representative: {
        name: 'Stephen Shaw',
        image: 'stephenshaw.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1018,
      name: 'Yuki Whobrey',
      country: {
        name: 'Israel',
        code: 'il',
      },
      company: 'Farmers Insurance Group',
      date: new Date('09-13-2015'),
      status: 'negotiation',
      activity: 16,
      representative: {
        name: 'Bernardo Dominic',
        image: 'bernardodominic.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1019,
      name: 'Fletcher Flosi',
      country: {
        name: 'Argentina',
        code: 'ar',
      },
      company: 'Post Box Services Plus',
      date: new Date('09-13-2015'),
      status: 'renewal',
      activity: 19,
      representative: {
        name: 'Xuxue Feng',
        image: 'xuxuefeng.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1020,
      name: 'Bette Nicka',
      country: {
        name: 'Paraguay',
        code: 'py',
      },
      company: 'Sport En Art',
      date: new Date('09-13-2015'),
      status: 'renewal',
      activity: 100,
      representative: {
        name: 'Onyama Limba',
        image: 'onyamalimba.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1190,
      name: 'Jettie Mconnell',
      country: {
        name: 'Denmark',
        code: 'dk',
      },
      company: 'Coldwell Bnkr Wright Real Est',
      date: new Date('09-13-2015'),
      status: 'negotiation',
      activity: 74,
      representative: {
        name: 'Ivan Magalhaes',
        image: 'ivanmagalhaes.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1191,
      name: 'Lemuel Latzke',
      country: {
        name: 'Colombia',
        code: 'co',
      },
      company: 'Computer Repair Service',
      date: new Date('09-13-2015'),
      status: 'proposal',
      activity: 79,
      representative: {
        name: 'Stephen Shaw',
        image: 'stephenshaw.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1192,
      name: 'Melodie Knipp',
      country: {
        name: 'Finland',
        code: 'fi',
      },
      company: 'Fleetwood Building Block Inc',
      date: new Date('09-13-2015'),
      status: 'negotiation',
      activity: 19,
      representative: {
        name: 'Asiya Javayant',
        image: 'asiyajavayant.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1193,
      name: 'Candida Corbley',
      country: {
        name: 'Poland',
        code: 'pl',
      },
      company: 'Colts Neck Medical Assocs Inc',
      date: new Date('09-13-2015'),
      status: 'negotiation',
      activity: 11,
      representative: {
        name: 'Onyama Limba',
        image: 'onyamalimba.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1194,
      name: 'Karan Karpin',
      country: {
        name: 'Estonia',
        code: 'ee',
      },
      company: 'New England Taxidermy',
      date: new Date('09-13-2015'),
      status: 'proposal',
      activity: 4,
      representative: {
        name: 'Stephen Shaw',
        image: 'stephenshaw.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1195,
      name: 'Andra Scheyer',
      country: {
        name: 'Romania',
        code: 'ro',
      },
      company: 'Ludcke, George O Esq',
      date: new Date('09-13-2015'),
      status: 'qualified',
      activity: 62,
      representative: {
        name: 'Elwin Sharvill',
        image: 'elwinsharvill.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1196,
      name: 'Felicidad Poullion',
      country: {
        name: 'Greece',
        code: 'gr',
      },
      company: 'Mccorkle, Tom S Esq',
      date: new Date('09-13-2015'),
      status: 'renewal',
      activity: 64,
      representative: {
        name: 'Elwin Sharvill',
        image: 'elwinsharvill.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1197,
      name: 'Belen Strassner',
      country: {
        name: 'Ivory Coast',
        code: 'ci',
      },
      company: 'Eagle Software Inc',
      date: new Date('09-13-2015'),
      status: 'qualified',
      activity: 91,
      representative: {
        name: 'Xuxue Feng',
        image: 'xuxuefeng.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1198,
      name: 'Gracia Melnyk',
      country: {
        name: 'Costa Rica',
        code: 'cr',
      },
      company: 'Juvenile \u0026 Adult Super',
      date: new Date('09-13-2015'),
      status: 'unqualified',
      activity: 40,
      representative: {
        name: 'Asiya Javayant',
        image: 'asiyajavayant.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
    {
      id: 1199,
      name: 'Jolanda Hanafan',
      country: {
        name: 'Cameroon',
        code: 'cm',
      },
      company: 'Perez, Joseph J Esq',
      date: new Date('09-13-2015'),
      status: 'qualified',
      activity: 27,
      representative: {
        name: 'Ivan Magalhaes',
        image: 'ivanmagalhaes.png',
      },
      image: 'https://via.placeholder.com/150x150',
      bool: true,
    },
  ];
  colDef: NgColDef[] = [
    {
      header: 'name',
      field: 'name',
      sortable: true,
      renderer: {type: 'text'},
      edit: {type: 'text'},
      filter: {
        type: 'multi-select',
        display: 'menu',
        showMenu: true,
      },
    },
    {
      header: 'country',
      field: 'country.name',
      renderer: {type: 'text'},
      sortable: true,
      edit: {type: 'dropdown', options: this.statuses},
      filter: {
        type: 'text',
      },
    },
    {
      header: 'representative',
      field: 'representative.name',
      renderer: {type: 'text'},
      sortable: true,
      edit: {type: 'dropdown'},
      filter: {
        type: 'multi-select',
        options: this.representatives,
        placeholder: 'any',
        optionLabel: 'name',
        optionValue: 'name',
      },
    },
    {
      header: 'date',
      field: 'date',
      renderer: {type: 'date', locale: 'en-us'},
      edit: {
        type: 'date',
      },
      sortable: true,
      filter: {
        type: 'date',
      },
    },
    {
      header: 'company',
      field: 'company',
      renderer: {type: 'text'},
      sortable: true,
      filter: {
        type: 'numeric',
        currency: 'USD',
      },
    },
    {
      header: 'status',
      field: 'status',
      renderer: {type: 'text'},
      sortable: true,
      filter: {
        type: 'dropdown',
        options: this.statuses,
        matchMode: 'equals',
      },
    },
    {
      header: 'activity',
      field: 'activity',
      renderer: {type: 'text'},
      sortable: true,
      filter: {
        type: 'slider',
        range: true,
        display: 'menu',
        matchMode: 'between',
        showMatchModes: false,
        showOperator: false,
        showAddButton: false,
        showApplyButton: false,
        rangeValues: [0, 100],
      },
    },
    {
      header: 'image',
      field: 'image',
      renderer: {type: 'image'},
      sortable: false,
      edit: {type: 'file'},
    },
    {
      header: 'bool',
      field: 'bool',
      renderer: {
        type: 'boolean',
        trueIcon: 'pi pi-check',
        falseIcon: 'pi pi-times',
      },
      sortable: true,
      edit: {
        type: 'boolean',
      },
      filter: {type: 'boolean'},
    },
  ];
  globalFilterFields: string[] = ['status'];
  selectedCustomers: Customer[];
  contextMenuSelection: Customer;

  onEditComplete(event) {
  }
}
