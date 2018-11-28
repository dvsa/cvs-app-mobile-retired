import { VehicleTestModel } from './vehicle-test.model';

export class VehicleModel {
  private registration: string;
  private vin: string;
  private type: string;
  private axles: number;
  private make: string;
  private model: string;
  private dtpNumber: number;
  private vehicleTests: VehicleTestModel[];
  private testHistory: VehicleTestModel[];

  constructor(registration: string, vin: string, type: string, axles: number, make: string, model: string, dtpNumber: number, testHistory?: VehicleTestModel[]) {
    this.registration = registration;
    this.vin = vin;
    this.type = type;
    this.axles = axles;
    this.make = make;
    this.model = model;
    this.dtpNumber = dtpNumber;
    this.vehicleTests = [];
    this.testHistory = testHistory;
  }

  _clone(): VehicleModel {
    return new VehicleModel(this.registration, this.vin, this.type, this.axles, this.make, this.model, this.dtpNumber, this.testHistory);
  }

  addVehicleTest(vehicleTest: VehicleTestModel) {
    this.vehicleTests.push(vehicleTest);
  }

  getVehicleTests(): VehicleTestModel[] {
    return this.vehicleTests;
  }

  getRegistration(): string {
    return this.registration;
  }

  getVin(): string {
    return this.vin;
  }

  getType(): string {
    return this.type;
  }

  getVehicleCertificateExpirationDate(): Date {
    let lastCertificateExpirationDate = this.testHistory[0].getCertificateExpirationDate();
    this.testHistory.forEach(test => {
      if (lastCertificateExpirationDate < test.getCertificateExpirationDate()) {
        lastCertificateExpirationDate = test.getCertificateExpirationDate();
      }
    });
    return lastCertificateExpirationDate;
  }
}
