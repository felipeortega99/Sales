// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const FIREBASE_CONFIG = {
    produiction: false,
  // Initialize Firebase
   firebase : {
    apiKey: "AIzaSyD0n4KEMMjIW_BYOoL05LghijBwX6B8160",
    authDomain: "sales-administrator.firebaseapp.com",
    databaseURL: "https://sales-administrator.firebaseio.com",
    projectId: "sales-administrator",
    storageBucket: "sales-administrator.appspot.com",
    messagingSenderId: "728828567861"
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