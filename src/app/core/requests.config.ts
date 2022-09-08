export interface RequestConfig {
  pathTemplate: string | RegExp,
  loading: boolean,
  success: boolean,
  failure: boolean,
  catch: boolean
}

export const RequestsConfig: RequestConfig[] = [
  {pathTemplate: `/api/v1/account/register`, loading: true, success: true, failure: true, catch: false},
  {pathTemplate: /photos/g, loading: false, success: false, failure: false, catch: false},
  {pathTemplate: '/photos', loading: true, success: false, failure: false, catch: false},
];
