import { TFunction } from 'i18next'
import { GridLabel, PageElement } from '../types/common'
import { Offer, OfferStatus } from '../types/offer'
import { GridFieldTypes } from '../consts/common'

export const getOfferGridDataLabels = (t: TFunction): GridLabel[] => [
  { text: t('offer:name'), key: 'name' },
  { text: t('offer:status'), key: 'status' },
  { text: t('offer:opportunity'), key: 'opportunity' },
  { text: t('offer:mmc'), key: 'mmc' },
  { text: t('offer:contractObligation'), key: 'contractObligation' },
]

export const getOfferGridData = (t: TFunction, offer: Offer): PageElement => ({
  name: {
    value: offer.name,
    type: GridFieldTypes.NON_EDITABLE,
  },
  status: {
    type: GridFieldTypes.NON_EDITABLE,
    value: t(`offer:statuses.${offer.status?.toLocaleLowerCase()}`).toUpperCase(),
  },
  opportunity: {
    value: offer.opportunityName,
    type: GridFieldTypes.NON_EDITABLE,
  },
  mmc: {
    value: offer.mmc,
    type: offer.status === OfferStatus.DRAFT ? GridFieldTypes.NUMBER : GridFieldTypes.NON_EDITABLE,
  },
  contractObligation: {
    value: offer.contractObligation,
    type: offer.status === OfferStatus.DRAFT ? GridFieldTypes.NUMBER : GridFieldTypes.NON_EDITABLE,
  },
})
