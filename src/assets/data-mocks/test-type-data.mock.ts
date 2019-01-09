import { TEST_TYPE_RESULTS } from "../../app/app.enums";

export class TestTypeDataMock {
  public static get TestTypeData() {
    return {
      name: 'annual test',
      startTime: new Date('2018-12-19'),
      result: TEST_TYPE_RESULTS.SUCCESSFUL,
      abandonment: {
        reasons: [],
        additionalComment: ''
      },
      defects: []
    }
  }
}
