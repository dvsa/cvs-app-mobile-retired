import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPreparerPage } from './add-preparer';
import { PipesModule } from "../../../../pipes/pipes.module";
import { DirectivesModule } from "../../../../directives/directives.module";

@NgModule({
  declarations: [
    AddPreparerPage,
  ],
  imports: [
    PipesModule,
    DirectivesModule,
    IonicPageModule.forChild(AddPreparerPage),
  ],
})
export class AddPreparerPageModule {}
