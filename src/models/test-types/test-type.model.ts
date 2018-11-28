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
  nextTestCodeSelectionAttr: NextTestCodeSelectionAttr;
}

export interface NextTestCodeSelectionAttr {
  testCodeSelectionAttrName: string;
  testCodeSelectionAttrValues?: (TestCodeSelectionAttrValuesEntity1)[];
}

export interface TestCodeSelectionAttrValuesEntity1 {
  testCodeSelectionAttrValue: string;
  defaultTestCode?: string;
  linkedTestCode?: null;
  nextTestCodeSelectionAttr: NextTestCodeSelectionAttr1;
}

export interface NextTestCodeSelectionAttr1 {
  testCodeSelectionAttrName?: string;
  testCodeSelectionAttrValues?: (TestCodeSelectionAttrValuesEntity2)[];
}

export interface TestCodeSelectionAttrValuesEntity2 {
  testCodeSelectionAttrValue: string;
  defaultTestCode?: null;
  linkedTestCode?: null;
  nextTestCodeSelectionAttr: NextTestCodeSelectionAttr2;
}

export interface NextTestCodeSelectionAttr2 {
  testCodeSelectionAttrName: string;
  testCodeSelectionAttrValues?: (TestCodeSelectionAttrValuesEntity3)[];
}

export interface TestCodeSelectionAttrValuesEntity3 {
  testCodeSelectionAttrValue: string;
  defaultTestCode?: string;
  linkedTestCode?: null;
  nextTestCodeSelectionAttr: NextTestCodeSelectionAttr3;
}

export interface NextTestCodeSelectionAttr3 {
  testCodeSelectionAttrName?: string;
  testCodeSelectionAttrValues?: (TestCodeSelectionAttrValuesEntity4)[];
}

export interface TestCodeSelectionAttrValuesEntity4 {
  testCodeSelectionAttrValue: string;
  defaultTestCode: string;
  linkedTestCode?: null;
  nextTestCodeSelectionAttr: NextTestCodeSelectionAttr4;
}

export interface NextTestCodeSelectionAttr4 {
}

