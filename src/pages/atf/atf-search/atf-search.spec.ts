import {async, ComponentFixture, inject, TestBed} from "@angular/core/testing";
import {IonicModule, NavController} from "ionic-angular";
import {ATFSearchPage} from "./atf-search";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {AtfService} from "../../../providers/atf/atf.service";
import {SearchService} from "../../../providers/search.service";

describe('Component: ATFSearchPage', () => {
  let comp: ATFSearchPage;
  let fixture: ComponentFixture<ATFSearchPage>;
  let atfService: AtfService;
  let navCtrl: NavController;

  beforeEach(async(() => {
    const atfServiceSpy = jasmine.createSpyObj('ATFService', ['getAtfs, getAtfsFromStorage']);

    TestBed.configureTestingModule({
      declarations: [ATFSearchPage],
      imports: [
        IonicModule.forRoot(ATFSearchPage)
      ],
      providers: [
        SearchService,
        NavController,
        {provide: AtfService, useValue: atfServiceSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ATFSearchPage);
    comp = fixture.componentInstance;
    atfService = TestBed.get(AtfService);
    navCtrl = TestBed.get(NavController);
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    atfService = null;
  })

  it('should create component', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
    expect(atfService).toBeTruthy();
  });

  it('should AtfService and ATFSearchPage Component share the same instance',
    inject([AtfService], (injectService: AtfService) => {
      expect(injectService).toBe(atfService);
    })
  );

  it('should return searched value as bold', () => {
    expect(comp.boldSearchVal('test', 'es')).toBe('t<strong>es</strong>t')
  });

});
