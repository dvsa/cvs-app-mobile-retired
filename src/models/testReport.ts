import { Vehicle } from './vehicle';

export class TestReport {
    private createdAt: Date;
    private startTime: Date;
    private endTime: Date;
    private vehicles: Vehicle[];

    constructor() {
        this.createdAt = new Date();
        this.vehicles = [];
    }

    getVehicles(): Vehicle[] {
        return this.vehicles;
    }

    startTestReport() {
        this.startTime = new Date();
    }

    endTestReport() {
        this.endTime = new Date();
    }

    addVehicle(vehicle: Vehicle) {
        this.vehicles.push(vehicle);
    }

    getTestReportTitle(): string {
        if (this.vehicles.length < 2) {
            var foundLinkedTest = false;
            this.vehicles.forEach(vehicle => {
                if (vehicle.getVehicleTests().length > 1) {
                    foundLinkedTest = true;
                }
            });
            if (foundLinkedTest == false) {
                return "Single Test";
            } else {
                return "Linked Test";
            }
        } else {
            return "Combined Test";
        }
    }
}