import { FilterTestTypeByVehiclePipe } from "./filter-test-type-by-vehicle.pipe";
import { TestTypesReferenceDataModel } from "../../models/reference-data-models/test-types.model";
import { VehicleDataMock } from "../../assets/data-mocks/vehicle-data.mock";
import { TestTypesReferenceDataMock } from "../../assets/data-mocks/reference-data-mocks/test-types.mock";
import {cloneDeep} from "lodash";

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

  it('handles the situation where String fields are missing without erroring', () => {
    const modifiedTestData = cloneDeep(testTypeData);
    modifiedTestData[0].forVehicleConfiguration = ["chicken"];
    const partialVehicle = cloneDeep(vehicle);
    delete partialVehicle.techRecord.vehicleConfiguration;
    expect((pipe.transform(modifiedTestData, partialVehicle)).length).toBe(0);
  });

  it('handles the situation where Object fields are missing without erroring', () => {
    const modifiedTestData = cloneDeep(testTypeData);
    modifiedTestData[0].forVehicleClass = ["chicken"];
    const partialVehicle = cloneDeep(vehicle);
    delete partialVehicle.techRecord.vehicleClass;
    expect((pipe.transform(modifiedTestData, partialVehicle)).length).toBe(1);
  });

  it('handles the situation where Array fields are missing without erroring', () => {
    const modifiedTestData = cloneDeep(testTypeData);
    modifiedTestData[0].forVehicleSubclass = ["chicken"];
    const partialVehicle = cloneDeep(vehicle);
    delete partialVehicle.techRecord.vehicleSubclass;
    expect((pipe.transform(modifiedTestData, partialVehicle)).length).toBe(1);
  });
});
