import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";

@Injectable()
export class HttpAlertService {

    private statusCodeData = {
        200 : { title: 'Ok', subTitle: 'something else' },
        201 : { title: 'Created', subTitle: 'something else' },
        204 : { title: 'No Content', subTitle: 'something else' },
        400 : { title: 'Bad Request', subTitle: 'something else' },
        401 : { title: 'Not Authorized', subTitle: 'something else' },
        403 : { title: 'Forbidden', subTitle: 'something else' },
        404 : { title: 'No Resource found', subTitle: 'something else' },
        500 : { title: 'Internal Server Error', subTitle: 'something else' },
        502 : { title: 'Bad Gateway', subTitle: 'something else' },
        503 : { title: 'Service Unavailable', subTitle: 'something else' },
        504 : { title: 'Timed Out', subTitle: 'something else' },
    }

    constructor(
        private alertController: AlertController,
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
        return { title: 'Default', subTitle: 'Default' }
    }

    // Used for automatically generating pop-ups based on response status code
    // Override parameter used for disabling popup for any particular status code
    handleHttpResponse(response: HttpResponse<any>, override?: number[] ) {
        if (override && this.shouldOverridePopup(response, override)) {
            return;
        }
        const statusCodeData = this.getStatusCodeData(response.status)
        const alert = this.alertController.create({
          title: statusCodeData.title,
          message: statusCodeData.subTitle,
          enableBackdropDismiss: false,
          buttons: ['OK']
        });
        alert.present();
    }

}
