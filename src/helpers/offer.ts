import { UserType } from '../types/auth'
import { OfferApprovalLevel, OfferStatus } from '../types/offer'

export const getAvailableStatusesForStatusChange = (
  currentStatus: OfferStatus,
  approvalLevel?: OfferApprovalLevel | null,
  userType?: UserType,
): OfferStatus[] => {
  if (currentStatus === OfferStatus.DRAFT && !approvalLevel) {
    return [OfferStatus.SALESMEN_CLOSED]
  }

  if (currentStatus === OfferStatus.DRAFT) {
    return [OfferStatus.OFFER_PENDING, OfferStatus.SALESMEN_CLOSED]
  }

  if (
    currentStatus === OfferStatus.OFFER_PENDING &&
    (UserType.L2_MANAGER, UserType.ADMIN).includes(userType as UserType)
  ) {
    return [OfferStatus.OFFER_APPROVED, OfferStatus.L2_REJECTED, OfferStatus.SALESMEN_CLOSED]
  }

  if (
    currentStatus === OfferStatus.OFFER_PENDING &&
    (UserType.L1_MANAGER, UserType.ADMIN).includes(userType as UserType)
  ) {
    return [OfferStatus.OFFER_APPROVED, OfferStatus.L1_REJECTED, OfferStatus.SALESMEN_CLOSED]
  }

  if ((OfferStatus.L2_PENDING, OfferStatus.L1_PENDING).includes(currentStatus)) {
    return [OfferStatus.SALESMEN_CLOSED]
  }

  return []
}
