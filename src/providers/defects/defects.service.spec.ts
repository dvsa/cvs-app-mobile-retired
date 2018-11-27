import { TestBed } from "@angular/core/testing";
import { StorageService } from "../natives/storage.service";
import { DefectsService } from "./defects.service";
import { DefectsDataMock } from "../../../test-config/data-mocks/defects-data.mock";
import { DefectDeficiencyModel, DefectItemModel, DefectsReferenceData } from "../../models/defects/defects.model";
import { DEFICIENCY_CATEGORY } from "../../app/app.enums";

describe('Provider: DefectsService', () => {
  let defectsService: DefectsService;
  let storageService: StorageService;
  let spy: any;
  const category = DEFICIENCY_CATEGORY.MAJOR;

  const defectsCategories: DefectsReferenceData = {
    categories: DefectsDataMock.DefectsData
  };
  const defectsItems: DefectItemModel[] = DefectsDataMock.DefectsData[0].items
  const defectsDeficiencies: DefectDeficiencyModel[] = DefectsDataMock.DefectsData[0].items[0].deficiencies


  beforeEach(() => {
    spy = jasmine.createSpyObj('StorageService', {
      'read': new Promise(resolve => {
        return []
      })
    });

    TestBed.configureTestingModule({
      providers: [
        DefectsService,
        {provide: StorageService, useValue: spy}
      ]
    });

    defectsService = TestBed.get(DefectsService);
    storageService = TestBed.get(StorageService);
  });

  afterEach(() => {
    defectsService = null;
    storageService = null;
  });

  it('should return data from local storage', () => {
    defectsService.getDefectsFromStorage().subscribe(
      data => {
        expect(data).toBe(<DefectsReferenceData>defectsCategories)
      }
    )
  });

  it('should return badge\'s correct color', () => {
    expect(defectsService.getBadgeColor('major')).toBe('danger')
  });

  it('should return Defects Category by imDescription', () => {
    let filter = 'Registration Plate';
    let filteredData = defectsService.searchDefectCategory(defectsCategories.categories, filter);

    expect(filteredData.length).toEqual(1);
    expect(filteredData[0].imDescription).toEqual(filter);
  });

  it('should return Defects Category by imNumber', () => {
    let filter = 1;
    let filteredData = defectsService.searchDefectCategory(defectsCategories.categories, filter.toString());

    expect(filteredData.length).toEqual(1);
    expect(filteredData[0].imNumber).toEqual(filter);
  });

  it('should return Defects Category Items by itemDescription', () => {
    let filter = 'A registration plate:';
    let filteredData = defectsService.searchDefectItem(defectsItems, filter);

    expect(filteredData.length).toEqual(1);
    expect(filteredData[0].itemDescription).toEqual(filter);
  });

  it('should return Defects Category Items by itemNumber', () => {
    let filter = 1;
    let filteredData = defectsService.searchDefectItem(defectsItems, filter.toString());

    expect(filteredData.length).toEqual(1);
    expect(filteredData[0].itemNumber).toEqual(filter);
  });

  it('should return Deficiencies by deficiencyId', () => {
    let filter = 'a';
    let filteredData = defectsService.searchDeficiency(defectsDeficiencies, filter);
    expect(filteredData.length).toEqual(1);
    expect(filteredData[0].deficiencyId).toEqual(filter);
  });

  it('should return Deficiencies by deficiencyText', () => {
    let filter = 'missing.';
    let filteredData = defectsService.searchDeficiency(defectsDeficiencies, filter.toString());

    expect(filteredData.length).toEqual(1);
    expect(filteredData[0].deficiencyText).toEqual(filter);
  });


});
