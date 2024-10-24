// console.log('Service Worker Works');

// self.addEventListener('push', e => {
//   console.log('Push Notification Received', e);
//   const data = e.data.json();
//   console.log('data: ',data)
//   self.registration.showNotification(data.title, {
//     body: data.body,
//     icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Archlinux-icon-crystal-64.svg/1024px-Archlinux-icon-crystal-64.svg.png'
//   });
// });


// self.addEventListener('push', (event) => {
//   console.log('Evento push recibido:', event);
//   let data;
//   try {
//     console.log('Raw data recibida:', event.data.text());
//     data = event.data.json();
//   } catch (error) {
//     console.error('Error al procesar los datos de la notificación:', error);
//   }

//   const title = data.title || 'Nueva notificación';
//   const options = {
//     body: data.body || 'Tienes una nueva notificación.',
//     icon: 'https://labarbada.store/img/logo.png',
//     badge: 'https://labarbada.store/img/logo.png',
//     data: data.url || '/' 
//   };

//   event.waitUntil(
//     self.registration.showNotification(title, options)
//   );
// });

// self.addEventListener('notificationclick', function(event) {
//   event.notification.close();
//   event.waitUntil(
//     clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
//       for (let i = 0; i < clientList.length; i++) {
//         let client = clientList[i];
//         if (client.url === '/' && 'focus' in client) {
//           return client.focus();
//         }
//       }
//       if (clients.openWindow) {
//         return clients.openWindow(event.notification.data);
//       }
//     })
//   );
// });



// self.addEventListener('notificationclick', function(event) {
//   event.notification.close();
//   event.waitUntil(
//     clients.openWindow('/')
//   );
// });
