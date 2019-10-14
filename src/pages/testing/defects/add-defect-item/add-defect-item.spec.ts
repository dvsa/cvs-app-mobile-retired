import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Events, IonicModule, NavController, NavParams, ViewController } from "ionic-angular";
import { DefectsService } from "../../../../providers/defects/defects.service";
import { PipesModule } from "../../../../pipes/pipes.module";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AddDefectItemPage } from "./add-defect-item";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { ViewControllerMock } from "../../../../../test-config/ionic-mocks/view-controller.mock";
import { DefectsServiceMock } from "../../../../../test-config/services-mocks/defects-service.mock";
import { DefectsReferenceDataMock } from "../../../../assets/data-mocks/reference-data-mocks/defects-data.mock";
import { NavControllerMock } from "ionic-mocks";

describe('Component: AddDefectItemPage', () => {
  let comp: AddDefectItemPage;
  let fixture: ComponentFixture<AddDefectItemPage>;

  let viewCtrl: ViewControllerMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddDefectItemPage],
      imports: [
        PipesModule,
        IonicModule.forRoot(AddDefectItemPage)
      ],
      providers: [
        Events,
        {provide: NavController, useFactory: () => NavControllerMock.instance()},
        {provide: DefectsService, useClass: DefectsServiceMock},
        {provide: NavParams, useClass: NavParamsMock},
        {provide: ViewController, useClass: ViewControllerMock}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDefectItemPage);
    comp = fixture.componentInstance;
    viewCtrl = TestBed.get(ViewController);
    comp.category = DefectsReferenceDataMock.DefectDataCategory;
    comp.searchVal = '2';
    comp.filteredItems = [];
  });

  afterEach(() => {
    fixture = null;
    comp = null;
    viewCtrl = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  it('should test ngOnInit logic', () => {
    expect(comp.filteredItems.length).toEqual(0);
    comp.ngOnInit();
    expect(comp.filteredItems.length).toEqual(1);
  });

  it('should test ionViewWillEnter logic', () => {
    spyOn(viewCtrl, 'setBackButtonText');
    comp.ionViewWillEnter();
    expect(viewCtrl.setBackButtonText).toHaveBeenCalled();
  });

  it('should test selectedItem logic', () => {
    comp.focusOut = true;
    comp.selectItem(DefectsReferenceDataMock.DefectsDataItem);
    expect(comp.focusOut).toBeFalsy();
  });
});
