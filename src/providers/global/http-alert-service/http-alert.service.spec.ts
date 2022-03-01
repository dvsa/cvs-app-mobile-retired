import { HttpResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { CallNumber } from "@ionic-native/call-number";
import { AlertController } from "ionic-angular";
import { AlertControllerMock } from "ionic-mocks";
import { HttpAlertService } from "./http-alert.service";

describe('HttpAlertService', () => {

    let httpAlertService: HttpAlertService;
    let alertController: AlertController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
                HttpAlertService,
                CallNumber,
            ],
        });
        httpAlertService = TestBed.get(HttpAlertService);
        alertController = TestBed.get(AlertController);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    describe('shouldOverridePopup', () => {
        it('should return true if the status code of the response is contained in the overrideArray', () => {
            let fakeResponse = new HttpResponse({ status: 200 });
            let overrideArray = [200];
    
             expect(httpAlertService.shouldOverridePopup(fakeResponse, overrideArray))
                .toEqual(true);
        });
        it('should return false if the status code of the response is contained in the overrideArray', () => {

            let fakeResponse = new HttpResponse({ status: 200 });
            let overrideArray = [];
    
             expect(httpAlertService.shouldOverridePopup(fakeResponse, overrideArray))
                .toEqual(false);
        });
    });
    describe('handleHttpResponse', () => {
        it('should return if shouldOverridePopup returns true', () => {
            spyOn(httpAlertService, 'shouldOverridePopup').and.returnValue(true);
            spyOn(httpAlertService, 'getStatusCodeData');

            let fakeResponse = new HttpResponse({ status: 200 });
            let overrideArray = [200];

            httpAlertService.handleHttpResponse(fakeResponse, overrideArray);

            expect(httpAlertService.shouldOverridePopup).toHaveBeenCalledWith(fakeResponse, overrideArray);
            expect(httpAlertService.getStatusCodeData).not.toHaveBeenCalled();
            expect(alertController.create).not.toHaveBeenCalled();
        });
    });
});