import {TestBed} from "@angular/core/testing";
import {StorageService} from "../natives/storage.service";
import {AtfService} from "./atf.service";
import {AtfModel} from "../../models/atf.model";
import {AtfDataMock} from "../../../test-config/data-mocks/atf-data.mock";

describe('Provider: ATFService', () => {
  let atfService: AtfService;
  let storageService: StorageService;
  let spy: any;
  let atfData = AtfDataMock.AtfData;

  beforeEach(() => {
    spy = jasmine.createSpyObj('StorageService', {
      'read': new Promise(resolve => resolve(atfData))
    });

    TestBed.configureTestingModule({
      providers: [
        AtfService,
        {provide: StorageService, useValue: spy}
      ]
    });

    atfService = TestBed.get(AtfService);
    storageService = TestBed.get(StorageService);
  });

  afterEach(() => {
    atfService = null;
    storageService = null;
  });

  it('should return data from local storage', () => {
    atfService.getAtfsFromStorage().subscribe(
      data => {
        expect(data).toBe(<AtfModel[]>atfData)
      }
    )
  });

});
