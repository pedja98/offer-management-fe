export interface Company {
  id?: number
  name?: string
  hqAddress?: string
  industry?: string
  status?: CompanyStatus
  contactPhone?: string
  numberOfEmployees?: number
  tin?: number
  bankName?: string
  bankAccountNumber?: string
  comment?: string
  assignedToId?: number
  assignedToUsername?: string
  temporaryAssignedToId?: number
  temporaryAssignedToUsername?: string
  createdByUsername?: string
  modifiedByUsername?: string
  dateCreated?: string
  dateModified?: string
}

export enum CompanyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  POTENTIAL = 'POTENTIAL',
}
