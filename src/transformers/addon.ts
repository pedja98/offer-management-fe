import { TFunction } from 'i18next'
import { GridLabel, ItemName, TableRowData } from '../types/common'
import { EmptyValue, GridFieldTypes } from '../consts/common'
import { Language } from '../types/auth'
import { Addon } from '../types/addon'

export const getAddonTableColumnsLabels = (t: TFunction): GridLabel[] => [
  { text: t('addon:name'), key: 'name' },
  { text: t('addon:price'), key: 'price' },
]

export const transformAddonIntoTableData = (addon: Addon, language: Language): TableRowData => ({
  name: {
    value: addon.name[language.toLowerCase() as keyof ItemName] || EmptyValue,
    type: GridFieldTypes.NON_EDITABLE,
  },
  price: {
    type: GridFieldTypes.NON_EDITABLE,
    value:
      addon.price?.toLocaleString(language === Language.EN ? 'en-US' : 'de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) || EmptyValue,
  },
})
