import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import {TemplateDirective} from "@powell/directives/template";
import {from, isObservable, Observable, of, startWith} from "rxjs";
import {catchError, map} from "rxjs/operators";

interface SuspenseState<T> {
  loading: boolean;
  data: Optional<T>;
  error: Optional<SafeAny>;
}

@Component({
  selector: 'pw-suspense',
  templateUrl: './suspense.component.html',
  standalone: false
})
export class SuspenseComponent<T> implements OnInit, OnChanges, AfterContentInit {
  @Input() data: Optional<Observable<T> | Promise<T>>;
  @Input() validate: Optional<(data: T) => null | string | Error>;
  @Input() spinnerStrokeWidth: number = 4;
  @Input() spinnerFill: Optional<string>;
  @Input() spinnerWidth: string = '70px';
  @Input() spinnerHeight: string = '70px';
  @ContentChildren(TemplateDirective) templates: Optional<QueryList<TemplateDirective>>;

  templateMap: Record<string, TemplateRef<any>> = {};
  state$!: Observable<SuspenseState<T>>;

  ngAfterContentInit() {
    this.templates?.forEach(item => {
      const name = item.type;
      this.templateMap[name] = item.templateRef;
    });
  }

  ngOnInit() {
    if (!this.data) {
      this.state$ = of({loading: true, data: undefined, error: undefined});
      return;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      const obs = isObservable(this.data) ? this.data : from(this.data);

      this.state$ = obs.pipe(
        map((data: T) => {
          if (this.validate) {
            const error = this.validate(data);
            if (error) {
              return {loading: false, data: null, error};
            }
          }
          return {loading: false, data, error: null};
        }),
        startWith({loading: true, data: null, error: null}),
        catchError(error => of({loading: false, data: null, error}))
      );
    }
  }
}
