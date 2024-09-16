## Estructura de esta aplicación:

1. Main Pages en la carpeta pages :
- Home Component
- Single-category Component
- Single-post Component
- Terms-and-condition Component
- Contact-us Component
- Abaut-us Component



2. Componentes para áreas comunes de las diferentes páginas en la carpeta Layauts:
- Header Component
- Category-Navbar Component
- Footer Component
- Post-Card Component


3. Componentes únicos en una página:
- Comment-form Component en la carpeta Comments
- Comment-list Component en la carpeta Comments
- Subcription-form Component

4. environments:
- environment.prod.ts
- environment.ts

5. Servicios:
- categories.service en la carpeta services
- posts.service en la carpeta services
- subscribers.service en la carpeta services 

6. Interfaces
post.ts en la carpeta models
sub.ts en la carpeta models

## Este es un breve listado del contenido del proyecto:

1. Uso de Bootstrap al haber lanzado el comando `npm i bootstrap@4.6` y al haber escrito dentro de styles de  angular.json `"node_modules/bootstrap/dist/css/bootstrap.min.css"` para incluir el archivo de Bootstrap como un estilo global, para que estén disponibles en toda la aplicación.

2. Uso de Firebase. Como esta plataforma gratuita nos brinda varias funcionalidades. Lo primero que tenemos que hacer es crear una aplicación en Firebase. Al crearnos la aplicación, vamos a obtener el código de configuracion de la app firebase que vamos a copiar en el archivo environment.prod.ts. Ahora para conectar nuestro proyecto con la app creada en firebase, tenemos que escribir en la terminal de nuestro proyecto: `ng add @angular/fire`. Cuando se termina de instalar, tenemos que importar en el app.module.ts los módulos. En lugar de importar un solo módulo que incluya todas las funcionalidades de Firebase (como Firestore, Authentication, Storage, etc.), ahora necesitas importar y configurar individualmente cada una de las características que vayas a usar en tu proyecto de Angular.

2. 1. En firestore Database ya tenemos datos guardados en una colección llamada categories. En el servicio categories, vamos a cargar datos de la colección categories de Firestore y devolver un observable que emite un array de objetos. Cada objeto en el array contiene: el ID del documento y los datos del documento. Este servicio se va a usar en el componente category-navbar.

2. 2. En firestore Database ya tenemos datos guardados en una colección llamada post. En el servicio posts, en la función loadFeatured() vamos a cargar solo los datos de los post de la colección post de Firestore que tengan la propiedad featured en true, y vamos a devolver un observable que emite un array de objetos. Cada objeto en el array contiene: el ID del documento y los datos del documento. Este servicio se va a usar en el componente home.

2. 3. En firestore Database ya tenemos datos guardados en una colección llamada post. En el servicio posts, en la función loasLasted() vamos a cargar los post de la colección post de Firestore ordenados desde los más antiguos al principio hasta los más nuevos al final y vamos a devolver un observable que emite un array de objetos. Cada objeto en el array contiene: el ID del documento y los datos del documento. Este servicio se va a usar en el componente home.

2. 4. En firestore Database ya tenemos datos guardados en una colección llamada post. En el servicio posts, en la función loadCategoryPosts() obtenemos los posts de la colección posts en Firestore que pertenecen a una categoría específica (basada en el categoryId) devolviendo un observable que emite un array de esos posts, incluyendo sus IDs y datos. Este servicio se va a usar en el componente single-category.

2. 5. En firestore Database ya tenemos datos guardados en una colección llamada post. En el servicio posts, en la función loadOnePost() obtenemos el post de la colección posts en Firestore  cuyo id se encuentre en la url y devuelve un observable. Cuando te suscribes al observable obtienes un objeto con los datos del documento  devolviendo un observable que emite un objeto con los datos del post, incluyendo sus IDs y datos. Este servicio se va a usar en el componente single-post.

2. 6. En firestore Database ya tenemos datos guardados en una colección llamada post. En el servicio posts, en la función  loadSimilar() obtenemos los posts de la colección posts en Firestore que pertenecen a una categoría específica (basada en el categoryId) devolviendo un observable que emite un array de esos posts, incluyendo sus IDs y datos. Este servicio se va a usar en el componente single-post.

2. 7. En firestore Database ya tenemos datos guardados en una colección llamada post. En el servicio posts, tenemos la función countViews(postId: any) que incrementa en 1 el número de visualizaciones del campo views en un documento de la colección posts en Firestore, identificado por postId. Esta funión se utiliza en el componente single-post

2. 8. En el servicio subscribers hemos creados dos funciones que se utilizan conjuntamente en el componente subscription-form. La función checkSubscriber() realiza una consulta en Firestore Database para verificar si un suscriptor con un email específico ya existe en la colección subscribers, y la función subData() guarda el email y el nombre de un suscriptor en la colección subscribers de Firestore Database cuando no existe esta refrencia todavía en la colección. Usando estas dos funciones en conjunto conseguimos que un usuario no se pueda registrar más de 1 vez con el mismo correo.


3. Uso de Formularios Basados en Plantillas y validación de  formulario en el componente  subscription-form. 
