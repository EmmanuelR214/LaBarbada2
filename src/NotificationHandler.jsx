import { useEffect } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { toast } from "react-toastify";
import { messaging } from "./utils/firebase/firebase";
import { SubscribeRoute } from "./utils/api/urlStore";


const NotificationHandler = () => {
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js', { scope: '/home/' })
      .then(function(registration) {
        console.log('Service Worker personalizado registrado con éxito:', registration);
      })
      .catch(function(err) {
        console.log('Error al registrar el service worker personalizado:', err);
      });
  }
  
  
  const activarMensajes = async () => {
    try {
      const storedToken = localStorage.getItem('fcmToken');
      if (!storedToken) {
        const token = await getToken(messaging, { vapidKey: 'BLEDHXDjobuubBnKkVNExff0x30BWcenJrbU45_H9vbiBIWIUTBBWAy-RldvglyGwUKT_5gON5J0NyJvPsocJzU' });
        if (token) {
          localStorage.setItem('fcmToken', token); 
          await SubscribeRoute({token: token}); 
        } else {
          console.log('No se pudo obtener el token');
        }
      } else {
        console.log('Token ya existente:');
      }
    } catch (error) {
      console.log('Error de activación de mensajería', error);
    }
  }  
  
  useEffect(() => {
    activarMensajes();
    onMessage(messaging, message => {
      console.log('Mensaje recibido en primer plano:', message);
      toast(
        <div className="flex flex-col gap-1">
          <strong className="text-lg font-semibold text-gray-800">{message.notification.title}</strong>
          <span className="text-sm text-gray-600">{message.notification.body}</span>
        </div>,
        {
          icon: "🔔", 
        }
      );     
    });
  }, []);
  
  return null
};

export default NotificationHandler;
