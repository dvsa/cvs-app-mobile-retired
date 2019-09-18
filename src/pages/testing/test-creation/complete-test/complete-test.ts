import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AlertController,
  ItemSliding,
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ActionSheetController, Events, ViewController
} from 'ionic-angular';
import { DefectDetailsModel } from "../../../../models/defects/defect-details.model";
import { DefectsService } from "../../../../providers/defects/defects.service";
import {
  APP,
  DEFICIENCY_CATEGORY, FIREBASE, PAGE_NAMES,
  REG_EX_PATTERNS,
  TEST_TYPE_FIELDS,
  TEST_TYPE_INPUTS, TEST_TYPE_RESULTS, FIREBASE_DEFECTS
} from "../../../../app/app.enums";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { TestTypeModel } from "../../../../models/tests/test-type.model";
import { TestTypeService } from "../../../../providers/test-type/test-type.service";
import { VisitService } from "../../../../providers/visit/visit.service";
import { TestTypesFieldsMetadata } from "../../../../assets/app-data/test-types-data/test-types-fields.metadata";
import { TestTypeDetailsInputPage } from "../test-type-details-input/test-type-details-input";
import { VehicleService } from "../../../../providers/vehicle/vehicle.service";
import { DefectCategoryReferenceDataModel } from "../../../../models/reference-data-models/defects.reference-model";
import { FirebaseLogsService } from "../../../../providers/firebase-logs/firebase-logs.service";
import { NotifiableAlterationTestTypesData } from "../../../../assets/app-data/test-types-data/notifiable-alteration-test-types.data";

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
  fromTestReview;
  defectsCategories: DefectCategoryReferenceDataModel[];
  isCertificateNumberFocused: boolean;
  today: string;
  patterns;
  changeBackground: boolean = false;
  notifiableAlterationTestTypesDataIds: string[] = NotifiableAlterationTestTypesData.NotifiableAlterationTestTypesDataIds;
  isNotifiableAlteration: boolean;
  isNotifiableAlterationError: boolean;
  TEST_TYPE_RESULTS: typeof TEST_TYPE_RESULTS = TEST_TYPE_RESULTS;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public visitService: VisitService,
              public defectsService: DefectsService,
              private alertCtrl: AlertController,
              private testTypeService: TestTypeService,
              private actionSheetCtrl: ActionSheetController,
              private modalCtrl: ModalController,
              private events: Events,
              private cdRef: ChangeDetectorRef,
              private vehicleService: VehicleService,
              private viewCtrl: ViewController,
              private firebaseLogsService: FirebaseLogsService) {
    this.vehicle = navParams.get('vehicle');
    this.vehicleTest = navParams.get('vehicleTest');
    this.completedFields = navParams.get('completedFields');
    this.fromTestReview = navParams.get('fromTestReview');
    this.patterns = REG_EX_PATTERNS;
    this.isCertificateNumberFocused = false;
  }

  ngOnInit(): void {
    this.today = new Date().toISOString();
    this.testTypeFields = TEST_TYPE_FIELDS;
    this.testTypeDetails = this.getTestTypeDetails();
    this.updateTestType();
    this.defectsService.getDefectsFromStorage().subscribe(
      (defects: DefectCategoryReferenceDataModel[]) => {
        this.defectsCategories = defects;
      }
    );
  }

  ionViewWillEnter() {
    this.isNotifiableAlterationError = false;
    this.isNotifiableAlteration = this.notifiableAlterationTestTypesDataIds.indexOf(this.vehicleTest.testTypeId) !== -1;
  }

  ionViewDidEnter() {
    if (this.fromTestReview && this.vehicleTest.testResult === TEST_TYPE_RESULTS.ABANDONED) {
      this.viewCtrl.dismiss(this.vehicleTest);
    }
  }

  updateTestType() {
    for (let section of this.testTypeDetails.sections) {
      for (let input of section.inputs) {
        if (this.completedFields.hasOwnProperty(input.testTypePropertyName)) {
          this.vehicleTest[input.testTypePropertyName] = this.completedFields[input.testTypePropertyName];
        } else {
          if (input.defaultValue && input.values && !this.vehicleTest[input.testTypePropertyName]) {
            for (let inputValue of input.values) {
              if (input.defaultValue === inputValue.text) {
                this.completedFields[input.testTypePropertyName] = this.vehicleTest[input.testTypePropertyName] = inputValue.value;
              }
            }
          }
        }
        if (this.testTypeDetails.category === 'B' && input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_CARRIED_OUT) {
          this.completedFields[input.testTypePropertyName] = this.vehicleTest[input.testTypePropertyName] = true;
        }
      }
    }
  }

  getTestTypeDetails() {
    let testTypesFieldsMetadata = TestTypesFieldsMetadata.FieldsMetadata;
    for (let testTypeFieldMetadata of testTypesFieldsMetadata) {
      if (this.vehicleTest.testTypeId === testTypeFieldMetadata.testTypeId) {
        return testTypeFieldMetadata;
      }
    }
  }

  createDDLButtonHandler(input, index) {
    this.vehicleTest[input.testTypePropertyName] = input.values[index].value;
    if (input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_CARRIED_OUT) {
      if (input.values[index].value) {
        this.completedFields[TEST_TYPE_INPUTS.SIC_LAST_DATE] = this.vehicleTest[TEST_TYPE_INPUTS.SIC_LAST_DATE] = this.today;
      } else {
        this.completedFields[TEST_TYPE_INPUTS.SIC_LAST_DATE] = this.vehicleTest[TEST_TYPE_INPUTS.SIC_LAST_DATE] = null;
        this.completedFields[TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER] = this.vehicleTest[TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER] = null;
      }
    }
    if (input.testTypePropertyName !== 'testResult' && input.testTypePropertyName !== 'certificateNumber') {
      this.completedFields[input.testTypePropertyName] = input.values[index].value;
    }
  }

  createDDLButtons(input) {
    let buttons = [];
    for (let index in input.values) {
      let button = {
        text: input.values[index].text,
        cssClass: input.values[index].cssClass,
        handler: () => {
          this.createDDLButtonHandler(input, index);
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

  canDisplayInput(input) {
    if (this.testTypeDetails.category === 'B' && input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_CARRIED_OUT) {
      return false;
    }
    if (this.completedFields[TEST_TYPE_INPUTS.SIC_CARRIED_OUT] && input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_LAST_DATE) {
      if (!this.completedFields[TEST_TYPE_INPUTS.SIC_LAST_DATE]) {
        this.completedFields[TEST_TYPE_INPUTS.SIC_LAST_DATE] = this.vehicleTest[TEST_TYPE_INPUTS.SIC_LAST_DATE] = this.today;
      }
      return false;
    }
    if (input.dependentOn && input.dependentOn.length) {
      for (let dep of input.dependentOn) {
        if (this.completedFields[dep.testTypePropertyName] && this.completedFields[dep.testTypePropertyName] === dep.valueToBeDifferentFrom) {
          return false;
        }
      }
    }
    return true;
  }

  openInputPage(section, input) {
    const INPUT_MODAL = this.modalCtrl.create('TestTypeDetailsInputPage', {
      vehicleCategory: this.testTypeDetails.category,
      sectionName: section.sectionName,
      input: input,
      existentValue: this.completedFields[input.testTypePropertyName] || null,
      fromTestReview: this.fromTestReview
    });
    INPUT_MODAL.onDidDismiss(data => {
      if (data.inputValue) {
        this.vehicleTest[input.testTypePropertyName] = data.inputValue;
        this.completedFields[input.testTypePropertyName] = data.inputValue;
      }
      if (data.fromTestReview) {
        this.fromTestReview = data.fromTestReview;
      }
    });
    INPUT_MODAL.present();
  }

  onDatetimeChange(value, key) {
    this.cdRef.detectChanges();
    this.vehicleTest[key] = value;
  }

  onSave() {
    this.isNotifiableAlterationError = false;
    if (this.isNotifiableAlteration && this.vehicleTest.testResult === TEST_TYPE_RESULTS.FAIL && !this.vehicleTest.additionalNotesRecorded) {
      this.isNotifiableAlterationError = true;
      return;
    }
    this.vehicleTest.testResult = this.testTypeService.setTestResult(this.vehicleTest, this.testTypeDetails.hasDefects);
    this.visitService.updateVisit();
    this.events.publish(APP.TEST_TYPES_UPDATE_COMPLETED_FIELDS, this.completedFields);
    if (this.fromTestReview) {
      this.viewCtrl.dismiss(this.vehicleTest);
    } else {
      this.navCtrl.pop();
    }
  }

  addDefect(): void {
    this.navCtrl.push('AddDefectCategoryPage', {
      vehicleType: this.vehicle.techRecord.vehicleType,
      vehicleTest: this.vehicleTest,
      defects: this.defectsCategories,
      fromTestReview: this.fromTestReview
    });
    this.firebaseLogsService[FIREBASE_DEFECTS.ADD_DEFECT_TIME_TAKEN][FIREBASE_DEFECTS.ADD_DEFECT_START_TIME] = Date.now();
  }

  openDefect(defect: DefectDetailsModel): void {
    if (defect.deficiencyCategory.toLowerCase() != DEFICIENCY_CATEGORY.ADVISORY.toLowerCase()) {
      this.navCtrl.push('DefectDetailsPage', {
        vehicleTest: this.vehicleTest,
        deficiency: defect,
        isEdit: true,
        fromTestReview: this.fromTestReview
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
      message: 'This action will remove this defect.',
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

  onRemoveTestType(vehicle, vehicleTest) {
    this.changeBackground = true;
    const confirm = this.alertCtrl.create({
      title: 'Remove test type',
      message: 'This action will remove this test type from the vehicle.',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Remove',
          handler: () => {
            this.removeTestType(vehicle, vehicleTest);
          }
        }
      ]
    });
    confirm.present();
    confirm.onDidDismiss(() => this.changeBackground = false);
  }

  removeDefect(defect) {
    this.testTypeService.removeDefect(this.vehicleTest, defect);
  }

  removeTestType(vehicle: VehicleModel, vehicleTest: TestTypeModel) {
    this.firebaseLogsService.logEvent(FIREBASE.REMOVE_TEST_TYPE, FIREBASE.TEST_TYPE_NAME, vehicleTest.testTypeName);
    this.vehicleService.removeSicFields(vehicle, this.completedFields);
    this.vehicleService.removeTestType(vehicle, vehicleTest);
    this.navCtrl.pop();
  }

  abandonTestType(vehicleType: string, vehicleTest: TestTypeModel) {
    this.navCtrl.push(PAGE_NAMES.REASONS_SELECTION_PAGE, {
      vehicleTest: vehicleTest,
      vehicleType: vehicleType,
      altAbandon: true,
      fromTestReview: this.fromTestReview
    });
  }

  shouldDisplayRoadworthinessCertificate(): boolean {
    if (this.testTypeDetails.hasRoadworthinessCertificate &&
      this.testTypeService.setTestResult(this.vehicleTest, this.testTypeDetails.hasDefects) !== TEST_TYPE_RESULTS.FAIL) return true;
    return false;
  }
}
