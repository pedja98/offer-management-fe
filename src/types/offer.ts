export interface Offer {
  id?: string
  crmOfferId?: number
  name?: string
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
  approvalLevel?: OfferApprovalLevel
}

export interface OfferCalculateResponse {
  approvalLevel: OfferApprovalLevel
  message: string
}

export enum OfferApprovalLevel {
  LEVEL_1 = 'LEVEL_1',
  LEVEL_2 = 'LEVEL_2',
}

export enum OfferStatus {
  DRAFT = 'DRAFT',
  OFFER_PENDING = 'OFFER_PENDING',
  L1_PENDING = 'L1_PENDING',
  L2_PENDING = 'L2_PENDING',
  SALESMEN_CLOSED = 'SALESMEN_CLOSED',
  CLOSED_BY_SYSTEM = 'CLOSED_BY_SYSTEM',
  L1_REJECTED = 'L1_REJECTED',
  L2_REJECTED = 'L2_REJECTED',
  OFFER_APPROVED = 'OFFER_APPROVED',
  CUSTOMER_ACCEPTED = 'CUSTOMER_ACCEPTED',
  CONCLUDED = 'CONCLUDED',
}
