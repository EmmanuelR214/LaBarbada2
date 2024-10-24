import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'La Barbada',
        short_name: 'La Barbada',
        description: 'PWA de la Barbada',
        theme_color: '#202020',
        icons: [
          {
            src: 'img/logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'img/logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
    }),
  ],
})


/*
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'La Barbada',
        short_name: 'La Barbada',
        description: 'PWA de la Barbada',
        theme_color: '#202020',
        icons: [
          {
            src: 'img/logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'img/logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      // Utiliza injectManifest para combinar el manifiesto con el sw.js personalizado
      injectManifest: {
        swSrc: './sw.js',  // Ruta de tu service worker personalizado
        swDest: 'sw.js',   // Archivo que será generado
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
              },
            },
          },
        ],
      }
    })
  ],
})
*/


// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: 'autoUpdate',
//       includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
//       manifest: {
//         name: 'La Barbada',
//         short_name: 'La Barbada',
//         description: 'PWA de la Barbada',
//         theme_color: '#202020',
//         icons: [
//           {
//             src: 'img/logo.png',
//             sizes: '192x192',
//             type: 'image/png'
//           },
//           {
//             src: 'img/logo.png',
//             sizes: '512x512',
//             type: 'image/png'
//           }
//         ]
//       },
//       // Añadimos la opción workbox para manejar eventos push
//       workbox: {
//         runtimeCaching: [
//           {
//             urlPattern: ({ request }) => request.destination === 'image',
//               handler: 'CacheFirst',
//               options: {
//               cacheName: 'images',
//               expiration: {
//                 maxEntries: 10,
//                 maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
//               },
//             },
//           },
//         ],
//       },
//       self: {
//         events: {
//           push(event) {
//             let data;

//             try {
//               // Intenta procesar los datos que llegan en el evento push
//               data = event.data ? event.data.json() : {};
//               console.log('Datos recibidos en el push event:', data);
//             } catch (error) {
//               console.error('Error al procesar los datos del push event:', error);
//               data = {
//                 title: 'Notificación por defecto',
//                 body: 'No se pudo obtener el contenido de la notificación.'
//               };
//             }

//             // Establece valores por defecto si los datos no existen
//             const title = data.title || 'Notificación por defecto';
//             const options = {
//               body: data.body || 'Tienes una nueva notificación',
//               icon: 'https://labarbada.store/img/logo.png',
//               badge: 'https://labarbada.store/img/logo.png'
//             };

//             // Muestra la notificación
//             event.waitUntil(
//               self.registration.showNotification(title, options)
//             );
//           }
//         }
//       }
//     })
//   ],
// }) 



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'
// import { VitePWA } from 'vite-plugin-pwa'

// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: 'autoUpdate',
//       includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
//       manifest: {
//         name: 'La Barbada',
//         short_name: 'La Barbada',
//         description: 'My Awesome React App with Vite and PWA support',
//         theme_color: '#ffffff',
//         icons: [
//           {
//             src: 'img/logo.png',
//             sizes: '192x192',
//             type: 'image/png'
//           },
//           {
//             src: 'img/logo.png',
//             sizes: '512x512',
//             type: 'image/png'
//           }
//         ]
//       },
//       // Uso de `injectManifest` para un Service Worker personalizado
//       injectManifest: {
//         swSrc: 'src/sw.js', // Asegúrate de tener tu archivo sw.js en esta ruta
//       }
//     })
//   ],
// })




// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'
// import { VitePWA } from 'vite-plugin-pwa'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(),
//     VitePWA({
//       registerType: 'autoUpdate',
//       includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
//       manifest: {
//         name: 'La Barbada',
//         short_name: 'La Barbada',
//         description: 'My Awesome React App with Vite and PWA support',
//         theme_color: '#ffffff',
//         icons: [
//           {
//             src: 'img/logo.png',
//             sizes: '192x192',
//             type: 'image/png'
//           },
//           {
//             src: 'img/logo.png',
//             sizes: '512x512',
//             type: 'image/png'
//           }
//         ]
//       },
//       // Customización del Service Worker
//       workbox: {
//         // Define aquí la lógica personalizada
//         runtimeCaching: [
//           {
//             urlPattern: /^https:\/\/firebasestorage\.googleapis\.com\/.*/i,
//             handler: 'CacheFirst',
//             options: {
//               cacheName: 'firebase-images',
//               expiration: {
//                 maxEntries: 10,
//                 maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
//               },
//             },
//           },
//         ],
//         // Aquí añades el código para manejar notificaciones push en segundo plano
//         injectManifest: {
//           swSrc: 'src/sw.js', // Ruta al Service Worker personalizado
//         }
//       }
//     })
//   ],
// })
