import {Component, Inject} from '@angular/core';
import {NgTableActionsConfig, NgTableColDef} from '@ng/models/table';
import {LazyLoadEvent, MenuItem} from 'primeng/api';
import {NgSize} from "@ng/models/offset";
import {UserService} from "@core/http";
import {NgConfig} from "@ng/models/config";

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
  rtl: boolean = this.ngConfig.rtl;
  size: NgSize = 'md';
  header: string = 'Customers';
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
  lazyCustomers = [
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
    {
      "id": 1007,
      "name": "Leota Dilliard",
      "country": {
        "name": "Serbia",
        "code": "rs"
      },
      "company": "Commercial Press",
      "date": "2019-08-13",
      "status": "renewal",
      "verified": true,
      "activity": 69,
      "representative": {
        "name": "Onyama Limba",
        "image": "onyamalimba.png"
      },
      "balance": 26640,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1008,
      "name": "Sage Wieser",
      "country": {
        "name": "Egypt",
        "code": "eg"
      },
      "company": "Truhlar And Truhlar Attys",
      "date": "2018-11-21",
      "status": "unqualified",
      "verified": true,
      "activity": 76,
      "representative": {
        "name": "Ivan Magalhaes",
        "image": "ivanmagalhaes.png"
      },
      "balance": 65369,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1009,
      "name": "Kris Marrier",
      "country": {
        "name": "Mexico",
        "code": "mx"
      },
      "company": "King, Christopher A Esq",
      "date": "2015-07-07",
      "status": "proposal",
      "verified": false,
      "activity": 3,
      "representative": {
        "name": "Onyama Limba",
        "image": "onyamalimba.png"
      },
      "balance": 63451,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1010,
      "name": "Minna Amigon",
      "country": {
        "name": "Romania",
        "code": "ro"
      },
      "company": "Dorl, James J Esq",
      "date": "2018-11-07",
      "status": "qualified",
      "verified": false,
      "activity": 38,
      "representative": {
        "name": "Anna Fali",
        "image": "annafali.png"
      },
      "balance": 71169,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1011,
      "name": "Abel Maclead",
      "country": {
        "name": "Singapore",
        "code": "sg"
      },
      "company": "Rangoni Of Florence",
      "date": "2017-03-11",
      "status": "qualified",
      "verified": true,
      "activity": 87,
      "representative": {
        "name": "Bernardo Dominic",
        "image": "bernardodominic.png"
      },
      "balance": 96842,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1012,
      "name": "Kiley Caldarera",
      "country": {
        "name": "Serbia",
        "code": "rs"
      },
      "company": "Feiner Bros",
      "date": "2015-10-20",
      "status": "unqualified",
      "verified": false,
      "activity": 80,
      "representative": {
        "name": "Onyama Limba",
        "image": "onyamalimba.png"
      },
      "balance": 92734,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1013,
      "name": "Graciela Ruta",
      "country": {
        "name": "Chile",
        "code": "cl"
      },
      "company": "Buckley Miller & Wright",
      "date": "2016-07-25",
      "status": "negotiation",
      "verified": false,
      "activity": 59,
      "representative": {
        "name": "Amy Elsner",
        "image": "amyelsner.png"
      },
      "balance": 45250,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1014,
      "name": "Cammy Albares",
      "country": {
        "name": "Philippines",
        "code": "ph"
      },
      "company": "Rousseaux, Michael Esq",
      "date": "2019-06-25",
      "status": "new",
      "verified": true,
      "activity": 90,
      "representative": {
        "name": "Asiya Javayant",
        "image": "asiyajavayant.png"
      },
      "balance": 30236,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1015,
      "name": "Mattie Poquette",
      "country": {
        "name": "Venezuela",
        "code": "ve"
      },
      "company": "Century Communications",
      "date": "2017-12-12",
      "status": "negotiation",
      "verified": false,
      "activity": 52,
      "representative": {
        "name": "Anna Fali",
        "image": "annafali.png"
      },
      "balance": 64533,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1016,
      "name": "Meaghan Garufi",
      "country": {
        "name": "Malaysia",
        "code": "my"
      },
      "company": "Bolton, Wilbur Esq",
      "date": "2018-07-04",
      "status": "unqualified",
      "verified": false,
      "activity": 31,
      "representative": {
        "name": "Ivan Magalhaes",
        "image": "ivanmagalhaes.png"
      },
      "balance": 37279,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1017,
      "name": "Gladys Rim",
      "country": {
        "name": "Netherlands",
        "code": "nl"
      },
      "company": "T M Byxbee Company Pc",
      "date": "2020-02-27",
      "status": "renewal",
      "verified": true,
      "activity": 48,
      "representative": {
        "name": "Stephen Shaw",
        "image": "stephenshaw.png"
      },
      "balance": 27381,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1018,
      "name": "Yuki Whobrey",
      "country": {
        "name": "Israel",
        "code": "il"
      },
      "company": "Farmers Insurance Group",
      "date": "2017-12-21",
      "status": "negotiation",
      "verified": true,
      "activity": 16,
      "representative": {
        "name": "Bernardo Dominic",
        "image": "bernardodominic.png"
      },
      "balance": 9257,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1019,
      "name": "Fletcher Flosi",
      "country": {
        "name": "Argentina",
        "code": "ar"
      },
      "company": "Post Box Services Plus",
      "date": "2016-01-04",
      "status": "renewal",
      "verified": true,
      "activity": 19,
      "representative": {
        "name": "Xuxue Feng",
        "image": "xuxuefeng.png"
      },
      "balance": 67783,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1020,
      "name": "Bette Nicka",
      "country": {
        "name": "Paraguay",
        "code": "py"
      },
      "company": "Sport En Art",
      "date": "2016-10-21",
      "status": "renewal",
      "verified": false,
      "activity": 100,
      "representative": {
        "name": "Onyama Limba",
        "image": "onyamalimba.png"
      },
      "balance": 4609,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1021,
      "name": "Veronika Inouye",
      "country": {
        "name": "Ecuador",
        "code": "ec"
      },
      "company": "C 4 Network Inc",
      "date": "2017-03-24",
      "status": "renewal",
      "verified": false,
      "activity": 72,
      "representative": {
        "name": "Ioni Bowcher",
        "image": "ionibowcher.png"
      },
      "balance": 26565,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1022,
      "name": "Willard Kolmetz",
      "country": {
        "name": "Tunisia",
        "code": "tn"
      },
      "company": "Ingalls, Donald R Esq",
      "date": "2017-04-15",
      "status": "renewal",
      "verified": true,
      "activity": 94,
      "representative": {
        "name": "Asiya Javayant",
        "image": "asiyajavayant.png"
      },
      "balance": 75876,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1023,
      "name": "Maryann Royster",
      "country": {
        "name": "Belarus",
        "code": "by"
      },
      "company": "Franklin, Peter L Esq",
      "date": "2017-03-11",
      "status": "qualified",
      "verified": false,
      "activity": 56,
      "representative": {
        "name": "Elwin Sharvill",
        "image": "elwinsharvill.png"
      },
      "balance": 41121,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1024,
      "name": "Alisha Slusarski",
      "country": {
        "name": "Iceland",
        "code": "is"
      },
      "company": "Wtlz Power 107 Fm",
      "date": "2018-03-27",
      "status": "qualified",
      "verified": true,
      "activity": 7,
      "representative": {
        "name": "Stephen Shaw",
        "image": "stephenshaw.png"
      },
      "balance": 91691,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1025,
      "name": "Allene Iturbide",
      "country": {
        "name": "Italy",
        "code": "it"
      },
      "company": "Ledecky, David Esq",
      "date": "2016-02-20",
      "status": "qualified",
      "verified": true,
      "activity": 1,
      "representative": {
        "name": "Ivan Magalhaes",
        "image": "ivanmagalhaes.png"
      },
      "balance": 40137,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1026,
      "name": "Chanel Caudy",
      "country": {
        "name": "Argentina",
        "code": "ar"
      },
      "company": "Professional Image Inc",
      "date": "2018-06-24",
      "status": "new",
      "verified": true,
      "activity": 26,
      "representative": {
        "name": "Ioni Bowcher",
        "image": "ionibowcher.png"
      },
      "balance": 21304,
      "image": 'https://via.placeholder.com/150x150',
      "bool": true,
    },
    {
      "id": 1027,
      "name": "Ezekiel Chui",
      "country": {
        "name": "Ireland",
        "code": "ie"
      },
      "company": "Sider, Donald C Esq",
      "date": "2016-09-24",
      "status": "new",
      "verified": false,
      "activity": 76,
      "representative": {
        "name": "Amy Elsner",
        "image": "amyelsner.png"
      },
      "balance": 60454,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1028,
      "name": "Willow Kusko",
      "country": {
        "name": "Romania",
        "code": "ro"
      },
      "company": "U Pull It",
      "date": "2020-04-11",
      "status": "qualified",
      "verified": true,
      "activity": 7,
      "representative": {
        "name": "Onyama Limba",
        "image": "onyamalimba.png"
      },
      "balance": 17565,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1029,
      "name": "Bernardo Figeroa",
      "country": {
        "name": "Israel",
        "code": "il"
      },
      "company": "Clark, Richard Cpa",
      "date": "2018-04-11",
      "status": "renewal",
      "verified": true,
      "activity": 81,
      "representative": {
        "name": "Ioni Bowcher",
        "image": "ionibowcher.png"
      },
      "balance": 17774,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1030,
      "name": "Ammie Corrio",
      "country": {
        "name": "Hungary",
        "code": "hu"
      },
      "company": "Moskowitz, Barry S",
      "date": "2016-06-11",
      "status": "negotiation",
      "verified": true,
      "activity": 56,
      "representative": {
        "name": "Asiya Javayant",
        "image": "asiyajavayant.png"
      },
      "balance": 49201,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1031,
      "name": "Francine Vocelka",
      "country": {
        "name": "Honduras",
        "code": "hn"
      },
      "company": "Cascade Realty Advisors Inc",
      "date": "2017-08-02",
      "status": "qualified",
      "verified": true,
      "activity": 94,
      "representative": {
        "name": "Ioni Bowcher",
        "image": "ionibowcher.png"
      },
      "balance": 67126,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1032,
      "name": "Ernie Stenseth",
      "country": {
        "name": "Australia",
        "code": "au"
      },
      "company": "Knwz Newsradio",
      "date": "2018-06-06",
      "status": "renewal",
      "verified": true,
      "activity": 68,
      "representative": {
        "name": "Xuxue Feng",
        "image": "xuxuefeng.png"
      },
      "balance": 76017,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1033,
      "name": "Albina Glick",
      "country": {
        "name": "Ukraine",
        "code": "ua"
      },
      "company": "Giampetro, Anthony D",
      "date": "2019-08-08",
      "status": "proposal",
      "verified": true,
      "activity": 85,
      "representative": {
        "name": "Bernardo Dominic",
        "image": "bernardodominic.png"
      },
      "balance": 91201,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1034,
      "name": "Alishia Sergi",
      "country": {
        "name": "Qatar",
        "code": "qa"
      },
      "company": "Milford Enterprises Inc",
      "date": "2018-05-19",
      "status": "negotiation",
      "verified": false,
      "activity": 46,
      "representative": {
        "name": "Ivan Magalhaes",
        "image": "ivanmagalhaes.png"
      },
      "balance": 12237,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    },
    {
      "id": 1035,
      "name": "Solange Shinko",
      "country": {
        "name": "Cameroon",
        "code": "cm"
      },
      "company": "Mosocco, Ronald A",
      "date": "2015-02-12",
      "status": "qualified",
      "verified": true,
      "activity": 32,
      "representative": {
        "name": "Onyama Limba",
        "image": "onyamalimba.png"
      },
      "balance": 34072,
      "image": 'https://via.placeholder.com/150x150',
      "bool": false,
    }
  ];
  contextMenu: MenuItem[] = [
    {
      label: 'View',
      icon: 'pi pi-fw pi-search',
      command: (item) => {
      },
    },
  ];
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
        matchMode: 'between',
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
  globalFilterFields: string[] = ['status'];
  selectedCustomers: any[];
  contextMenuSelection: any;
  loading: boolean;
  totalRecords: number;
  selectAll: boolean = false;

  constructor(private userService: UserService, @Inject('NG_CONFIG') private ngConfig: NgConfig) {
  }

  onRowSelect(event: any) {
  }

  rowSelectable(data, index) {
    return data.index == 0 || data.index == 1;
  }

  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;
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
        this.lazyCustomers = res.customers;
        this.totalRecords = res.totalRecords;
        this.loading = false;
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
