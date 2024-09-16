import { Component } from '@angular/core';
import { Sub } from '../models/sub';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrl: './subscription-form.component.css'
})
export class SubscriptionFormComponent {

  isEmailError: boolean = false;
  isSubscribed: boolean = false;

  constructor(private subscribersService: SubscribersService) { }


  onSubmit(formVal: any) {
    const subscriberData: Sub = {
      name: formVal.name,
      email: formVal.email,
    }


    this.subscribersService.checkSubscriber(subscriberData.email)
      .then(val => {  // Ejecutamos la consulta y devolvemos la promesa que resuelve con los documentos que coinciden con los criterios.
        if (val.empty) { //Si val.empty es true, significa que la consulta a Firestore no encontró ningún documento con el correo electrónico proporcionado en la colección de subscribers. Esto indica que el correo ingresado es nuevo (no existe en la base de datos).
          this.subscribersService.addSubs(subscriberData); //si no existe ningún documento con el correo electrónico proporcionado en la colección de subscribers, quiero que me lo cree con el correo y el nombre ingresados.
          this.isSubscribed = true;
          this.isEmailError = false;
        } else {//Si val.empty es false, significa que la consulta a Firestore si encontró un documento con el correo electrónico  en la colección de subscribers. Esto indica que el correo ingresado no es nuevo (ya existe en la base de datos).
          this.isEmailError = true;
        }
      })
  }
}
