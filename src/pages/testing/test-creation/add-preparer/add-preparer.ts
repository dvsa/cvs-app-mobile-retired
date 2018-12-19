import { Component, OnInit } from '@angular/core';
import { AlertController, IonicPage, NavController, ViewController } from 'ionic-angular';
import { PreparerService } from "../../../../providers/preparer/preparer.service";
import { TestReportModel } from "../../../../models/tests/test-report.model";
import { PreparersModel } from "../../../../models/reference-data-models/preparers.model";
import { TestReportService } from "../../../../providers/test-report/test-report.service";
import { APP_STRINGS } from "../../../../app/app.enums";


@IonicPage()
@Component({
  selector: 'page-add-preparer',
  templateUrl: 'add-preparer.html',
})
export class AddPreparerPage implements OnInit {
  preparers: PreparersModel[] = [];
  filteredPreparers: PreparersModel[] = [];
  testReport: TestReportModel;
  searchValue: string;
  searchbarFocus: boolean = false;

  constructor(public navCtrl: NavController,
              public preparerService: PreparerService,
              private alertCtrl: AlertController,
              private testReportService: TestReportService,
              private viewCtrl: ViewController) {
    this.testReport = this.testReportService.getTestReport();
  }

  ngOnInit() {
    this.getPreparers();
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(APP_STRINGS.VEHICLE_DETAILS);
  }

  getPreparers(): void {
    this.preparerService.getPreparersFromStorage().subscribe(
      (data: PreparersModel[]) => {
        this.preparers = this.filteredPreparers = this.preparerService.search(data, this.searchValue);
      });
  }

  selectPreparer(preparer: PreparersModel): void {
    this.testReportService.addPreparer(preparer);
  }

  presentConfirm(value: PreparersModel | string): void {
    let preparer: PreparersModel = {
      preparerName: '',
      preparerId: null
      },
    noPreparer: boolean = false;
    if (typeof value === 'string') {
      preparer.preparerName = value;
      noPreparer = true;
    } else {
      preparer = value;
      noPreparer = false;
    }
    let alert = this.alertCtrl.create({
      title: noPreparer ? APP_STRINGS.WITHOUT_PREPARER : APP_STRINGS.CONFIRM_PREPARER,
      message: noPreparer ? APP_STRINGS.ALERT_MESSAGE : `You have selected ${preparer.preparerId} as the preparer of this vehicle for testing.`,
      buttons: [
        {
          text: APP_STRINGS.CANCEL,
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: APP_STRINGS.CONFIRM,
          handler: () => {
            this.selectPreparer(preparer);
            this.navCtrl.push('TestCreatePage');
          }
        }
      ]
    });
    alert.present();
  }

  searchList(ev): void {
    this.searchValue = ev.target.value;
    this.filteredPreparers = this.preparerService.search(this.preparers, this.searchValue);
  }

  setFocus(): void {
    this.searchbarFocus = true;
  }

  cancelFocus(): void {
    this.searchbarFocus = false;
  }

}
