import { Autocomplete, Box, Grid, Popper, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { ApiException, ItemName } from '../../types/common'
import { SyntheticEvent, useMemo, useState } from 'react'
import { PcTariffPlan, UpdateTariffPlans } from '../../types/tariffPlans'
import { useTranslation } from 'react-i18next'
import { ButtonStyled } from '../../styles/common'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { useUpdateTariffPlansBulkMutation } from '../../app/apis/om/offer-tariff-plans.api'
import { useGetActiveTariffPlansQuery } from '../../app/apis/core/pc.api'
import { setRefetchDiscount } from '../../features/common.slice'

const TariffPlanChangeAction = ({ selectedIds }: { selectedIds: Set<string> }) => {
  const [selectedTariffPlan, setSelectedTariffPlan] = useState<PcTariffPlan | null>(null)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const language = useAppSelector((state) => state.auth).language
  const omOfferId = useAppSelector((state) => state.offer).id as string

  const { data: pcTariffPlans, isLoading: isLoadingGetPcTariffPlans } = useGetActiveTariffPlansQuery()
  const [updateTariffPlansBulk, { isLoading: isLoadingUpdateTariffPlansBulk }] = useUpdateTariffPlansBulkMutation()

  const tariffPlanMap = useMemo(() => {
    if (!pcTariffPlans) return {}

    const map: { [key: string]: PcTariffPlan } = {}
    pcTariffPlans.forEach((plan) => {
      const translatedName = plan.name[language.toLowerCase() as keyof ItemName]
      map[translatedName] = plan
    })
    return map
  }, [pcTariffPlans, language])

  const options = Object.keys(tariffPlanMap)

  const handleTariffPlanChange = (event: SyntheticEvent<Element, Event>, value: string | null) => {
    if (value) {
      setSelectedTariffPlan(tariffPlanMap[value])
    } else {
      setSelectedTariffPlan(null)
    }
  }

  const handleChange = async () => {
    try {
      const updateTariffPlan = {
        uuids: Array.from(selectedIds),
        newTpIdentifier: selectedTariffPlan?.identifier,
        newTpPrice: selectedTariffPlan?.price,
        newTpName: selectedTariffPlan?.name,
      } as UpdateTariffPlans

      const result = await updateTariffPlansBulk({
        omOfferId,
        body: updateTariffPlan,
      })
      dispatch(
        setNotification({
          text: t(`tariffPlan:${result.data?.message}`),
          type: NotificationType.Success,
        }),
      )
      dispatch(setRefetchDiscount(true))
      selectedIds.clear()
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `tariffPlan:${errorResponse.data}` || 'general:unknownError'
      dispatch(
        setNotification({
          text: t(errorCode),
          type: NotificationType.Error,
        }),
      )
    }
  }

  return (
    <Box sx={{ width: '100%', minWidth: 400, height: '90px', pl: 1, pr: 1, pt: 2 }}>
      <Grid container spacing={2} alignItems='flex-end'>
        <Grid item xs={9}>
          <Autocomplete
            id='tariff-plan-autocomplete'
            options={options}
            value={selectedTariffPlan ? selectedTariffPlan.name[language.toLocaleLowerCase() as keyof ItemName] : null}
            onChange={handleTariffPlanChange}
            disabled={isLoadingGetPcTariffPlans}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={(params) => (
              <TextField {...params} label={t('tariffPlan:tariffPlan')} variant='standard' required />
            )}
            PopperComponent={(props) => <Popper {...props} style={{ zIndex: 1300 }} placement='bottom-start' />}
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={3}>
          <ButtonStyled
            variant='contained'
            onClick={handleChange}
            disabled={!selectedTariffPlan || isLoadingUpdateTariffPlansBulk}
            fullWidth
            sx={{ height: '40px' }}
          >
            {t('change')}
          </ButtonStyled>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TariffPlanChangeAction
