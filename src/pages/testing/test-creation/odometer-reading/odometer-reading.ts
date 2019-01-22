import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActionSheetController, IonicPage, NavController, NavParams, TextInput } from 'ionic-angular';
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { ODOMETER_METRIC } from "../../../../app/app.enums";
import { VisitService } from "../../../../providers/visit/visit.service";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";

@IonicPage()
@Component({
  selector: 'page-odometer-reading',
  templateUrl: 'odometer-reading.html',
})
export class OdometerReadingPage {

  odometerReading: string;
  odometerMetric: string;
  vehicle: VehicleModel;

  @ViewChild('valueInput') valueInput: TextInput;

  constructor(public visitService: VisitService,
              private actionSheetCtrl: ActionSheetController,
              private navCtrl: NavController,
              private navParams: NavParams,
              private vehicleService: VehicleService,
              private cdRef: ChangeDetectorRef) {
    this.vehicle = this.navParams.get('vehicle');
    this.odometerReading = this.vehicle.odometerReading.length ? this.vehicle.odometerReading : '';
    this.odometerMetric = this.vehicle.odometerMetric.length ? this.vehicle.odometerMetric : ODOMETER_METRIC.KILOMETRES;
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.valueInput.setFocus();
    }, 150);
  }

  valueInputChange(value) {
    this.cdRef.detectChanges();
    this.odometerReading = value.length > 7 ? value.substring(0, 7) : value;
  }

  displayOdometerMetricCapitalized() {
    return this.odometerMetric.charAt(0).toUpperCase() + this.odometerMetric.slice(1);
  }

  onSave() {
    this.vehicle = this.vehicleService.setOdometer(this.vehicle, this.odometerReading, this.odometerMetric);
    this.navCtrl.pop();
  }

  onEdit() {
    const actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: 'Kilometres',
          handler: () => {
            this.odometerMetric = ODOMETER_METRIC.KILOMETRES;
          }
        },
        {
          text: 'Miles',
          handler: () => {
            this.odometerMetric = ODOMETER_METRIC.MILES;
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

}