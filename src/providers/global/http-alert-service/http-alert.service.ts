import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CallNumber } from "@ionic-native/call-number";
import { AlertController } from "ionic-angular";
import { default as AppConfig } from '../../../../config/application.hybrid';

@Injectable()
export class HttpAlertService {

    private statusCodeData = {
        200 : { title: 'Ok', subTitle: 'something else', showCallITButton: false, showRetryButton: false },
        201 : { title: 'Created', subTitle: 'something else', showCallITButton: false, showRetryButton: false },
        204 : { title: 'No Content', subTitle: 'something else', showCallITButton: false, showRetryButton: false },
        400 : { title: 'Bad Request', subTitle: 'something else', showCallITButton: false, showRetryButton: false },
        401 : { title: 'Not Authorized', subTitle: 'something else', showCallITButton: false, showRetryButton: false },
        403 : { title: 'Forbidden', subTitle: 'something else', showCallITButton: true, showRetryButton: false },
        404 : { title: 'No Resource found', subTitle: 'something else', showCallITButton: true, showRetryButton: false },
        500 : { title: 'Internal Server Error', subTitle: 'something else', showCallITButton: true, showRetryButton: true },
        502 : { title: 'Bad Gateway', subTitle: 'something else', showCallITButton: true, showRetryButton: true },
        503 : { title: 'Service Unavailable', subTitle: 'something else', showCallITButton: true, showRetryButton: true },
        504 : { title: 'Timed Out', subTitle: 'something else', showCallITButton: true, showRetryButton: true },
    }

    constructor(
        private alertController: AlertController,
        private callNumber: CallNumber,
    ) { }

    // Used for dynamically disabling popups for specific responses for any particular page
    shouldOverridePopup(response: HttpResponse<any>, override?: number[]): boolean {
        let val = false;
        override.forEach((value) => {
            if (value === response.status) {
                val = true;
            }
        })
        return val;
    }

    getStatusCodeData(statusCode: number) {
        if (this.statusCodeData[statusCode])
          return this.statusCodeData[statusCode]
        return { title: 'Default', subTitle: 'Default', showCallItButton: false, showRetryButton: false }
    }

    getButtons(statusCode: number): string[] {
        let newarray = [
            { 
                text:'OK',
                handler: () => {},
            },
        ];
        let array = ['OK'];
        const statusCodeData = this.getStatusCodeData(statusCode);
        if (statusCodeData.showCallITButton) {
            newarray.push({
                text: 'Call IT',
                handler: () => this.callIt(),
            });
        }
        if (statusCodeData.showRetryButton) {
            array.push('Retry');
        }
        return array;
    }

    callIt() {
        // this.callNumber.callNumber('AppConfig.app.KEY_PHONE_NUMBER', true).then(
        //   (data) => console.log(data),
        //   (err) => console.log(err)
        // );
        this.callNumber.callNumber('07376098273', true).then(
          (data) => console.log(data),
          (err) => console.log(err)
        );
    }

    // Used for automatically generating pop-ups based on response status code
    // Override parameter used for disabling popup for any particular status code
    handleHttpResponse(response: HttpResponse<any>, override?: number[] ) {
        if (override && this.shouldOverridePopup(response, override)) {
            return;
        }
        const statusCodeData = this.getStatusCodeData(response.status);
        const buttons = this.getButtons(response.status);
        const alert = this.alertController.create({
          title: statusCodeData.title,
          message: statusCodeData.subTitle,
          enableBackdropDismiss: false,
          buttons: buttons,
        });
        alert.present();
    }

}
