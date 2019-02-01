import { TEST_TYPE_FIELDS, TEST_TYPE_RESULTS } from "../../../app/app.enums";

export class TestTypesFieldsMetadata {
  public static get FieldsMetadata() {
    return [
      {
        testTypeId: '1',
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'wasSeatbeltInstallationCheckCarriedOut',
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
                testTypePropertyName: 'seatbeltsNumber',
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
                dependentOn: [{testTypePropertyName: 'seatbeltsNumber', valueToBeDifferentFrom: '0'}]
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
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'wasSeatbeltInstallationCheckCarriedOut',
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
                testTypePropertyName: 'seatbeltsNumber',
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
                dependentOn: [{testTypePropertyName: 'seatbeltsNumber', valueToBeDifferentFrom: '0'}]
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
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'wasSeatbeltInstallationCheckCarriedOut',
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
                testTypePropertyName: 'seatbeltsNumber',
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
                dependentOn: [{testTypePropertyName: 'seatbeltsNumber', valueToBeDifferentFrom: '0'}]
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
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'wasSeatbeltInstallationCheckCarriedOut',
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
                testTypePropertyName: 'seatbeltsNumber',
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
                dependentOn: [{testTypePropertyName: 'seatbeltsNumber', valueToBeDifferentFrom: '0'}]
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
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'wasSeatbeltInstallationCheckCarriedOut',
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
                testTypePropertyName: 'seatbeltsNumber',
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
                dependentOn: [{testTypePropertyName: 'seatbeltsNumber', valueToBeDifferentFrom: '0'}]
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
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'wasSeatbeltInstallationCheckCarriedOut',
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
                testTypePropertyName: 'seatbeltsNumber',
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
                dependentOn: [{testTypePropertyName: 'seatbeltsNumber', valueToBeDifferentFrom: '0'}]
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
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '15',
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'wasSeatbeltInstallationCheckCarriedOut',
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
                testTypePropertyName: 'seatbeltsNumber',
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
                dependentOn: [{testTypePropertyName: 'seatbeltsNumber', valueToBeDifferentFrom: '0'}]
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
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'wasSeatbeltInstallationCheckCarriedOut',
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
                testTypePropertyName: 'seatbeltsNumber',
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
                dependentOn: [{testTypePropertyName: 'seatbeltsNumber', valueToBeDifferentFrom: '0'}]
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
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '21',
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'wasSeatbeltInstallationCheckCarriedOut',
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
                testTypePropertyName: 'seatbeltsNumber',
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
                dependentOn: [{testTypePropertyName: 'seatbeltsNumber', valueToBeDifferentFrom: '0'}]
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
        sections: [],
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '23',
        sections: [],
        category: 'A',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '24',
        sections: [],
        category: 'A',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '25',
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'wasSeatbeltInstallationCheckCarriedOut',
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
                testTypePropertyName: 'seatbeltsNumber',
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
                dependentOn: [{testTypePropertyName: 'seatbeltsNumber', valueToBeDifferentFrom: '0'}]
              }
            ]
          }
        ],
        category: 'B',
        hasDefects: true,
        hasNotes: true
      },
      {
        testTypeId: '27',
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'wasSeatbeltInstallationCheckCarriedOut',
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
                testTypePropertyName: 'seatbeltsNumber',
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
                dependentOn: [{testTypePropertyName: 'seatbeltsNumber', valueToBeDifferentFrom: '0'}]
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
        sections: [
          {
            sectionName: 'Seatbelt installation check',
            inputs: [
              {
                testTypePropertyName: 'wasSeatbeltInstallationCheckCarriedOut',
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
                testTypePropertyName: 'seatbeltsNumber',
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
                dependentOn: [{testTypePropertyName: 'seatbeltsNumber', valueToBeDifferentFrom: '0'}]
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
        sections: [
          {
            sectionName: 'Result',
            inputs: [
              {
                testTypePropertyName: 'result',
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
        sections: [
          {
            sectionName: 'Result',
            inputs: [
              {
                testTypePropertyName: 'result',
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
        sections: [
          {
            sectionName: 'Result',
            inputs: [
              {
                testTypePropertyName: 'result',
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
        sections: [
          {
            sectionName: 'Result',
            inputs: [
              {
                testTypePropertyName: 'result',
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
        sections: [
          {
            sectionName: 'Result',
            inputs: [
              {
                testTypePropertyName: 'result',
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
        sections: [
          {
            sectionName: 'Result',
            inputs: [
              {
                testTypePropertyName: 'result',
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
        sections: [
          {
            sectionName: 'Result',
            inputs: [
              {
                testTypePropertyName: 'result',
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
        sections: [
          {
            sectionName: 'Result',
            inputs: [
              {
                testTypePropertyName: 'result',
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
        sections: [
          {
            sectionName: 'Result',
            inputs: [
              {
                testTypePropertyName: 'result',
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
            dependentOn: ['result']
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
                testTypePropertyName: 'result',
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
            dependentOn: ['result']
          }
        ],
        hasDefects: false,
        hasNotes: true
      }
    ]
  }
}