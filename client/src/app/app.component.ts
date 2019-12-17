import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: `<router-outlet> </router-outlet>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client'
  constructor(router: Router) {}
}
