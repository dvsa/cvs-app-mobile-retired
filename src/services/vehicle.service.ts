import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Vehicle } from '../models/vehicle';
import { VehicleTest } from '../models/vehicleTest';

@Injectable()
export class VehicleService {
    
    constructor() { }

    searchVehicle(searchedValue: string): Observable<Vehicle> {
        var foundVehicle: Vehicle;
        VEHICLES.forEach(vehicle => {
            if (vehicle.getRegistration().replace(/\s/g, "").toLowerCase() == searchedValue.replace(/\s/g, "").toLowerCase() || vehicle.getVin().toLowerCase() == searchedValue.toLowerCase()) {
                foundVehicle = vehicle._clone();
            }
        });
        return of(foundVehicle);
    }

}


// MOCKED VEHICLES & TESTHISTORY
var historyTest1 = new VehicleTest("Annual test", true, new Date(2018, 3, 12), null, new Date(2017, 3, 12));
var historyTest2 = new VehicleTest("Annual test", true, new Date(2017, 3, 20), null, new Date(2016, 3, 20));
var historyTest3 = new VehicleTest("Annual test", true, new Date(2016, 5, 17), null, new Date(2015, 5, 17));
var historyTest4 = new VehicleTest("Annual test", true, new Date(2018, 5, 8), null, new Date(2017, 5, 8));
var historyTest5 = new VehicleTest("Annual test", true, new Date(2017, 5, 14), null, new Date(2016, 5, 14));

var vehicle1 = new Vehicle("AA12 BCD", "123ADF213DAS", "HGV", 3, "IVECO", "1S34RS", 12354, [historyTest3, historyTest4, historyTest5]);
var vehicle2 = new Vehicle("AB34 ERT", "123ADF213DAS", "Trailer", 2, "IVECO", "1S34RS", 45125, [historyTest1, historyTest2]);

export const VEHICLES: Vehicle[] = [
    vehicle1, 
    vehicle2
];