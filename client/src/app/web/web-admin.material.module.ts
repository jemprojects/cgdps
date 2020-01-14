import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from "@angular/material";

import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "../material.module";
import { MomentDateModule } from "@angular/material-moment-adapter";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    FlexLayoutModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatToolbarModule,
    MomentDateModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    FlexLayoutModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatSelectModule,
    MatToolbarModule,
    MomentDateModule
  ]
})
export class WebAdminMaterialModule {}
