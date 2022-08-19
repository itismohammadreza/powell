import {Component, OnInit} from '@angular/core';
import {LatLngLiteral} from "leaflet";

@Component({
  selector: 'ng-map-page',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  value: LatLngLiteral[] = [{lat: 51.505, lng: -0.09}, {lat: 35.68419775656676, lng: 51.38983726501465}];

  ngOnInit(): void {
  }
}
