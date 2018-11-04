export interface Customer {
  Taxable: boolean;
  BillAddr: BillAddr;
  Job: boolean;
  BillWithParent: boolean;
  Balance: number;
  BalanceWithJobs: number;
  PreferredDeliveryMethod: string;
  domain: string;
  sparse: boolean;
  Id: string;
  SyncToken: string;
  MetaData: MetaData;
  GivenName: string;
  MiddleName: string;
  FamilyName: string;
  FullyQualifiedName: string;
  CompanyName: string;
  DisplayName: string;
  PrintOnCheckName: string;
  Active: boolean;
  PrimaryPhone: PrimaryPhone;
  PrimaryEmailAddr: PrimaryEmailAddr;
}

export interface BillAddr {
  Id: string;
  Line1: string;
  City: string;
  CountrySubDivisionCode: string;
  PostalCode: string;
  Lat: string;
  Long: string;
}

export interface MetaData {
  CreateTime: string;
  LastUpdatedTime: string;
}

export interface PrimaryPhone {
  FreeFormNumber: string;
}

export interface PrimaryEmailAddr {
  Address: string;
}
