import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavParams, ViewController } from 'ionic-angular';
import { FormatVrmPipe } from '../../../../pipes/format-vrm/format-vrm.pipe';
import { NavParamsMock } from '../../../../../test-config/ionic-mocks/nav-params.mock';
import { ViewControllerMock } from '../../../../../test-config/ionic-mocks/view-controller.mock';
import { APP_STRINGS } from '../../../../app/app.enums';
import { VehicleAdrDetailsPage } from './vehicle-adr-details';
import { CommonFunctionsService } from '../../../../providers/utils/common-functions';

describe('Component: VehicleAdrDetailsPage', () => {
  let component: VehicleAdrDetailsPage;
  let componentFixture: ComponentFixture<VehicleAdrDetailsPage>;
  let viewCtrl: ViewController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleAdrDetailsPage, FormatVrmPipe],
      imports: [IonicModule.forRoot(VehicleAdrDetailsPage)],
      providers: [
        CommonFunctionsService,
        { provide: NavParams, useClass: NavParamsMock },
        { provide: ViewController, useClass: ViewControllerMock }
      ]
    }).compileComponents();

    componentFixture = TestBed.createComponent(VehicleAdrDetailsPage);
    component = componentFixture.componentInstance;
    viewCtrl = TestBed.get(ViewController);
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
