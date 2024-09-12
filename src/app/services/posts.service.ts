import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore, limit, orderBy, query, where } from '@angular/fire/firestore';
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

}
