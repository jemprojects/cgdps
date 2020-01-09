import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web-admin',
  templateUrl: './web-admin.component.html',
  styleUrls: ['./web-admin.component.css']
})
export class WebAdminComponent implements OnInit {
  siteMapLabel: string
  constructor(public authService: AuthService, public router: Router) {
    this.siteMapLabel = 'CGPDS'
  }

  changeSiteMapLabel(page) {
    this.siteMapLabel = `CGPDS/${page}`
  }

  ngOnInit() { }
  logout() {
    this.authService.logout()
    this.router.navigate(['login'])
  }

}
