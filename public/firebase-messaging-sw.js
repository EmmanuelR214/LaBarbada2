importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyBSXEvTgBNObCzQ4wvTOg7WSLfDIhb5m5Y",
  authDomain: "labarbada-1db65.firebaseapp.com",
  projectId: "labarbada-1db65",
  storageBucket: "labarbada-1db65.appspot.com",
  messagingSenderId: "942890329531",
  appId: "1:942890329531:web:fd663a48b9f37785d1d09e",
  measurementId: "G-X4EJWEVGJC"
};

const app = firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging(app)

messaging.onBackgroundMessage((payload) => {
  console.log('Mensaje recibido en segundo plano: ', payload)
  console.log(payload)
  
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: "https://labarbada.store/img/logo.png"
  }
  
  return self.registration.showNotification(notificationTitle, notificationOptions)
})