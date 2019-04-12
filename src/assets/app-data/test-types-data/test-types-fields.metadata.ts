import { TEST_TYPE_FIELDS, TEST_TYPE_RESULTS } from "../../../app/app.enums";

export class TestTypesFieldsMetadata {
  public static get FieldsMetadata() {
    return [
      {
        testTypeId: '1',
        testTypeName: 'Annual test',
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'seatbeltInstallationCheckDate',
                label: 'Carried out during this test',
                type: 'ddl',
                title: 'Was a seatbelt installation check carried out?',
                values: [
                  {
                    text: 'Yes',
                    value: true,
                    cssClass: ''
                  },
                  {
                    text: 'No',
                    value: false,
                    cssClass: ''
                  }
                ],
                defaultValue: 'No'
              },
              {
                testTypePropertyName: 'numberOfSeatbeltsFitted',
                label: 'Number of seatbelts fitted',
                info: 'If there are no seatbelts fitted, enter zero (0).',
                type: 'number',
                defaultValue: 'Enter'
              },
              {
                testTypePropertyName: 'lastSeatbeltInstallationCheckDate',
                label: 'Most recent installation check',
                type: 'date',
                defaultValue: 'Enter',
                dependentOn: [{testTypePropertyName: 'numberOfSeatbeltsFitted', valueToBeDifferentFrom: '0'}]
              }
            ]
          }
        ],
        category: 'A',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '3',
        testTypeName: "Class 6A seatbelt installation check (annual test)",
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'seatbeltInstallationCheckDate',
                label: 'Carried out during this test',
                type: 'ddl',
                title: 'Was a seatbelt installation check carried out?',
                values: [
                  {
                    text: 'Yes',
                    value: true,
                    cssClass: ''
                  },
                  {
                    text: 'No',
                    value: false,
                    cssClass: ''
                  }
                ],
                defaultValue: 'Yes'
              },
              {
                testTypePropertyName: 'numberOfSeatbeltsFitted',
                label: 'Number of seatbelts fitted',
                info: 'If there are no seatbelts fitted, enter zero (0).',
                type: 'number',
                defaultValue: 'Enter'
              },
              {
                testTypePropertyName: 'lastSeatbeltInstallationCheckDate',
                label: 'Most recent installation check',
                type: 'date',
                defaultValue: 'Enter',
                dependentOn: [{testTypePropertyName: 'numberOfSeatbeltsFitted', valueToBeDifferentFrom: '0'}]
              }
            ]
          }
        ],
        category: 'B',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '4',
        testTypeName: "Class 6A seatbelt installation check (first test)",
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'seatbeltInstallationCheckDate',
                label: 'Carried out during this test',
                type: 'ddl',
                title: 'Was a seatbelt installation check carried out?',
                values: [
                  {
                    text: 'Yes',
                    value: true,
                    cssClass: ''
                  },
                  {
                    text: 'No',
                    value: false,
                    cssClass: ''
                  }
                ],
                defaultValue: 'Yes'
              },
              {
                testTypePropertyName: 'numberOfSeatbeltsFitted',
                label: 'Number of seatbelts fitted',
                info: 'If there are no seatbelts fitted, enter zero (0).',
                type: 'number',
                defaultValue: 'Enter'
              },
              {
                testTypePropertyName: 'lastSeatbeltInstallationCheckDate',
                label: 'Most recent installation check',
                type: 'date',
                defaultValue: 'Enter',
                dependentOn: [{testTypePropertyName: 'numberOfSeatbeltsFitted', valueToBeDifferentFrom: '0'}]
              }
            ]
          }
        ],
        category: 'B',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '7',
        testTypeName: "Paid retest",
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'seatbeltInstallationCheckDate',
                label: 'Carried out during this test',
                type: 'ddl',
                title: 'Was a seatbelt installation check carried out?',
                values: [
                  {
                    text: 'Yes',
                    value: true,
                    cssClass: ''
                  },
                  {
                    text: 'No',
                    value: false,
                    cssClass: ''
                  }
                ],
                defaultValue: 'No'
              },
              {
                testTypePropertyName: 'numberOfSeatbeltsFitted',
                label: 'Number of seatbelts fitted',
                info: 'If there are no seatbelts fitted, enter zero (0).',
                type: 'number',
                defaultValue: 'Enter'
              },
              {
                testTypePropertyName: 'lastSeatbeltInstallationCheckDate',
                label: 'Most recent installation check',
                type: 'date',
                defaultValue: 'Enter',
                dependentOn: [{testTypePropertyName: 'numberOfSeatbeltsFitted', valueToBeDifferentFrom: '0'}]
              }
            ]
          }
        ],
        category: 'A',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '8',
        testTypeName: "Paid retest with Class 6A seatbelt installation check",
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'seatbeltInstallationCheckDate',
                label: 'Carried out during this test',
                type: 'ddl',
                title: 'Was a seatbelt installation check carried out?',
                values: [
                  {
                    text: 'Yes',
                    value: true,
                    cssClass: ''
                  },
                  {
                    text: 'No',
                    value: false,
                    cssClass: ''
                  }
                ],
                defaultValue: 'Yes'
              },
              {
                testTypePropertyName: 'numberOfSeatbeltsFitted',
                label: 'Number of seatbelts fitted',
                info: 'If there are no seatbelts fitted, enter zero (0).',
                type: 'number',
                defaultValue: 'Enter'
              },
              {
                testTypePropertyName: 'lastSeatbeltInstallationCheckDate',
                label: 'Most recent installation check',
                type: 'date',
                defaultValue: 'Enter',
                dependentOn: [{testTypePropertyName: 'numberOfSeatbeltsFitted', valueToBeDifferentFrom: '0'}]
              }
            ]
          }
        ],
        category: 'B',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: 'paidRetestWithoutClass6aSeatbeltInstallationCheck',
        sections: [],
        category: 'B',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '10',
        testTypeName: "Part-paid retest",
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'seatbeltInstallationCheckDate',
                label: 'Carried out during this test',
                type: 'ddl',
                title: 'Was a seatbelt installation check carried out?',
                values: [
                  {
                    text: 'Yes',
                    value: true,
                    cssClass: ''
                  },
                  {
                    text: 'No',
                    value: false,
                    cssClass: ''
                  }
                ],
                defaultValue: 'No'
              },
              {
                testTypePropertyName: 'numberOfSeatbeltsFitted',
                label: 'Number of seatbelts fitted',
                info: 'If there are no seatbelts fitted, enter zero (0).',
                type: 'number',
                defaultValue: 'Enter'
              },
              {
                testTypePropertyName: 'lastSeatbeltInstallationCheckDate',
                label: 'Most recent installation check',
                type: 'date',
                defaultValue: 'Enter',
                dependentOn: [{testTypePropertyName: 'numberOfSeatbeltsFitted', valueToBeDifferentFrom: '0'}]
              }
            ]
          }
        ],
        category: 'A',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '14',
        testTypeName: "Paid prohibition clearance (full inspection with certificate)",
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'seatbeltInstallationCheckDate',
                label: 'Carried out during this test',
                type: 'ddl',
                title: 'Was a seatbelt installation check carried out?',
                values: [
                  {
                    text: 'Yes',
                    value: true,
                    cssClass: ''
                  },
                  {
                    text: 'No',
                    value: false,
                    cssClass: ''
                  }
                ],
                defaultValue: 'No'
              },
              {
                testTypePropertyName: 'numberOfSeatbeltsFitted',
                label: 'Number of seatbelts fitted',
                info: 'If there are no seatbelts fitted, enter zero (0).',
                type: 'number',
                defaultValue: 'Enter'
              },
              {
                testTypePropertyName: 'lastSeatbeltInstallationCheckDate',
                label: 'Most recent installation check',
                type: 'date',
                defaultValue: 'Enter',
                dependentOn: [{testTypePropertyName: 'numberOfSeatbeltsFitted', valueToBeDifferentFrom: '0'}]
              }
            ]
          }
        ],
        category: 'A',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '15',
        testTypeName: "Paid prohibition clearance (full inspection without certificate)",
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'seatbeltInstallationCheckDate',
                label: 'Carried out during this test',
                type: 'ddl',
                title: 'Was a seatbelt installation check carried out?',
                values: [
                  {
                    text: 'Yes',
                    value: true,
                    cssClass: ''
                  },
                  {
                    text: 'No',
                    value: false,
                    cssClass: ''
                  }
                ],
                defaultValue: 'No'
              },
              {
                testTypePropertyName: 'numberOfSeatbeltsFitted',
                label: 'Number of seatbelts fitted',
                info: 'If there are no seatbelts fitted, enter zero (0).',
                type: 'number',
                defaultValue: 'Enter'
              },
              {
                testTypePropertyName: 'lastSeatbeltInstallationCheckDate',
                label: 'Most recent installation check',
                type: 'date',
                defaultValue: 'Enter',
                dependentOn: [{testTypePropertyName: 'numberOfSeatbeltsFitted', valueToBeDifferentFrom: '0'}]
              }
            ]
          }
        ],
        category: 'A',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '16',
        testTypeName: "Part-paid prohibition clearance (full inspection)",
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'seatbeltInstallationCheckDate',
                label: 'Carried out during this test',
                type: 'ddl',
                title: 'Was a seatbelt installation check carried out?',
                values: [
                  {
                    text: 'Yes',
                    value: true,
                    cssClass: ''
                  },
                  {
                    text: 'No',
                    value: false,
                    cssClass: ''
                  }
                ],
                defaultValue: 'No'
              },
              {
                testTypePropertyName: 'numberOfSeatbeltsFitted',
                label: 'Number of seatbelts fitted',
                info: 'If there are no seatbelts fitted, enter zero (0).',
                type: 'number',
                defaultValue: 'Enter'
              },
              {
                testTypePropertyName: 'lastSeatbeltInstallationCheckDate',
                label: 'Most recent installation check',
                type: 'date',
                defaultValue: 'Enter',
                dependentOn: [{testTypePropertyName: 'numberOfSeatbeltsFitted', valueToBeDifferentFrom: '0'}]
              }
            ]
          }
        ],
        category: 'A',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '18',
        testTypeName: "Paid prohibition clearance (retest with certificate)",
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'seatbeltInstallationCheckDate',
                label: 'Carried out during this test',
                type: 'ddl',
                title: 'Was a seatbelt installation check carried out?',
                values: [
                  {
                    text: 'Yes',
                    value: true,
                    cssClass: ''
                  },
                  {
                    text: 'No',
                    value: false,
                    cssClass: ''
                  }
                ],
                defaultValue: 'No'
              },
              {
                testTypePropertyName: 'numberOfSeatbeltsFitted',
                label: 'Number of seatbelts fitted',
                info: 'If there are no seatbelts fitted, enter zero (0).',
                type: 'number',
                defaultValue: 'Enter'
              },
              {
                testTypePropertyName: 'lastSeatbeltInstallationCheckDate',
                label: 'Most recent installation check',
                type: 'date',
                defaultValue: 'Enter',
                dependentOn: [{testTypePropertyName: 'numberOfSeatbeltsFitted', valueToBeDifferentFrom: '0'}]
              }
            ]
          }
        ],
        category: 'A',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '19',
        testTypeName: "Paid prohibition clearance (retest without certificate)",
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'seatbeltInstallationCheckDate',
                label: 'Carried out during this test',
                type: 'ddl',
                title: 'Was a seatbelt installation check carried out?',
                values: [
                  {
                    text: 'Yes',
                    value: true,
                    cssClass: ''
                  },
                  {
                    text: 'No',
                    value: false,
                    cssClass: ''
                  }
                ],
                defaultValue: 'No'
              },
              {
                testTypePropertyName: 'numberOfSeatbeltsFitted',
                label: 'Number of seatbelts fitted',
                info: 'If there are no seatbelts fitted, enter zero (0).',
                type: 'number',
                defaultValue: 'Enter'
              },
              {
                testTypePropertyName: 'lastSeatbeltInstallationCheckDate',
                label: 'Most recent installation check',
                type: 'date',
                defaultValue: 'Enter',
                dependentOn: [{testTypePropertyName: 'numberOfSeatbeltsFitted', valueToBeDifferentFrom: '0'}]
              }
            ]
          }
        ],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '21',
        testTypeName: "Part-paid prohibition clearance (retest with certificate)",
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'seatbeltInstallationCheckDate',
                label: 'Carried out during this test',
                type: 'ddl',
                title: 'Was a seatbelt installation check carried out?',
                values: [
                  {
                    text: 'Yes',
                    value: true,
                    cssClass: ''
                  },
                  {
                    text: 'No',
                    value: false,
                    cssClass: ''
                  }
                ],
                defaultValue: 'No'
              },
              {
                testTypePropertyName: 'numberOfSeatbeltsFitted',
                label: 'Number of seatbelts fitted',
                info: 'If there are no seatbelts fitted, enter zero (0).',
                type: 'number',
                defaultValue: 'Enter'
              },
              {
                testTypePropertyName: 'lastSeatbeltInstallationCheckDate',
                label: 'Most recent installation check',
                type: 'date',
                defaultValue: 'Enter',
                dependentOn: [{testTypePropertyName: 'numberOfSeatbeltsFitted', valueToBeDifferentFrom: '0'}]
              }
            ]
          }
        ],
        category: 'A',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '22',
        testTypeName: "Part-paid prohibition clearance (retest without certificate)",
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'seatbeltInstallationCheckDate',
                label: 'Carried out during this test',
                type: 'ddl',
                title: 'Was a seatbelt installation check carried out?',
                values: [
                  {
                    text: 'Yes',
                    value: true,
                    cssClass: ''
                  },
                  {
                    text: 'No',
                    value: false,
                    cssClass: ''
                  }
                ],
                defaultValue: 'No'
              },
              {
                testTypePropertyName: 'numberOfSeatbeltsFitted',
                label: 'Number of seatbelts fitted',
                info: 'If there are no seatbelts fitted, enter zero (0).',
                type: 'number',
                defaultValue: 'Enter'
              },
              {
                testTypePropertyName: 'lastSeatbeltInstallationCheckDate',
                label: 'Most recent installation check',
                type: 'date',
                defaultValue: 'Enter',
                dependentOn: [{testTypePropertyName: 'numberOfSeatbeltsFitted', valueToBeDifferentFrom: '0'}]
              }
            ]
          }
        ],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '23',
        testTypeName: "Part-paid prohibition clearance (partial inspection)",
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'seatbeltInstallationCheckDate',
                label: 'Carried out during this test',
                type: 'ddl',
                title: 'Was a seatbelt installation check carried out?',
                values: [
                  {
                    text: 'Yes',
                    value: true,
                    cssClass: ''
                  },
                  {
                    text: 'No',
                    value: false,
                    cssClass: ''
                  }
                ],
                defaultValue: 'No'
              },
              {
                testTypePropertyName: 'numberOfSeatbeltsFitted',
                label: 'Number of seatbelts fitted',
                info: 'If there are no seatbelts fitted, enter zero (0).',
                type: 'number',
                defaultValue: 'Enter'
              },
              {
                testTypePropertyName: 'lastSeatbeltInstallationCheckDate',
                label: 'Most recent installation check',
                type: 'date',
                defaultValue: 'Enter',
                dependentOn: [{testTypePropertyName: 'numberOfSeatbeltsFitted', valueToBeDifferentFrom: '0'}]
              }
            ]
          }
        ],
        category: 'A',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '27',
        testTypeName: "Paid prohibition clearance with Class 6A seatbelt installation check (full inspection)",
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'seatbeltInstallationCheckDate',
                label: 'Carried out during this test',
                type: 'ddl',
                title: 'Was a seatbelt installation check carried out?',
                values: [
                  {
                    text: 'Yes',
                    value: true,
                    cssClass: ''
                  },
                  {
                    text: 'No',
                    value: false,
                    cssClass: ''
                  }
                ],
                defaultValue: 'Yes'
              },
              {
                testTypePropertyName: 'numberOfSeatbeltsFitted',
                label: 'Number of seatbelts fitted',
                info: 'If there are no seatbelts fitted, enter zero (0).',
                type: 'number',
                defaultValue: 'Enter'
              },
              {
                testTypePropertyName: 'lastSeatbeltInstallationCheckDate',
                label: 'Most recent installation check',
                type: 'date',
                defaultValue: 'Enter',
                dependentOn: [{testTypePropertyName: 'numberOfSeatbeltsFitted', valueToBeDifferentFrom: '0'}]
              }
            ]
          }
        ],
        category: 'B',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '28',
        testTypeName: "Prohibition clearance (retest with Class 6A seatbelt installation check)",
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'seatbeltInstallationCheckDate',
                label: 'Carried out during this test',
                type: 'ddl',
                title: 'Was a seatbelt installation check carried out?',
                values: [
                  {
                    text: 'Yes',
                    value: true,
                    cssClass: ''
                  },
                  {
                    text: 'No',
                    value: false,
                    cssClass: ''
                  }
                ],
                defaultValue: 'Yes'
              },
              {
                testTypePropertyName: 'numberOfSeatbeltsFitted',
                label: 'Number of seatbelts fitted',
                info: 'If there are no seatbelts fitted, enter zero (0).',
                type: 'number',
                defaultValue: 'Enter'
              },
              {
                testTypePropertyName: 'lastSeatbeltInstallationCheckDate',
                label: 'Most recent installation check',
                type: 'date',
                defaultValue: 'Enter',
                dependentOn: [{testTypePropertyName: 'numberOfSeatbeltsFitted', valueToBeDifferentFrom: '0'}]
              }
            ]
          }
        ],
        category: 'B',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '30',
        testTypeName: "Voluntary brake test",
        sections: [
          {
            sectionName: 'Result',
            inputs: [
              {
                testTypePropertyName: 'testResult',
                label: 'Test result',
                type: 'ddl',
                title: 'Test result',
                values: [
                  {
                    text: 'Pass',
                    value: TEST_TYPE_RESULTS.PASS,
                    cssClass: ''
                  },
                  {
                    text: 'Fail',
                    value: TEST_TYPE_RESULTS.FAIL,
                    cssClass: 'danger-action-button'
                  }
                ],
                defaultValue: 'Select',
                deactivateButtonOnSelection: true
              }
            ]
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '31',
        testTypeName: "Voluntary headlamp aim check",
        sections: [
          {
            sectionName: 'Result',
            inputs: [
              {
                testTypePropertyName: 'testResult',
                label: 'Test result',
                type: 'ddl',
                title: 'Test result',
                values: [
                  {
                    text: 'Pass',
                    value: TEST_TYPE_RESULTS.PASS,
                    cssClass: ''
                  },
                  {
                    text: 'Fail',
                    value: TEST_TYPE_RESULTS.FAIL,
                    cssClass: 'danger-action-button'
                  }
                ],
                defaultValue: 'Select',
                deactivateButtonOnSelection: true
              }
            ]
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '32',
        testTypeName: "Voluntary smoke test",
        sections: [
          {
            sectionName: 'Result',
            inputs: [
              {
                testTypePropertyName: 'testResult',
                label: 'Test result',
                type: 'ddl',
                title: 'Test result',
                values: [
                  {
                    text: 'Pass',
                    value: TEST_TYPE_RESULTS.PASS,
                    cssClass: ''
                  },
                  {
                    text: 'Fail',
                    value: TEST_TYPE_RESULTS.FAIL,
                    cssClass: 'danger-action-button'
                  }
                ],
                defaultValue: 'Select',
                deactivateButtonOnSelection: true
              }
            ]
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '33',
        testTypeName: "Voluntary multi check (headlamp aim, smoke and brake test)",
        sections: [
          {
            sectionName: 'Result',
            inputs: [
              {
                testTypePropertyName: 'testResult',
                label: 'Test result',
                type: 'ddl',
                title: 'Test result',
                values: [
                  {
                    text: 'Pass',
                    value: TEST_TYPE_RESULTS.PASS,
                    cssClass: ''
                  },
                  {
                    text: 'Fail',
                    value: TEST_TYPE_RESULTS.FAIL,
                    cssClass: 'danger-action-button'
                  }
                ],
                defaultValue: 'Select',
                deactivateButtonOnSelection: true
              }
            ]
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '34',
        testTypeName: "Voluntary speed limiter check",
        sections: [
          {
            sectionName: 'Result',
            inputs: [
              {
                testTypePropertyName: 'testResult',
                label: 'Test result',
                type: 'ddl',
                title: 'Test result',
                values: [
                  {
                    text: 'Pass',
                    value: TEST_TYPE_RESULTS.PASS,
                    cssClass: ''
                  },
                  {
                    text: 'Fail',
                    value: TEST_TYPE_RESULTS.FAIL,
                    cssClass: 'danger-action-button'
                  }
                ],
                defaultValue: 'Select',
                deactivateButtonOnSelection: true
              }
            ]
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '35',
        testTypeName: "Voluntary Vitesse 100",
        sections: [
          {
            sectionName: 'Result',
            inputs: [
              {
                testTypePropertyName: 'testResult',
                label: 'Test result',
                type: 'ddl',
                title: 'Test result',
                values: [
                  {
                    text: 'Pass',
                    value: TEST_TYPE_RESULTS.PASS,
                    cssClass: ''
                  },
                  {
                    text: 'Fail',
                    value: TEST_TYPE_RESULTS.FAIL,
                    cssClass: 'danger-action-button'
                  }
                ],
                defaultValue: 'Select',
                deactivateButtonOnSelection: true
              }
            ]
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '36',
        testTypeName: "Voluntary Tempo 100",
        sections: [
          {
            sectionName: 'Result',
            inputs: [
              {
                testTypePropertyName: 'testResult',
                label: 'Test result',
                type: 'ddl',
                title: 'Test result',
                values: [
                  {
                    text: 'Pass',
                    value: TEST_TYPE_RESULTS.PASS,
                    cssClass: ''
                  },
                  {
                    text: 'Fail',
                    value: TEST_TYPE_RESULTS.FAIL,
                    cssClass: 'danger-action-button'
                  }
                ],
                defaultValue: 'Select',
                deactivateButtonOnSelection: true
              }
            ]
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '38',
        testTypeName: "Notifiable alteration check",
        sections: [
          {
            sectionName: 'Result',
            inputs: [
              {
                testTypePropertyName: 'testResult',
                label: 'Test result',
                type: 'ddl',
                title: 'Test result',
                values: [
                  {
                    text: 'Pass',
                    value: TEST_TYPE_RESULTS.PASS,
                    cssClass: ''
                  },
                  {
                    text: 'Fail',
                    value: TEST_TYPE_RESULTS.FAIL,
                    cssClass: 'danger-action-button'
                  }
                ],
                defaultValue: 'Select',
                deactivateButtonOnSelection: true
              }
            ]
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: '39',
        testTypeName: "Low Emissions Certificate (LEC) with annual test",
        sections: [
          {
            sectionName: 'Result',
            inputs: [
              {
                testTypePropertyName: 'testResult',
                label: 'Test result',
                type: 'ddl',
                title: 'Test result',
                values: [
                  {
                    text: 'Pass',
                    value: TEST_TYPE_RESULTS.PASS,
                    cssClass: ''
                  },
                  {
                    text: 'Fail',
                    value: TEST_TYPE_RESULTS.FAIL,
                    cssClass: 'danger-action-button'
                  }
                ],
                defaultValue: 'Select',
                deactivateButtonOnSelection: true
              }
            ]
          },
          {
            sectionName: 'Certificate number',
            inputs: [
              {
                testTypePropertyName: 'certificateNumber',
                placeholder: 'Enter',
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER_CUSTOM,
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasDefects: false,
        hasNotes: true
      },
      {
        testTypeId: 'lecWithoutAnnualTest',
        sections: [
          {
            sectionName: 'Result',
            inputs: [
              {
                testTypePropertyName: 'testResult',
                label: 'Test result',
                type: 'ddl',
                title: 'Test result',
                values: [
                  {
                    text: 'Pass',
                    value: TEST_TYPE_RESULTS.PASS,
                    cssClass: ''
                  },
                  {
                    text: 'Fail',
                    value: TEST_TYPE_RESULTS.FAIL,
                    cssClass: 'danger-action-button'
                  }
                ],
                defaultValue: 'Select',
                deactivateButtonOnSelection: true
              }
            ]
          },
          {
            sectionName: 'Certificate number',
            inputs: [
              {
                testTypePropertyName: 'certificateNumber',
                placeholder: 'Enter',
                type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER_CUSTOM,
              }
            ],
            dependentOn: ['testResult']
          }
        ],
        hasDefects: false,
        hasNotes: true
      }
    ]
  }
}
