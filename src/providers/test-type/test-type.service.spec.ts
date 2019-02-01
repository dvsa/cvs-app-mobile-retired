import { TestBed } from "@angular/core/testing";
import { StorageService } from "../natives/storage.service";
import { TestTypeService } from "./test-type.service";
import { TestTypesDataMock } from "../../assets/data-mocks/reference-data-mocks/test-types.mock";
import { TestTypesReferenceDataModel } from "../../models/reference-data-models/test-types.model";
import { VisitService } from "../visit/visit.service";
import { DEFICIENCY_CATEGORY } from "../../models/model.enums";

describe('Provider: TestTypeService', () => {
  let testTypeService: TestTypeService;
  let storageService: StorageService;
  let visitService: VisitService;

  let visitServiceSpy: any;
  let storageServiceSpy: any;

  const testTypes: TestTypesReferenceDataModel[] = TestTypesDataMock.TestTypesData;

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', {
      'read': new Promise(resolve => {
        return testTypes;
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
        expect(data).toBe(<TestTypesReferenceDataModel[]>testTypes)
      }
    )
  });

});
