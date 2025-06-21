export interface Offer {
  crmOfferId?: number
  name?: string
  omOfferId?: string
  companyId?: number
  opportunityId?: number
  status?: OfferStatus
  createdByUsername?: string
  modifiedByUsername?: string
  dateCreated?: string
  dateModified?: string
  mmc?: number
  contractObligation?: number
  approvalDescription?: string
  approvalLevel?: OfferApprovalLevels
}

export enum OfferApprovalLevels {
  LEVEL_1 = 'LEVEL_1',
  LEVEL_2 = 'LEVEL_2',
}

export enum OfferStatus {
  DRAFT = 'DRAFT',
  L1_PENDING = 'L1_PENDING',
  L2_PENDING = 'L2_PENDING',
  SALESMEN_CLOSED = 'SALESMEN_CLOSED',
  CLOSED_BY_SYSTEM = 'CLOSED_BY_SYSTEM',
  L1_REJECTED = 'L1_REJECTED',
  L2_REJECTED = 'L2_REJECTED',
  CUSTOMER_ACCEPTED = 'CUSTOMER_ACCEPTED',
  CONCLUDED = 'CONCLUDED',
}
