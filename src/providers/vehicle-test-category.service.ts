import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {VehicleTestCategoryModel} from '../models/vehicle-test-category.model';
import {VehicleTestModel} from '../models/vehicle-test.model';

@Injectable()
export class VehicleTestCategoryService {

  constructor() {
  }

  getVehicleTestCatergoriesTaxonomy(): Observable<Object[]> {
    return of(VEHICLETESTCATEGORIESTAXONOMY);
  }
}

export const VEHICLETESTCATEGORIESTAXONOMY: Object[] = [
  new VehicleTestCategoryModel("Annual test", [
    new VehicleTestModel("First time test", null, null, 12, null),
    new VehicleTestModel("Full test", null, null, 12, null)
  ]),
  new VehicleTestCategoryModel("Retest", [
    new VehicleTestModel("Paid retest", null, null, 12, null),
    new VehicleTestModel("Part paid retest", null, null, 12, null),
    new VehicleTestModel("First paid retest", null, null, 12, null),
    new VehicleTestModel("First part paid retest", null, null, 12, null),
    new VehicleTestModel("ADR retest", null, null, 12, null)
  ]),
  new VehicleTestModel("Prohibition test", null, null, 12, null),
  new VehicleTestCategoryModel("Voluntary test", [
    new VehicleTestModel("London emissions certificate", null, null, 12, null),
    new VehicleTestModel("Brake test", null, null, 1, null), // ONLY FOR ALPHA - SHOULD BE FIXED: set certificateLifespanInMonths to 1 as it was required in the backend, this should not be required in the backend
    new VehicleTestModel("Smoke test", null, null, 1, null), // ONLY FOR ALPHA - SHOULD BE FIXED: set certificateLifespanInMonths to 1 as it was required in the backend, this should not be required in the backend
    new VehicleTestModel("Lights test", null, null, 1, null) // ONLY FOR ALPHA - SHOULD BE FIXED: set certificateLifespanInMonths to 1 as it was required in the backend, this should not be required in the backend
  ]),
  new VehicleTestCategoryModel("Technical test", [
    new VehicleTestModel("ADR", null, null, 12, null),
    new VehicleTestModel("TIR", null, null, 12, null),
    new VehicleTestModel("Notifiable alteration", null, null, 12, null)
  ])
];
