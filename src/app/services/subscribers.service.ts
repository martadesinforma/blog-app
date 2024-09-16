import { Injectable } from '@angular/core';
import { Sub } from '../models/sub';
import { addDoc, collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private firestore: Firestore) { }

  // Función para guardar datos de subData (que es el usuario que se ha registrado y ha ingresado su nombre y su correo en el formulario) en una colección específica de Database de Firestore. Esta función va a ser llamada en el componente subscribers
  async addSubs(subscriberData: Sub) {
    const postsCollection = collection(this.firestore, 'subscribers'); // Crea/obtiene la colección 'subscribers' en firestore
    const docRef = await addDoc(postsCollection, subscriberData);   // Añade el documento a la colección subscribers creada.
    console.log('Subscriber saved Successfully ..!')
  }


 //La función checkSubscriber realiza una consulta en Firestore para verificar si un suscriptor con un email específico ya existe en la colección subscribers.
  checkSubscriber(subscriberEmail: any): Promise<any | null> {
    const subscribersCollection = collection(this.firestore, 'subscribers'); // Crea/obtiene la colección 'subscribers' en firestore
    const q = query(subscribersCollection, where('email', '==', subscriberEmail)); // Creamos la consulta para buscar por el email
    return getDocs(q) // Ejecuta la consulta y devuelve una promesa que resuelve con un conjunto de documentos que coinciden.
  }


}
