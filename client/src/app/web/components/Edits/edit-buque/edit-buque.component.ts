import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'

import { Buques } from 'src/app/web/models/buques'
import { BuquesService } from 'src/app/web/services/buques.service'

@Component({
  selector: 'app-edit-buque',
  templateUrl: './edit-buque.component.html',
  styleUrls: ['./edit-buque.component.css']
})
export class EditBuqueComponent implements OnInit {
  buqueKey: string
  buqueInEdition: Buques
  formTitle: string
  constructor(
    private route: Router,
    private ruteActive: ActivatedRoute,
    private servicebuque: BuquesService,

  ) {
    this.buqueInEdition = null
    this.buqueKey = this.ruteActive.snapshot.paramMap.get('id')
  }

  ngOnInit() {
    this.setupFormEditbuque()
  }

  setupFormEditbuque() {
    this.servicebuque.getBuque(this.buqueKey, dto => {
      this.buqueInEdition = new Buques(dto)
      this.formTitle = `Editar transaccion`
    })
  }

  savebuque(buque: Buques) {
    this.servicebuque.updateBuque(
      this.buqueKey,
      buque
    )
    this.backTobuques()
  }

  backTobuques(): void {
    this.route.navigate([`/cgpds/buques/${this.buqueKey}`])
  }
}
