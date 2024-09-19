import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, limit, orderBy, query, where } from '@angular/fire/firestore';
import { Comment } from '../models/comment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private firestore: Firestore) { }

  // Función para guardar datos de commentForm (que es el nombre y el comentario que el usuario ha ingresado  en el formulario junto con id y createdAt) en una colección específica de Database de Firestore. Esta función va a ser llamada en el componente comment-form
  async addComments(commentForm: Comment) {
    const postsCollection = collection(this.firestore, 'comments'); // Crea/obtiene la colección 'comments' en firestore
    const docRef = await addDoc(postsCollection, commentForm);   // Añade el documento a la colección comments creada.
    console.log('Subscriber saved Successfully ..!')
  }



  //La función loadData(urlId: any)  interactúa con Firestore  Database para obtener  posts filtrados de la colección comments por un id específico (urlId).  Todos los comentarios que esten escritos en el mismo post tienen el mismo urlId.  Esta funión se utiliza en el componente comment-list
  loadData(urlId: any): Observable<any[]> {
    const postsCollection = collection(this.firestore, 'comments'); // Crea/obtiene la colección 'comments' en firestore

    const commentPostsQuery = query(
      postsCollection,
      where('postId', '==', urlId), // Crea la consulta para filtrar los posts con postId == urlId. postId lo recibe de singlePostComponent
      orderBy('createdAt', 'desc'), // Ordena por 'createdAt' de más reciente a más antiguo
      limit(100) // Aquí limitamos el número de documentos a 100
    );

    return collectionData(commentPostsQuery, { idField: 'id' }).pipe( //collectionData: Función que se utiliza para obtener los datos de la colección. En este caso, quiero obtener datos de la colección 'comments' cuyos post tengan su propiedad postId igual que el docId. Quiero incluir el ID del documento en los datos resultantes.
      map(docs => docs.map(doc => { //docs: Es el array de documentos que obtuviste de la colección.
        const { id, ...data } = doc; //const { id, ...data } = doc;: Desestructuración del objeto doc. Extrae el campo id y el resto de los datos se agrupan en data.
        return { id, ...data }; // Retorna un array de objetos. se veria de esta forma: [{id: '819Jhcer0Xxk1oUXzEru', createdAt: _Timestamp, postId: 'ZE5P2bYUyvskqk1Hp4Z4', comment: 'marta', name: 'marta'}, {...}]
      }))
    );
  }




}
