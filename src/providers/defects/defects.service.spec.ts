import { TestBed } from "@angular/core/testing";
import { StorageService } from "../natives/storage.service";
import { DefectsService } from "./defects.service";
import { DefectsDataMock } from "../../assets/data-mocks/reference-data-mocks/defects-data.mock";
import { DefectCategoryModel, DefectDeficiencyModel, DefectItemModel } from "../../models/reference-data-models/defects.model";
import { DEFICIENCY_CATEGORY } from "../../app/app.enums";
import { CommonFunctionsService } from "../utils/common-functions";

describe('Provider: DefectsService', () => {
  let defectsService: DefectsService;
  let storageService: StorageService;
  let commonFunctionsService: CommonFunctionsService;
  let spy: any;
  const category = DEFICIENCY_CATEGORY.MAJOR;

  const defectsCategories: DefectCategoryModel[] = DefectsDataMock.DefectsData;
  const defectsItems: DefectItemModel[] = DefectsDataMock.DefectsData[0].items
  const defectsDeficiencies: DefectDeficiencyModel[] = DefectsDataMock.DefectsData[0].items[0].deficiencies


  beforeEach(() => {
    spy = jasmine.createSpyObj('StorageService', {
      'read': new Promise(resolve => {
        return defectsCategories;
      })
    });

    TestBed.configureTestingModule({
      providers: [
        DefectsService,
        CommonFunctionsService,
        {provide: StorageService, useValue: spy}
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
    defectsService.getDefectsFromStorage().subscribe(
      data => {
        expect(data).toBe(<DefectCategoryModel[]>defectsCategories)
      }
    )
  });

  it('should return badge\'s correct color', () => {
    expect(defectsService.getBadgeColor('major')).toBe('danger')
  });

  it('should return Defects Category by imNumber', () => {
    let filter = '1';
    let filteredData = defectsService.searchDefect(defectsCategories, filter, ['imNumber', 'imDescription']);

    expect(filteredData.length).toEqual(1);
    expect(filteredData[0].imNumber).toMatch(/\d{1,}/);;
  });

  it('should return Defects Category by imDescription', () => {
    let filter = 'Registration Plate';
    let filteredData = defectsService.searchDefect(defectsCategories, filter, ['imNumber', 'imDescription']);

    expect(filteredData.length).toEqual(1);
    expect(filteredData[0].imDescription).toEqual(filter);
  });

  it('should return Defects Items by itemNumber', () => {
    let filter = '1';
    let filteredData = defectsService.searchDefect(defectsItems, filter, ['itemNumber', 'itemDescription']);

    expect(filteredData.length).toEqual(1);
    expect(filteredData[0].itemNumber).toMatch(/\d{1,}/);
  });

  it('should return Defects Items by itemDescription', () => {
    let filter = 'A registration plate:';
    let filteredData = defectsService.searchDefect(defectsItems, filter, ['itemNumber', 'itemDescription']);

    expect(filteredData.length).toEqual(1);
    expect(filteredData[0].itemDescription).toEqual(filter);
  });

  it('should return Deficiencies by deficiencyId', () => {
    let filter = 'a';
    let filteredData = defectsService.searchDefect(defectsDeficiencies, filter, ['deficiencyId', 'deficiencyText']);
    expect(filteredData.length).toEqual(1);
    expect(filteredData[0].deficiencyId).toEqual(filter);
  });

  it('should return Deficiencies by deficiencyText', () => {
    let filter = 'missing.';
    let filteredData = defectsService.searchDefect(defectsDeficiencies, filter, ['deficiencyId', 'deficiencyText']);

    expect(filteredData.length).toEqual(1);
    expect(filteredData[0].deficiencyText).toEqual(filter);
  });


});
