import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { VisitTimelinePage } from '../../visit/visitTimeline/visitTimeline';

import { Atf } from '../../../models/atf';

@Component({
  selector: 'page-atfDetails',
  templateUrl: 'atfDetails.html'
})
export class ATFDetailsPage {

    atf: Atf;

    constructor(public navCtrl: NavController, public alertCtrl: AlertController, private navParams: NavParams) {
        this.atf = navParams.get('atf');
    }

    ngOnInit() {
        var pointer = {lat: this.atf.getAddress().getLatitude(), lng: this.atf.getAddress().getLongitude()};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          center: pointer
        });
        var marker = new google.maps.Marker({
          position: pointer,
          map: map
        });
    }
    
    startVisit() {
        let confirm = this.alertCtrl.create({
            title: 'Complete a site check',
            message: 'Have you checked that the ATF is suitable for you to begin testing?',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.navCtrl.push(VisitTimelinePage, {'atf': this.atf});
                    }
                }
            ]
        });
        confirm.present();
    }
}
