import { VehicleTestModel } from './vehicle-test.model';

export class VehicleModel {
  private registration: string;
  private vin: string;
  private type: string;
  private axles: number;
  private make: string;
  private model: string;
  private dtpNumber: number;
  private configuration: string;
  private size: string;
  private vehicleTests: VehicleTestModel[];
  private testHistory: VehicleTestModel[];

  constructor(registration: string, vin: string, type: string, axles: number, make: string, model: string, dtpNumber: number, configuration: string, size: string, testHistory?: VehicleTestModel[]) {
    this.registration = registration;
    this.vin = vin;
    this.type = type;
    this.axles = axles;
    this.make = make;
    this.model = model;
    this.dtpNumber = dtpNumber;
    this.configuration = configuration;
    this.size = size;
    this.vehicleTests = [];
    this.testHistory = testHistory;
  }

  _clone(): VehicleModel {
    return new VehicleModel(this.registration, this.vin, this.type, this.axles, this.make, this.model, this.dtpNumber, this.configuration, this.size, this.testHistory);
  }

  addVehicleTest(vehicleTest: VehicleTestModel) {
    this.vehicleTests.push(vehicleTest);
  }

  removeVehicleTest(vehicleTest: VehicleTestModel) {
    const foundIndex = this.vehicleTests.indexOf(vehicleTest);
    this.vehicleTests.splice(foundIndex, 1);
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

  getAxels(): number {
    return this.axles;
  }

  getConfiguration(): string {
    return this.configuration;
  }

  getSize(): string {
    return this.size;
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
