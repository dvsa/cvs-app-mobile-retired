import { TestTypeModel } from "../../models/tests/test-type.model";
import { TestModel } from "../../models/tests/test.model";

export class VisitDataMock {

  public static get VisitTestData() {
    return VisitDataMock.VisitData.tests[0];
  }

  public static get VisitTestDataArray() {
    let testArr = [];
    for (let i = 0; i < 5; i++) {
      testArr[i] = VisitDataMock.VisitData.tests[0]
    }
    return testArr;
  }

  public static get VisitTestTypeData() {
    return VisitDataMock.VisitData.tests[0].vehicles[0].testTypes[0];
  }

  public static get VisitData() {
    return {
      "startTime": "2019-01-14T14:32:12.536Z",
      "endTime": null,
      "testStationName": "Abshire-Kub",
      "testStationNumber": "09-4129632",
      "testStationType": "GVTS",
      "testerId": "",
      "testerName": "",
      "tests": [{
        "startTime": "2019-01-14T14:32:14.461Z",
        "endTime": "2019-01-14T14:32:14.461Z",
        "status": "cancelled",
        "reasonForCancellation": "",
        "vehicles": [{
          "vrms": [
            {
              "vrm": "BQ91YHQ",
              "isPrimary": true
            }
          ],
          "vin": "1B7GG36N12S678410",
          "techRecord": [{
            "bodyType": "other",
            "grossKerbWeight": 20445,
            "brakeCode": "o",
            "coifDate": "1991-12-07",
            "seatsUpperDeck": 57,
            "standingCapacity": 251,
            "brakes": {
              "dataTrPsvBrakeTwo": "bmsZLJjBZFRMu3",
              "dataTrpsvBrakeThree": "KeQHRwq9",
              "parkingBrakeMrk": "Y",
              "brakeCode": "1jU6",
              "BrakeForceWheelsUpToHalfLocked": {
                "secondaryBrakeForceB": 17115,
                "parkingBrakeForceB": 0,
                "serviceBrakeForceB": 6739
              },
              "retarderBrakeOne": "friction",
              "brakeForceWheelsNotLocked": {"parkingBrakeForceA": 83665, "serviceBrakeForceA": 53671, "secondaryBrakeForceA": 45199},
              "dataTrPsvBrakeOne": "oaCS4aZ5UGGZT",
              "retarderBrakeTwo": "exhaust"
            },
            "bodyModel": "do",
            "bodyMake": "Unisure",
            "conversionRefNo": "S5J9z",
            "grossLadenWeight": 82879,
            "axles": [{
              "axleNumber": 24075,
              "weights": {"kerbWeight": 53850, "gbWeight": 40343, "ladenWeight": 6383, "designWeight": 30923},
              "tyres": {
                "tyreSize": "4IHi7",
                "speedCategorySymbol": "J",
                "fitmentCode": "single",
                "dataTrPsvAxles": 416,
                "plyRating": "E9",
                "tyreCode": 1355
              }
            }],
            "chassisModel": "non",
            "grossGbWeight": 85025,
            "dispensations": "3UZnR",
            "manufactureDate": 3225,
            "vehicleClass": "2 (MotorBikes over 200cc or with a sidecar)",
            "chassisMake": "Zentix",
            "noOfAxles": 2,
            "grossDesignWeight": 71125,
            "vehicleType": "PSV",
            "speedLimiterMrk": true,
            "regnDate": "2006-07-01",
            "seatsLowerDeck": 986,
            "tachoExemptMrk": true,
            "unladenWeight": 0,
            "ntaNumber": "pP",
            "grossladenWeight": 0,
            "reasonForCreation": "DFGIscm7",
            "speedRestriction": 29,
            "remarks": "bof1ikLSURNJi0oxHdAmyo1",
            "statusCode": "current",
            "vehicleSize": "small",
            "vehicleConfiguration": "rigid"
          }],
          "testResultsHistory": [],
          "odometerReading": "12233",
          "odometerMetric": "kilometres",
          "preparerId": "AK4434",
          "preparerName": "Durrell Vehicles Limited",
          "testTypes": [
            {
              "name": "Public Service Vehicle Annual Testing",
              "categoryName": "Annual test",
              "startTime": "2019-01-14T14:32:31.602Z",
              "abandonment": {"reasons": []},
              "defects": [{
                "ref": "1.1.a",
                "deficiencyCategory": "major",
                "deficiencyId": "a",
                "deficiencyText": "missing.",
                "metadata": {
                  "category": {
                    "imNumber": 1,
                    "imDescription": "Registration Plate",
                    "additionalInfo": {
                      "location": {
                        "axleNumber": null,
                        "horizontal": null,
                        "vertical": null,
                        "longitudinal": ["front", "rear"],
                        "rowNumber": null,
                        "lateral": null,
                        "seatNumber": null
                      }, "notes": false
                    }
                  }, "item": {"itemNumber": 1, "itemDescription": "A registration plate:"}
                },
                "prs": false,
                "notes": "",
                "location": {
                  "vertical": "",
                  "horizontal": "",
                  "lateral": "",
                  "longitudinal": "front",
                  "rowNumber": null,
                  "seatNumber": null,
                  "axleNumber": null
                }
              }, {
                "ref": "1.2",
                "deficiencyCategory": "Advisory",
                "deficiencyId": null,
                "deficiencyText": "",
                "metadata": {
                  "category": {"imNumber": 1, "imDescription": "Registration Plate", "additionalInfo": null},
                  "item": {"itemNumber": 2, "itemDescription": "A registration mark:"}
                },
                "prs": null,
                "notes": "test",
                "location": null
              }],
              "endTime": "2019-01-14T14:32:51.690Z",
              "result": "pass"
            },
            {
              "name": "Retest",
              "categoryName": "Voluntary test",
              "startTime": "2019-01-14T14:32:31.602Z",
              "abandonment": {"reasons": []},
              "defects": [
                {
                  "ref": "1.1.a",
                  "deficiencyCategory": "major",
                  "deficiencyId": "a",
                  "deficiencyText": "missing.",
                  "metadata": {
                    "category": {
                      "imNumber": 1,
                      "imDescription": "Registration Plate",
                      "additionalInfo": {
                        "location": {
                          "axleNumber": null,
                          "horizontal": null,
                          "vertical": null,
                          "longitudinal": ["front", "rear"],
                          "rowNumber": null,
                          "lateral": null,
                          "seatNumber": null
                        }, "notes": false
                      }
                    }, "item": {"itemNumber": 1, "itemDescription": "A registration plate:"}
                  },
                  "prs": false,
                  "notes": "",
                  "location": {
                    "vertical": "",
                    "horizontal": "",
                    "lateral": "",
                    "longitudinal": "front",
                    "rowNumber": null,
                    "seatNumber": null,
                    "axleNumber": null
                  }
                }
              ],
              "endTime": "2019-01-14T14:32:51.690Z",
              "result": "fail"
            },
            {
              "name": "Retest retest",
              "categoryName": "Voluntary test",
              "startTime": "2019-01-14T14:32:31.602Z",
              "abandonment": {"reasons": []},
              "defects": [{
                "ref": "1.1.a",
                "deficiencyCategory": "Major",
                "deficiencyId": "a",
                "deficiencyText": "missing.",
                "metadata": {
                  "category": {
                    "imNumber": 1,
                    "imDescription": "Registration Plate",
                    "additionalInfo": {
                      "location": {
                        "axleNumber": [],
                        "horizontal": [],
                        "vertical": [],
                        "longitudinal": ["front"],
                        "rowNumber": [],
                        "lateral": [],
                        "seatNumber": []
                      }, "notes": false
                    }
                  }, "item": {"itemNumber": 1, "itemDescription": "A registration plate:"}
                },
                "prs": true,
                "notes": "",
                "location": {
                  "vertical": "",
                  "horizontal": "",
                  "lateral": "",
                  "longitudinal": "front",
                  "rowNumber": null,
                  "seatNumber": null,
                  "axleNumber": null
                }
              }],
              "endTime": "2019-01-14T14:32:51.690Z",
              "result": "prs"
            },
            {
              "name": "Retest",
              "categoryName": "Voluntary test",
              "startTime": "2019-01-14T14:32:31.602Z",
              "abandonment": {"reasons": []},
              "defects": [{
                "ref": "1.1.a",
                "deficiencyCategory": "major",
                "deficiencyId": "a",
                "deficiencyText": "missing.",
                "metadata": {
                  "category": {
                    "imNumber": 1,
                    "imDescription": "Registration Plate",
                    "additionalInfo": {
                      "location": {
                        "axleNumber": null,
                        "horizontal": null,
                        "vertical": null,
                        "longitudinal": ["front", "rear"],
                        "rowNumber": null,
                        "lateral": null,
                        "seatNumber": null
                      }, "notes": false
                    }
                  }, "item": {"itemNumber": 1, "itemDescription": "A registration plate:"}
                },
                "prs": false,
                "notes": "",
                "location": {
                  "vertical": "",
                  "horizontal": "",
                  "lateral": "",
                  "longitudinal": "front",
                  "rowNumber": null,
                  "seatNumber": null,
                  "axleNumber": null
                }
              }, {
                "ref": "1.2",
                "deficiencyCategory": "Advisory",
                "deficiencyId": null,
                "deficiencyText": "",
                "metadata": {
                  "category": {"imNumber": 1, "imDescription": "Registration Plate", "additionalInfo": null},
                  "item": {"itemNumber": 2, "itemDescription": "A registration mark:"}
                },
                "prs": null,
                "notes": "test",
                "location": null
              }],
              "endTime": "2019-01-14T14:32:51.690Z",
              "result": "abandoned"
            }]
        }], "preparer": null
      }]
    }
  }
}
