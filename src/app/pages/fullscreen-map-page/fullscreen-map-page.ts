import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl/esm';
<<<<<<< Updated upstream
=======
import 'mapbox-gl/dist/mapbox-gl.css';
>>>>>>> Stashed changes
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-fullscreen-map-page',
  imports: [],
  templateUrl: './fullscreen-map-page.html',
  styles: `
    div {
      width: 100vw;
      height: calc( 100vh - 64px ) ;
    }
  `
})
export class FullscreenMapPage implements AfterViewInit {

  //Referencia al elemento HTML que mostrara el mapa
  divElement = viewChild<ElementRef>('map');

  async ngAfterViewInit() {
    if( !this.divElement()?.nativeElement ) return;

    await new Promise( (resolve) => setTimeout( resolve, 80) );

    const element = this.divElement()!.nativeElement;
    console.log(element);

    const map = new mapboxgl.Map({
      accessToken: environment.mapboxKey,
      container: element, // container ID
      center: [-71.06776, 42.35816], // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: 9 // starting zoom
    });

  }

}