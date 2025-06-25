import { Autocomplete, Box, Grid, Popper, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { ApiException, ItemName } from '../../types/common'
import { SyntheticEvent, useMemo, useState } from 'react'
import { PcTariffPlan } from '../../types/tariffPlans'
import { CreateAddon } from '../../types/addon'
import { useTranslation } from 'react-i18next'
import { ButtonStyled } from '../../styles/common'
import { useCreateAddonMutation } from '../../app/apis/om/offer-addons.api'
import { useGetActiveAddonsQuery } from '../../app/apis/core/pc.api'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

const AddonAddActionItem = ({ tariffPlanIdentifier }: { tariffPlanIdentifier: string }) => {
  const [selectedAddon, setSelectedAddon] = useState<PcTariffPlan | null>(null)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const language = useAppSelector((state) => state.auth).language
  const omOfferId = useAppSelector((state) => state.offer).id

  const { data: pcAddons, isLoading: isLoadingGetPcAddons } = useGetActiveAddonsQuery()
  const [createAddon, { isLoading: isLoadingCreateAddon }] = useCreateAddonMutation()

  const addonMap = useMemo(() => {
    if (!pcAddons) return {}

    const map: { [key: string]: PcTariffPlan } = {}
    pcAddons.forEach((addon) => {
      const translatedName = addon.name[language.toLowerCase() as keyof ItemName]
      map[translatedName] = addon
    })
    return map
  }, [pcAddons, language])

  const options = Object.keys(addonMap)

  const handleAddonChange = (event: SyntheticEvent<Element, Event>, value: string | null) => {
    if (value) {
      setSelectedAddon(addonMap[value])
    } else {
      setSelectedAddon(null)
    }
  }

  const handleAdd = async () => {
    if (!selectedAddon) return

    try {
      const createAddonData = {
        identifier: String(selectedAddon.identifier),
        name: selectedAddon.name as ItemName,
        price: Number(selectedAddon.price),
        tariffPlanIdentifier,
        omOfferId,
      } as CreateAddon

      const result = await createAddon(createAddonData)
      if (!result.data) {
        const errMsg = (result.error as FetchBaseQueryError).data as string
        dispatch(
          setNotification({
            text: t(`addon:${errMsg}`),
            type: NotificationType.Error,
          }),
        )
        return
      }
      dispatch(
        setNotification({
          text: t(`addon:${result.data?.message}`),
          type: NotificationType.Success,
        }),
      )
      setSelectedAddon(null)
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `addon:${errorResponse.data}` || 'general:unknownError'
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
        <Grid item xs={9}>
          <Autocomplete
            id='addon-autocomplete'
            options={options}
            disabled={isLoadingGetPcAddons}
            value={selectedAddon ? selectedAddon.name[language.toLowerCase() as keyof ItemName] : null}
            onChange={handleAddonChange}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={(params) => <TextField {...params} label={t('addon:addon')} variant='standard' required />}
            PopperComponent={(props) => <Popper {...props} style={{ zIndex: 1300 }} placement='bottom-start' />}
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={3}>
          <ButtonStyled
            variant='contained'
            onClick={handleAdd}
            disabled={!selectedAddon || isLoadingCreateAddon}
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

export default AddonAddActionItem
