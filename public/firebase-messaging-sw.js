/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyDvUE_wUqOl_iEWCSILoCeBgtzCYUcMDVE',
  authDomain: 'perq-soleil-d8351.firebaseapp.com',
  databaseURL: 'https://perq-soleil-d8351-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'perq-soleil-d8351',
  storageBucket: 'perq-soleil-d8351.appspot.com',
  messagingSenderId: '214517427971',
  appId: '1:214517427971:web:2bc836092f4f4c7fbb4336',
  measurementId: 'G-99WL2EGWFB',
};

const app = firebase.initializeApp(firebaseConfig);
firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   const { title, body } = payload.notification;
//   // self.registration.showNotification(title, { data: body });
//   console.log('Notification =', payload.notification);
// });
