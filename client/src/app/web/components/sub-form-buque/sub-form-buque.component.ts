import { Component, OnInit } from '@angular/core';

import { Buques } from '../../models/buques';

@Component({
  selector: 'app-sub-form-buque',
  templateUrl: './sub-form-buque.component.html',
  styleUrls: ['./sub-form-buque.component.css']
})
export class SubFormBuqueComponent implements OnInit {
  buque: Buques
  constructor() { }

  ngOnInit() {
  }

}
//https://blog.ng-classroom.com/blog/angular/compartiendo-info-componentes/

