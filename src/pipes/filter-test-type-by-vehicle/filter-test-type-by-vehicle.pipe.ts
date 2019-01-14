import { Pipe, PipeTransform } from '@angular/core';
import { TestTypesReferenceDataModel } from "../../models/reference-data-models/test-types.model";
import { VehicleModel } from "../../models/vehicle/vehicle.model";

@Pipe({
  name: 'filterTestTypeByVehicle',
})

export class FilterTestTypeByVehiclePipe implements PipeTransform {
  transform(testTypes: TestTypesReferenceDataModel[], vehicle: VehicleModel) {
    if (!testTypes || !vehicle) {
      return testTypes;
    }
    testTypes = testTypes.filter(
      (elem: TestTypesReferenceDataModel) => {
        return this.filterByVehicle(elem, vehicle);
      });
    return testTypes
  }

  filterByVehicle(elem: TestTypesReferenceDataModel, vehicle: VehicleModel): TestTypesReferenceDataModel | boolean {
    let techRecord = vehicle.techRecord[0];
    if (elem.forVehicleType.indexOf(techRecord.vehicleType.toLowerCase()) == -1) return false;
    if (elem.forVehicleSize.indexOf(techRecord.vehicleSize.toLowerCase()) == -1) return false;
    if (elem.forVehicleConfiguration.indexOf(techRecord.vehicleConfiguration.toLowerCase()) == -1) return false;
    if (elem.forVehicleAxles && elem.forVehicleAxles.indexOf(techRecord.noOfAxles) == -1) return false;
    return elem;
  }
}
