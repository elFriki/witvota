// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appTitle: 'WiT',
  urlAPI: 'http://localhost:5000/witvota/us-central1',
  firebase: {
    apiKey: 'AIzaSyCBvgomVH5P8OYrbPgZ5OrCjL4Qr9RPp0I',
    authDomain: 'witvota.firebaseapp.com',
    projectId: 'witvota',
    storageBucket: 'witvota.appspot.com',
    messagingSenderId: '493605466329',
    appId: '1:493605466329:web:07a1f475e952c001ce8ec8',
    measurementId: 'G-EVKXJ3TJQJ'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
