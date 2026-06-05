# [app]

## Descripción
Esta es una aplicación web Frontend desarrollada en JavaScript Vanilla para la materia 'Aplicaciones Web Cliente' que consume una API externa (Dummy API) para renderizar un catálogo de productos. 

## Tecnologías utilizadas
* HTML5
* CSS3
* JavaScript (Fetch API)
* Docker
* NGINX (Imagen base)

## Requisitos previos
Para ejecutar este proyecto de forma local mediante contenedores, necesitas tener instalado:
* Docker Desktop.
* Git.

## Pasos de instalación y ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/lucasbauer-glitch/Aplicaciones-Web-Cliente]
   cd [AppWeb]
2. **Construcción de la imagen Docker:**
    En una terminal de bash correr los siguientes comandos
    docker build -t app .
3. **Ejecución del contenedor:**
    docker run -d -p 8080:80 app
4. **Verificación:**
    Abre tu navegador web e ingresa a http://localhost:8080