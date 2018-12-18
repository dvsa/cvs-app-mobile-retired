export class TestTypesDataMock {
  public static get TestTypesData() {
    return [
      {
        id: '123ffa12',
        name: 'annual test',
        forVehicleType: [
          'psv'
        ],
        forVehicleSize: [
          'small'
        ],
        forVehicleConfiguration: [
          'rigid'
        ],
        nextTestTypesOrCategories: [
          {
            id: 'asdas12314v',
            name: 'retest',
            forVehicleType: [
              'hgv'
            ],
            forVehicleSize: [
              'small'
            ],
            forVehicleConfiguration: [
              'rigid'
            ],
            forVehicleAxles: [
              2
            ]
          },
          {
            id: 'bsgs2341212',
            name: 'full test',
            forVehicleType: [
              'psv'
            ],
            forVehicleSize: [
              'small'
            ],
            forVehicleConfiguration: [
              'rigid'
            ],
            forVehicleAxles: [
              2
            ],
            nextTestTypesOrCategories: [
              {
                id: 'hjau6621',
                name: 'triple test',
                forVehicleType: [
                  'psv'
                ],
                forVehicleSize: [
                  'small'
                ],
                forVehicleConfiguration: [
                  'rigid'
                ],
                forVehicleAxles: [
                  2
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'bsgs2341212',
        name: 'full test',
        forVehicleType: [
          'psv', 'trailer'
        ],
        forVehicleSize: [
          'large'
        ],
        forVehicleConfiguration: [
          'articulated'
        ],
        forVehicleAxles: [
          2
        ],
        nextTestTypesOrCategories: null
      }
    ]
  }
}

