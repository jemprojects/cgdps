import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatTabsModule,
  MatToolbarModule
} from "@angular/material";

import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatDatepickerModule,
    MatToolbarModule,
    ReactiveFormsModule

  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatDatepickerModule,
    MatToolbarModule,
ReactiveFormsModule

  ]
})
export class MaterialModule {}
