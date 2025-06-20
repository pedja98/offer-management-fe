export interface OfferDto {
  crmOfferId: number
  name: string
  omOfferId: string
  companyId: number
  companyName: string
  opportunityId: number
  opportunityName: string
  contractId: number
  contractName: string
  status: OfferStatus
  createdByUsername: string
  modifiedByUsername: string
  dateCreated: string
  dateModified: string
  mmc: number
  contractObligation: number
  approvalDescription: string
  approvalLevel: OfferApprovalLevels
  approvalStatus: OfferApprovalStatus
}

export enum OfferApprovalLevels {
  LEVEL_1 = 'LEVEL_1',
  LEVEL_2 = 'LEVEL_2',
}

export enum OfferApprovalStatus {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  WAITING = 'WAITING',
  NONE = 'NONE',
}

export enum OfferStatus {
  DRAFT = 'DRAFT',
  WHAT_IF_ANALYSIS = 'WHAT_IF_ANALYSIS',
  L1_PENDING = 'L1_PENDING',
  L2_PENDING = 'L2_PENDING',
  SALESMEN_CLOSED = 'SALESMEN_CLOSED',
  CLOSED_BY_SYSTEM = 'CLOSED_BY_SYSTEM',
  L1_REJECTED = 'L1_REJECTED',
  L2_REJECTED = 'L2_REJECTED',
  CUSTOMER_PENDING = 'CUSTOMER_PENDING',
  CUSTOMER_ACCEPTED = 'CUSTOMER_ACCEPTED',
  CONCLUDED = 'CONCLUDED',
}
