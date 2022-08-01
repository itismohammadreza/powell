import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output,} from '@angular/core';
import {icon, latLng, marker, Marker, tileLayer} from 'leaflet';

@Component({
  selector: 'ng-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() latLng: [number, number] = [46.879966, -121.726909];
  @Input() zoom: number = 10;
  @Input() height: string = '50vh';
  @Input() readonly: boolean = false;
  @Output() mapChange: EventEmitter<[number, number]> = new EventEmitter();
  options: any;
  layers: Marker<any>[];

  constructor(private cd: ChangeDetectorRef) {
  }

  onMapReady(event: any): void {
    event.on('click', this.onMapClick.bind(this));
  }

  ngOnInit(): void {
    this.options = {
      layers: [tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')],
      zoom: this.zoom,
      center: latLng(this.latLng[0], this.latLng[1]),
    };
    this.layers = [this.setLayer([this.latLng[0], this.latLng[1]])];
  }

  onMapClick(event: any): void {
    if (!this.readonly) {
      this.layers = [this.setLayer([event.latlng.lat, event.latlng.lng])];
      this.cd.detectChanges();
      this.mapChange.emit([event.latlng.lat, event.latlng.lng]);
    }
  }

  setLayer(latLang: any): Marker<any> {
    return marker([latLang[0], latLang[1]], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      }),
    });
  }
}
