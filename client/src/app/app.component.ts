import { AuthService } from './auth/auth.service'
import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  template: `
    <router-outlet> </router-outlet>
  `,
})
export class AppComponent {
  title = 'CGPDS'
  constructor( public authService: AuthService, router: Router) {}
}

