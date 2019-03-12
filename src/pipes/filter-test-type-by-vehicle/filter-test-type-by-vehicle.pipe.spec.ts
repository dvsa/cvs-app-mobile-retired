import { FilterTestTypeByVehiclePipe } from "./filter-test-type-by-vehicle.pipe";
import { TestTypesReferenceDataModel } from "../../models/reference-data-models/test-types.model";
import { VehicleDataMock } from "../../assets/data-mocks/vehicle-data.mock";
import { TestTypesReferenceDataMock } from "../../assets/data-mocks/reference-data-mocks/test-types.mock";

describe('FilterTestTypeByVehiclePipe', () => {
  let pipe = new FilterTestTypeByVehiclePipe();
  let testTypeData: TestTypesReferenceDataModel[] = TestTypesReferenceDataMock.TestTypesData;
  let vehicle = VehicleDataMock.VehicleData;

  it('return filtered by vehicle', () => {
    expect((pipe.transform(testTypeData, vehicle)).length).toBe(2);
  });

  it('return all items since no vehicle was entered', () => {
    expect((pipe.transform(testTypeData, null)).length).toBe(testTypeData.length);
  });
});
