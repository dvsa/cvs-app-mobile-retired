import { Pipe, PipeTransform } from '@angular/core';
import { VehicleModel } from "../../models/vehicle.model";
import { TestTypesModel } from "../../models/reference-data-models/test-types.model";

@Pipe({
  name: 'filterTestTypeByVehicle',
})

export class FilterTestTypeByVehiclePipe implements PipeTransform {
  transform(testTypes: TestTypesModel[], vehicle: VehicleModel) {
    if (!testTypes || !vehicle) {
      return testTypes;
    }
    testTypes = testTypes.filter(
      (elem: TestTypesModel) => {
        return this.filterByVehicle(elem, vehicle);
      })
    return testTypes
  }

  filterByVehicle(elem: TestTypesModel, vehicle: VehicleModel): TestTypesModel | boolean {
    if (elem.forVehicleType.indexOf(vehicle.getType()) == -1) return false;
    if (elem.forVehicleSize.indexOf(vehicle.getSize()) == -1) return false;
    if (elem.forVehicleConfiguration.indexOf(vehicle.getConfiguration()) == -1) return false;
    if (elem.forVehicleAxles && elem.forVehicleAxles.indexOf(vehicle.getAxels()) == -1) return false;
    return elem;
  }
}
