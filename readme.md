# CRUD de Contactos - README

Este proyecto es un CRUD (Create, Read, Update, Delete) de contactos que utiliza una API REST/SOAP proporcionada por Oracle para gestionar los datos de contactos. El proyecto incluye un frontend desarrollado en html, css, javascript y algo de bootstrap y un backend proxy construido con Express.js para facilitar las solicitudes a la API de Oracle.

## Características del Proyecto

- **Frontend**: El proyecto se estructuró usando una arquitectura limpia, dividiendo por modulos cada aparatado de la aplicacion web como por ejemplo servicios, enviroments, assets utils, etc. Esto para facilitar la navegacion por el codigo que usa javacript puro.

para inicializar el frontend el comando es: npm run start.
  
- **Backend Proxy**: Utiliza Express.js para actuar como intermediario entre el frontend y la API de Oracle. El backend proxy maneja las solicitudes HTTP/HTTPS a la API y proporciona una interfaz simplificada para el frontend.

para inicializar el proxy el comando es: npm run server.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/)


## Configuración

1. **Clonar el Repositorio**
   git clone 
   cd prueba tecnica

2. **Instalar dependencias**
    npm install

3. **Iniciar backend proxy**
    npm run server

4. **Iniciar Frontend**
    npm run start


## Problemas conocidos
    la documentacion de la api esta desactualizada y no concuerda la estructura de los contactos del metodo post con el request que espera el servidor.
    las consultas de datos especificos como el correo y el telefono se vuelve muy complejo por los enpoint a lo que hay que acceder por lo tanto la carga de los datos se vuelve lenta al consultar los cotactos por el metodo get.
    Debido a la gran cantidad de registros, se limitaron las consultas a solo 20 registros, este datos se puede cambiar en el enpoint del proxy, sin embargo entre mas registros se traigan mas lenta sera la carga.