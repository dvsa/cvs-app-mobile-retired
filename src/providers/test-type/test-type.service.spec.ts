import { TestBed } from "@angular/core/testing";
import { StorageService } from "../natives/storage.service";
import { TestTypeService } from "./test-type.service";
import { TestTypesDataMock } from "../../assets/data-mocks/reference-data-mocks/test-types.mock";
import { TestTypesModel } from "../../models/reference-data-models/test-types.model";

describe('Provider: TestTypeService', () => {
  let testTypeService: TestTypeService;
  let storageService: StorageService;
  let spy: any;

  const testTypes: TestTypesModel[] = TestTypesDataMock.TestTypesData;

  beforeEach(() => {
    spy = jasmine.createSpyObj('StorageService', {
      'read': new Promise(resolve => {
        return testTypes;
      })
    });

    TestBed.configureTestingModule({
      providers: [
        TestTypeService,
        {provide: StorageService, useValue: spy}
      ]
    });

    testTypeService = TestBed.get(TestTypeService);
    storageService = TestBed.get(StorageService);
  });

  afterEach(() => {
    testTypeService = null;
    storageService = null;
  });

  it('should return data from local storage', () => {
    testTypeService.getTestTypesFromStorage().subscribe(
      data => {
        expect(data).toBe(<TestTypesModel[]>testTypes)
      }
    )
  });

});
