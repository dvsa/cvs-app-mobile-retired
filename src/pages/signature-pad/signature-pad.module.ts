import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SignaturePadPage } from './signature-pad';
import { SignaturePadModule } from 'angular2-signaturepad';
import { HttpAlertService } from '../../providers/global/http-alert-service/http-alert.service';

@NgModule({
  declarations: [SignaturePadPage],
  imports: [SignaturePadModule, IonicPageModule.forChild(SignaturePadPage)],
  providers: [HttpAlertService],
})
export class SignaturePadPageModule {}
