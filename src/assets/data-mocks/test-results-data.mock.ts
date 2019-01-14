export class TestResultsDataMock {
  public static get TestResultsData() {
    return [{
      "vrms": [{
        "vrm": "BQ12XFJ",
        "isPrimary": true
      }, {
        "vrm": "GH12JSH",
        "isPrimary": false
      }],
      "vin": "123451223225582111",
      "testStationName": "Test Station",
      "testStationNumber": "12344",
      "testStationType": "ATF1",
      "testerName": "John Doe",
      "testerId": "123",
      "testStartTime": "2018-02-09T12:14:02Z",
      "testEndTime": "2018-02-09T15:30:02Z",
      "testStatus": "passed",
      "reasonForCancellation": null,
      "vehicleClass": "small",
      "numberOfSeats": "5",
      "vehicleStatus": "active",
      "vehicleConfiguration": "rigid",
      "odometerReading": "123312",
      "odometerMetric": "kilometer",
      "preparerId": "CM6151",
      "preparerName": "911 Coach Services Limited",
      "testTypes": [
        {
          "id": "asdas12314v",
          "certificateNumber": "1234",
          "LECcertificateNumber": "4321",
          "expirationDate": "2022-02-09",
          "startTime": "2018-02-09T13:14:02Z",
          "endTime": "2018-02-09T14:14:02Z",
          "numberOfSeatBelts": "4",
          "lastSeatBeltInstallationDate": "2018-02-09T12:14:02Z",
          "seatBeltInstallationChecked": true,
          "testResult": "passed",
          "prohibitionIssued": false,
          "reasonForAbandoningTest": null,
          "additionalCommentsForAbandon": "",
          "additionalNotesRecordedAgainstTestType": "",
          "defects": [
            {
              "ref": "1.2.a",
              "deficiencyId": "a",
              "deficiencyText": "missing",
              "deficiencyCategory": "registration plate",
              "location": {
                "vertical": "",
                "horizontal": "",
                "lateral": "",
                "longitudinal": ["front"],
                "rowNumber": "",
                "seatNumber": "",
                "axleNumber": ""
              },
              "notes": "",
              "prs": true
            }
          ]
        }
      ]
    }]
  }
}
