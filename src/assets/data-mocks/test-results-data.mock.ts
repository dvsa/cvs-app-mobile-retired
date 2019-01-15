export class TestResultsDataMock {
  public static get TestResultsData() {
    return [
      {
        "testResultId": "123D",
        "vrm": "BQ91YHQ",
        "vin": "3456968DFC594S",
        "testStationName": "Test Station Name",
        "testStationPNumber": "P12345678",
        "locationType": "ATF",
        "testerName": "John Smith",
        "testerStaffId": "ABC123",
        "testStartTimestamp": "2019-01-14T10:08:32.586Z",
        "testEndTimestamp": "2019-01-14T10:09:32.586Z",
        "testStatus": "Submitted",
        "reasonForCancellation": "",
        "vehicleClass": "2 (MotorBikes over 200cc or with a sidecar)",
        "vehicleType": "PSV",
        "numberOfSeats": 10,
        "vehicleStatus": 1,
        "vehicleConfiguration": "R (Rigid)",
        "odometerReading": 400,
        "odometerReadingUnits": "kilometers",
        "preparerId": "QWE123",
        "preparerName": "Tom Jones",
        "euVehicleCategory": "M1",
        "countryOfRegistration": "UK",
        "testTypes": [
          {
            "createdAt": "2019-01-14T10:08:32.586Z",
            "lastUpdatedAt": "2019-01-14T10:08:32.586Z",
            "testCode": "AB12",
            "testTypeName": "Paid retest with Class 6A seatbelt installation check",
            "testId": "H23",
            "certificateNumber": "23596FHG45",
            "testExpiryDate": "2020-01-14",
            "testTypeStartTimestamp": "2019-01-14T10:09:12.586Z",
            "testTypeEndTimestamp": "2019-01-14T10:10:32.586Z",
            "numberOfSeatbeltsFitted": 4,
            "lastSeatbeltInstallationCheckDate": "2019-01-14",
            "seatbeltInstallationCheckDate": true,
            "testResult": "Fail",
            "prohibitionIssued": "Yes",
            "reasonForAbandoning": "",
            "additionalNotesRecorded": "Additional notes recorded",
            "defects": [
              {
                "imNumber": 3,
                "imDescription": "IM description",
                "forVehicleType": [
                  "psv"
                ],
                "additionalInformation": {
                  "location": {
                    "vertical": "upper",
                    "horizontal": "inner",
                    "lateral": "nearside",
                    "longitudinal": "front",
                    "rowNumber": 3,
                    "seatNumber": 6,
                    "axleNumber": 4,
                    },
                  "notes": "Additional notes about defect"
                },
                "item": {
                  "itemNumber": 3,
                  "itemDescription": "Item description",
                  "forVehicleType": [
                    "psv"
                  ],
                  "deficiency": {
                    "ref": "3.3 D",
                    "deficiencyId": "D",
                    "deficiencySubId": "ii",
                    "deficiencyCategory": "advisory",
                    "deficiencyText": "Text about deficiency",
                    "stdForProhibition": true,
                    "prs": true,
                    "forVehicleType": [
                      "psv"
                    ]
                  }
                }
              },
              {
                "imNumber": 4,
                "imDescription": "IM description",
                "forVehicleType": [
                  "psv"
                ],
                "additionalInformation": {
                  "location": {
                    "vertical": "upper",
                    "horizontal": "inner",
                    "lateral": "nearside",
                    "longitudinal": "front",
                    "rowNumber": 4,
                    "seatNumber": 2,
                    "axleNumber": 7,
                    },
                  "notes": "Additional notes about defect"
                },
                "item": {
                  "itemNumber": 3,
                  "itemDescription": "Item description",
                  "forVehicleType": [
                    "psv"
                  ],
                  "deficiency": {
                    "ref": "3.3 D",
                    "deficiencyId": "D",
                    "deficiencySubId": "ii",
                    "deficiencyCategory": "major",
                    "deficiencyText": "Text about deficiency",
                    "stdForProhibition": true,
                    "prs": false,
                    "forVehicleType": [
                      "psv"
                    ]
                  }
                }
              }
            ]
          },
          {
            "createdAt": "2020-01-14T10:08:32.586Z",
            "lastUpdatedAt": "2020-01-14T10:08:32.586Z",
            "testCode": "AB23",
            "testTypeName": "Paid prohibition clearance (retest without certificate)",
            "testId": "H24",
            "certificateNumber": "23596FHG45",
            "testExpiryDate": "2021-01-14",
            "testTypeStartTimestamp": "2019-01-14T10:09:12.586Z",
            "testTypeEndTimestamp": "2019-01-14T10:10:32.586Z",
            "numberOfSeatbeltsFitted": 4,
            "lastSeatbeltInstallationCheckDate": "2019-01-14",
            "seatbeltInstallationCheckDate": true,
            "testResult": "pass",
            "prohibitionIssued": "Yes",
            "reasonForAbandoning": "",
            "additionalNotesRecorded": "Additional notes recorded",
            "defects": [
              {
                "imNumber": 3,
                "imDescription": "IM description",
                "forVehicleType": [
                  "psv"
                ],
                "additionalInformation": {
                  "location": {
                    "vertical": "upper",
                    "horizontal": "inner",
                    "lateral": "nearside",
                    "longitudinal": "front",
                    "rowNumber": 3,
                    "seatNumber": 6,
                    "axleNumber": 4,
                    },
                  "notes": "Additional notes about defect"
                },
                "item": {
                  "itemNumber": 3,
                  "itemDescription": "Item description",
                  "forVehicleType": [
                    "psv"
                  ],
                  "deficiency": {
                    "ref": "3.3 D",
                    "deficiencyId": "D",
                    "deficiencySubId": "ii",
                    "deficiencyCategory": "advisory",
                    "deficiencyText": "Text about deficiency",
                    "stdForProhibition": true,
                    "prs": true,
                    "forVehicleType": [
                      "psv"
                    ]
                  }
                }
              },
              {
                "imNumber": 4,
                "imDescription": "IM description",
                "forVehicleType": [
                  "psv"
                ],
                "additionalInformation": {
                  "location": {
                    "vertical": "upper",
                    "horizontal": "inner",
                    "lateral": "nearside",
                    "longitudinal": "front",
                    "rowNumber": 4,
                    "seatNumber": 2,
                    "axleNumber": 7,
                    },
                  "notes": "Additional notes about defect"
                },
                "item": {
                  "itemNumber": 3,
                  "itemDescription": "Item description",
                  "forVehicleType": [
                    "psv"
                  ],
                  "deficiency": {
                    "ref": "3.3 D",
                    "deficiencyId": "D",
                    "deficiencySubId": "ii",
                    "deficiencyCategory": "major",
                    "deficiencyText": "Text about deficiency",
                    "stdForProhibition": true,
                    "prs": false,
                    "forVehicleType": [
                      "psv"
                    ]
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  }
}



