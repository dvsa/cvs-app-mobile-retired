import { VehicleTest } from './vehicleTest';

export class Vehicle {
    private registration: string;
    private vin: string;
    private type: string;
    private axles: number;
    private make: string;
    private model: string;
    private dtpNumber: number;
    private vehicleTests: VehicleTest[];
    private testHistory: VehicleTest[];

    constructor(registration: string, vin: string, type: string, axles: number, make: string, model: string, dtpNumber: number, testHistory?: VehicleTest[]) {
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

    _clone(): Vehicle {
        return new Vehicle(this.registration, this.vin, this.type, this.axles, this.make, this.model, this.dtpNumber, this.testHistory);
    }

    addVehicleTest(vehicleTest: VehicleTest) {
        this.vehicleTests.push(vehicleTest);
    }

    getVehicleTests(): VehicleTest[] {
        return this.vehicleTests;
    }

    getRegistration(): string {
        return this.registration;
    }

    getVin(): string {
        return this.vin;
    }

    getVehicleCertificateExpirationDate(): Date {
        var lastCertificateExpirationDate = this.testHistory[0].getCertificateExpirationDate();
        this.testHistory.forEach(test => {
            if (lastCertificateExpirationDate < test.getCertificateExpirationDate()) {
                lastCertificateExpirationDate = test.getCertificateExpirationDate();
            }
        });
        return lastCertificateExpirationDate;
    }
}