const apiEndpoint = '/api/v1';
export const RequestsConfig = [
  {pathname: `${apiEndpoint}/account/register`, loading: true, success: true, failure: true},
  {pathname: `/photos`, loading: true, success: false, failure: false},
];
