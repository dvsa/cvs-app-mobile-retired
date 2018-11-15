import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {DefectCategoryModel} from '../models/defect-category.model';
import {DefectModel} from '../models/defect.model';

@Injectable()
export class DefectCategoryService {

  constructor() {

  }

  getDefectCategories(): Observable<Object[]> {
    return of(DEFECTCATEGORIES);
  }
}

export const DEFECTCATEGORIES: Object[] = [
  new DefectCategoryModel("Identification of the vehicle", null),
  new DefectCategoryModel("Brakes", null),
  new DefectCategoryModel("Steering", null),
  new DefectCategoryModel("Visibility", null),
  new DefectCategoryModel("Lamps, reflectors and electrical equipment", null),
  new DefectCategoryModel("Axles, wheels, tyres and suspension", [
    new DefectCategoryModel("Road Wheels and Hubs", null),
    new DefectCategoryModel("Size and Type of Tyres", null),
    new DefectCategoryModel("Condition of Tyres", null),
    new DefectCategoryModel("Suspension", [
      new DefectCategoryModel("A suspension component or its attachment point", null),
      new DefectCategoryModel("Leaf springs and fixings", null),
      new DefectCategoryModel("Coil Spring or Torsion Bar", null),
      new DefectCategoryModel("Air/Fluid Suspension System valves, pipes, valve linkage, bellows and displacer/ accumulator unit", null),
      new DefectCategoryModel("Bonded Suspension Unit", null),
      new DefectCategoryModel("Shock absorber",
        [new DefectModel("RFF 6a", "Shock absorber missing from a vehicle on which it is a standard component", "MAJOR"),
          new DefectModel("RFF 6b", "Shock absober with an anchorage fractured, unit insecure or with a sleeve damaged so that the unit is not functioning correctly", "MAJOR"),
          new DefectModel("RFF 6c", "Shock absober leaking", "MAJOR"),
          new DefectModel("RFF 6d", "Shock Absorber is with an excessively worn rubber bush or pivot", "MAJOR"),
          new DefectModel("RFF 6e", "Shock absober linkage missing, linkage bracket cracked so that it is likely to fail, fractured or cracked or excessively worn", "MAJOR")
        ]),
      new DefectCategoryModel("Anti roll bar assembly", null)
    ]),
    new DefectCategoryModel("Axles, Stub Axles and Wheel Bearings", null)
  ]),
  new DefectCategoryModel("Body, struture and attachments", null),
  new DefectCategoryModel("Other equipment", null),
  new DefectCategoryModel("Nuisance", null),
  new DefectCategoryModel("Supplementary test for bus and coaches", null),
  new DefectCategoryModel("Seat belt installation checks", null)

];
