import { DefectDetailsModel } from "./defects/defect-details.model";
import { VehicleTestAbandonmentModel } from "./tests/vehicle-test-abandonment.model";

export class VehicleTestModel {
  private name: string;
  private hasPassed: boolean;
  private certificateExpirationDate: Date;
  private certificateLifespanInMonths: number;
  private date: Date;
  private odometerReading: number;
  private odometerMetric: string;
  private defects: DefectDetailsModel[];
  private abandonment: VehicleTestAbandonmentModel;

  constructor(name: string, hasPassed?: boolean, certificateExpirationDate?: Date, certificateLifespanInMonths?: number, date?: Date) {
    this.name = name;
    this.hasPassed = hasPassed;
    this.certificateExpirationDate = certificateExpirationDate;
    this.certificateLifespanInMonths = certificateLifespanInMonths;
    this.date = date;
    this.defects = [];
    this.abandonment = {reasons: [], additionalComment: ''};
  }

  _clone(): VehicleTestModel {
    let clone = new VehicleTestModel(this.name, this.hasPassed, this.certificateExpirationDate, this.certificateLifespanInMonths, this.date);
    clone.setOdometer(this.odometerReading, this.odometerMetric);
    this.defects.forEach(defect => {
      clone.addDefect(defect);
    });
    return clone;
  }

  getCertificateExpirationDate(): Date {
    return this.certificateExpirationDate;
  }

  getName(): string {
    return this.name;
  }

  getDate(): Date {
    return this.date;
  }

  getCertificateLifespanInMonths(): number {
    return this.certificateLifespanInMonths;
  }

  getHasPassed(): boolean {
    return this.hasPassed;
  }

  getOdometerReading(): number {
    return this.odometerReading;
  }

  getDefects(): DefectDetailsModel[] {
    return this.defects;
  }

  getAbandonment(): VehicleTestAbandonmentModel {
    return this.abandonment;
  }

  private passVehicleTest() {
    // if (this.hasPassed == null && this.date == null) {
    this.hasPassed = true;
    this.date = new Date();

    if (this.certificateLifespanInMonths && this.certificateExpirationDate == null) {
      this.certificateExpirationDate = this.calculateCertificateExpirationDate(this.date, this.certificateLifespanInMonths);
    }
    // }
  }

  private failVehicleTest() {
    // if (this.hasPassed == null && this.date == null) {
    this.hasPassed = false;
    this.date = new Date();
    // }
  }

  endVehicleTest() {
    // check for defects, if yes -> passVechicleTest, if no -> failVehicleTest
    if (this.checkPass()) {
      this.passVehicleTest();
    } else {
      this.failVehicleTest();
    }
  }

  checkPass(): Boolean {
    let foundCriticalDefect = true;
    this.defects.forEach(defect => {
      if (defect.deficiencyCategory.toLowerCase() == "major" || defect.deficiencyCategory.toLowerCase() == "dangerous") {
        foundCriticalDefect = false;
      }
    });
    return foundCriticalDefect;
  }

  private calculateCertificateExpirationDate(date: Date, certificateLifespanInMonths: number): Date {
    let certificateExpirationDate = new Date(date.toUTCString());
    certificateExpirationDate.setMonth(certificateExpirationDate.getMonth() + certificateLifespanInMonths);
    return certificateExpirationDate;
  }

  setOdometer(odometerReading: number, odometerMetric: string) {
    this.odometerReading = odometerReading;
    this.odometerMetric = odometerMetric;
  }

  addDefect(defect: DefectDetailsModel) {
    this.defects.push(defect);
  }

  removeDefect(defect: DefectDetailsModel) {
    let defIdx = this.defects.map((e) => {
      return e.ref
    }).indexOf(defect.ref);
    this.defects.splice(defIdx, 1);
  }

  addAbandonmentReasons(reasons: string[]) {
    this.abandonment.reasons.push(...reasons);
  }

  addAdditionalAbandonmentReason(comment: string) {
    this.abandonment.additionalComment = comment;
  }

}
