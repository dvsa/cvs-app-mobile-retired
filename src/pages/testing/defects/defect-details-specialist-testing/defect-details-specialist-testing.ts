import {
  AlertController,
  IonicPage,
  NavController,
  NavParams,
  ViewController,
} from 'ionic-angular';
import { ChangeDetectorRef, Component } from '@angular/core';
import { SpecialistCustomDefectModel } from '../../../../models/defects/defect-details.model';
import { TestTypeModel } from '../../../../models/tests/test-type.model';
import { VisitService } from '../../../../providers/visit/visit.service';
import { APP_STRINGS } from '../../../../app/app.enums';
import { TestTypeService } from '../../../../providers/test-type/test-type.service';

@IonicPage()
@Component({
  selector: 'page-defect-details-specialist-testing',
  templateUrl: 'defect-details-specialist-testing.html',
})
export class DefectDetailsSpecialistTestingPage {
  isEdit: boolean;
  defectIndex: number;
  defect: SpecialistCustomDefectModel;
  testType: TestTypeModel;
  errorIncomplete: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private visitService: VisitService,
    private cdRef: ChangeDetectorRef,
    private alertCtrl: AlertController,
    private testTypeService: TestTypeService,
  ) {
    this.isEdit = this.navParams.get('isEdit');
    this.defectIndex = this.navParams.get('defectIndex');
    this.defect = this.navParams.get('defect');
    this.testType = this.navParams.get('testType');
    this.errorIncomplete = this.navParams.get('errorIncomplete');
  }

  ionViewWillEnter() {
    if (!this.isEdit) {
      this.errorIncomplete = false;
    }
  }

  onCancel(): void {
    this.viewCtrl.dismiss();
  }

  onDone(): void {
    this.defect.hasAllMandatoryFields = !!this.defect.referenceNumber && !!this.defect.defectName;
    if (!this.isEdit) {
      this.testType.customDefects.push(this.defect);
    }
    this.visitService.updateVisit();
    this.viewCtrl.dismiss();
  }

  onRemoveDefect(): void {
    const confirm = this.alertCtrl.create({
      title: APP_STRINGS.REMOVE_DEFECT_TITLE,
      message: APP_STRINGS.REMOVE_DEFECT_MSG,
      buttons: [
        {
          text: APP_STRINGS.CANCEL,
          handler: () => {},
        },
        {
          text: APP_STRINGS.REMOVE,
          handler: () => {
            this.testTypeService.removeSpecialistCustomDefect(this.testType, this.defectIndex);
            this.viewCtrl.dismiss();
          },
        },
      ],
    });
    confirm.present();
  }

  onInputChange(field: string, charsLimit: number, value: string): void {
    this.cdRef.detectChanges();
    this.defect[field] = value.length > charsLimit ? value.substring(0, charsLimit) : value;
  }
}
