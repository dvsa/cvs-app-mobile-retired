import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HTTP } from '@ionic-native/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Camera } from '@ionic-native/camera';

import { RESTRICTED_CONFIG, RestrictedConfig } from '../../restricted.config';

import { MyApp } from './app.component';

import { FilterByNamePipe } from '../helpers/filterByName';

// SERVICES
import { AtfService } from '../services/atf.service';
import { VehicleService } from '../services/vehicle.service';
import { VehicleTestCategorySevice } from '../services/vehicleTestCategory.service';
import { VehicleTestService } from '../services/vehicleTest.service';
import { DefectCategoryService } from '../services/defect.service';
import { HTTPService } from '../services/http.service';

// ATF MODULE
import { ATFHomePage } from '../pages/atf/atfHome/atfHome';
import { ATFDetailsPage } from '../pages/atf/atfDetails/atfDetails';
import { ATFSearchPage } from '../pages/atf/atfSearch/atfSearch';
// ATF ISSUE MODULE
import { ATFIssuePage } from '../pages/atfIssue/atfIssue';
// TESTING MODULE
import { TestCreatePage } from '../pages/testing/testCreation/testCreate/testCreate';
import { TestsListPage } from '../pages/testing/testCreation/testsList/testsList';
import { VehicleDetailsPage } from '../pages/testing/testCreation/vehicleDetails/vehicleDetails';
import { VehicleLookupPage } from '../pages/testing/testCreation/vehicleLookup/vehicleLookup';
import { VehicleScanPage } from '../pages/testing/testCreation/vehicleLookup/vehicleScan/vehicleScan';
import { VehicleRejectionPage } from '../pages/testing/testCreation/vehicleRejection/vehicleRejection';
import { CompleteTestPage } from '../pages/testing/testCreation/completeTest/completeTest';
import { AddDefectPage } from '../pages/testing/testCreation/completeTest/addDefect/addDefect';
import { DefectDetailsPage } from '../pages/testing/testCreation/completeTest/defectDetails/defectDetails';
import { HelpPage } from '../pages/help/help';
import { TestSummaryPage } from '../pages/testing/testCreation/testSummary/testSummary';
import { TestSubmittedPage } from '../pages/testing/testSubmitted/testSubmitted';
import { PrintPage } from '../pages/testing/testSubmitted/print/print';
// VISIT MODULE
import { EndVisitPage } from '../pages/visit/endVisit/endVisit';
import { VisitTimelinePage } from '../pages/visit/visitTimeline/visitTimeline';
// WAIT TIME MODULE
import { WaitTimePage } from '../pages/waitTime/waitTime';

@NgModule({
  declarations: [
    MyApp,
    FilterByNamePipe,
    ATFHomePage,
    ATFDetailsPage,
    ATFSearchPage,
    ATFIssuePage,
	  TestCreatePage,
    TestsListPage,
    VehicleDetailsPage,
    VehicleLookupPage,
    VehicleScanPage,
    VehicleRejectionPage,
    CompleteTestPage,
    AddDefectPage,
    DefectDetailsPage,
    HelpPage,
    TestSummaryPage,
    TestSubmittedPage,
    PrintPage,
    EndVisitPage,
    VisitTimelinePage,
    WaitTimePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ATFHomePage,
    ATFDetailsPage,
    ATFSearchPage,
    ATFIssuePage,
	  TestCreatePage,
    TestsListPage,
    VehicleDetailsPage,
    VehicleLookupPage,
    VehicleScanPage,
    VehicleRejectionPage,
    CompleteTestPage,
    AddDefectPage,
    DefectDetailsPage,
    HelpPage,
    TestSummaryPage,
    TestSubmittedPage,
    PrintPage,
    EndVisitPage,
    VisitTimelinePage,
    WaitTimePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AtfService,
    VehicleService,
    VehicleTestCategorySevice,
    VehicleTestService,
    DefectCategoryService,
    HTTP,
    HTTPService,
    SocialSharing,
    InAppBrowser,
    Camera,
    { provide: RESTRICTED_CONFIG, useValue: RestrictedConfig }
  ]
})
export class AppModule {}
