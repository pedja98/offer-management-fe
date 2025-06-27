import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  useGetAddonsByOfferIdAndTpIdentifierQuery,
  useDeleteAddonsBulkMutation,
} from '../../app/apis/om/offer-addons.api'
import Spinner from '../Spinner'
import CustomTable from '../CustomTable'
import CustomTableActions from '../CustomTableActions'
import { getAddonTableColumnsLabels, transformAddonIntoTableData } from '../../transformers/addon'
import { hideConfirm, showConfirm } from '../../features/confirm.slice'
import { setNotification } from '../../features/notifications.slice'
import { NotificationType } from '../../types/notification'
import { AdditionalData, ApiException, CustomTableModule, ItemName } from '../../types/common'

const AddonTable = ({ tariffPlanIdentifier }: { tariffPlanIdentifier: string }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const omOfferId = useAppSelector((state) => state.offer).id as string
  const language = useAppSelector((state) => state.auth).language

  const { data: addonsData, isLoading: isLoadingGetAddons } = useGetAddonsByOfferIdAndTpIdentifierQuery(
    {
      omOfferId,
      tariffPlanIdentifier,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  )
  const [deleteAddonsBulk, { isLoading: isLoadingDeleteAddonsBulk }] = useDeleteAddonsBulkMutation()

  const addons = addonsData || []

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [page, setPage] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedFilter, setSelectedFilter] = useState<string>('all')

  const columns = getAddonTableColumnsLabels(t)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(filteredAddons?.map((addon) => addon.id) || [])
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
        confirmationText: t('addon:deleteConfirmation'),
        confirmationTitle: t('addon:delete').toUpperCase(),
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
      const result = await deleteAddonsBulk({ omOfferId, ids: Array.from(selectedIds) })
      dispatch(
        setNotification({
          text: t(`addon:${result.data?.message}`),
          type: NotificationType.Success,
        }),
      )
      setSelectedIds(new Set())
    } catch (err) {
      const errorResponse = err as { data: ApiException }
      const errorCode = `addon:${errorResponse.data}` || 'general:unknownError'
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

  const filteredAddons = addons?.filter((addon) => {
    const matchesSearch =
      searchTerm === '' ||
      Object.values(addon).some(
        (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase()),
      ) ||
      (addon.name[language.toLowerCase() as keyof ItemName] || '').toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = selectedFilter === 'all'

    return matchesSearch && matchesFilter
  })

  const filteredAddonIds = filteredAddons?.map((addon) => addon.id) || []
  const filteredAddonRows = filteredAddons?.map((addon) => transformAddonIntoTableData(addon, language)) || []

  const additionalData = {
    identifier: tariffPlanIdentifier,
  } as AdditionalData

  if (isLoadingGetAddons || isLoadingDeleteAddonsBulk) {
    return <Spinner />
  }

  if (!addons) {
    return (
      <Box display='flex' justifyContent='center' py={4}>
        <Typography variant='body2' color='text.secondary'>
          {t('addon:errorRetrievingError')}
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ width: '100%' }}>
      <CustomTableActions
        selectedIds={selectedIds}
        module={CustomTableModule.Addon}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onClearSearch={handleClearSearch}
        onDelete={handleDelete}
        selectedCount={selectedIds.size}
        filterAnchorEl={filterAnchorEl}
        onFilterClick={handleFilterClick}
        onFilterClose={handleFilterClose}
        onFilterSelect={handleFilterSelect}
        additionalData={additionalData}
      />
      <CustomTable
        data={filteredAddonRows}
        rowIds={filteredAddonIds}
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

export default AddonTable
