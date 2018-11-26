import { VehicleModel } from './vehicle.model';
import { PreparersModel } from "./preparers/preparers.model";

export class TestReportModel {
  private createdAt: Date;
  private startTime: Date;
  private endTime: Date;
  private vehicles: VehicleModel[];
  private preparer: PreparersModel | string;

  constructor() {
    this.createdAt = new Date();
    this.vehicles = [];
    this.preparer = null;
  }

  getVehicles(): VehicleModel[] {
    return this.vehicles;
  }

  startTestReport() {
    this.startTime = new Date();
  }

  endTestReport() {
    this.endTime = new Date();
  }

  addVehicle(vehicle: VehicleModel) {
    this.vehicles.push(vehicle);
  }

  public addPreparer(value?: PreparersModel) {
    this.preparer = value ? value : 'No preparer ID given';
  }

  getPreparer(): PreparersModel | string {
    return this.preparer;
  }

  getTestReportTitle(): string {
    if (this.vehicles.length < 2) {
      let foundLinkedTest = false;
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

