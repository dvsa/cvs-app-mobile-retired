import {Injectable} from '@angular/core';
import {CallNumber} from '@ionic-native/call-number';

@Injectable()
export class PhoneService {

  constructor(private callNumber: CallNumber) {
  }

  callPhoneNumber(phoneNumber: string): void {
    this.callNumber.callNumber(phoneNumber, true)
  }
}
