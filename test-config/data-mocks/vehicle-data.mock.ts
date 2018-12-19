export class VehicleDataMock {
    public  static get VehicleData() {
      return {
        "vrms": [
          {
            "vrm": "BQ91YHQ",
            "isPrimary": true
          },
          {
            "vrm": "QO92UX2",
            "isPrimary": false
          }
        ],
        "vin": "1B7GG36N12S678410",
        "techRecord": [
          {
            "chassisMake": "Volvo",
            "chassisModel": "Model",
            "bodyMake": "Sport",
            "bodyModel": "blanao",
            "bodyType": "articulated",
            "manufactureDate": 1989,
            "regnDate": "2018-12-19",
            "coifDate": "2018-12-19",
            "ntaNumber": "1234",
            "conversionRefNo": "stringao",
            "seatsLowerDeck": 1,
            "seatsUpperDeck": 2,
            "standingCapacity": 10,
            "speedRestriction": 100,
            "speedLimiterMrk": true,
            "tachoExemptMrk": true,
            "dispensations": "dsps",
            "remarks": "Thank you, Kanye, very cool",
            "reasonForCreation": "this car is very cool",
            "statusCode": "current",
            "unladenWeight": 1,
            "grossKerbWeight": 2,
            "grossLadenWeight": 3,
            "grossGbWeight": 4,
            "grossDesignWeight": 5,
            "grossUnladenWeight": 6,
            "noOfAxles": 2,
            "brakeCode": "string",
            "vehicleClass": "2 (MotorBikes over 200cc or with a sidecar)",
            "vehicleType": "PSV",
            "brakes": {
              "brakeCode": "brkCode",
              "dataTrBrakeOne": "random",
              "dataTrBrakeTwo": "string",
              "dataTrBrakeThree": "here",
              "parkingBrakeMrk": "N",
              "retarderBrakeOne": "electric",
              "retarderBrakeTwo": "electric",
              "brakeForceWheelsNotLocked": {
                "serviceBrakeForceA": 1,
                "secondaryBrakeForceA": 2,
                "parkingBrakeForceA": 3
              },
              "brakeForceWheelsUpToHalfLocked": {
                "serviceBrakeForceB": 1,
                "secondaryBrakeForceB": 2,
                "parkingBrakeForceB": 3
              }
            },
            "axles": [
              {
                "axleNumber": 1,
                "weights": {
                  "kerbWeight": 1,
                  "ladenWeight": 2,
                  "gbWeight": 3,
                  "designWeight": 4
                },
                "tyres": {
                  "tyreSize": "big",
                  "plyRating": "10/10",
                  "fitmentCode": "double",
                  "dataTrPsvAxles": 0,
                  "speedCategorySymbol": "A7",
                  "tyreCode": 0
                }
              },
              {
                "axleNumber": 2,
                "weights": {
                  "kerbWeight": 5,
                  "ladenWeight": 6,
                  "gbWeight": 7,
                  "designWeight": 8
                },
                "tyres": {
                  "tyreSize": "big",
                  "plyRating": "10/10",
                  "fitmentCode": "double",
                  "dataTrPsvAxles": 0,
                  "speedCategorySymbol": "A7",
                  "tyreCode": 0
                }
              }
            ]
          }
        ]
      }
    }
  }