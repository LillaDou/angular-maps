import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import {Map} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [],
  templateUrl: './fullscreen-map-page.html',
  styles: `
    div {
      width: 100w;
      height: 100vh;
    }
  `
})
export class FullscreenMapPage implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');

  async ngAfterViewInit() {

    if(!this.divElement() ) return;

    // await new Promise( (resolve) => setTimeout( () => resolve, 80 ));

    const element = this.divElement()?.nativeElement;
    console.log(element);

    const map = new Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/globe.json', // style URL
      center: [0, 0], // starting position [lng, lat]
      zoom: 1,// starting zoom
    })
  }

}
