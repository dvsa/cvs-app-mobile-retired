export class VehicleDataMock {
  public  static get VehicleData() {
    return {
      "vrms": [
        {
          "vrm": "12aabcd",
          "isprimary": true
        }
      ],
      "vin": "SOMEBIG5TRING2324",
      "techRecord": [
        {
          "psvChassisMake": "english",
          "psvChassisModel": "strong one",
          "psvBodyMake": "japan",
          "psvBodyModel": "cabrio",
          "psvBodyType": "articulated",
          "manufactureDate": 0,
          "regnDate": "2017-12-13",
          "coifDate": "2018-12-13",
          "ntaNumerb": "112GGB0DF",
          "conversionRefNo": "KKDFDF3L43434",
          "seatsLowerDeck": 40,
          "seatsUpperDeck": 30,
          "standingCapacity": 50,
          "speedRestriction": 120,
          "speedLimiterMrk": true,
          "tachoExemptMrk": true,
          "dispensations": "AFEW",
          "remarks": "none for the moment",
          "reasonForCreation": "to exist",
          "statusCode": "archived",
          "grossKerbWeight": 0,
          "grossLadenWeight": 0,
          "grossGbWeight": 0,
          "grossDesignWeight": 0,
          "noOfAxles": 0,
          "brakeCode": "kfdjdd123",
          "brakes": {
            "brakeCode": "dddbrake34",
            "dataTrPsvBrakeOne": "brake1",
            "dataTrPsvBrakeTwo": "brake2",
            "dataTrpsvBrakeThree": "brake3",
            "parkingBrakeMrk": "N",
            "retarderBrakeOne": "electric",
            "retarderBrakeTwo": "electric",
            "brakeForceWheelsNotLocked": {
              "serviceBrakeForceA": 0,
              "secondaryBrakeForceA": 0,
              "parkingBrakeForceA": 0
            },
            "BrakeForceWheelsUpToHalfLocked": {
              "serviceBrakeForceB": 0,
              "secondaryBrakeForceB": 0,
              "parkingBrakeForceB": 0
            }
          },
          "axles": [
            {
              "axleNumber": 6,
              "weights": {
                "kerbWeight": 14,
                "ladenWeight": 23,
                "gbWeight": 32,
                "designWeight": 50
              },
              "tyres": {
                "tyreSize": "BigOnes",
                "plyRating": "BestEver",
                "fitmentCode": ["double"],
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
