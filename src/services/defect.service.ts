import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { DefectCategory } from '../models/defectCategory';
import {Defect} from '../models/defect';

@Injectable()
export class DefectCategoryService {

     constructor() {

     }

     getDefectCategories(): Observable<Object[]> {
         return of(DEFECTCATEGORIES);
     }


}

export const DEFECTCATEGORIES: Object[] = [
    new DefectCategory("Identification of the vehicle", null),
    new DefectCategory("Brakes", null),
    new DefectCategory("Steering", null),
    new DefectCategory("Visibility", null),
    new DefectCategory("Lamps, reflectors and electrical equipment", null),
    new DefectCategory("Axles, wheels, tyres and suspension", [
        new DefectCategory("Road Wheels and Hubs",null),
        new DefectCategory("Size and Type of Tyres",null),
        new DefectCategory("Condition of Tyres",null),
        new DefectCategory("Suspension",[
            new DefectCategory("A suspension component or its attachment point",null),
            new DefectCategory("Leaf springs and fixings",null),
            new DefectCategory("Coil Spring or Torsion Bar",null),
            new DefectCategory("Air/Fluid Suspension System valves, pipes, valve linkage, bellows and displacer/ accumulator unit",null),
            new DefectCategory("Bonded Suspension Unit",null),
            new DefectCategory("Shock absorber", 
            [   new Defect("RFF 6a","Shock absorber missing from a vehicle on which it is a standard component","MAJOR"),
                new Defect("RFF 6b","Shock absober with an anchorage fractured, unit insecure or with a sleeve damaged so that the unit is not functioning correctly","MAJOR"),
                new Defect("RFF 6c","Shock absober leaking","MAJOR"),
                new Defect("RFF 6d","Shock Absorber is with an excessively worn rubber bush or pivot","MAJOR"),
                new Defect("RFF 6e","Shock absober linkage missing, linkage bracket cracked so that it is likely to fail, fractured or cracked or excessively worn","MAJOR")
        ]),
            new DefectCategory("Anti roll bar assembly",null)
        ]),
        new DefectCategory("Axles, Stub Axles and Wheel Bearings",null)
    ]),
    new DefectCategory("Body, struture and attachments", null),
    new DefectCategory("Other equipment", null),
    new DefectCategory("Nuisance", null),
    new DefectCategory("Supplementary test for bus and coaches", null),
    new DefectCategory("Seat belt installation checks", null)
    
];