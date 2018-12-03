export interface TestTypeModel {
  testCategoryNumber: number;
  testType: string;
  forVehicleType: string[];
  testCodeSelectionAttr: TestCodeSelectionAttr;
}

export interface TestCodeSelectionAttr {
  testCodeSelectionAttrName: string;
  testCodeSelectionAttrValues?: TestCodeSelectionAttrValuesEntity[];
}

export interface TestCodeSelectionAttrValuesEntity {
  testCodeSelectionAttrValue: string;
  defaultTestCode?: null;
  linkedTestCode?: null;
  nextTestCodeSelectionAttr: TestCodeSelectionAttr;
}
