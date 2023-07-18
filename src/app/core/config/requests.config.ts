import {RequestConfig} from "@core/models";

export const RequestsConfig: RequestConfig[] = [
  // {pathTemplate: /photos/g},
  // {pathTemplate: 'your/*/custom/*/path/*/template'},
  {
    pathTemplate: '/photos',
    method: 'GET',
    successMessage: (req, res) => {
      return 'موفقیت آمیز بود'
    },
    failureMessage: null,
    loading: true,
    catch: false
  },
];
