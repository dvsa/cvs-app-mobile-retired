import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule, NavParams, ViewController } from 'ionic-angular';

import { FormatVrmPipe } from '../../../../pipes/format-vrm/format-vrm.pipe';
import { ViewControllerMock } from '../../../../../test-config/ionic-mocks/view-controller.mock';
import { APP_STRINGS } from '../../../../app/app.enums';
import { VehicleAdrDetailsPage } from './vehicle-adr-details';
import { CommonFunctionsService } from '../../../../providers/utils/common-functions';
import { VehicleModel } from '../../../../models/vehicle/vehicle.model';
import { TechRecordDataMock } from '../../../../assets/data-mocks/tech-record-data.mock';

const mockVehicleData = (): VehicleModel => {
  return {
    techRecord: {
      ...TechRecordDataMock.VehicleTechRecordData.techRecord[0],
      adrDetails: TechRecordDataMock.AdrDetailsData,
    },
  } as VehicleModel;
};

describe('Component: VehicleAdrDetailsPage', () => {
  let component: VehicleAdrDetailsPage;
  let componentFixture: ComponentFixture<VehicleAdrDetailsPage>;
  let viewCtrl: ViewController;

  const navParams: NavParams = new NavParams();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleAdrDetailsPage, FormatVrmPipe],
      imports: [IonicModule.forRoot(VehicleAdrDetailsPage)],
      providers: [
        CommonFunctionsService,
        { provide: NavParams, useValue: navParams },
        { provide: ViewController, useClass: ViewControllerMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    navParams.data = { vehicleData: mockVehicleData() };
    componentFixture = TestBed.createComponent(VehicleAdrDetailsPage);
    component = componentFixture.componentInstance;
    viewCtrl = TestBed.get(ViewController);

    componentFixture.detectChanges();
  }));

  afterEach(() => {
    componentFixture.destroy();
    component = null;
  });

  it('should set backBtn text to "Vehicle details"', () => {
    spyOn(viewCtrl, 'setBackButtonText');
    component.ionViewWillEnter();
    expect(viewCtrl.setBackButtonText).toHaveBeenCalledWith(APP_STRINGS.VEHICLE_DETAILS);
  });
});
