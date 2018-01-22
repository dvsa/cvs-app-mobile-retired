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
            certificateExpiration: this.formatDate((vehicleTest.getCertificateExpirationDate() || new Date())), // ONLY FOR ALPHA - SHOULD BE FIXED: set to current date if undefined, this should not be required in the backend
            isAbandoned: false,
            isPassed: vehicleTest.getHasPassed(),
            meterReading: vehicleTest.getOdometerReading() || 1, // ONLY FOR ALPHA - SHOULD BE FIXED: set to 1 if undefined or 0, this should not be required in the backend
            defects: []
        };

        vehicleTest.getDefects().forEach(defect => {
            body.defects.push({
                RffId: defect.getName(),
                isPrs: String(defect.getPrs()), // ONLY FOR ALPHA - SHOULD BE FIXED: converted to string, this should be a boolean in the backend
                reasonForFailure: defect.getDescription(),
                locationDescription: (defect.getAxle() || "") + " " + (defect.getPosition() || "") + " " + (defect.getVertical() || ""), // ONLY FOR ALPHA - SHOULD BE FIXED: set to " " if undefined, this should not be required in the backend
                notes: defect.getNotes() || " " // ONLY FOR ALPHA - SHOULD BE FIXED: set to " " if undefined, this should not be required in the backend
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