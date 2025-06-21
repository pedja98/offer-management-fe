import { Grid, Typography, FormLabel } from '@mui/material'
import { useGetCompanyQuery } from '../../app/apis/crm/company.api'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Spinner from '../Spinner'
import { useTranslation } from 'react-i18next'
import { getCompanyGridData, getCompanyGridDataLabels } from '../../transformers/company'
import { GridFieldTypes } from '../../consts/common'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'

const CompanyAccordionItem = () => {
  const { t } = useTranslation()
  const companyId = useAppSelector((state) => state.offer).companyId as number
  const { isLoading, isError, data: company } = useGetCompanyQuery(companyId)
  const dispatch = useAppDispatch()

  if (isLoading) {
    return <Spinner />
  }

  if (isError || !company) {
    dispatch(
      setNotification({
        text: t('retrievingDataError'),
        type: NotificationType.Error,
      }),
    )
    return null
  }

  const labels = getCompanyGridDataLabels(t)
  const companyGridData = getCompanyGridData(t, company)

  return (
    <Grid container spacing={2}>
      {labels.map((label) => {
        const gridFieldData = companyGridData[label.key]
        if (gridFieldData.type === GridFieldTypes.NON_EDITABLE) {
          return (
            <Grid item key={label.key} xs={12} sm={6} md={4}>
              <FormLabel style={{ fontSize: '0.5rem', whiteSpace: 'nowrap' }}>{label.text}</FormLabel>
              <Typography>{gridFieldData.value}</Typography>
            </Grid>
          )
        } else {
          return null
        }
      })}
    </Grid>
  )
}

export default CompanyAccordionItem
