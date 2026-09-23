import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { routes } from '../../../app.routes';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './navbar.html',
})
export class Navbar {

  //Este router es un objeto en el cuál está toda la información de la ruta
  router = inject(Router);

  //Con esto creamos un arreglo de rutas
  routes = routes.map( route => ({
    path: route.path,
    title: `${route.title ?? 'Mapas en Angular'}`
    //El title lo ponemos entre back ticks de esta manera para que el tipado
    //sea mas facil de leer. Ahora el title es de tipo string. 
  }) ).filter( (route) => route.path !== '**' );
  //Usamos el .filter para pedir que nos enseñe todas las rutas que son diferentes al /**,
  // que es la última ruta que definimos en los routes. De esta manera, en nuestro menú
  // aparecerán todas las rutas que definimos, menos la última.


  //*Opción con observables
  pageTitle$ = this.router.events.pipe(
    filter( event => event instanceof NavigationEnd ),
    // tap( event => console.log(event)),
    map( event => event.url ),
    map( url => routes.find( route => `/${ route.path}` === url )?.title ?? 'Mapas' )
    // Este último map dice lo siguiente: búsca dentro de los routes lo siguiente: 
    // Si el path es igual al url del map anterior, muéstrame el title (el que definimos en los routes)
    // Si no hay título, pon en su lugar 'Mapas'
  );

  //* Opción con señales - para transformar una observable a una señal, podemos quitar el $(es solo un identificador)
  //* y meter todo en la función toSignal() 
  // pageTitle = toSignal(
  //   this.router.events.pipe(
  //     filter( event => event instanceof NavigationEnd ),
  //     map( event => event.url ),
  //     map( url => routes.find( route => `/${ route.path}` === url )?.title ?? 'Mapas' )
  //   )
  // ) 

}
