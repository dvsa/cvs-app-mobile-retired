export enum STORAGE {
  ATFS = 'atfs',
  DEFECTS = 'defects',
  TESTTYPES = 'test-types',
  PREPARERS = 'preparers',
  TECH_RECORDS = 'tech-records',
  STATE = 'state',
  VISIT = 'visit'
}

export enum PATHS {
  TECH_RECORDS = "tech-records"
}

export enum LOCAL_STORAGE {
  INIT_SYNC = 'initSyncDone'
}

export enum APP {
  INIT_SYNC = 'initSyncDone',
  NAV_OUT = 'navigatedOutOfPage',
  TEST_TYPES_UPDATE_COMPLETED_FIELDS = 'updateCompletedFields'
}

export enum DEFICIENCY_CATEGORY {
  ADVISORY = 'advisory',
  DANGEROUS = 'dangerous',
  MAJOR = 'major',
  PRS = 'prs',
  MINOR = 'minor'
}

export enum TEST_REPORT_TITLES {
  SINGLE_TEST = 'Single Test',
  LINKED_TEST = 'Linked Test',
  COMBINED_TEST = 'Combined Test'
}

export enum TEST_REPORT_STATUSES {
  SUBMITTED = 'submitted',
  CANCELLED = 'cancelled'
}

export enum TEST_TYPE_RESULTS {
  SUCCESSFUL = 'pass',
  UNSUCCESSFUL = 'fail',
  ABANDONED = 'abandoned',
  FAIL = 'fail',
  PASS = 'pass',
  PRS = 'prs',
}

export enum TEST_TYPE_FIELDS {
  DDL = 'ddl',
  NUMBER = 'number',
  DATE = 'date',
  CERTIFICATE_NUMBER_CUSTOM = 'certificateNumberCustom'
}

export enum APP_STRINGS {
  VEHICLE_DETAILS = 'Vehicle details',
  WITHOUT_PREPARER = 'Continue without preparerID',
  CONFIRM_PREPARER = 'Confirm preparer',
  ALERT_MESSAGE = 'You will not be able to add a preparer for this vehicle later.',
  CANCEL = 'Cancel',
  CONFIRM = 'Confirm',
  OK = 'Ok',
  REPORT_ISSUE = 'Report issue',
  ATF_SAFETY = 'Confirm ATF and safety',
  REPORT_TITLE = 'Report an ATF issue',
  SPEAK_TO_TTL = 'Speak to your Technical Team Leader (TTL) if the issue cannot be resolved on site.',
  SEARCH_ATF = 'Search for an ATF',
  CALL = 'Call'
}

export enum ODOMETER_METRIC {
  KILOMETRES = 'kilometres',
  MILES = 'miles'
}

export enum DATE_FORMAT {
  DD_MM_YYYY = 'dd/MM/yyyy'
}

export enum DEFAULT_VALUES {
  NONE = 'none',
  NOT_ENTERED = 'not entered'
}
