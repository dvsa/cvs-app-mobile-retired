import {DefectLocationModel} from "./defect-location.model";

export class DefectModel {
  private _ref: string;
  private _deficiencyText: string;
  private _deficiencyCategory: string;
  private _location: DefectLocationModel;
  private _notes: string;
  private _prs: boolean;
  private _deficiencyId: string;
  private _parentDefectCategory: string;
  private _parentDefectCategoryId: number;
  private _parentDefectItem: string;
  private _parentDefectItemId: number;

  constructor(ref: string, deficiencyText: string, deficiencyCategory: string,
              prs?: boolean, notes?: string, location?: DefectLocationModel, deficiencyId?: string,
              parentDefectCategory?: string, parentDefectCategoryId?: number,
              parentDefectItem?: string, parentDefectItemId?: number) {
    this._ref = ref;
    this._deficiencyText = deficiencyText;
    this._deficiencyCategory = deficiencyCategory;
    this._prs = prs || false;
    this._notes = notes;
    this._location = location || new DefectLocationModel();
    this._deficiencyId = deficiencyId;
    this._parentDefectCategory = parentDefectCategory;
    this._parentDefectCategoryId = parentDefectCategoryId;
    this._parentDefectItem = parentDefectItem;
    this._parentDefectItemId = parentDefectItemId;
  }

  get ref(): string {
    return this._ref;
  }

  get deficiencyText(): string {
    return this._deficiencyText;
  }

  get deficiencyCategory(): string {
    return this._deficiencyCategory;
  }

  get location(): DefectLocationModel {
    return this._location;
  }

  get notes(): string {
    return this._notes;
  }

  get prs(): boolean {
    return this._prs;
  }

  get deficiencyId(): string {
    return this._deficiencyId;
  }

  get parentDefectCategory(): string {
    return this._parentDefectCategory;
  }

  get parentDefectCategoryId(): number {
    return this._parentDefectCategoryId;
  }

  get parentDefectItem(): string {
    return this._parentDefectItem;
  }

  get parentDefectItemId(): number {
    return this._parentDefectItemId;
  }

  set ref(value: string) {
    this._ref = value;
  }

  set location(value: DefectLocationModel) {
    this._location = value;
  }

  set notes(value: string) {
    this._notes = value;
  }

  set prs(value: boolean) {
    this._prs = value;
  }

  set deficiencyId(value: string) {
    this._deficiencyId = value;
  }

  set parentDefectCategory(value: string) {
    this._parentDefectCategory = value;
  }

  set parentDefectCategoryId(value: number) {
    this._parentDefectCategoryId = value;
  }

  set parentDefectItem(value: string) {
    this._parentDefectItem = value;
  }

  set parentDefectItemId(value: number) {
    this._parentDefectItemId = value;
  }

  clone(): DefectModel {
    return new DefectModel(this.ref, this.deficiencyText, this.deficiencyCategory, this.prs, this.notes, this.location, this.deficiencyId, this.parentDefectCategory, this.parentDefectCategoryId, this.parentDefectItem, this.parentDefectItemId);
  }
}

