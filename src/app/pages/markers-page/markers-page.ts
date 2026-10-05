import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl/esm';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.html',
})
export class MarkersPage implements AfterViewInit{
  divElement = viewChild<ElementRef>('map');
  map = signal< mapboxgl.Map| null >(null);

  async ngAfterViewInit() {
     if( !this.divElement()?.nativeElement ) return;
    
    await new Promise( (resolve) => setTimeout( resolve, 80) );

    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      accessToken: environment.mapboxKey,
      container: element, // container ID
      center: [-122.409850, 37.793085], // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: 14,
    });

    //Crear un marcador
    const marker = new mapboxgl.Marker({
      draggable: false, //Podemos mover el marcador por el mapa o no
      color: 'purple',

    })
      .setLngLat([-122.409850, 37.793085])
      .addTo(map);//A que instancia del mapa quiero agregarlo

    marker.on('dragend', (event) => {
      console.log(event)
    });

    this.mapListeners(map);
  };

  mapListeners(map: mapboxgl.Map) {
    console.log('object');
  }

}
