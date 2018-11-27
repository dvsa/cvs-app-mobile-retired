import { NgModule } from '@angular/core';
import { SearchPipe } from "./search/search.pipe";
import { ByVehicleTypePipe } from "./filter/by-vehicle-type";

const PIPES = [
  SearchPipe,
  ByVehicleTypePipe,
];

@NgModule({
  declarations: [
    ...PIPES
  ],
  imports: [],
  exports: [
    ...PIPES
  ]
})

export class PipesModule {
}
