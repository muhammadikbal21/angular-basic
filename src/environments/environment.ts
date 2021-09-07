// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// digunakan build yang kita gunakan saat ini (development)
export const environment = {
  production: false,
  baseUrl: '/',
  appName: 'My First Application.',
  apiUrl: '/api',
  apiEndpoints: {
    GET_ALL_TODOS: 'todos',
    GET_SINGLE_TODOS: 'todos/:id',
    POST_TODOS: 'todos',
    PUT_TODOS: 'todos/:id',
    DELETE_TODOS: 'todos/:id'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
