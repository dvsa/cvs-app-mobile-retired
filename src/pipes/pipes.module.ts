import {NgModule} from '@angular/core';
import {SearchPipe} from "./search/search.pipe";

const PIPES = [
  SearchPipe
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
