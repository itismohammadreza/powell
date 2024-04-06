import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  CRS,
  FitBoundsOptions,
  icon,
  latLng,
  LatLng,
  LatLngBounds,
  LatLngLiteral,
  Layer,
  LeafletEvent,
  LeafletMouseEvent,
  Map,
  MapOptions,
  marker,
  PanOptions,
  tileLayer,
  ZoomOptions,
  ZoomPanOptions
} from 'leaflet';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl
} from "@angular/forms";
import {takeUntil} from "rxjs";
import {NgAddon, NgFixLabelPosition, NgValidation} from "@powell/models";
import {DestroyService} from "@core/utils";
import {PrimeUniqueComponentId} from "@powell/primeng/api";

@Component({
  selector: 'ng-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MapComponent),
      multi: true
    },
    DestroyService
  ]
})
export class MapComponent implements OnInit, ControlValueAccessor, OnChanges {
  @Input() value: LatLngLiteral | LatLngLiteral[];
  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean;
  @Input() labelPos: NgFixLabelPosition;
  @Input() addon: NgAddon;
  @Input() validation: NgValidation;
  @Input() disabled: boolean;
  @Input() multiple: boolean = true;
  @Input() clearMarkerOnClick: boolean = true;
  @Input() showClear: boolean;
  @Input() clearTooltip: string;
  @Input() clearIcon: string = 'pi pi-trash';
  @Input() disableConfigChangeEffect: boolean;
  @Input() selectionLimit: number;
  @Input() id: string = PrimeUniqueComponentId();
  // native properties
  @Input() zoom: number = 10;
  @Input() center: LatLng = latLng(35.68419775656676, 51.38983726501465);
  @Input() height: string = '50vh';
  @Input() readonly: boolean;
  @Input() leafletMinZoom: number = 3;
  @Input() leafletMaxZoom: number = 18;
  @Input() leafletFitBounds: LatLngBounds;
  @Input() leafletMaxBounds: LatLngBounds;
  @Input() zoomOptions: ZoomOptions = {animate: undefined};
  @Input() panOptions: PanOptions = {
    animate: undefined,
    duration: 0.25,
    easeLinearity: 0.25,
    noMoveStart: false
  }
  @Input() zoomPanOptions: ZoomPanOptions = {
    animate: undefined,
    duration: 0.25,
    easeLinearity: 0.25,
    noMoveStart: false
  };
  @Input() fitBoundsOptions: FitBoundsOptions = {
    maxZoom: null,
    animate: undefined,
    duration: 0.25,
    easeLinearity: 0.25,
    noMoveStart: false,
    paddingTopLeft: [0, 0],
    paddingBottomRight: [0, 0],
    padding: [0, 0]
  };
  @Input() options: MapOptions = {
    layers: [tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')],
    preferCanvas: false,
    attributionControl: true,
    zoomControl: true,
    closePopupOnClick: true,
    zoomSnap: 1,
    zoomDelta: 1,
    trackResize: true,
    boxZoom: true,
    doubleClickZoom: true,
    dragging: true,
    crs: CRS.EPSG3857,
    maxBounds: null,
    zoomAnimation: true,
    zoomAnimationThreshold: 4,
    fadeAnimation: true,
    markerZoomAnimation: true,
    inertia: true,
    inertiaDeceleration: 3000,
    easeLinearity: 0.2,
    worldCopyJump: false,
    maxBoundsViscosity: 0.0,
    keyboard: true,
    keyboardPanDelta: 80,
    scrollWheelZoom: true,
    wheelDebounceTime: 40,
    wheelPxPerZoomLevel: 60,
    tapTolerance: 15,
    bounceAtZoomLimits: true
  };
  @Output() zoomChange = new EventEmitter<number>();
  @Output() centerChange = new EventEmitter<LatLng>();
  @Output() onMapMarkerClick = new EventEmitter<LeafletMouseEvent>();
  @Output() onMapClick = new EventEmitter<LeafletMouseEvent>();
  @Output() onMapDoubleClick = new EventEmitter<LeafletMouseEvent>();
  @Output() onMapMouseDown = new EventEmitter<LeafletMouseEvent>();
  @Output() onMapMouseUp = new EventEmitter<LeafletMouseEvent>();
  @Output() onMapMouseMove = new EventEmitter<LeafletMouseEvent>();
  @Output() onMapMouseOver = new EventEmitter<LeafletMouseEvent>();
  @Output() onMapMouseOut = new EventEmitter<LeafletMouseEvent>();
  @Output() onMapMove = new EventEmitter<LeafletEvent>();
  @Output() onMapMoveStart = new EventEmitter<LeafletEvent>();
  @Output() onMapMoveEnd = new EventEmitter<LeafletEvent>();
  @Output() onMapZoom = new EventEmitter<LeafletEvent>();
  @Output() onMapZoomStart = new EventEmitter<LeafletEvent>();
  @Output() onMapZoomEnd = new EventEmitter<LeafletEvent>();
  @Output() onClear = new EventEmitter<void>();

  ngControl: NgControl;
  map: Map;
  layers: Layer[] = [];
  onModelChange: Function = () => {
  };
  onModelTouched: Function = () => {
  };

  constructor(private cd: ChangeDetectorRef,
              private injector: Injector,
              private destroy$: DestroyService) {
  }

  ngOnInit() {
    let parentForm: FormGroup;
    let rootForm: FormGroupDirective;
    let currentControl: AbstractControl;
    const controlContainer = this.injector.get(
      ControlContainer,
      null,
      {optional: true, host: true, skipSelf: true}
    ) as FormGroupDirective;
    this.ngControl = this.injector.get(NgControl, null);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
      currentControl = this.ngControl.control;
      if (controlContainer) {
        parentForm = controlContainer.control;
        rootForm = controlContainer.formDirective as FormGroupDirective;
        if (this.ngControl instanceof FormControlName) {
          currentControl = parentForm.get(this.ngControl.name.toString());
        }
        rootForm.ngSubmit.pipe(takeUntil(this.destroy$)).subscribe(() => {
          if (!this.disabled) {
            currentControl.markAsTouched();
          }
        });
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.handleDisabledState()
  }

  isInvalid() {
    if (this.ngControl) {
      const control = this.ngControl.control;
      return (!this.disabled && (control.touched || control.dirty) && control.invalid);
    }
    return false
  }

  hasError(type: string) {
    return this.isInvalid() && this.ngControl.control.hasError(type);
  }

  showHint() {
    let hasError = false;
    for (const errorKey in this.validation) {
      if (this.hasError(errorKey)) {
        hasError = true;
      }
    }
    return !hasError;
  }

  writeValue(value: any) {
    this.value = value;
    if (value) {
      if (Array.isArray(value)) {
        value.forEach(latlng => {
          this.layers.push(this.getMarkerLayer(latlng));
        })
      } else {
        this.layers = [this.getMarkerLayer(value)];
      }
    }
    this.cd.markForCheck();
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean) {
    this.disabled = val;
    if (!this.map) {
      return
    }
    this.handleDisabledState()
    this.cd.markForCheck();
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }

  onMapReady(event: Map) {
    this.map = event;
  }

  onZoomChange(event: number) {
    this.zoom = event;
    this.zoomChange.emit(this.zoom);
  }

  onCenterChange(event: LatLng) {
    this.center = event;
    this.centerChange.emit(this.center);
  }

  handleDisabledState() {
    if (this.disabled) {
      this.readonly = true;
      this.map.dragging.disable();
      this.map.touchZoom.disable();
      this.map.doubleClickZoom.disable();
      this.map.scrollWheelZoom.disable();
      this.map.boxZoom.disable();
      this.map.keyboard.disable();
      if (this.map.tap) {
        this.map.tap.disable();
      }
    } else {
      this.readonly = false;
      this.map.dragging.enable();
      this.map.touchZoom.enable();
      this.map.doubleClickZoom.enable();
      this.map.scrollWheelZoom.enable();
      this.map.boxZoom.enable();
      this.map.keyboard.enable();
      if (this.map.tap) {
        this.map.tap.enable();
      }
    }
  }

  _onMapClick(event: LeafletMouseEvent) {
    if (!this.readonly && !this.disabled) {
      const selectedLatLngs = this.layers.map((l: any) => l._latlng);
      if (this.multiple) {
        if (selectedLatLngs.length == this.selectionLimit) {
          return
        }
      }
      const {lat, lng} = event.latlng;
      selectedLatLngs.push({lat, lng})
      if (this.multiple) {
        this.layers.push(this.getMarkerLayer({lat, lng}));
        this.value = selectedLatLngs;
        this.onModelChange(selectedLatLngs);
      } else {
        this.layers = [this.getMarkerLayer({lat, lng})];
        this.value = selectedLatLngs[0];
        this.onModelChange(selectedLatLngs[0]);
      }
      this.cd.detectChanges();
    }
    this.onMapClick.emit(event);
  }

  getMarkerLayer(latLng: LatLngLiteral) {
    return marker(latLng, {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      }),
    }).on('click', (event: LeafletMouseEvent) => {
      this.onMapMarkerClick.emit(event);
      if (this.clearMarkerOnClick) {
        const {latlng} = event;
        const idx = this.layers.findIndex(({_latlng: {lat, lng}}: any) => lat == latlng.lat && lng == latlng.lng);
        if (idx != -1) {
          this.layers.splice(idx, 1);
          this.cd.detectChanges()
        }
        const selectedLatLngs = this.layers.map((l: any) => l._latlng);
        this.onModelChange(this.multiple ? selectedLatLngs : selectedLatLngs[0])
      }
    });
  }

  clearMap() {
    this.layers = [];
    this.value = null;
    this.onModelChange(null);
    this.onClear.emit()
  }
}
