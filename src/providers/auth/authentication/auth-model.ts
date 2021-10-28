export interface TokenInfo {
  id: string;
  testerName: string;
  testerEmail: string;
  testerRoles: string[];
  oid: string;
  employeeId: string;
  testerId: string;
  token: string;
  exp: number;
}

export interface TokenStatus {
  active: boolean;
  action: string;
}
