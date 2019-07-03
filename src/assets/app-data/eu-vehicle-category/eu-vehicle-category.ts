export class EuVehicleCategoryData {
  public static get EuCategoryPsvSubtitleData() {
    return 'M - vehicles designed and constructed for the carriage of passengers and comprising:';
  }

  public static get EuCategoryHgvSubtitleData() {
    return 'N - vehicles designed and constructed for the carriage of goods and having a maximum mass:';
  }

  public static get EuCategoryTrlSubtitleData() {
    return 'O - trailers (including semi-trailers) with a maximum mass:';
  }

  public static get EuCategoryPsvData() {
    return [
      {
        key: "m1",
        value: "no more than eight seats in addition to the driver's seat"
      },
      {
        key: "m2",
        value: "more than eight seats in addition to the driver's seat, and having a maximum mass not exceeding 5 tonnes"
      },
      {
        key: "m3",
        value: "more than eight seats in addition to the driver's seat, and having a maximum mass exceeding 5 tonnes"
      }
    ]
  }

  public static get EuCategoryHgvData() {
    return [
      {
        key: "n1",
        value: "not exceeding 3.5 tonnes"
      },
      {
        key: "n2",
        value: "exceeding 3.5 tonnes but not exceeding 12 tonnes"
      },
      {
        key: "n3",
        value: "exceeding 12 tonnes"
      }
    ]
  }

  public static get EuCategoryTrlData() {
    return [
      {
        key: "o1",
        value: "not exceeding 0.75 tonnes"
      },
      {
        key: "o2",
        value: "exceeding 0.75 tonnes but not exceeding 3.5 tonnes"
      },
      {
        key: "o3",
        value: "exceeding 3.5 tonnes but not exceeding 10 tonnes"
      },
      {
        key: "o4",
        value: "exceeding 10 tonnes"
      }
    ]
  }
}
