import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  InjectFlags,
  Injector,
  Input,
  OnInit,
  Output,
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
  LeafletMouseEvent,
  Map,
  MapOptions,
  marker,
  Marker,
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
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  UntypedFormGroup
} from "@angular/forms";
import {NgError, NgFixLabelPosition} from "@ng/models/forms";

@Component({
  selector: 'ng-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MapComponent),
      multi: true
    }
  ]
})
export class MapComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @Input() value: LatLngLiteral | LatLngLiteral[];
  @Input() label: string;
  @Input() labelWidth: number;
  @Input() hint: string;
  @Input() rtl: boolean;
  @Input() showRequiredStar: boolean = true;
  @Input() labelPos: NgFixLabelPosition = 'fix-top';
  @Input() errors: NgError;
  @Input() disabled: boolean;
  // native properties
  @Input() zoom: number = 10;
  @Input() center: LatLng = latLng(35.68419775656676, 51.38983726501465);
  @Input() height: string = '50vh';
  @Input() readonly: boolean;
  @Input() layers: Layer[] = [];
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
    transform3DLimit: 2 ^ 23,
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
  @Output() zoomChange = new EventEmitter();
  @Output() centerChange = new EventEmitter();
  @Output() onMapMarkerClick = new EventEmitter();
  @Output() onMapClick = new EventEmitter();
  @Output() onMapDoubleClick = new EventEmitter();
  @Output() onMapMouseDown = new EventEmitter();
  @Output() onMapMouseUp = new EventEmitter();
  @Output() onMapMouseMove = new EventEmitter();
  @Output() onMapMouseOver = new EventEmitter();
  @Output() onMapMouseOut = new EventEmitter();
  @Output() onMapMove = new EventEmitter();
  @Output() onMapMoveStart = new EventEmitter();
  @Output() onMapMoveEnd = new EventEmitter();
  @Output() onMapZoom = new EventEmitter();
  @Output() onMapZoomStart = new EventEmitter();
  @Output() onMapZoomEnd = new EventEmitter();

  inputId: string;
  controlContainer: FormGroupDirective;
  ngControl: NgControl;
  map: Map;
  onModelChange: any = (_: any) => {
  };
  onModelTouched: any = () => {
  };

  constructor(private cd: ChangeDetectorRef, private injector: Injector) {
  }

  ngOnInit(): void {
    this.inputId = this.getId();
    let parentForm: UntypedFormGroup;
    let rootForm: FormGroupDirective;
    let currentControl: AbstractControl;
    this.controlContainer = this.injector.get(
      ControlContainer,
      null,
      InjectFlags.Optional || InjectFlags.Host || InjectFlags.SkipSelf
    ) as FormGroupDirective;
    this.ngControl = this.injector.get(NgControl, null);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
      // by default we suppose the ngControl is and instance of NgModel.
      currentControl = this.ngControl.control;
      if (this.controlContainer) {
        parentForm = this.controlContainer.control;
        rootForm = this.controlContainer.formDirective as FormGroupDirective;
        // only when we have a formGroup (here is : controlContainer), we also may have formControlName instance.
        // so we check this condition when we have a controlContainer and overwrite currentControl value.
        if (this.ngControl instanceof FormControlName) {
          currentControl = parentForm.get(this.ngControl.name.toString());
        }
        rootForm.ngSubmit.subscribe(() => {
          if (!this.disabled) {
            currentControl.markAsTouched();
          }
        });
      }
    }
  }

  ngAfterViewInit() {
    if (this.showRequiredStar && this.isRequired()) {
      if (this.label) {
        this.label += ' *';
      }
      this.cd.detectChanges();
    }
  }

  getId() {
    return 'id' + Math.random().toString(16).slice(2);
  }

  isInvalid() {
    if (this.ngControl) {
      const control = this.ngControl.control;
      return (!this.disabled && (control.touched || control.dirty) && control.invalid);
    }
  }

  showError(errorType: string): boolean {
    return (
      this.isInvalid() && this.ngControl.control.hasError(errorType.toLowerCase())
    );
  }

  showHint() {
    let hasError = false;
    for (const error in this.errors) {
      if (this.showError(error)) {
        hasError = true
      };
    }
    return !hasError;
  }

  isRequired(): boolean {
    if (this.ngControl) {
      const control = this.ngControl.control;
      if (control.validator) {
        const validator = control.validator({} as AbstractControl);
        if (validator && validator.required) {
          return true;
        }
      }
    }
    return false;
  };

  writeValue(value: any) {
    this.value = value;
    this.handleMarkerLayers(this.value);
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
    if (this.disabled) {
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
    this.cd.markForCheck();
  }

  emitter(name: string, event: any) {
    (this[name] as EventEmitter<any>).emit(event);
  }

  onMapReady(event: Map): void {
    this.map = event;
  }

  onZoomChange(event) {
    this.zoom = event;
    this.zoomChange.emit(this.zoom);
  }

  onCenterChange(event) {
    this.center = event;
    this.centerChange.emit(this.center);
  }

  _onMapClick(event: LeafletMouseEvent): void {
    if (!this.readonly) {
      const {lat, lng} = event.latlng;
      this.handleMarkerLayers({lat, lng});
      this.onModelChange({lat, lng});
      this.cd.detectChanges();
    }
    this.onMapClick.emit(event);
  }

  handleMarkerLayers(value: LatLngLiteral | LatLngLiteral[]) {
    if (!this.value) {
      return
    }
    if (Array.isArray(value)) {
      this.layers = []
      value.forEach(latlng => {
        this.layers.push(this.getMarkerLayer(latlng));
      })
    } else {
      this.layers = [this.getMarkerLayer(value)];
    }
  }

  getMarkerLayer(latLng: LatLngLiteral): Marker<any> {
    return marker(latLng, {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      }),
    }).on('click', (event: LeafletMouseEvent) => {
      this.onMapMarkerClick.emit(event);
    });
  }
}
