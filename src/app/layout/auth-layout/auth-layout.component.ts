import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  styleUrl: 'auth-layout.component.scss',
  templateUrl: './auth-layout.component.html',
  imports: [
    RouterOutlet,
  ]
})
export class AuthLayoutComponent {
}
