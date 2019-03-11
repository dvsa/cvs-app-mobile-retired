import { Component, OnInit } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PreparerService } from "../../../../providers/preparer/preparer.service";
import { TestModel } from "../../../../models/tests/test.model";
import { APP_STRINGS } from "../../../../app/app.enums";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { PreparersReferenceDataModel } from "../../../../models/reference-data-models/preparers.model";
import { TestService } from '../../../../providers/test/test.service';
import { VisitService } from "../../../../providers/visit/visit.service";


@IonicPage()
@Component({
  selector: 'page-add-preparer',
  templateUrl: 'add-preparer.html',
})
export class AddPreparerPage implements OnInit {
  preparers: PreparersReferenceDataModel[] = [];
  filteredPreparers: PreparersReferenceDataModel[] = [];
  searchValue: string;
  focusOut: boolean = false;
  vehicleData: VehicleModel;
  testData: TestModel;
  activeIndex: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public preparerService: PreparerService,
              private alertCtrl: AlertController,
              private vehicleService: VehicleService,
              private visitService: VisitService,
              private viewCtrl: ViewController,
              private testReportService: TestService) {
    this.vehicleData = this.navParams.get('vehicle');
    this.testData = this.navParams.get('test');
  }

  ngOnInit() {
    this.getPreparers();
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(APP_STRINGS.VEHICLE_DETAILS);
  }

  getPreparers(): void {
    this.preparerService.getPreparersFromStorage().subscribe(
      (data: PreparersReferenceDataModel[]) => {
        this.preparers = this.filteredPreparers = this.preparerService.search(data, this.searchValue);
      });
  }

  selectPreparer(preparer: PreparersReferenceDataModel): void {
    this.focusOut = false;
    this.vehicleService.addPreparer(this.vehicleData, preparer);
  }

  presentConfirm(preparer: PreparersReferenceDataModel): void {
    let alert = this.alertCtrl.create({
      title: !preparer.preparerId ? APP_STRINGS.WITHOUT_PREPARER : APP_STRINGS.CONFIRM_PREPARER,
      message: !preparer.preparerId ? APP_STRINGS.PREPARER_ALERT_MESSAGE : `You have selected ${preparer.preparerId} as the preparer of this vehicle for testing.`,
      buttons: [
        {
          text: APP_STRINGS.CANCEL,
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: APP_STRINGS.CONFIRM,
          handler: () => {
            this.visitService.addTest(this.testData);
            this.testReportService.addVehicle(this.testData, this.vehicleData);
            this.selectPreparer(preparer);
            this.navCtrl.push('TestCreatePage', {
              test: this.testData
            });
          }
        }
      ]
    });
    alert.present();
    alert.onDidDismiss(() => this.activeIndex = null);
  }

  searchList(ev): void {
    this.searchValue = ev.target.value;
    this.filteredPreparers = this.preparerService.search(this.preparers, this.searchValue);
  }

  keepCancelOn(ev, hideCancel?: boolean) {
    this.focusOut = !hideCancel;
  }

}
