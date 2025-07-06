import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  useGetOfferTariffPlansByOfferIdQuery,
  useDeactivateOfferTariffPlanMutation,
  useDeleteTariffPlansBulkMutation,
} from '../../app/apis/om/offer-tariff-plans.api'
import Spinner from '../Spinner'
import CustomTable from '../CustomTable'
import CustomTableActions from '../CustomTableActions'
import { getTariffPlansTableColumnsLabels, transformTariffPlansIntoTableData } from '../../transformers/tariffPlans'
import { OfferStatus } from '../../types/offer'
import { OpportunityType } from '../../types/offer'
import { hideConfirm, showConfirm } from '../../features/confirm.slice'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { ApiException, CustomTableModule, ItemName } from '../../types/common'
import { setRefetchDiscount, setTariffPlanNumbers } from '../../features/common.slice'
import { setOfferData } from '../../features/offer.slice'

const TariffPlanTable = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const omOfferId = useAppSelector((state) => state.offer).id as string
  const offerStatus = useAppSelector((state) => state.offer).status as OfferStatus
  const opportunityType = useAppSelector((state) => state.offer).opportunityType as OpportunityType
  const language = useAppSelector((state) => state.auth).language
  const numberOfTariffPlans = useAppSelector((state) => state.common).numberOfTariffPlans

  const { data: offerTariffPlans, isLoading: isLoadingGetOfferTP } = useGetOfferTariffPlansByOfferIdQuery(omOfferId)
  const [deactivateOfferTariffPlan] = useDeactivateOfferTariffPlanMutation()
  const [deleteTariffPlansBulk, { isLoading: isLoadingDeleteTariffPlansBulk }] = useDeleteTariffPlansBulkMutation()

  const tariffPlans = offerTariffPlans || []

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [page, setPage] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedFilter, setSelectedFilter] = useState<string>('all')

  const columns = getTariffPlansTableColumnsLabels(t)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(filteredTp?.map((plan) => plan.id) || [])
      setSelectedIds(allIds)
    } else {
      setSelectedIds(new Set())
    }
  }

  const handleSelectItem = (id: string, checked: boolean) => {
    const newSelectedIds = new Set(selectedIds)
    if (checked) {
      newSelectedIds.add(id)
    } else {
      newSelectedIds.delete(id)
    }
    setSelectedIds(newSelectedIds)
  }

  useEffect(() => {
    if (tariffPlans.length === 0) {
      return
    }
    dispatch(setTariffPlanNumbers(tariffPlans.length))
  }, [tariffPlans])

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setPage(0)
  }

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
  }

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter)
    setFilterAnchorEl(null)
    setPage(0)
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setPage(0)
  }

  const handleDelete = () => {
    dispatch(
      showConfirm({
        confirmationText: t('tariffPlan:deleteConfirmation'),
        confirmationTitle: t('delete').toUpperCase(),
        onConfirm: handleConfirmDeletion,
        onCancel: handleConfirmClose,
        confirmButtonLabel: t('dialogConfirmationButtonLabels.yes'),
        denyButtonLabel: t('dialogConfirmationButtonLabels.no'),
      }),
    )
  }

  const handleConfirmClose = () => {
    dispatch(hideConfirm())
  }

  const handleConfirmDeletion = async () => {
    try {
      const result = await deleteTariffPlansBulk({ body: Array.from(selectedIds), omOfferId })
      if (result && result.error) {
        throw result.error
      }
      dispatch(
        setNotification({
          text: t(`tariffPlan:${result.data?.message}`),
          type: NotificationType.Success,
        }),
      )
      if (numberOfTariffPlans === selectedIds.size) {
        dispatch(setOfferData({ key: 'approvalLevel', value: '' }))
        dispatch(setTariffPlanNumbers(0))
      }
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
    } finally {
      dispatch(hideConfirm())
    }
  }

  const handleDeactivate = (id: string, checked: boolean) => {
    dispatch(
      showConfirm({
        confirmationText: checked ? t('tariffPlan:areYouSureToDeactivate') : t('tariffPlan:areYouSureToActivate'),
        confirmationTitle: checked
          ? t('tariffPlan:deactivation').toUpperCase()
          : t('tariffPlan:activation').toUpperCase(),
        onConfirm: () => {
          handleConfirmDeactivation(id, checked)
        },
        onCancel: handleConfirmClose,
        confirmButtonLabel: t('dialogConfirmationButtonLabels.yes'),
        denyButtonLabel: t('dialogConfirmationButtonLabels.no'),
      }),
    )
  }

  const handleConfirmDeactivation = async (id: string, checked: boolean) => {
    try {
      await deactivateOfferTariffPlan({ id, value: checked, omOfferId })
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
    } finally {
      dispatch(hideConfirm())
    }
  }

  const filteredTp = tariffPlans?.filter((plan) => {
    const matchesSearch =
      searchTerm === '' ||
      Object.values(plan).some(
        (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase()),
      ) ||
      (plan.plannedTpName[language.toLowerCase() as keyof ItemName] || plan.plannedTpName['en'] || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (plan.actualTpName[language.toLowerCase() as keyof ItemName] || plan.actualTpName['en'] || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'planned' && !plan.plannedTpPrice) ||
      (selectedFilter === 'actual' && !plan.actualTpPrice)

    return matchesSearch && matchesFilter
  })

  const disabledDeactivation =
    offerStatus !== OfferStatus.DRAFT ||
    [OpportunityType.ACQUISITION, OpportunityType.TERMINATION].includes(opportunityType)

  const filteredTpIds = filteredTp?.map((tariffPlan) => tariffPlan.id) || []
  const filteredTpRows =
    filteredTp?.map((tp) => transformTariffPlansIntoTableData(tp, language, disabledDeactivation, handleDeactivate)) ||
    []

  if (isLoadingGetOfferTP || isLoadingDeleteTariffPlansBulk) {
    return <Spinner />
  }

  if (!tariffPlans) {
    return (
      <Box display='flex' justifyContent='center' py={4}>
        <Typography variant='body2' color='text.secondary'>
          {t('tariffPlan:errorRetrievingError')}
        </Typography>
      </Box>
    )
  }

  const areActionsDisabled = offerStatus !== OfferStatus.DRAFT || opportunityType === OpportunityType.TERMINATION

  return (
    <Box sx={{ width: '100%' }}>
      <CustomTableActions
        actionsDisabled={areActionsDisabled}
        selectedIds={selectedIds}
        module={CustomTableModule.TariffPlan}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onClearSearch={handleClearSearch}
        onDelete={handleDelete}
        selectedCount={selectedIds.size}
        filterAnchorEl={filterAnchorEl}
        onFilterClick={handleFilterClick}
        onFilterClose={handleFilterClose}
        onFilterSelect={handleFilterSelect}
      />
      <CustomTable
        data={filteredTpRows}
        rowIds={filteredTpIds}
        page={page}
        columns={columns}
        onPageChange={handleChangePage}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onSelectItem={handleSelectItem}
      />
    </Box>
  )
}

export default TariffPlanTable
