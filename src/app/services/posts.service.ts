import { Injectable } from '@angular/core';
import { collection, collectionData, doc, docData, Firestore, increment, limit, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private firestore: Firestore) { }

  //En firestore Database ya tenemos datos guardados en una colección llamada posts.


  //Esta función carga los documentos de la colección posts de Firestore Database que tienen el campo isFeatured como true, incluyendo el ID de cada documento en los datos retornados como un observable. Cuando se suscriban al observable van a obtener  un array de objetos. Esta función se va a utilizar en el componente home
  loadFeatured(): Observable<any[]> {
    const postsCollection = collection(this.firestore, 'posts'); // Crea/obtiene la colección 'posts' en firestore

    const featuredPostsQuery = query(
      postsCollection,
      where('isFeatured', '==', true), // Crea la consulta para filtrar los posts con isFeatured == true
      limit(4) // Aquí limitamos el número de documentos a 4
    );

    return collectionData(featuredPostsQuery, { idField: 'id' }).pipe( //collectionData: Función que se utiliza para obtener los datos de la colección. En este caso, quiero obtener datos de la colección 'posts' cuyos post tengan la propiedad isFeatured en true. Quiero incluir el ID del documento en los datos resultantes.
      map(docs => docs.map(doc => { //docs: Es el array de documentos que obtuviste de la colección.
        const { id, ...data } = doc; //const { id, ...data } = doc;: Desestructuración del objeto doc. Extrae el campo id y el resto de los datos se agrupan en data.
        return { id, ...data }; // Retorna un array de objetos. Se veria de esta forma:  [{id: '0GtB7paWNBUd8CsEpA8h', category: {…}, content: 'q', createdAt: _Timestamp, status: 'new', …}, {...}]
      }))
    );
  }



  //La función loasLasted() está diseñada para obtener documentos de la colección posts en Firestore, ordenados por la fecha en que fueron creados (basado en el campo createdAt) es decir, en orden ascendente. Esto significa que la función devolverá los posts más antiguos primero y los más recientes al final. Devuelve los datos como un observable.  Cuando se suscriban al observable van a obtener  un array de objetos. Esta función se usa en el componente home.
  loasLasted():  Observable<any[]>  {
    const postsCollection = collection(this.firestore, 'posts'); // Crea/obtiene la colección 'posts' en firestore

    const featuredPostsQuery = query( //Crear una consulta para obtener los posts ordenados por createdAt en orden ascendente, de más antiguo a más reciente.
      postsCollection,
      orderBy('createdAt')
    );

    return collectionData(featuredPostsQuery, { idField: 'id' }).pipe( //collectionData: Función que se utiliza para obtener los datos de la colección. En este caso, quiero obtener datos de la colección 'posts'. Quiero incluir el ID del documento en los datos resultantes.
      map(docs => docs.map(doc => { //docs: Es el array de documentos que obtuviste de la colección.
        const { id, ...data } = doc; //const { id, ...data } = doc;: Desestructuración del objeto doc. Extrae el campo id y el resto de los datos se agrupan en data.
        return { id, ...data }; // Retorna un array de objetos. Se veria de esta forma:  [{id: '0GtB7paWNBUd8CsEpA8h', category: {…}, content: 'q', createdAt: _Timestamp, status: 'new', …}, {...}]
      }))
    );
  }




  //La función loadCategoryPosts(categoryId: any)  interactúa con Firestore  Database para obtener  posts filtrados de la colección posts por una categoría específica (categoryId). Esta categoryId es la misma para todos los post de la misma categoria. Es decir, cuando yo escribo el post puedo asignarle diferentes categorias.  Todos los post que tengan asignados la misma categoria tienen la misma categoryId.  Esta funión se utiliza en el componente single-category.
  loadCategoryPosts(categoryId: any): Observable<any[]> {
    const postsCollection = collection(this.firestore, 'posts'); // Crea/obtiene la colección 'posts' en firestore

    const featuredPostsQuery = query(
      postsCollection,
      where('category.categoryId', '==', categoryId), // Crea la consulta para filtrar los posts con category.categoryId == categoryId
      limit(4) // Aquí limitamos el número de documentos a 4
    );

    return collectionData(featuredPostsQuery, { idField: 'id' }).pipe( //collectionData: Función que se utiliza para obtener los datos de la colección. En este caso, quiero obtener datos de la colección 'posts' cuyos post tengan la propiedad isFeatured en true. Quiero incluir el ID del documento en los datos resultantes.
      map(docs => docs.map(doc => { //docs: Es el array de documentos que obtuviste de la colección.
        const { id, ...data } = doc; //const { id, ...data } = doc;: Desestructuración del objeto doc. Extrae el campo id y el resto de los datos se agrupan en data.
        return { id, ...data }; // Retorna un array de objetos. Se veria de esta forma:  [{id: '0GtB7paWNBUd8CsEpA8h', category: {…}, content: 'q', createdAt: _Timestamp, status: 'new', …}, {...}]
      }))
    );
  }




  // Función para cargar datos de un único documento de la colección posts de Database Firestore (el documento cuyo id se encuentre en la url) y devuelve un observable. Cuando te suscribes al observable obtienes un objeto con los datos del documento que luce así: {excerpt: 'El pipe date en Angular se utiliza para formatear..., views: 0, category: {…}, title: 'marta oacaña martin', isFeatured: false, id: "5XGQxPRUk8UmexChS9Y6"...}. Esta función se va a utilizar en el componente single-post
  loadOnePost(postId: any): Observable<any> {
    const postDocRef = doc(this.firestore, `posts/${postId}`); // Obtener la referencia del documento
    return docData(postDocRef, { idField: 'id' }); // Obtener los datos del documento, con el campo `id` incluido si lo deseas
  }




   //La función  loasSimilar(categoryId:any) interactúa con Firestore  Database para obtener  posts filtrados de la colección posts por una categoría específica (categoryId). Esta categoryId es la misma para todos los post de la misma categoria. Es decir, cuando yo escribo el post puedo asignarle diferentes categorias.  Todos los post que tengan asignados la misma categoria tienen la misma categoryId.  Esta funión se utiliza en el componente single-post
  loadSimilar(categoryId:any) {
    const postsCollection = collection(this.firestore, 'posts'); // Crea/obtiene la colección 'posts' en firestore

    const featuredPostsQuery = query(
      postsCollection,
      where('category.categoryId', '==', categoryId), // Crea la consulta para filtrar los posts con category.categoryId == categoryId
      limit(4) // Aquí limitamos el número de documentos a 4
    );

    return collectionData(featuredPostsQuery, { idField: 'id' }).pipe( //collectionData: Función que se utiliza para obtener los datos de la colección. En este caso, quiero obtener datos de la colección 'posts' cuyos post tengan la propiedad isFeatured en true. Quiero incluir el ID del documento en los datos resultantes.
      map(docs => docs.map(doc => { //docs: Es el array de documentos que obtuviste de la colección.
        const { id, ...data } = doc; //const { id, ...data } = doc;: Desestructuración del objeto doc. Extrae el campo id y el resto de los datos se agrupan en data.
        return { id, ...data }; // Retorna un array de objetos. Se veria de esta forma:  [{id: '0GtB7paWNBUd8CsEpA8h', category: {…}, content: 'q', createdAt: _Timestamp, status: 'new', …}, {...}]
      }))
    );
  }



   //La función countViews(postId: any) incrementa en 1 el número de visualizaciones del campo views en un documento de la colección posts en Firestore, identificado por postId. Esta funión se utiliza en el componente single-post
   countViews(postId: any) {
    // Crea el objeto para incrementar las vistas
    const viewsCount = {
      views: increment(1) //Esto le indica a Firebase que debe incrementar el valor del campo views del post en 1
    };

    // Referencia al documento usando 'doc' y actualiza el campo 'views'
    const postDocRef = doc(this.firestore, `posts/${postId}`);

    updateDoc(postDocRef, viewsCount) //Busca el documento con el ID especificado (postId) en la colección posts y actualiza el campo views. Si el campo views ya existe en ese documento, su valor será incrementado en 1. Si el campo views no existe, Firebase creará ese campo con el valor inicial de 1.
      .then(() => {
        console.log('Views count updated..!');
      })
      .catch((error) => {
        console.error('Error updating views count:', error);
      });
  }

}
