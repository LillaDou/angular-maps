import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl/esm';
import { environment } from '../../../environments/environment';
import {v4 as UuidV4} from 'uuid';

interface Marker {
  id: string, 
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.html',
})
export class MarkersPage implements AfterViewInit{
  divElement = viewChild<ElementRef>('map');
  map = signal< mapboxgl.Map| null >(null);
  markers = signal<Marker[]>([]);

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

    //*Crear un marcador
    // const marker = new mapboxgl.Marker({
    //   draggable: false, //Podemos mover el marcador por el mapa o no
    //   color: 'purple',

    // })
    //   .setLngLat([-122.409850, 37.793085])
    //   .addTo(map);//A que instancia del mapa quiero agregarlo

    // marker.on('dragend', (event) => {
    //   console.log(event)
    // });

    this.mapListeners(map);
  };

  mapListeners(map: mapboxgl.Map) {
    map.on('click', (event) => this.mapClick(event) );

    this.map.set(map);
  };

  mapClick(event: mapboxgl.MapMouseEvent ) {
    if( !this.map() ) return;

    const map = this.map()!;
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const coords = event.lngLat;

    const mapboxMarker = new mapboxgl.Marker({
      color: color, 
    }).setLngLat(coords)
      .addTo(map);

    const newMarker: Marker = {
      id: UuidV4(),
      mapboxMarker: mapboxMarker,
    };

    // this.markers.set( [ newMarker, ...this.markers() ] );    
    this.markers.update( (markers) => [newMarker, ...markers]);
  }

}
