import { TestBed } from "@angular/core/testing";
import { StorageService } from "../natives/storage.service";
import { TestTypesService } from "./test-type.service";
import { TestTypesDataMock } from "../../assets/data-mocks/test-types.mock";
import { TestTypesModel } from "../../models/reference-data-models/test-types.model";

describe('Provider: TestTypesService', () => {
  let testTypesService: TestTypesService;
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
        TestTypesService,
        {provide: StorageService, useValue: spy}
      ]
    });

    testTypesService = TestBed.get(TestTypesService);
    storageService = TestBed.get(StorageService);
  });

  afterEach(() => {
    testTypesService = null;
    storageService = null;
  });

  it('should return data from local storage', () => {
    testTypesService.getTestTypesFromStorage().subscribe(
      data => {
        expect(data).toBe(<TestTypesModel[]>testTypes)
      }
    )
  });

});
