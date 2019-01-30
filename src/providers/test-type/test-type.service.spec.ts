import { TestBed } from "@angular/core/testing";
import { StorageService } from "../natives/storage.service";
import { TestTypeService } from "./test-type.service";
import { TestTypesReferenceDataModel } from "../../models/reference-data-models/test-types.model";
import { VisitService } from "../visit/visit.service";
import { DefectDetailsModel } from "../../models/defects/defect-details.model";
import { DefectDetailsDataMock } from "../../assets/data-mocks/defect-details-data.mock";
import { TestTypesReferenceDataMock } from "../../assets/data-mocks/reference-data-mocks/test-types.mock";

describe('Provider: TestTypeService', () => {
  let testTypeService: TestTypeService;
  let storageService: StorageService;
  let visitService: VisitService;

  let visitServiceSpy: any;
  let storageServiceSpy: any;

  const TEST_TYPES: TestTypesReferenceDataModel[] = TestTypesReferenceDataMock.TestTypesData;
  const DEFECT: DefectDetailsModel = DefectDetailsDataMock.DefectData;

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', {
      'read': new Promise(resolve => {
        return TEST_TYPES;
      })
    });
    visitServiceSpy = jasmine.createSpyObj('VisitService', ['update']);

    TestBed.configureTestingModule({
      providers: [
        TestTypeService,
        {provide: VisitService, useValue: visitServiceSpy},
        {provide: StorageService, useValue: storageServiceSpy}
      ]
    });

    testTypeService = TestBed.get(TestTypeService);
    storageService = TestBed.get(StorageService);
    visitService = TestBed.get(VisitService);
  });

  afterEach(() => {
    testTypeService = null;
    storageService = null;
    visitService = null;
  });

  it('should return data from local storage', () => {
    testTypeService.getTestTypesFromStorage().subscribe(
      data => {
        expect(data).toBe(<TestTypesReferenceDataModel[]>TEST_TYPES)
      }
    )
  });
});
