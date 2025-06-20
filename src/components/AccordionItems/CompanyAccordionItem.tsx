import { Grid, Typography, FormLabel } from '@mui/material'
import { useGetCompanyQuery } from '../../app/apis/crm/company.api'
import { useAppSelector } from '../../app/hooks'
import Spinner from '../Spinner'
import { useTranslation } from 'react-i18next'
import { getCompanyGridDataLabels } from '../../transformers/company'
import { Company } from '../../types/company'

const CompanyAccordionItem = () => {
  const { t } = useTranslation()
  const companyId = useAppSelector((state) => state.offer).companyId as number
  const { isLoading, isError, data: company } = useGetCompanyQuery(companyId)

  if (isLoading) {
    return <Spinner />
  }

  if (isError || !company) {
    return (
      <Grid>
        <Typography variant='h3'>{t('company:errorRetrievingError')}</Typography>
      </Grid>
    )
  }

  const labels = getCompanyGridDataLabels(t)

  return (
    <Grid container spacing={2}>
      {labels.map((label) => (
        <Grid item key={label.key} xs={12} sm={6} md={4}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <FormLabel style={{ fontSize: '0.5rem', whiteSpace: 'nowrap' }}>{label.text + ':'}</FormLabel>
            <Typography>{company[label.key as keyof Company]}</Typography>
          </div>
        </Grid>
      ))}
    </Grid>
  )
}

export default CompanyAccordionItem
