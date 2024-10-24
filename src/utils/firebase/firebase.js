// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getMessaging } from "firebase/messaging";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSXEvTgBNObCzQ4wvTOg7WSLfDIhb5m5Y",
  authDomain: "labarbada-1db65.firebaseapp.com",
  projectId: "labarbada-1db65",
  storageBucket: "labarbada-1db65.appspot.com",
  messagingSenderId: "942890329531",
  appId: "1:942890329531:web:fd663a48b9f37785d1d09e",
  measurementId: "G-X4EJWEVGJC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const messaging = getMessaging(app)
// const analytics = getAnalytics(app);






/*
// // Registrar el Service Worker personalizado de Firebase para manejar notificaciones push
// navigator.serviceWorker.register('/firebase-messaging-sw.js')
//   .then((registration) => {
//     console.log('Service Worker registrado con éxito:', registration);

//     // Inicializar Firebase Messaging después de registrar el Service Worker
//     const messaging = getMessaging(app);

//     // Usa el Service Worker registrado para Firebase Messaging
//     messaging.useServiceWorker(registration);

//     // Solicitar permisos y obtener token de FCM
//     return requestNotificationPermission(messaging);
//   })
//   .then((currentToken) => {
//     if (currentToken) {
//       console.log('Token de FCM obtenido:', currentToken);
//       // Aquí puedes enviar el token al servidor o manejarlo como necesites
//     } else {
//       console.log('No se pudo obtener el token de FCM.');
//     }
//   })
//   .catch((error) => {
//     console.error('Error al registrar el SW o al obtener el token:', error);
//   });

// // Solicitar permiso al usuario para notificaciones y obtener el token de FCM
// export const requestNotificationPermission = async (messaging) => {
//   try {
//     const permission = await Notification.requestPermission();
//     if (permission === "granted") {
//       // Obtener el token de FCM
//       const currentToken = await getToken(messaging, { vapidKey: 'BLEDHXDjobuubBnKkVNExff0x30BWcenJrbU45_H9vbiBIWIUTBBWAy-RldvglyGwUKT_5gON5J0NyJvPsocJzU' });
//       return currentToken;
//     } else {
//       console.error("Permiso para notificaciones denegado.");
//     }
//   } catch (error) {
//     console.error("Error al solicitar permiso para notificaciones", error);
//   }
// };

// // Manejar mensajes recibidos cuando la app está en primer plano
// navigator.serviceWorker.ready.then(() => {
//   const messaging = getMessaging(app);

//   onMessage(messaging, (payload) => {
//     console.log('Mensaje recibido en primer plano: ', payload);
//     // Aquí puedes manejar la notificación cuando la app está en uso
//   });
// });
*/
