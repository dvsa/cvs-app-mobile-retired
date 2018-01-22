import { Injectable } from '@angular/core';
import { HTTPService } from './http.service';

import { VehicleTest } from '../models/vehicleTest';
import { Vehicle } from '../models/vehicle';

@Injectable()
export class VehicleTestService {

    constructor(private httpService: HTTPService) { }

    postVehicleTest(vehicleTest: VehicleTest, vehicle: Vehicle): Promise<any> {
        var body = {
            vehicleId: vehicle.getRegistration(),
            testType: vehicleTest.getName(),
            createDate: this.formatDate(vehicleTest.getDate()), 
            certificateLifeSpanMonths: vehicleTest.getCertificateLifespanInMonths(),
            certificateExpiration: this.formatDate(vehicleTest.getCertificateExpirationDate()),
            isAbandoned: false,
            isPassed: vehicleTest.getHasPassed(),
            meterReading: vehicleTest.getOdometerReading(),
            defects: []
        };
        vehicleTest.getDefects().forEach(defect => {
            body.defects.push({
                RffId: defect.getName(),
                isPrs: defect.getPrs(),
                reasonForFailure: defect.getDescription(),
                locationDescription: defect.getAxle() + " " + defect.getPosition() + " " + defect.getVertical(),
                notes: defect.getNotes()
            });
        });

        return this.httpService.addTest(body);
    }

    private formatDate(date: Date): string {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }

}