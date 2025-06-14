import {inject, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

type TrustType = 'html' | 'style' | 'script' | 'url' | 'resourceUrl';

@Pipe({
  name: 'pwSafe',
  standalone: false
})
export class SafePipe implements PipeTransform {
  protected sanitizer = inject(DomSanitizer);

  transform(value: string, type: TrustType = 'html') {
    switch (type) {
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'style':
        return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'script':
        return this.sanitizer.bypassSecurityTrustScript(value);
      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    }
  }
}
