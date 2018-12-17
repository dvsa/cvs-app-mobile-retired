import {TestBed} from "@angular/core/testing";
import {StorageService} from "../natives/storage.service";
import {AtfService} from "./atf.service";
import {AtfReferenceDataModel} from "../../models/reference-data-models/atf.model";
import {AtfDataMock} from "../../assets/data-mocks/atf-data.mock";

describe('Provider: ATFService', () => {
  let atfService: AtfService;
  let storageService: StorageService;
  let spy: any;

  const atfData = AtfDataMock.AtfData;
  let initialData: AtfReferenceDataModel[];
  const properties: string[] = ['atfName', 'atfNumber', 'atfAddress'];
  let filter: string;

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
        expect(data).toBe(<AtfReferenceDataModel[]>atfData)
      }
    )
  });

  it('should return searched value as bold', () => {
    expect(atfService.boldSearchVal('test', 'es')).toBe('t<strong>es</strong>t')
  });

  it('should order the list', () => {
    initialData = atfService.groupByLetter(atfData, 'atfName');
    expect(Array.isArray(initialData[0])).toBe(true);
  });

  it('should return ATF by name', () => {
    filter = 'An ATF Name';
    let filteredData = atfService.sortAndSearchATF(initialData, filter, properties);

    expect(filteredData.length).toEqual(1);
    expect(filteredData[0][0].atfName).toEqual(filter);
  });

  it('should return ATF by address', () => {
    filter = 'An ATF Address';
    let filteredData = atfService.sortAndSearchATF(initialData, filter, properties);

    expect(filteredData.length).toEqual(1);
    expect(filteredData[0][0].atfAddress).toEqual(filter);
  });

  it('should return ATF by pNumber', () => {
    filter = '123';
    let filteredData = atfService.sortAndSearchATF(initialData, filter, properties);

    expect(filteredData.length).toEqual(1);
    expect(filteredData[0][0].atfNumber).toEqual(filter);
  });

  it('should return nothing by unrelated string', () => {
    filter = 'xxx';
    let filteredData = atfService.sortAndSearchATF(initialData, filter, properties);

    expect(filteredData.length).toEqual(0);
  });

});
