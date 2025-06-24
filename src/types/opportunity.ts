export enum OpportunityType {
  ACQUISITION = 'ACQUISITION',
  RENEWAL = 'RENEWAL',
  CHANGE = 'CHANGE',
  TERMINATION = 'TERMINATION',
}

export enum OpportunityStatus {
  CREATED = 'CREATED',
  NEGOTIATIONS = 'NEGOTIATIONS',
  CLOSE_LOST = 'CLOSE_LOST',
  CLOSE_WON = 'CLOSE_WON',
}

export interface Opportunity {
  id?: number
  name?: string
  type?: OpportunityType
  status?: OpportunityStatus
  companyId?: number
  companyName?: string
  createdByUsername?: string
  modifiedByUsername?: string
  dateCreated?: string
  dateModified?: string
}
