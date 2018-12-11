import { Component, OnInit } from '@angular/core';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { PreparerService } from "../../../../providers/preparer/preparer.service";
import { TestReportModel } from "../../../../models/test-report.model";
import { PreparersModel } from "../../../../models/reference-data-models/preparers.model";
import {TestReportService} from "../../../../providers/test-report/test-report.service";


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
              private testReportService: TestReportService) {
    this.testReport = this.testReportService.getTestReport();
  }

  ngOnInit() {
    this.getPreparers();
  }

  getPreparers(): void {
    this.preparerService.getPreparersFromStorage().subscribe(
      (data: PreparersModel[]) => {
        this.preparers = this.filteredPreparers = this.preparerService.search(data, this.searchValue);
      });
  }

  cancelPreparer(): void {
    this.navCtrl.pop();
  }

  selectPreparer(preparer?: PreparersModel): void {
    this.testReportService.addPreparer(preparer);
  }

  presentConfirm(preparer?): void {
    let alert = this.alertCtrl.create({
      title: preparer ? 'Confirm preparer' : 'Continue without preparerID',
      message: preparer ? `You have selected ${preparer.preparerId} as the preparer of this vehicle for testing.` : 'You will not be able to add a preparer for this vehicle later.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Confirm',
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

  detectFocus(): void {
    this.searchbarFocus = !this.searchbarFocus;
  }
}
