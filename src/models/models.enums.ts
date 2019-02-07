export enum VEHICLE_TYPE {
  PSV = 'psv',
  HGV = 'hgv',
  TRL = 'trl'
}

export enum VEHICLE_SIZE {
  SMALL = 'small',
  LARGE = 'large'
}

export enum VEHICLE_CONFIGURATION {
  RIGID = 'rigid',
  ARTICULATED = 'articulated'
}

export enum TEST_STATION_TYPE {
  ATF = 'atf',
  GVTS = 'gvts',
  TECHNICAL_SECTION_OFFICE = 'tass',
  POTF = 'potf',
  OTHER = 'other'
}

export enum TEST_REPORT_STATUS {
  SUBMITTED = 'submitted',
  CANCELLED = 'cancelled'
}

export enum VEHICLE_CLASS {
  CLASS_1 = '1',
  CLASS_2 = '2',
  CLASS_3 = '3',
  CLASS_L = 'l',
  CLASS_N = 'n',
  CLASS_V = 'v',
  CLASS_T = 't',
  CLASS_S = 's',
}

export enum VEHICLE_STATUS {
  STATUS_1 = '1',
  STATUS_2 = '2',
  STATUS_3 = '3'
}

export enum ODOMETER_METRIC {
  KILOMETRES = 'kilometres',
  MILES = 'miles'
}

export enum EU_VEHICLE_CATEGORY {
  CAT_M1 = 'm1',
  CAT_M2 = 'm2',
  CAT_M3 = 'm3',
  CAT_N1 = 'n1',
  CAT_N2 = 'n2',
  CAT_N3 = 'n3',
  CAT_01 = '01',
  CAT_02 = '02',
  CAT_03 = '03',
  CAT_04 = '04'
}

export enum TEST_RESULT {
  FAIL = 'failure',
  PASS = 'pass',
  PRS = 'prs',
  ABANDONED = 'abandoned',
  SUCCESSFUL = 'successful',
  UNSUCCESSFUL = 'unsuccessful'
}

export enum PROHIBITION_ISSUED {
  YES = 'yes',
  NO = 'no'
}

export enum DEFICIENCY_CATEGORY {
  ADVISORY = 'advisory',
  DANGEROUS = 'dangerous',
  MAJOR = 'major',
  MINOR = 'minor',
  PRS = 'prs'
}

export enum TECH_RECORD_STATUS {
  ARCHIVED = 'archived',
  CURRENT = 'current',
  PROVISIONAL = 'provisional'
}
