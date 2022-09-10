export interface RequestConfig {
  pathTemplate: string | RegExp,
  loading: boolean,
  success: boolean,
  failure: boolean,
  catch: boolean,
  method: string
}

export const RequestsConfig: RequestConfig[] = [
  {pathTemplate: `/api/v1/account/register`, method: 'get', loading: true, success: true, failure: true, catch: false},
  // {pathTemplate: /photos/g, method: 'get', loading: false, success: false, failure: false, catch: true},
  {pathTemplate: '/photos', method: 'get', loading: true, success: false, failure: false, catch: true},
];
