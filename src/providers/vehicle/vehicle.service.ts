import { VehicleModel } from "../../models/vehicle/vehicle.model";
import { VehicleTestModel } from "../../models/vehicle-test.model";

export class VehicleService {

  createVehicle(vehicle: VehicleModel): VehicleModel {
    let newVehicle = Object.assign({}, vehicle);
    newVehicle.testHistory = [];
    newVehicle.vehicleTests = [];
    return newVehicle;
  }

  addVehicleTest(vehicle: VehicleModel, vehicleTest: VehicleTestModel) {
    vehicle.vehicleTests.push(vehicleTest)
  }

  removeVehicleTest(vehicle: VehicleModel, vehicleTest: VehicleTestModel) {
    const foundIndex = vehicle.vehicleTests.indexOf(vehicleTest);
    vehicle.vehicleTests.splice(foundIndex, 1);
  }

  getVehicleCertificateExpirationDate(vehicle: VehicleModel): Date {
    let lastCertificateExpirationDate = vehicle.testHistory[0].getCertificateExpirationDate();
    vehicle.testHistory.forEach(test => {
      if (lastCertificateExpirationDate < test.getCertificateExpirationDate()) {
        lastCertificateExpirationDate = test.getCertificateExpirationDate();
      }
    });
    return lastCertificateExpirationDate;
  }

}
