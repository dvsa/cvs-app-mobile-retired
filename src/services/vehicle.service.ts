import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {VehicleModel} from '../models/vehicle.model';
import {VehicleTestModel} from '../models/vehicle-test.model';

@Injectable()
export class VehicleService {

  constructor() {
  }

  searchVehicle(searchedValue: string): Observable<VehicleModel> {
    let foundVehicle: VehicleModel;
    VEHICLES.forEach(vehicle => {
      if (vehicle.getRegistration().replace(/\s/g, "").toLowerCase() == searchedValue.replace(/\s/g, "").toLowerCase() || vehicle.getVin().toLowerCase() == searchedValue.toLowerCase()) {
        foundVehicle = vehicle._clone();
      }
    });
    return of(foundVehicle);
  }

}


// MOCKED VEHICLES & TESTHISTORY
let historyTest1 = new VehicleTestModel("Annual test", true, new Date(2018, 3, 12), null, new Date(2017, 3, 12));
let historyTest2 = new VehicleTestModel("Annual test", true, new Date(2017, 3, 20), null, new Date(2016, 3, 20));
let historyTest3 = new VehicleTestModel("Annual test", true, new Date(2016, 5, 17), null, new Date(2015, 5, 17));
let historyTest4 = new VehicleTestModel("Annual test", true, new Date(2018, 5, 8), null, new Date(2017, 5, 8));
let historyTest5 = new VehicleTestModel("Annual test", true, new Date(2017, 5, 14), null, new Date(2016, 5, 14));

let vehicle1 = new VehicleModel("AA12 BCD", "123ADF213DAS", "HGV", 3, "IVECO", "1S34RS", 12354, [historyTest3, historyTest4, historyTest5]);
let vehicle2 = new VehicleModel("AB34 ERT", "123ADF213DAS", "Trailer", 2, "DENNISON", "REFRIGERATOR", 45125, [historyTest1, historyTest2]);

export const VEHICLES: VehicleModel[] = [
  vehicle1,
  vehicle2
];
