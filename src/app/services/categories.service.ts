import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private firestore: Firestore) { }

  //En firestore Database ya tenemos datos guardados en una colección llamada categories.


  // Esta función está diseñada para cargar datos de la colección categories de Firestore y devolver un observable que emite un array de objetos. Cada objeto en el array contiene: el ID del documento y los datos del documento. Esta función se va a utilizar en el componente category-navbar
  loadData(): Observable<any[]> {
    const categoriesCollection = collection(this.firestore, 'categories'); // Crea/obtiene la colección 'categories' en firestore
    return collectionData(categoriesCollection, { idField: 'id' }).pipe( //collectionData: Función que se utiliza para obtener los datos de la colección. En este caso, quiero obtener datos de la colección 'categories'. Quiero incluir el ID del documento en los datos resultantes.
      map(docs => docs.map(doc => { //docs: Es el array de documentos que obtuviste de la colección.
        const { id, ...data } = doc; //const { id, ...data } = doc;: Desestructuración del objeto doc. Extrae el campo id y el resto de los datos se agrupan en data.
        return { id, data }; //return { id, data };: Retorna un nuevo objeto que contiene el id y los data. Se veria de esta forma: [{data: {category: 'hola'} id: "m1VjCvgL6PFXULVTyvKN" }, {data: {category: 'uri'} id: "Zotz2wMaJwVVZn1J79Ws" },  ]
      }))
    );
  }
}
