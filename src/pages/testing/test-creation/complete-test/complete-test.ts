import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  Events,
  IonicPage,
  ItemSliding,
  ModalController,
  NavController,
  NavParams,
  ViewController
} from 'ionic-angular';
import {
  DefectDetailsModel,
  SpecialistCustomDefectModel
} from '../../../../models/defects/defect-details.model';
import { DefectsService } from '../../../../providers/defects/defects.service';
import {
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_EVENTS,
  ANALYTICS_LABEL,
  ANALYTICS_SCREEN_NAMES,
  APP,
  DEFICIENCY_CATEGORY,
  DURATION_TYPE,
  MOD_TYPES,
  PAGE_NAMES,
  REG_EX_PATTERNS,
  TEST_TYPE_FIELDS,
  TEST_TYPE_INPUTS,
  TEST_TYPE_RESULTS,
  TEST_TYPE_SECTIONS,
  TIR_CERTIFICATE_NUMBER_PREFIXES,
  VEHICLE_TYPE
} from '../../../../app/app.enums';
import { VehicleModel } from '../../../../models/vehicle/vehicle.model';
import { TestTypeModel } from '../../../../models/tests/test-type.model';
import { TestTypeService } from '../../../../providers/test-type/test-type.service';
import { VisitService } from '../../../../providers/visit/visit.service';
import { TestTypesFieldsMetadata } from '../../../../assets/app-data/test-types-data/test-types-fields.metadata';
import { VehicleService } from '../../../../providers/vehicle/vehicle.service';
import { DefectCategoryReferenceDataModel } from '../../../../models/reference-data-models/defects.reference-model';
import { NotifiableAlterationTestTypesData } from '../../../../assets/app-data/test-types-data/notifiable-alteration-test-types.data';
import { AnalyticsService, DurationService } from '../../../../providers/global';

@IonicPage()
@Component({
  selector: 'page-complete-test',
  templateUrl: 'complete-test.html'
})
export class CompleteTestPage implements OnInit {
  vehicle: VehicleModel;
  vehicleTest: TestTypeModel;
  testTypeDetails;
  testTypeInputs: typeof TEST_TYPE_INPUTS = TEST_TYPE_INPUTS;
  testTypeFields: typeof TEST_TYPE_FIELDS = TEST_TYPE_FIELDS;
  completedFields;
  fromTestReview;
  defectsCategories: DefectCategoryReferenceDataModel[];
  isCertificateNumberFocused: boolean;
  today: string;
  patterns: typeof REG_EX_PATTERNS = REG_EX_PATTERNS;
  changeBackground: boolean = false;
  notifiableAlterationTestTypesDataIds: string[] =
    NotifiableAlterationTestTypesData.NotifiableAlterationTestTypesDataIds;
  isNotifiableAlteration: boolean;
  isNotesIncompleteError: boolean;
  TEST_TYPE_RESULTS: typeof TEST_TYPE_RESULTS = TEST_TYPE_RESULTS;
  errorIncomplete: boolean;
  errorIncompleteCertificateNumber: boolean;
  blockTestResultSelection: boolean;
  vehicleTypes: typeof VEHICLE_TYPE = VEHICLE_TYPE;
  tirCertificateNumberPrefixes: typeof TIR_CERTIFICATE_NUMBER_PREFIXES = TIR_CERTIFICATE_NUMBER_PREFIXES;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public visitService: VisitService,
    public defectsService: DefectsService,
    private alertCtrl: AlertController,
    public testTypeService: TestTypeService,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private events: Events,
    private cdRef: ChangeDetectorRef,
    private vehicleService: VehicleService,
    private viewCtrl: ViewController,
    private durationService: DurationService,
    private analyticsService: AnalyticsService
  ) {
    this.vehicle = navParams.get('vehicle');
    this.vehicleTest = navParams.get('vehicleTest');
    this.completedFields = navParams.get('completedFields');
    this.fromTestReview = navParams.get('fromTestReview');
    this.errorIncomplete = navParams.get('errorIncomplete');
    this.patterns = REG_EX_PATTERNS;
    this.isCertificateNumberFocused = false;
  }

  ngOnInit(): void {
    this.today = new Date().toISOString();
    this.testTypeFields = TEST_TYPE_FIELDS;
    this.testTypeDetails = this.getTestTypeDetails();
    this.updateTestType();
    this.defectsService
      .getDefectsFromStorage()
      .subscribe((defects: DefectCategoryReferenceDataModel[]) => {
        this.defectsCategories = defects;
      });
    if (this.vehicleTest.numberOfSeatbeltsFitted && this.testTypeDetails.category === 'B')
      this.errorIncomplete = false;
    if (
      (this.testTypeService.isAdrTestType(this.vehicleTest.testTypeId) &&
        this.vehicleTest.certificateNumber &&
        this.vehicleTest.certificateNumber.length &&
        this.vehicleTest.certificateNumber.length < 6 &&
        this.errorIncomplete) ||
      (this.testTypeService.isTirTestType(this.vehicleTest.testTypeId) &&
        this.vehicleTest.certificateNumber &&
        this.vehicleTest.certificateNumber.length &&
        this.vehicleTest.certificateNumber.length < 5 &&
        this.errorIncomplete)
    )
      this.errorIncompleteCertificateNumber = true;
  }

  ionViewWillEnter() {
    this.isNotesIncompleteError = false;
    this.isNotifiableAlteration =
      this.notifiableAlterationTestTypesDataIds.indexOf(this.vehicleTest.testTypeId) !== -1;
    this.blockTestResultSelection = this.testTypeService.updateLinkedTestResults(
      this.vehicle,
      this.vehicleTest
    );
  }

  ionViewDidEnter() {
    this.analyticsService.setCurrentPage(ANALYTICS_SCREEN_NAMES.TEST_TYPE_DETAILS);

    if (this.fromTestReview && this.vehicleTest.testResult === TEST_TYPE_RESULTS.ABANDONED) {
      this.viewCtrl.dismiss(this.vehicleTest);
    }
  }

  updateTestType() {
    for (let section of this.testTypeDetails.sections) {
      for (let input of section.inputs) {
        if (this.completedFields.hasOwnProperty(input.testTypePropertyName)) {
          this.vehicleTest[input.testTypePropertyName] = this.completedFields[
            input.testTypePropertyName
          ];
        } else {
          if (
            input.defaultValue &&
            input.values &&
            !this.vehicleTest[input.testTypePropertyName]
          ) {
            for (let inputValue of input.values) {
              if (input.defaultValue === inputValue.text) {
                this.completedFields[input.testTypePropertyName] = this.vehicleTest[
                  input.testTypePropertyName
                ] = inputValue.value;
              }
            }
          }
        }
        if (
          this.testTypeDetails.category === 'B' &&
          input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_CARRIED_OUT
        ) {
          this.completedFields[input.testTypePropertyName] = this.vehicleTest[
            input.testTypePropertyName
          ] = true;
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
    let inputValue = input.values[index].value;
    this.vehicleTest[input.testTypePropertyName] = inputValue;
    if (input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_CARRIED_OUT) {
      if (inputValue) {
        this.completedFields[TEST_TYPE_INPUTS.SIC_LAST_DATE] = this.vehicleTest[
          TEST_TYPE_INPUTS.SIC_LAST_DATE
        ] = this.today;
      } else {
        this.completedFields[TEST_TYPE_INPUTS.SIC_LAST_DATE] = this.vehicleTest[
          TEST_TYPE_INPUTS.SIC_LAST_DATE
        ] = null;
        this.completedFields[TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER] = this.vehicleTest[
          TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER
        ] = null;
      }
    }
    if (
      this.testTypeService.isAdrTestType(this.vehicleTest.testTypeId) &&
      inputValue === TEST_TYPE_RESULTS.FAIL
    ) {
      this.vehicleTest.certificateNumber = null;
      this.vehicleTest.testExpiryDate = null;
    }
    if (this.testTypeService.isLecTestType(this.vehicleTest.testTypeId)) {
      if (inputValue === TEST_TYPE_RESULTS.FAIL) {
        this.vehicleTest.testExpiryDate = null;
        this.vehicleTest.modType = null;
        this.vehicleTest.emissionStandard = null;
        this.vehicleTest.fuelType = null;
        this.vehicleTest.smokeTestKLimitApplied = null;
        this.vehicleTest.particulateTrapFitted = null;
        this.vehicleTest.particulateTrapSerialNumber = null;
        this.vehicleTest.modificationTypeUsed = null;
      }
      if (inputValue === MOD_TYPES.P.toLowerCase()) {
        this.vehicleTest.modificationTypeUsed = null;
      }
      if (inputValue === MOD_TYPES.G.toLowerCase() || inputValue === MOD_TYPES.M.toLowerCase()) {
        this.vehicleTest.particulateTrapFitted = null;
        this.vehicleTest.particulateTrapSerialNumber = null;
        this.vehicleTest.modificationTypeUsed = null;
      }
    }
    if (
      this.testTypeService.isTirTestType(this.vehicleTest.testTypeId) &&
      inputValue === TEST_TYPE_RESULTS.FAIL
    ) {
      this.vehicleTest.certificateNumber = null;
    }
    if (
      input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_CARRIED_OUT ||
      input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER ||
      input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_LAST_DATE
    ) {
      this.completedFields[input.testTypePropertyName] = inputValue;
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
    buttons.push({ text: 'Cancel', role: 'cancel' });
    return buttons;
  }

  openDDL(input) {
    if (input.testTypePropertyName === 'testResult' && this.blockTestResultSelection) {
      return;
    }
    const ACTION_SHEET = this.actionSheetCtrl.create({
      title: input.title,
      buttons: this.createDDLButtons(input)
    });
    ACTION_SHEET.present();
  }

  getDDLValueToDisplay(input) {
    for (let inputValue of input.values) {
      if (
        this.completedFields[input.testTypePropertyName] === inputValue.value ||
        this.vehicleTest[input.testTypePropertyName] === inputValue.value
      ) {
        if (input.testTypePropertyName === TEST_TYPE_INPUTS.MOD_TYPE) {
          return inputValue.text.split(' - ')[0];
        }
        return inputValue.text;
      }
    }
  }

  canDisplaySection(section) {
    // for ADR test-types
    // -----FROM HERE-----
    if (
      this.testTypeService.isAdrTestType(this.vehicleTest.testTypeId) &&
      this.vehicleTest.testResult === TEST_TYPE_RESULTS.FAIL &&
      (section.inputs[0].type === TEST_TYPE_FIELDS.CERTIFICATE_NUMBER ||
        section.inputs[0].type === TEST_TYPE_FIELDS.EXPIRY_DATE)
    ) {
      return false;
    }
    // -----TO HERE-----
    // for LEC test-types
    // -----FROM HERE-----
    if (
      this.testTypeService.isLecTestType(this.vehicleTest.testTypeId) &&
      this.vehicleTest.testResult === TEST_TYPE_RESULTS.FAIL &&
      (section.sectionName === TEST_TYPE_SECTIONS.EXPIRY_DATE ||
        section.sectionName === TEST_TYPE_SECTIONS.EMISSION_DETAILS ||
        section.sectionName === TEST_TYPE_SECTIONS.MODIFICATION)
    ) {
      return false;
    }
    // -----TO HERE-----
    // for TIR test-types
    // -----FROM HERE-----
    if (
      this.testTypeService.isTirTestType(this.vehicleTest.testTypeId) &&
      this.vehicleTest.testResult === TEST_TYPE_RESULTS.FAIL &&
      section.inputs[0].type === TEST_TYPE_FIELDS.CERTIFICATE_NUMBER_CUSTOM
    ) {
      return false;
    }
    // -----TO HERE-----
    // for Specialist test-types with certificate number and Notifiable Alteration for PSVs
    // -----FROM HERE-----
    if (
      (this.testTypeService.isSpecialistTestTypesExceptForCoifAndVoluntaryIvaTestAndRetest(
        this.vehicleTest.testTypeId
      ) ||
        this.testTypeService.isSpecialistPartOfCoifTestTypes(this.vehicleTest.testTypeId) ||
        this.testTypeService.isPsvNotifiableAlterationTestType(this.vehicleTest.testTypeId)) &&
      this.vehicleTest.testResult === TEST_TYPE_RESULTS.FAIL &&
      section.inputs[0].type === TEST_TYPE_FIELDS.CERTIFICATE_NUMBER
    ) {
      return false;
    }
    // -----TO HERE-----
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
    if (
      this.testTypeDetails.category === 'B' &&
      input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_CARRIED_OUT
    ) {
      return false;
    }
    if (
      this.completedFields[TEST_TYPE_INPUTS.SIC_CARRIED_OUT] &&
      input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_LAST_DATE
    ) {
      if (!this.completedFields[TEST_TYPE_INPUTS.SIC_LAST_DATE]) {
        this.completedFields[TEST_TYPE_INPUTS.SIC_LAST_DATE] = this.vehicleTest[
          TEST_TYPE_INPUTS.SIC_LAST_DATE
        ] = this.today;
      }
      return false;
    }
    if (input.dependentOn && input.dependentOn.length) {
      for (let dep of input.dependentOn) {
        if (this.vehicleTest[dep.testTypePropertyName] === dep.valueToBeDifferentFrom) {
          return false;
        }
      }
    }
    return true;
  }

  openInputModalDismissHandler(input, data) {
    if (data.inputValue) {
      this.vehicleTest[input.testTypePropertyName] = data.inputValue;
      if (input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER) {
        this.completedFields[input.testTypePropertyName] = data.inputValue;
      }
    } else {
      this.vehicleTest[input.testTypePropertyName] = null;
    }
    if (data.fromTestReview) {
      this.fromTestReview = data.fromTestReview;
    }
  }

  openInputPage(section, input) {
    const INPUT_MODAL = this.modalCtrl.create('TestTypeDetailsInputPage', {
      vehicleCategory: this.testTypeDetails.category,
      sectionName: input.title || section.sectionName,
      input: input,
      existentValue:
        this.completedFields[input.testTypePropertyName] ||
        this.vehicleTest[input.testTypePropertyName] ||
        null,
      fromTestReview: this.fromTestReview,
      errorIncomplete: this.errorIncomplete
    });
    INPUT_MODAL.onDidDismiss((data) => {
      this.openInputModalDismissHandler(input, data);
    });
    INPUT_MODAL.present();
  }

  onDatetimeChange(value, key) {
    this.cdRef.detectChanges();
    this.vehicleTest[key] = value;
  }

  onSave() {
    this.isNotesIncompleteError = false;
    if (
      (this.isNotifiableAlteration ||
        this.testTypeService.isLecTestType(this.vehicleTest.testTypeId)) &&
      this.vehicleTest.testResult === TEST_TYPE_RESULTS.FAIL &&
      !this.vehicleTest.additionalNotesRecorded
    ) {
      this.isNotesIncompleteError = true;
      return;
    }
    this.vehicleTest.testResult = this.testTypeService.setTestResult(
      this.vehicleTest,
      this.testTypeDetails.hasDefects
    );
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

    this.durationService.setDuration(
      { start: Date.now() },
      DURATION_TYPE[DURATION_TYPE.DEFECT_TIME]
    );
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
      });
    }
  }

  public convertToNumber(event): number {
    return +event;
  }

  showAlert(item: ItemSliding, defect, specialistCustomDefectIndex?: number) {
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
            this.testTypeService.isSpecialistTestType(this.vehicleTest.testTypeId)
              ? this.removeSpecialistCustomDefect(specialistCustomDefectIndex)
              : this.removeDefect(defect);
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
    confirm.onDidDismiss(() => (this.changeBackground = false));
  }

  removeDefect(defect) {
    this.testTypeService.removeDefect(this.vehicleTest, defect);
  }

  removeSpecialistCustomDefect(index: number) {
    this.testTypeService.removeSpecialistCustomDefect(this.vehicleTest, index);
  }

  async removeTestType(vehicle: VehicleModel, vehicleTest: TestTypeModel) {
    await this.analyticsService.logEvent({
      category: ANALYTICS_EVENT_CATEGORIES.TEST_TYPES,
      event: ANALYTICS_EVENTS.REMOVE_TEST_TYPE,
      label: ANALYTICS_LABEL.TEST_TYPE_NAME
    });

    await this.analyticsService.addCustomDimension(
      Object.keys(ANALYTICS_LABEL).indexOf('TEST_TYPE_NAME') + 1,
      this.vehicleTest.testTypeName
    );

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

  certificateNumberInputChange(value) {
    this.cdRef.detectChanges();
    if (this.testTypeService.isTirTestType(this.vehicleTest.testTypeId)) {
      this.vehicleTest.certificateNumber = value.length > 5 ? value.substring(0, 5) : value;
    } else if (
      this.testTypeService.isSpecialistTestTypesExceptForCoifAndVoluntaryIvaTestAndRetest(
        this.vehicleTest.testTypeId
      ) ||
      this.testTypeService.isSpecialistPartOfCoifTestTypes(this.vehicleTest.testTypeId) ||
      this.testTypeService.isPsvNotifiableAlterationTestType(this.vehicleTest.testTypeId)
    ) {
      let formattedValue = value.replace(/[^a-zA-Z0-9]/gi, '');
      this.vehicleTest.certificateNumber =
        formattedValue.length > 20 ? formattedValue.substring(0, 20) : formattedValue;
    } else {
      this.vehicleTest.certificateNumber = value.length > 6 ? value.substring(0, 6) : value;
    }
  }

  getTypeForCertificateNumberField(): string {
    return this.testTypeService.isSpecialistTestTypesExceptForCoifAndVoluntaryIvaTestAndRetest(
      this.vehicleTest.testTypeId
    ) ||
      this.testTypeService.isSpecialistPartOfCoifTestTypes(this.vehicleTest.testTypeId) ||
      this.testTypeService.isPsvNotifiableAlterationTestType(this.vehicleTest.testTypeId)
      ? 'text'
      : 'number';
  }

  getPatternForCertificateNumberField(): string {
    return this.testTypeService.isSpecialistTestTypesExceptForCoifAndVoluntaryIvaTestAndRetest(
      this.vehicleTest.testTypeId
    ) ||
      this.testTypeService.isSpecialistPartOfCoifTestTypes(this.vehicleTest.testTypeId) ||
      this.testTypeService.isPsvNotifiableAlterationTestType(this.vehicleTest.testTypeId)
      ? ''
      : this.patterns.NUMERIC;
  }

  toSpecialistDefectDetailsPage(
    isEditMode: boolean,
    defectIndex?: number,
    defect?: SpecialistCustomDefectModel
  ): void {
    const MODAL = this.modalCtrl.create(PAGE_NAMES.DEFECT_DETAILS_SPECIALIST_TESTING, {
      isEdit: isEditMode,
      defectIndex: isEditMode ? defectIndex : null,
      defect: isEditMode ? defect : ({} as SpecialistCustomDefectModel),
      testType: this.vehicleTest,
      errorIncomplete: this.errorIncomplete
    });
    MODAL.present();
  }
}
