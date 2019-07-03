import { CategoryReadingPage } from "./eu-vehicle-category";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule, NavParams, ViewController } from "ionic-angular";
import { NavParamsMock } from "../../../../../test-config/ionic-mocks/nav-params.mock";
import { VisitService } from "../../../../providers/visit/visit.service";
import { VisitServiceMock } from "../../../../../test-config/services-mocks/visit-service.mock";
import { ViewControllerMock } from "../../../../../test-config/ionic-mocks/view-controller.mock";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { EuVehicleCategoryData } from "../../../../assets/app-data/eu-vehicle-category/eu-vehicle-category";
import { VehicleModel } from "../../../../models/vehicle/vehicle.model";
import { VehicleDataMock } from "../../../../assets/data-mocks/vehicle-data.mock";

describe('Component: EuVehicleCategoryPage', () => {
  let component: CategoryReadingPage;
  let fixture: ComponentFixture<CategoryReadingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryReadingPage],
      imports: [IonicModule.forRoot(CategoryReadingPage)],
      providers: [
        {provide: NavParams, useClass: NavParamsMock},
        {provide: VisitService, useClass: VisitServiceMock},
        {provide: ViewController, useClass: ViewControllerMock}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryReadingPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit', () => {
    component.vehicle = VehicleDataMock.VehicleData;
    component.vehicle.techRecord.vehicleType = 'psv';
    component.ngOnInit();
    expect(component.categorySubtitle).toEqual(EuVehicleCategoryData.EuCategoryPsvSubtitleData);
    component.vehicle.techRecord.vehicleType = 'hgv';
    component.ngOnInit();
    expect(component.categorySubtitle).toEqual(EuVehicleCategoryData.EuCategoryHgvSubtitleData);
    component.vehicle.techRecord.vehicleType = 'trl';
    component.ngOnInit();
    expect(component.categorySubtitle).toEqual(EuVehicleCategoryData.EuCategoryTrlSubtitleData);
  });
});
