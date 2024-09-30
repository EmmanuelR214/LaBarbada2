# Proyecto PWA - Transformación de Aplicación Web de E-Commerce para Restaurante La Barbada

Este proyecto tiene como objetivo transformar una aplicación web de E-Commerce existente en una **Progressive Web Application (PWA)** para el restaurante La Barbada. Las PWAs permiten a los usuarios disfrutar de una experiencia similar a la de una aplicación nativa, con características como la capacidad de trabajar sin conexión, notificaciones push, y un rendimiento mejorado en dispositivos móviles, todo sin necesidad de descargar la aplicación desde una tienda de aplicaciones.

## Tabla de Contenidos
- [Descripción del Proyecto](#descripción-del-proyecto)
- [Objetivos del Proyecto](#objetivos-del-proyecto)
- [Metodología de Trabajo (Scrum)](#metodología-de-trabajo-scrum)
- [Control de Versiones](#control-de-versiones)
- [Flujo de Trabajo](#flujo-de-trabajo)
- [Estrategia de Versionamiento y Gestión de Ramas](#estrategia-de-versionamiento-y-gestión-de-ramas)
- [Estrategia de Despliegue](#estrategia-de-despliegue)
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

## Metodología de Trabajo (Scrum)
Se está utilizando la metodología **Agile Scrum** para gestionar y ejecutar el proyecto, lo que permite una entrega incremental del producto y la mejora continua a través de ciclos iterativos.

## Control de Versiones
La herramienta seleccionada para el control de versiones es **Git + GitHub**, con las cuales se ha trabajado previamente en otros proyectos. Esta combinación permite un flujo de trabajo ágil y eficiente. El uso de **Pull Requests (PR)** facilita la revisión de código antes de integrar cambios en la rama principal del proyecto.

## Flujo de Trabajo
El flujo de trabajo seleccionado es **GitHub Flow**, que se adapta a las características del proyecto y al tamaño del equipo, compuesto por 2 integrantes. Cada miembro está encargado de una rama dedicada a una tarea específica, como la corrección de errores o la implementación de nuevas funcionalidades. No se realizan cambios directos en la rama principal (**main**), lo que garantiza que solo se integre código estable.

## Estrategia de Versionamiento y Gestión de Ramas
La estrategia de versionamiento elegida es **GitHub Flow** debido a su simplicidad y adaptabilidad a un equipo pequeño. Las ramas están divididas de la siguiente manera:
- **Feature:** Ramas dedicadas a la corrección o cambios de funcionamiento basados en la retroalimentación del cliente. Incluye ajustes de diseño y funcionalidad.
- **Errores:** Rama dedicada a la identificación y corrección de errores de funcionamiento o mejoras en los componentes del proyecto.
- **Máster:** Rama por defecto, donde se fusionan los cambios realizados en las ramas anteriores después de pasar por revisión y pruebas.

## Estrategia de Despliegue
La estrategia seleccionada es **Despliegue Directo (Big Bang)** debido a que solo se cuenta con un servidor, y aunque conlleva riesgos, es una estrategia que permite realizar la implementación de la nueva versión del sistema de una sola vez. 
Algunas características clave de esta estrategia:
- Implementación de la nueva versión en todo el sistema de una vez.
- Menor complejidad en comparación con otras estrategias, ya que no requiere configurar múltiples entornos.
- Riesgos mitigados mediante pruebas exhaustivas en entornos de desarrollo antes del despliegue en producción.
- Apto para proyectos con un volumen de tráfico moderado y actualizaciones no frecuentes.

## Pila tecnologica
- **Node.js** 
- **Express**
- **React**
- **MySQL**

## Instalación
Sigue estos pasos para instalar y configurar el proyecto en tu entorno local.

1. Clona el repositorio:
    ```bash
    git clone https://github.com/usuario/proyecto-pwa.git
    ```

2. Entra en el directorio del proyecto:
    ```bash
    cd proyecto-pwa
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




