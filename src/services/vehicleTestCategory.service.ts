import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { VehicleTestCategory } from '../models/vehicleTestCategory';
import { VehicleTest } from '../models/vehicleTest';

@Injectable()
export class VehicleTestCategorySevice {
    
    constructor() { }

    getVehicleTestCatergoriesTaxonomy(): Observable<Object[]> {
        return of(VEHICLETESTCATEGORIESTAXONOMY);
    }
}


export const VEHICLETESTCATEGORIESTAXONOMY: Object[] = [
    new VehicleTestCategory("Annual test", [
        new VehicleTest("First time test", null, null, 12, null),
        new VehicleTest("Full test", null, null, 12, null)
    ]),
    new VehicleTestCategory("Retest", [
        new VehicleTest("Paid retest", null, null, 12, null),
        new VehicleTest("Part paid retest", null, null, 12, null),
        new VehicleTest("First paid retest", null, null, 12, null),
        new VehicleTest("First part paid retest", null, null, 12, null),
        new VehicleTest("ADR retest", null, null, 12, null)
    ]),
    new VehicleTest("Prohibition test", null, null, 12, null),
    new VehicleTestCategory("Voluntary test", [
        new VehicleTest("London emissions certificate", null, null, null, null),
        new VehicleTest("Brake test", null, null, null, null),
        new VehicleTest("Smoke test", null, null, null, null),
        new VehicleTest("Lights test", null, null, null, null)
    ]),
    new VehicleTestCategory("Technical test", [
        new VehicleTest("ADR", null, null, 12, null),
        new VehicleTest("TIR", null, null, 12, null),
        new VehicleTest("Notifiable alteration", null, null, 12, null)
    ])
];