# Proyecto PWA - Transformación de Aplicación Web de E-Commerce para Restaurante La Barbada

Este proyecto tiene como objetivo transformar una aplicación web de E-Commerce existente en una **Progressive Web Application (PWA)** para el restaurante La Barbada. Las PWAs permiten a los usuarios disfrutar de una experiencia similar a la de una aplicación nativa, con características como la capacidad de trabajar sin conexión, notificaciones push, y un rendimiento mejorado en dispositivos móviles, todo sin necesidad de descargar la aplicación desde una tienda de aplicaciones.

## Tabla de Contenidos
- [Descripción del Proyecto](#descripción-del-proyecto)
- [Objetivos del Proyecto](#objetivos-del-proyecto)
- [Riesgos y medidas para mitigarlos](#riesgos-y-medidas-para-mitigarlos )
- [Estrategia de comunicación](#estrategia-de-comunicación ) 
- [Metodología de Trabajo (Scrum)](#metodología-de-trabajo-scrum)
- [Herramienta para la gestión de issues](#herramienta-para-la-gestión-de-issues)
- [Control de Versiones](#control-de-versiones)
- [Revisión entre los Miembros del Equipo](#revisión-entre-los-miembros-del-equipo)
- [Flujo de Trabajo](#flujo-de-trabajo)
- [Estrategia de Versionamiento y Gestión de Ramas](#estrategia-de-versionamiento-y-gestión-de-ramas)
- [Creación Revisión y Fusión de Ramas](#creación-revisión-y-fusión-de-ramas)
- [Estrategia de Despliegue](#estrategia-de-despliegue)
- [Entornos](#entornos) 
- [Pila Tecnologica](#pila-tecnologica)
- [Instalación](#instalación)
- [Uso](#uso)


## Descripción del Proyecto
El proyecto consiste en una página web de tipo E-Commerce para el restaurante **La Barbada**, la cual será transformada a **PWA** para acceder a funciones offline y ofrecer a los usuarios características como la capacidad de trabajar sin conexión, notificaciones push, y un rendimiento mejorado en dispositivos móviles sin necesidad de descargar la aplicación desde una tienda de aplicaciones.

## Objetivos del Proyecto
1. **Convertir la aplicación web existente en PWA:** Implementar las características necesarias, como **Service Workers**, **Web App Manifest**, y optimizaciones de rendimiento para que la aplicación funcione offline y ofrezca una experiencia de usuario fluida en cualquier dispositivo.
2. **Mejorar la accesibilidad y usabilidad móvil:** Asegurarse de que la **PWA** ofrezca una experiencia de usuario consistente y optimizada tanto para escritorio como para dispositivos móviles.
3. **Implementar notificaciones push:** Proporcionar a los usuarios la opción de recibir actualizaciones en tiempo real mediante notificaciones, mejorando la interacción con la plataforma.
4. **Facilitar el acceso offline:** Implementar almacenamiento en caché eficiente para que los usuarios puedan acceder a contenido previamente cargado, incluso sin conexión a internet.

## Riesgos y medidas para mitigarlos

## 1. Definición poco clara de requerimientos y objetivos
**Riesgo:** Si los objetivos y requerimientos no están bien definidos, pueden ocurrir malentendidos y retrasos.

**Medidas de mitigación:**
- Crear un documento detallado de especificaciones.
- Usar metodologías ágiles (Scrum) para manejar los cambios de requerimientos.


## 2. Problemas de rendimiento y escalabilidad
**Riesgo:** La aplicación puede tener problemas de rendimiento bajo carga, afectando la experiencia del usuario.

**Medidas de mitigación:**
- Optimizar la aplicación para distintos dispositivos.

## 3. Problemas de seguridad y protección de datos
**Riesgo:** Existen riesgos de vulnerabilidades que pueden exponer datos sensibles.

**Medidas de mitigación:**
- Implementacion de metodos de encriptación 
- Implementar pasarelas de pago seguras.
- Usar estándares de seguridad en las transacciones.
- Asegurar el correcto almacenamiento de datos.

## 4. Mala experiencia de usuario (UX/UI)
**Riesgo:** Una interfaz complicada o poco intuitiva puede afectar la experiencia del usuario.

**Medidas de mitigación:**
- Diseñar una interfaz intuitiva y adaptada a varios dispositivos.
- Realizar pruebas de usabilidad con usuarios reales.
- Mantener el diseño simple y optimizado.

## 5. Problemas de compatibilidad con dispositivos y sistemas operativos
**Riesgo:** La aplicación puede no funcionar bien en diferentes sistemas operativos o dispositivos.

**Medidas de mitigación:**
- Probar la aplicación en diferentes dispositivos y versiones de sistemas operativos.

## 6. Retrasos en el desarrollo y sobrecostos
**Riesgo:** Falta de control en plazos y costos puede resultar en retrasos y sobrecostos.

**Medidas de mitigación:**
- Crear un cronograma claro y usar metodologías ágiles.
- Realizar revisiones constantes del proyecto.
- Planificar un presupuesto de contingencia.


## 7. Problemas de compatibilidad con pasarelas de pago
**Riesgo:** La integración incorrecta de pasarelas de pago puede generar errores en transacciones.

**Medidas de mitigación:**
- Usar pasarelas de pago confiables y bien documentadas.
- Realizar pruebas exhaustivas en diferentes escenarios.
- Cumplir con normativas de pago y manejar fallos en transacciones.

## Estrategia de comunicación 
## 1. Reuniones periódicas
- Realizar reuniones cada 2 semanas a través de **Google Meet** para:
  - Tratar problemas y revisar tareas pendientes.
  - Priorizar nuevas tareas y asignar roles y responsabilidades.
  - Proporcionar un resumen del progreso del proyecto.
  - Asegurar que todos los miembros del equipo estén informados.

## 2. Planificación y seguimiento con ClickUp
- Utilizar **ClickUp** como herramienta de gestión de tareas para:
  - Asignar y priorizar tareas.
  - Realizar un seguimiento del estado de cada tarea.

## 3. Uso de Git y GitHub para control de versiones
- Implementar **Git** y **GitHub** como herramientas de control de versiones.
- Utilizar **pull requests** para facilitar la comunicación entre los miembros del equipo sobre nuevas funcionalidades o correcciones de errores.

## Metodología de Trabajo (Scrum)
Se está utilizando la metodología **Agile Scrum** para gestionar y ejecutar el proyecto, lo que permite una entrega incremental del producto y la mejora continua a través de ciclos iterativos.

## Herramienta para la gestión de issues
Para la gestión de issues se ha decidido usar **ClickUp** como herramienta en los que hemos añadido a los integrantes y personas quienes revisaran las actividades. 

## Control de Versiones
La herramienta seleccionada para el control de versiones es **Git + GitHub**, con las cuales se ha trabajado previamente en otros proyectos. Esta combinación permite un flujo de trabajo ágil y eficiente. El uso de **Pull Requests (PR)** facilita la revisión de código antes de integrar cambios en la rama principal del proyecto.

## Revisión entre los Miembros del Equipo

- **GitHub** permite la colaboración eficaz mediante el uso de ramas, lo que permite que cada miembro del equipo pueda:
  - Realizar cambios.
  - Corregir errores.
  - Añadir nuevas características al proyecto sin afectar el código de producción.

- Se utilizarán **Pull Requests** para realizar cambios entre ramas, asignando a un revisor del equipo de desarrollo para que:
  - Revise y valide los cambios propuestos.
  - Comente y apruebe los cambios antes de integrarlos al código base.

## Flujo de Trabajo
El flujo de trabajo seleccionado es **GitHub Flow**, que se adapta a las características del proyecto y al tamaño del equipo, compuesto por 2 integrantes. Cada miembro está encargado de una rama dedicada a una tarea específica, como la corrección de errores o la implementación de nuevas funcionalidades. No se realizan cambios directos en la rama principal (**main**), lo que garantiza que solo se integre código estable.

## Estrategia de Versionamiento y Gestión de Ramas
La estrategia de versionamiento elegida es **GitHub Flow** debido a su simplicidad y adaptabilidad a un equipo pequeño. Las ramas están divididas de la siguiente manera:
- **Feature:** Ramas dedicadas a la corrección o cambios de funcionamiento basados en la retroalimentación del cliente. Incluye ajustes de diseño y funcionalidad.
- **Errores:** Rama dedicada a la identificación y corrección de errores de funcionamiento o mejoras en los componentes del proyecto.
- **Máster:** Rama por defecto, donde se fusionan los cambios realizados en las ramas anteriores después de pasar por revisión y pruebas.

## Creación Revisión y Fusión de Ramas
1. *Creacion* 
  * Para trabajar de manera eficiente y organizada, se recomienda crear ramas específicas para cada nueva característica o corrección de errores. Utiliza el siguiente comando para crear una nueva rama:

  ```bash
    git checkout -b nombre-de-la-rama
  ```
2. *Revision*
  * Una vez que se han realizado cambios en una rama, se debe enviar un Pull Request (PR) para iniciar la revisión del código
   1. Realiza un push de tu rama al repositorio remoto:
        ```bash
          git push origin nombre-de-la-rama
        ```
   2. Ve a GitHub y selecciona "Pull Requests".
   3. Haz clic en "New Pull Request"
   4. Selecciona tu rama y sigue las instrucciones para completar el PR.
   
3. *Fusión* 
  * Una vez que el Pull Request ha sido revisado y aprobado, puedes fusionar los cambios en la rama principal (main). Esto se puede hacer directamente en la interfaz de GitHub:
    1. Haz clic en el botón "Merge Pull Request" en la página del PR.
    2. Confirma la fusión.
  
  
## Estrategia de Despliegue
La estrategia seleccionada es **Despliegue Directo (Big Bang)** debido a que solo se cuenta con un servidor, y aunque conlleva riesgos, es una estrategia que permite realizar la implementación de la nueva versión del sistema de una sola vez. 
Algunas características clave de esta estrategia:
- Implementación de la nueva versión en todo el sistema de una vez.
- Menor complejidad en comparación con otras estrategias, ya que no requiere configurar múltiples entornos.
- Riesgos mitigados mediante pruebas exhaustivas en entornos de desarrollo antes del despliegue en producción.
- Apto para proyectos con un volumen de tráfico moderado y actualizaciones no frecuentes.

## Entornos

### Desarrollo
**Gestión de tareas y planificación:**
- **ClickUp**: Usado para la gestión de proyectos y tareas, para planificar el desarrollo, asignar tareas y gestionar el progreso.

**Control de versiones:**
- **Git + GitHub**: Usado para manejar el control de versiones, colaborar en el código y gestionar revisiones mediante pull requests y ramas.

**Entorno de desarrollo:**
- **Visual Studio Code (VSCode)**: Editor de código utilizado para el desarrollo de la PWA. Ofrece soporte robusto para HTML, CSS y JavaScript, además de extensiones útiles para facilitar el trabajo con frameworks y librerías web.

### Staging
**Testing de la PWA:**
- **Lighthouse**: Usado para realizar auditorías de rendimiento, accesibilidad y mejores prácticas de la PWA en un entorno de staging antes de su lanzamiento.

### Producción
**Servidor:**
- **Hostinger**: Usado para desplegar la PWA en producción. Ofrece un entorno confiable para alojar la aplicación y garantizar su disponibilidad para los usuarios finales.


## Pila Tecnológica

- **Node.js**
  ![Node.js]([https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg](https://www.google.com/url?sa=i&url=http%3A%2F%2Fpbox.me%2Fpackages%2Fnodejs-portable&psig=AOvVaw1ZBbf6LGMg88qb49Ayd6oD&ust=1727753349713000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOCCsvfc6YgDFQAAAAAdAAAAABAE))

- **Express**
  ![Express](https://expressjs.com/images/express-facebook-share.png)

- **React**
  ![React](https://reactjs.org/logo-og.png)

- **MySQL**
  ![MySQL](https://www.mysql.com/common/logos/logo-mysql-170x115.png)


## Instalación
Sigue estos pasos para instalar y configurar el proyecto en tu entorno local.

1. Clona el repositorio:
    ```bash
    git clone https://github.com/EmmanuelR214/LaBarbada2.git
    ```

2. Entra en el directorio del proyecto:
    ```bash
    cd LaBarbada2
    ```

3. Instala las dependencias:
    ```bash
    npm install
    ```

4. Ejecuta el proyecto localmente:
    ```bash
    npm start
    ```

## Uso
Después de la instalación, puedes acceder a la aplicación en tu navegador en `http://localhost:3000`.




