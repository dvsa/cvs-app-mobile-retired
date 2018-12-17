export enum STORAGE {
  ATFS = 'atfs',
  DEFECTS = 'defects',
  TESTTYPES = 'test-types',
  PREPARERS = 'preparers'
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
