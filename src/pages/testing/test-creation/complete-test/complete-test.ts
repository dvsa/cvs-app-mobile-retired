import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AlertController,
  ItemSliding,
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ActionSheetController, Events
} from 'ionic-angular';
import { DefectDetailsModel } from "../../../../models/defects/defect-details.model";
import { DefectsService } from "../../../../providers/defects/defects.service";
import { APP, DEFICIENCY_CATEGORY, TEST_TYPE_FIELDS } from "../../../../app/app.enums";
import { DefectCategoryModel } from "../../../../models/reference-data-models/defects.model";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { TestTypeModel } from "../../../../models/tests/test-type.model";
import { TestTypeService } from "../../../../providers/test-type/test-type.service";
import { VisitService } from "../../../../providers/visit/visit.service";
import { TestTypesFieldsMetadata } from "../../../../assets/app-data/test-types-data/test-types-fields.metadata";
import { TestTypeDetailsInputPage } from "../test-type-details-input/test-type-details-input";

@IonicPage()
@Component({
  selector: 'page-complete-test',
  templateUrl: 'complete-test.html'
})
export class CompleteTestPage implements OnInit {
  vehicle: VehicleModel;
  vehicleTest: TestTypeModel;
  testTypeDetails;
  testTypeFields;
  completedFields;
  defectsCategories: DefectCategoryModel[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public visitService: VisitService,
              public defectsService: DefectsService,
              private alertCtrl: AlertController,
              private testTypeService: TestTypeService,
              private actionSheetCtrl: ActionSheetController,
              private modalCtrl: ModalController,
              private events: Events,
              private cdRef: ChangeDetectorRef) {
    this.vehicle = navParams.get('vehicle');
    this.vehicleTest = navParams.get('vehicleTest');
    this.completedFields = navParams.get('completedFields');
  }

  ngOnInit(): void {
    this.testTypeFields = TEST_TYPE_FIELDS;
    this.testTypeDetails = this.getTestTypeDetails();
    this.updateTestType();
    this.defectsService.getDefectsFromStorage().subscribe(
      (defects: DefectCategoryModel[]) => {
        this.defectsCategories = defects;
      }
    );
  }

  updateTestType() {
    for (let section of this.testTypeDetails.sections) {
      for (let input of section.inputs) {
        if (this.completedFields.hasOwnProperty(input.testTypePropertyName)) {
          this.vehicleTest[input.testTypePropertyName] = this.completedFields[input.testTypePropertyName];
        }
      }
    }
  }

  getTestTypeDetails() {
    let testTypesFieldsMetadata = TestTypesFieldsMetadata.FieldsMetadata;
    for (let testTypeFieldMetadata of testTypesFieldsMetadata) {
      if (this.vehicleTest.id === testTypeFieldMetadata.testTypeId) {
        return testTypeFieldMetadata;
      }
    }
  }

  createDDLButtons(input) {
    let buttons = [];
    for (let index in input.values) {
      let button = {
        text: input.values[index].text,
        cssClass: input.values[index].cssClass,
        handler: () => {
          this.vehicleTest[input.testTypePropertyName] = input.values[index].value;
          if (input.testTypePropertyName !== 'result' && input.testTypePropertyName !== 'certificateNumber') {
            this.completedFields[input.testTypePropertyName] = input.values[index].value;
          }
        }
      };
      buttons.push(button);
    }
    buttons.push({text: 'Cancel', role: 'cancel'});
    return buttons;
  }

  openDDL(input) {
    const ACTION_SHEET = this.actionSheetCtrl.create({
      title: input.title,
      buttons: this.createDDLButtons(input)
    });
    ACTION_SHEET.present();
  }

  getDDLValueToDisplay(input) {
    for (let inputValue of input.values) {
      if (this.completedFields[input.testTypePropertyName] === inputValue.value || this.vehicleTest[input.testTypePropertyName] === inputValue.value) {
        return inputValue.text;
      }
    }
  }

  canDisplaySection(section) {
    if (section.dependentOn && section.dependentOn.length) {
      for (let index in section.dependentOn) {
        if (!this.vehicleTest[section.dependentOn[index]]) {
          return false;
        }
      }
    }
    return true;
  }

  openInputPage(section, input) {
    const INPUT_MODAL = this.modalCtrl.create(TestTypeDetailsInputPage, {
      sectionName: section.sectionName,
      input: input,
      existentValue: this.completedFields[input.testTypePropertyName] || null
    });
    INPUT_MODAL.onDidDismiss(data => {
      if (data) {
        this.vehicleTest[input.testTypePropertyName] = data;
        this.completedFields[input.testTypePropertyName] = data;
      }
    });
    INPUT_MODAL.present();
  }

  onDatetimeChange(value, key) {
    this.cdRef.detectChanges();
    this.vehicleTest[key] = value;
  }

  onSave() {
    this.visitService.updateVisit();
    this.events.publish(APP.TEST_TYPES_UPDATE_COMPLETED_FIELDS, this.completedFields);
    this.navCtrl.pop();
  }

  addDefect(): void {
    this.navCtrl.push('AddDefectCategoryPage', {
      vehicleType: this.vehicle.techRecord[0].vehicleType,
      vehicleTest: this.vehicleTest,
      defects: this.defectsCategories
    });
  }

  openDefect(defect: DefectDetailsModel): void {
    if (defect.deficiencyCategory.toLowerCase() != DEFICIENCY_CATEGORY.ADVISORY.toLowerCase()) {
      this.navCtrl.push('DefectDetailsPage', {
        vehicleTest: this.vehicleTest,
        deficiency: defect,
        isEdit: true
      });
    } else {
      this.navCtrl.push('AdvisoryDetailsPage', {
        vehicleTest: this.vehicleTest,
        advisory: defect,
        isEdit: true
      })
    }
  }

  public convertToNumber(event): number {
    return +event;
  }

  showAlert(item: ItemSliding, defect) {
    const confirm = this.alertCtrl.create({
      title: 'Remove defect',
      message: 'This action wil remove this defect.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            item.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            this.removeDefect(defect);
          }
        }
      ]
    });
    confirm.present();
  }

  removeDefect(defect) {
    this.testTypeService.removeDefect(this.vehicleTest, defect);
  }
}
