import { NgModule } from '@angular/core';
import {FilterByNamePipe} from "./filter-by-name/filter-by-name";

const PIPES = [
  FilterByNamePipe
];

@NgModule({
  declarations: [...PIPES],
  imports: [],
  exports: [...PIPES]
})
export class PipesModule {}
