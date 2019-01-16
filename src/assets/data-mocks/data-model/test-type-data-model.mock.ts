import { TEST_TYPE_RESULTS } from "../../../app/app.enums";

export class TestTypeDataModelMock {
  public static get TestTypeData() {
    return {
      name: 'annual test',
      testTypeName: 'Annual test',
      id: '1',
      startTime: new Date('2018-12-19').toISOString(),
      seatbeltsNumber: null,
      lastSeatbeltInstallationCheckDate: '',
      wasSeatbeltInstallationCheckCarriedOut: null,
      result: TEST_TYPE_RESULTS.PASS,
      abandonment: {
        reasons: [],
        additionalComment: ''
      },
      defects: []
    }
  }
}
