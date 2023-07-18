import {RequestConfig} from "@core/models";

export const RequestsConfig: RequestConfig[] = [
  {pathTemplate: `/api/v1/account/register`, method: 'GET', loading: true, catch: false},
  // {pathTemplate: /photos/g, method: 'GET', loading: false, success: false, failure: false, catch: true},
  // {pathTemplate: 'your/*/custom/*/path/*/template', method: 'GET', loading: false, success: false, failure: false, catch: true},
  {
    pathTemplate: '/photos',
    method: 'GET',
    successMessage: null,
    failureMessage: 'خطا رخ داد',
    loading: true,
    catch: false
  },
];
