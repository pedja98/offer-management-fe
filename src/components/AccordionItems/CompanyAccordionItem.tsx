import { Grid, Typography } from '@mui/material'
import { useGetCompanyQuery } from '../../app/apis/crm/company.api'
import { useAppSelector } from '../../app/hooks'
import Spinner from '../Spinner'
import { ApiException } from '../../types/common'

const CompanyAccordionItem = () => {
  const companyId = useAppSelector((state) => state.offer).companyId as number
  const { isLoading, isError, error } = useGetCompanyQuery(companyId)

  const errorResponse = error as { data: ApiException }
  const errorCode = `companies:${errorResponse.data}` || 'general:unknownError'

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return (
      <Grid>
        <Typography variant='h3'>{errorCode}</Typography>
      </Grid>
    )
  }

  return <div>lll</div>
}

export default CompanyAccordionItem
