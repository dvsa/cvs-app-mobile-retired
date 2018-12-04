import { NgModule } from '@angular/core';
import { SearchPipe } from "./search/search.pipe";
import { ByVehicleTypePipe } from "./by-vehicle-type/by-vehicle-type";
import { FilterTestTypeByVehiclePipe } from './filter-test-type-by-vehicle/filter-test-type-by-vehicle.pipe';

const PIPES = [
  SearchPipe,
  ByVehicleTypePipe,
  FilterTestTypeByVehiclePipe
];

@NgModule({
  declarations: [
    ...PIPES,
  ],
  imports: [],
  exports: [
    ...PIPES,
  ]
})

export class PipesModule {
}
