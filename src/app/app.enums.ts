export enum STORAGE {
  ATFS = 'atfs',
  DEFECTS = 'defects',
  TESTTYPES = 'test-types',
  PREPARERS = 'preparers',
  TECH_RECORDS = 'technical-records'
}

export enum LOCAL_STORAGE {
  INIT_SYNC = 'initSyncDone'
}

export enum APP {
  INIT_SYNC = 'initSyncDone',
  NAV_OUT = 'navigatedOutOfPage'
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
  SUBMITTED = 'Submitted',
  CANCELLED = 'Cancelled'
}

export enum APP_STRINGS {
  VEHICLE_DETAILS = 'Vehicle details',
  WITHOUT_PREPARER = 'Continue without preparerID',
  CONFIRM_PREPARER = 'Confirm preparer',
  ALERT_MESSAGE = 'You will not be able to add a preparer for this vehicle later.',
  CANCEL = 'Cancel',
  CONFIRM = 'Confirm'
}

export enum DATE_FORMAT {
  DD_MM_YYYY = 'dd/MM/yyyy'
}
