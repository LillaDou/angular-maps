import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl/esm';
import 'mapbox-gl/dist/mapbox-gl.css';
import { environment } from '../../../environments/environment';
import { DecimalPipe, JsonPipe } from '@angular/common';



@Component({
  selector: 'app-fullscreen-map-page',
  imports: [ DecimalPipe, JsonPipe],
  templateUrl: './fullscreen-map-page.html',
  styles: `
    div {
      width: 100vw;
      height: calc( 100vh - 64px ) ;
    };

    #controls {
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      bottom: 25px;
      right: 20px;
      z-index: 9999;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
      width: 250px;
    }
  `
})
export class FullscreenMapPage implements AfterViewInit {

  //Referencia al elemento HTML que mostrara el mapa
  divElement = viewChild<ElementRef>('map');
  map = signal< mapboxgl.Map| null >(null)

  zoom = signal(14);
  coordinates = signal({
    lng: -74.5,
    lat: 40
  })

  //Esto se va a disparar cada vez que cambiemos el valor de zoom
  zoomEffect = effect( () => {
    if( !this.map() ) return;

    this.map()?.setZoom(this.zoom());
    // this.map()?.zoomTo(this.zoom()); //Esta opcion hace que haya un efecto/animacion cuando
    //cambiamos el valor del zoom. Queda muy bonito

  })


  async ngAfterViewInit() {
    if( !this.divElement()?.nativeElement ) return;

    await new Promise( (resolve) => setTimeout( resolve, 80) );

    const element = this.divElement()!.nativeElement;
    const { lat, lng } = this.coordinates(); 

    const map = new mapboxgl.Map({
      accessToken: environment.mapboxKey,
      container: element, // container ID
      center: [lng, lat], // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: this.zoom() // starting zoom
    });

    this.mapListeners(map);
  }

  //Con esto creamos un listener en el mapa para que, cuando el valor del zoom cambie, llegue una notificacion
  //que cambie nuestra senal
  mapListeners( map: mapboxgl.Map ) {
    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    });

    //Cuando terminamos de movernos, actualizara el signal de coordinates para darnos las coordenadas nuevas de 
    //la posicion central
    map.on('moveend', () => {
      const center = map.getCenter();
      this.coordinates.set(center);
    })

    map.on('load', () => {
      console.log('Map loaded');
    })

    map.addControl(new mapboxgl.FullscreenControl() );
    // Anade el boton de full screen, el cual al hacer click, quita cualquier distraccion de la pantalla. 
    //Como por ejemplo, el zoon, las coordenadas...
    map.addControl(new mapboxgl.NavigationControl() );
    //Anade controles en el mapa con el +, -, brujula... propios de mapbox
    map.addControl(new mapboxgl.ScaleControl() );
    //Anade el control de escala en metrosen la parte baja izquierda del mapa


    this.map.set(map);
  }
}