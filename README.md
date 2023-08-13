# PhotoDrop

Bienvenido a ¡PhotoDrop!

## Tabla de Contenidos

-   [Características](#características)
-   [Instalación](#instalación)
-   [Uso](#uso)
-   [Tecnologías Utilizadas](#tecnologías-utilizadas)
-   [Equipo](#equipo)
-   [Capturas de Pantalla](#capturas-de-pantalla)

## Características

-   En nuestra aplicacion, los usuarios anónimos pueden:
    -   Registrarse
    -   Ver las ultimas fotos publicadas por otros usuarios
    -   Ver el perfil de un usuario con su galería de fotos
    -   Buscar fotos por texto descriptivo
-   Los usuarios registrados pueden ademas:
    -   Logearse
    -   Hacer cambios en sus datos de registro
    -   Hacer publicaciones
    -   Añadir likes a los posts
    -   Comentar fotos
-   Como extras, hemos añadido lo siguiente:
    -   Un sistema de validación de emails
    -   Editar y borrar posts, comentarios y likes

## Instalación

Una vez tengamos abierto el proyecto en nuestro editor de código, abrimos una terminal e insertamos los siguientes comandos:

1. "cd backend" para acceder a la carpeta que contiene el servidor.
2. Una vez situados ahí, insertamos el comando "npm i" para instalar todas las depencias necesarias para su correcto funcionamiento.
3. Ahora que tenemos todo instalado escribimos "npm run dev" para dejar el servidor en funcionamiento.

La parte del backend ya estaría funcionando correctamente, ahora abrimos otra terminal aparte y hacemos lo siguiente:

1. Escribimos "cd frontend/photodrop" para acceder a la parte de front del proyecto.
2. Estando ahí, volvemos a insertar el comando "npm i".
3. Otra vez, ahora que tenemos las depencias instaladas escribimos "npm run dev", aparecerá un enlace, hacemos click sobre él manteniendo la tecla CTRL y se abrirá PhotoDrop
   en nuestro navegador predeterminado.

## Uso

-   Un usuario no registrado podrá navegar por la página principal de PhotoDrop (primer icono del menú de navegación), utilizar la barra de búsquedas (tercer icono del menú de navegación), así como ver los perfiles de los usuarios y sus post.
    Para registrarse, el usuario tan solo deberá dar click al botón del login (último icono del menú de navegación) y dirigirse al registro. Una vez en él, tan solo deberá rellenar los campos requeridos, validar su email a través de un correo que le enviará la aplicación y logearse.

-   Una vez logeado, el usuario podrá interactuar con todos los post de los usuarios dando likes o agregando comentarios. El icono de login cambiará por la foto de perfil del usuario, lo que permitirá ver tu perfil con tus posts. También podrá crear sus propios post dando click en el icono de añadir post(segundo icono del menú de navegación). Los posts, el perfil y los comentarios propios tienen implementado un menú desplegable para editar y borrar.

-   Para cerrar sesión, el usuario deberá dirigirse a su propio perfil. Una vez ahí, hacer click en el menú desplegable y cerrar sesión.

## Tecnologías Utilizadas

-   HTML
-   CSS
-   JavaScript
-   MySQL
-   Node.js
-   React
-   Git

## Equipo

-   Alba Silvent
-   Andres Caruncho
-   Carlos Gascón
-   Joshué Pérez

## Capturas de Pantalla

![HomePage](/FRONTEND/photoDrop/public/readme1.jpg)
![SearchPage](/FRONTEND/photoDrop/public/readme2.jpg)
![ProfilePage](/FRONTEND/photoDrop/public/readme3.jpg)
