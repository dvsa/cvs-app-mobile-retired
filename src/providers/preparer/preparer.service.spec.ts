import { PreparerService } from "./preparer.service";
import { StorageService } from "../natives/storage.service";
import { PreparersDataMock } from "../../assets/data-mocks/reference-data-mocks/preparers-data.mock";
import { TestBed } from "@angular/core/testing";
import { PreparersReferenceDataModel } from "../../models/reference-data-models/preparers.model";

describe('Provider: PreparerService', () => {
  let preparerService: PreparerService;
  let storageService: StorageService;
  let spy: any;

  const preparerData = PreparersDataMock.PreparersData;
  let filter: string;


  beforeEach(() => {
    spy = jasmine.createSpyObj('StorageService', {
      'read': new Promise(resolve => resolve(preparerData))
    });

    TestBed.configureTestingModule({
      providers: [
        PreparerService,
        {provide: StorageService, useValue: spy}
      ]
    });

    preparerService = TestBed.get(PreparerService);
    storageService = TestBed.get(StorageService);
  });

  afterEach(() => {
    preparerService = null;
    storageService = null;
  });


  it('should return data from local storage', () => {
    preparerService.getPreparersFromStorage().subscribe(
      data => {
        expect(data).toBe(<PreparersReferenceDataModel[]>preparerData);
      }
    )
  });

  it('should return Preparer by ID', () => {
    filter = 'AK4434';
    let filteredData = preparerService.search(preparerData, filter);
    expect(filteredData.length).toEqual(1);
    expect(filteredData[0].preparerId).toEqual(filter);
  });

  it('should return nothing by unrelated string', () => {
    filter = 'xxx';
    let filteredData = preparerService.search(preparerData, filter);

    expect(filteredData.length).toEqual(0);
  });
});
