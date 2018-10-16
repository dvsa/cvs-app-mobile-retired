import {TestBed} from "@angular/core/testing";
import {SearchService} from "./search.service";
import {AtfDataMock} from "../../test-config/data-mocks/atf-data.mock";

describe('Provider: ATFService', () => {
  let searchService: SearchService;
  const atfData = AtfDataMock.AtfData;
  let initialData: any[];
  const properties: string[] = ['atfName', 'atfNumber', 'atfAddress'];
  let filter: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchService,
      ]
    });

    searchService = TestBed.get(SearchService);
  });

  afterEach(() => {
    searchService = null;
  });

  it('should return searched value as bold', () => {
    expect(searchService.boldSearchVal('test', 'es')).toBe('t<strong>es</strong>t')
  });

  it('should order the list', () => {
    initialData = searchService.groupByLetter(atfData, 'atfName');
    expect(Array.isArray(initialData[0])).toBe(true);
  });

  it('should return ATF by name', () => {
    filter = 'An ATF Name';
    let filteredData = searchService.sortAndSearchATF(initialData, filter, properties);

    expect(filteredData.length).toEqual(1);
    expect(filteredData[0][0].atfName).toEqual(filter);
  });

  it('should return ATF by address', () => {
    filter = 'An ATF Address';
    let filteredData = searchService.sortAndSearchATF(initialData, filter, properties);

    expect(filteredData.length).toEqual(1);
    expect(filteredData[0][0].atfAddress).toEqual(filter);
  });

  it('should return ATF by pNumber', () => {
    filter = '123';
    let filteredData = searchService.sortAndSearchATF(initialData, filter, properties);

    expect(filteredData.length).toEqual(1);
    expect(filteredData[0][0].atfNumber).toEqual(filter);
  });

  it('should return nothing by unrelated string', () => {
    filter = 'xxx';
    let filteredData = searchService.sortAndSearchATF(initialData, filter, properties);

    expect(filteredData.length).toEqual(0);
  });
});
