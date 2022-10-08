import {RequestConfig} from "@core/models";

export const RequestsConfig: RequestConfig[] = [
  {pathTemplate: `/api/v1/account/register`, method: 'GET', loading: true, success: true, failure: true, catch: false},
  // {pathTemplate: /photos/g, method: 'GET', loading: false, success: false, failure: false, catch: true},
  // {pathTemplate: 'your/*/custom/*/path/*/template', method: 'GET', loading: false, success: false, failure: false, catch: true},
  {pathTemplate: '/photos', method: 'GET', loading: true, success: false, failure: false, catch: false},
];
