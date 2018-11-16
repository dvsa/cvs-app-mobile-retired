export class DefectsDataMock {
  public static get DefectsData() {
    return [
      {
        "imNumber": 1,
        "imDescription": "Registration Plate",
        "forVehicleType": [
          "psv", "hgv"
        ],
        "additionalInfo": {
          "psv": {
            "location": {
              "vertical": [],
              "horizontal": [
                "left",
                "right"
              ],
              "lateral": [],
              "longitudinal": [
                "front",
                "back"
              ],
              "rowNumber": [],
              "seatNumber": [],
              "axleNumber": []
            },
            "notes": false
          },
          "hgv": {},
          "trl": {}
        },
        "items": [
          {
            "itemNumber": 1,
            "itemDescription": "A registration plate",
            "forVehicleType": [
              "psv", "hgv"
            ],
            "deficiencies": [
              {
                "ref": "1.1.a",
                "deficiencyId": "a",
                "deficiencySubId": null,
                "deficiencyCategory": "Major",
                "deficiencyText": "missing.",
                "stdForProhibition": false,
                "forVehicleType": [
                  "psv",
                  "hgv"
                ]
              },
              {
                "ref": "1.1.b",
                "deficiencyId": "b",
                "deficiencySubId": null,
                "deficiencyCategory": "Minor",
                "deficiencyText": "insecure.",
                "stdForProhibition": false,
                "forVehicleType": [
                  "psv",
                  "hgv"
                ]
              }
            ]
          },
          {
            "itemNumber": 2,
            "itemDescription": "A registration mark",
            "forVehicleType": [
              "psv"
            ],
            "deficiencies": [
              {
                "ref": "1.2.a",
                "deficiencyId": "a",
                "deficiencySubId": null,
                "deficiencyCategory": "Dangerous",
                "deficiencyText": "missing registration mark",
                "stdForProhibition": false,
                "forVehicleType": [
                  "psv",
                ]
              },
              {
                "ref": "1.2.b",
                "deficiencyId": "b",
                "deficiencySubId": null,
                "deficiencyCategory": "Major",
                "deficiencyText": "Illegible",
                "stdForProhibition": false,
                "forVehicleType": [
                  "psv",
                ]
              },
              {
                "ref": "1.2.c",
                "deficiencyId": "c",
                "deficiencySubId": null,
                "deficiencyCategory": "Minor",
                "deficiencyText": "Not in accordance with the requirements and the set of regulations",
                "stdForProhibition": false,
                "forVehicleType": [
                  "psv",
                ]
              }
            ]
          }
        ]
      },
      {
        "imNumber": 2,
        "imDescription": "Suspension, Shock absorber",
        "forVehicleType": [
          "psv", "hgv"
        ],
        "additionalInfo": {
          "psv": {
            "location": {
              "vertical": [
                "Upper",
                "Lower"
              ],
              "horizontal": [
                "Inner",
                "Outer"
              ],
              "lateral": [
                "Nearside",
                "Centre"
              ],
              "longitudinal": [],
              "rowNumber": [],
              "seatNumber": [],
              "axleNumber": []
            },
            "notes": false
          },
          "hgv": {},
          "trl": {}
        },
        "items": [
          {
            "itemNumber": 1,
            "itemDescription": "Suspension",
            "forVehicleType": [
              "psv", "hgv"
            ],
            "deficiencies": [
              {
                "ref": "1.1.a",
                "deficiencyId": "a",
                "deficiencySubId": null,
                "deficiencyCategory": "Major",
                "deficiencyText": "Missing",
                "stdForProhibition": false,
                "forVehicleType": [
                  "psv",
                  "hgv"
                ]
              },
              {
                "ref": "1.1.b",
                "deficiencyId": "b",
                "deficiencySubId": null,
                "deficiencyCategory": "Minor",
                "deficiencyText": "Rusty",
                "stdForProhibition": false,
                "forVehicleType": [
                  "psv",
                  "hgv"
                ]
              }
            ]
          },
          {
            "itemNumber": 2,
            "itemDescription": "Shock absorber",
            "forVehicleType": [
              "psv"
            ],
            "deficiencies": [
              {
                "ref": "1.2.a",
                "deficiencyId": "a",
                "deficiencySubId": null,
                "deficiencyCategory": "Dangerous",
                "deficiencyText": "missing shock absorber",
                "stdForProhibition": false,
                "forVehicleType": [
                  "psv",
                ]
              },
              {
                "ref": "1.2.b",
                "deficiencyId": "b",
                "deficiencySubId": null,
                "deficiencyCategory": "Major",
                "deficiencyText": "Loose",
                "stdForProhibition": false,
                "forVehicleType": [
                  "psv",
                ]
              },
              {
                "ref": "1.2.c",
                "deficiencyId": "c",
                "deficiencySubId": null,
                "deficiencyCategory": "Minor",
                "deficiencyText": "Not in accordance with the requirements",
                "stdForProhibition": false,
                "forVehicleType": [
                  "psv",
                ]
              }
            ]
          }
        ]
      }
    ];
  }
}
