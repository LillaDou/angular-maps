import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl/esm';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.html',
  styles: `
    div {
      width: 100%;
      height: 260px;
    }
  `
})
export class MiniMap implements AfterViewInit{

  divElement = viewChild<ElementRef>('map');
  lngLat = input.required<{lng: number, lat: number}>();
  zoom = input<number>(14);

  async ngAfterViewInit() {
    if( !this.divElement()?.nativeElement ) return;

    await new Promise( (resolve) => setTimeout( resolve, 80) );

    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      accessToken: environment.mapboxKey,
      container: element, // container ID
      center: this.lngLat(), // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: this.zoom(), // starting zoom
      interactive: false, //Esto va a evitar que el usuario pueda mover el mapa creado
      pitch: 30, //Esto le da inclinacion al mapa
    });

    new mapboxgl.Marker().setLngLat( this.lngLat() ).addTo(map);

  }
  

}
