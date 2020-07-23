import { TestBed } from '@angular/core/testing';
import { StorageService } from '../natives/storage.service';
import { DefectsService } from './defects.service';
import { DefectsReferenceDataMock } from '../../assets/data-mocks/reference-data-mocks/defects-data.mock';
import { APP_COLORS, DEFICIENCY_CATEGORY } from '../../app/app.enums';
import { CommonFunctionsService } from '../utils/common-functions';
import {
  DefectCategoryReferenceDataModel,
  DefectDeficiencyReferenceDataModel,
  DefectItemReferenceDataModel
} from '../../models/reference-data-models/defects.reference-model';

describe('Provider: DefectsService', () => {
  let defectsService: DefectsService;
  let storageService: StorageService;
  let commonFunctionsService: CommonFunctionsService;
  let spy: any;
  const category = DEFICIENCY_CATEGORY.MAJOR;

  const defectsCategories: DefectCategoryReferenceDataModel[] =
    DefectsReferenceDataMock.DefectsData;
  const defectsItems: DefectItemReferenceDataModel[] =
    DefectsReferenceDataMock.DefectsData[0].items;
  const defectsDeficiencies: DefectDeficiencyReferenceDataModel[] =
    DefectsReferenceDataMock.DefectsData[0].items[0].deficiencies;

  beforeEach(() => {
    spy = jasmine.createSpyObj('StorageService', {
      read: new Promise((resolve) => {
        return defectsCategories;
      })
    });

    TestBed.configureTestingModule({
      providers: [
        DefectsService,
        CommonFunctionsService,
        { provide: StorageService, useValue: spy }
      ]
    });

    defectsService = TestBed.get(DefectsService);
    storageService = TestBed.get(StorageService);
    commonFunctionsService = TestBed.get(CommonFunctionsService);
  });

  afterEach(() => {
    defectsService = null;
    storageService = null;
    commonFunctionsService = null;
  });

  it('should return data from local storage', () => {
    defectsService.getDefectsFromStorage().subscribe((data) => {
      expect(data).toBeTruthy();
    });
  });

  it("should return badge's correct color", () => {
    expect(defectsService.getBadgeColor(DEFICIENCY_CATEGORY.MINOR)).toBe(APP_COLORS.ATTENTION);
    expect(defectsService.getBadgeColor(DEFICIENCY_CATEGORY.MAJOR)).toBe(APP_COLORS.DANGER);
    expect(defectsService.getBadgeColor(DEFICIENCY_CATEGORY.DANGEROUS)).toBe(APP_COLORS.DARK);
    expect(defectsService.getBadgeColor(DEFICIENCY_CATEGORY.ADVISORY)).toBe(APP_COLORS.LIGHT);
    expect(defectsService.getBadgeColor(DEFICIENCY_CATEGORY.PRS)).toBe(APP_COLORS.TERTIARY);
  });

  it('should return list if nothing entered', () => {
    let filter = null;
    let filteredData = defectsService.searchDefect(defectsCategories, filter, [
      'imNumber',
      'imDescription'
    ]);

    expect(filteredData.length).toEqual(defectsCategories.length);
  });

  it('should return nothing if imNumber or imDescription not found', () => {
    let filter = '1sdfsdfsdfsdfsdfsdf';
    let filteredData = defectsService.searchDefect(defectsCategories, filter, [
      'imNumber',
      'imDescription'
    ]);

    expect(filteredData.length).toEqual(0);
  });

  it('should return Defects Category by imNumber', () => {
    let filter = '1';
    let filteredData = defectsService.searchDefect(defectsCategories, filter, [
      'imNumber',
      'imDescription'
    ]);

    expect(filteredData.length).toEqual(1);
    expect(filteredData[0].imNumber).toMatch(/\d{1,}/);
  });

  it('should return Defects Category by imDescription', () => {
    let filter = 'Registration Plate';
    let filteredData = defectsService.searchDefect(defectsCategories, filter, [
      'imNumber',
      'imDescription'
    ]);

    expect(filteredData.length).toEqual(1);
    expect(filteredData[0].imDescription).toEqual(filter);
  });

  it('should return Defects Items by itemNumber', () => {
    let filter = '1';
    let filteredData = defectsService.searchDefect(defectsItems, filter, [
      'itemNumber',
      'itemDescription'
    ]);

    expect(filteredData.length).toEqual(1);
    expect(filteredData[0].itemNumber).toMatch(/\d{1,}/);
  });

  it('should return Defects Items by itemDescription', () => {
    let filter = 'A registration plate:';
    let filteredData = defectsService.searchDefect(defectsItems, filter, [
      'itemNumber',
      'itemDescription'
    ]);

    expect(filteredData.length).toEqual(1);
    expect(filteredData[0].itemDescription).toEqual(filter);
  });

  it('should return Deficiencies by deficiencyId', () => {
    let filter = 'a';
    let filteredData = defectsService.searchDefect(defectsDeficiencies, filter, [
      'deficiencyId',
      'deficiencyText'
    ]);
    expect(filteredData.length).toEqual(1);
    expect(filteredData[0].deficiencyId).toEqual(filter);
  });

  it('should return Deficiencies by deficiencyText', () => {
    let filter = 'missing.';
    let filteredData = defectsService.searchDefect(defectsDeficiencies, filter, [
      'deficiencyId',
      'deficiencyText'
    ]);

    expect(filteredData.length).toEqual(1);
    expect(filteredData[0].deficiencyText).toEqual(filter);
  });

  it('should create defect based on isAdvisory: true', () => {
    let isAdvisory = true;
    let vehicleType = 'psv';
    let defCat = defectsCategories[0];
    let defItem = defectsItems[0];
    let deficiency = defectsDeficiencies[0];
    let defect = defectsService.createDefect(
      defCat,
      defItem,
      deficiency,
      vehicleType,
      isAdvisory
    );

    expect(defect.deficiencyCategory).toContain('advisory');
    expect(defect.metadata.category.additionalInfo).toBeFalsy();
    expect(defect.prs).toBeFalsy();
    expect(defect.stdForProhibition).toBeFalsy();
    expect(defect.additionalInformation.location).toBeFalsy();
    expect(defect.deficiencyId).toBeFalsy();
    expect(defect.deficiencySubId).toBeFalsy();
    expect(defect.deficiencyText).toBeFalsy();
    expect(defect.deficiencyRef).toBeTruthy();
    expect(defect.imNumber).toBeTruthy();
    expect(defect.imDescription).toBeTruthy();
    expect(defect.itemNumber).toBeTruthy();
  });

  it('should create defect based on isAdvisory: false', () => {
    let isAdvisory = false;
    let vehicleType = 'psv';
    let defCat = defectsCategories[0];
    let defItem = defectsItems[0];
    let deficiency = defectsDeficiencies[0];
    let defect = defectsService.createDefect(
      defCat,
      defItem,
      deficiency,
      vehicleType,
      isAdvisory
    );

    expect(defect.deficiencyRef).toBeTruthy();
    expect(defect.deficiencyCategory).toBeTruthy();
    expect(defect.deficiencyId).toBeTruthy();
    expect(defect.deficiencySubId).toBeFalsy();
    expect(defect.deficiencyText).toBeTruthy();
    expect(defect.imNumber).toBeTruthy();
    expect(defect.imDescription).toBeTruthy();
    expect(defect.itemNumber).toBeTruthy();
    expect(defect.itemDescription).toBeTruthy();
    expect(defect.additionalInformation.location).toBeDefined();
    expect(defect.stdForProhibition).toBeFalsy();
    expect(defect.metadata).toBeTruthy();
    expect(defect.prs).toBeFalsy();
  });

  it('should sort an aray based on key and order', () => {
    let defectsArray = defectsCategories;
    expect(defectsArray[0].imDescription).toContain('Registration Plate');
    let sortedDefectsArray = defectsService.orderDefectsArray(
      defectsArray,
      'imDescription',
      'desc'
    );
    expect(sortedDefectsArray[0].imDescription).toContain('Seat Belts');
  });
});
