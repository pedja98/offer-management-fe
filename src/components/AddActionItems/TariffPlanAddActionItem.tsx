import { Autocomplete, Box, Grid, Popper, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { ApiException, ItemName } from '../../types/common'
import { SyntheticEvent, useMemo, useState } from 'react'
import { CreateTariffPlan, PcTariffPlan, SaveTariffPlanItem } from '../../types/tariffPlans'
import { useTranslation } from 'react-i18next'
import { ButtonStyled } from '../../styles/common'
import { useCreateTariffPlansBulkMutation } from '../../app/apis/om/offer-tariff-plans.api'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { useGetActiveTariffPlansQuery } from '../../app/apis/core/pc.api'
import { setRefetchDiscount } from '../../features/common.slice'

const TariffPlanAddActionItem = () => {
  const [selectedTariffPlan, setSelectedTariffPlan] = useState<PcTariffPlan | null>(null)
  const [quantity, setQuantity] = useState<number>(1)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const language = useAppSelector((state) => state.auth).language
  const omOfferId = useAppSelector((state) => state.offer).id

  const { data: pcTariffPlans, isLoading: isLoadingGetPcTariffPlans } = useGetActiveTariffPlansQuery()
  const [createTariffPlansBulk, { isLoading: isLoadingCreateTariffPlansBulk }] = useCreateTariffPlansBulkMutation()

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

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value)
    if (!isNaN(value) && value > 0) {
      setQuantity(value)
    } else if (event.target.value === '') {
      setQuantity(1)
    }
  }

  const handleAdd = async () => {
    try {
      const tariffPlan = {
        identifier: String(selectedTariffPlan?.identifier),
        name: selectedTariffPlan?.name as ItemName,
        price: Number(selectedTariffPlan?.price),
      } as SaveTariffPlanItem

      const createTariffPlan = {
        numberOfItems: quantity,
        omOfferId,
        tariffPlan,
      } as CreateTariffPlan
      const result = await createTariffPlansBulk(createTariffPlan)
      dispatch(
        setNotification({
          text: t(`tariffPlan:${result.data?.message}`),
          type: NotificationType.Success,
        }),
      )
      dispatch(setRefetchDiscount(true))
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
    <Box sx={{ width: '100%', minWidth: 500, height: '90px', pl: 1, pr: 1, pt: 2 }}>
      <Grid container spacing={2} alignItems='flex-end'>
        <Grid item xs={3}>
          <TextField
            label={t('tariffPlan:quantity')}
            type='number'
            value={quantity}
            onChange={handleQuantityChange}
            variant='standard'
            fullWidth
            inputProps={{ min: 1 }}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            id='tariff-plan-autocomplete'
            options={options}
            disabled={isLoadingGetPcTariffPlans}
            value={selectedTariffPlan ? selectedTariffPlan.name[language.toLocaleLowerCase() as keyof ItemName] : null}
            onChange={handleTariffPlanChange}
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
            onClick={handleAdd}
            disabled={!selectedTariffPlan || quantity < 1 || isLoadingCreateTariffPlansBulk}
            fullWidth
            sx={{ height: '40px' }}
          >
            {t('add')}
          </ButtonStyled>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TariffPlanAddActionItem
