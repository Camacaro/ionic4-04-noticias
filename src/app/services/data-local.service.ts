import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

    noticias: Article[] = [];

    constructor(private storage: Storage,
                public toastController: ToastController) {

        this.cargarFavorito();
    }

    guardarNoticia( noticia: Article ) {

        /** Con find lo que hago es si encuentro alguna que coincida en mi arreglo lo retorna 
         * y si no retorna undefined
         */
        const existe = this.noticias.find( noti => noti.title === noticia.title );

        if ( !existe ) {

            /** Guardamos la noticia en la primera posicion del arreglo */
            this.noticias.unshift( noticia );

            this.storage.set('favoritos', this.noticias);
        }

    }

    async cargarFavorito() {

        const favoritos = await this.storage.get('favoritos');

        if ( favoritos ) {

            this.noticias = favoritos;
        }

    }

    BorrarNoticia( noticia: Article ) {

        /** Esto me va a retornar todas las noticias que sean diferentes al titulo de la noticia pasada */
        this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );

        this.storage.set('favoritos', this.noticias);
    }

    async alertInformativa( message: string ) {

        const toast = await this.toastController.create({
          message,
          duration: 2000
        });

        toast.present();
      }
}
