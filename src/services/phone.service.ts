import { Injectable } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';

@Injectable()
export class PhoneService {

    constructor(private callNumber: CallNumber) {}

    callPhoneNumber(phoneNumber: string) {
        this.callNumber.callNumber(phoneNumber, true)
            .then(() => console.log('Started call'))
            .catch(() => console.log('Error on starting call'));
    }
}
