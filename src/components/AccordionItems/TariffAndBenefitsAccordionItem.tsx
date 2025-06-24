import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'
import { useAppSelector } from '../../app/hooks'
import { useGetOfferTariffPlansByOfferIdQuery } from '../../app/apis/om/tariff-plans.api'
import Spinner from '../Spinner'
import CustomTable from '../CustomTable'
import CustomTableActions from '../CustomTableActions'
import { getTariffPlansTableColumnsLabels, transformTariffPlansIntoTableData } from '../../transformers/tariffPlans'
import { OfferStatus } from '../../types/offer'
import { OpportunityType } from '../../types/opportunity'

const TariffAndBenefitsAccordionItem = () => {
  const { t } = useTranslation()

  const omOfferId = useAppSelector((state) => state.offer).id
  const offerStatus = useAppSelector((state) => state.offer).status as OfferStatus
  const opportunityType = useAppSelector((state) => state.opportunity).type as OpportunityType
  const language = useAppSelector((state) => state.auth).language

  const { data: tariffPlans, isLoading: isLoadingGetOfferTP } = useGetOfferTariffPlansByOfferIdQuery(String(omOfferId))

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

  const handleAdd = () => {
    console.log('Add new tariff plan')
  }

  const handleChange = () => {
    if (selectedIds.size > 0) {
      setSelectedIds(new Set())
    }
  }

  const handleDelete = () => {
    if (selectedIds.size > 0) {
      setSelectedIds(new Set())
    }
  }

  const filteredTp = tariffPlans?.filter((plan) => {
    const matchesSearch =
      searchTerm === '' ||
      Object.values(plan).some(
        (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase()),
      ) ||
      (plan.plannedTpName[language] || plan.plannedTpName['en'] || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (plan.actualTpName[language] || plan.actualTpName['en'] || '').toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'planned' && !plan.plannedTpPrice) ||
      (selectedFilter === 'actual' && !plan.actualTpPrice)

    return matchesSearch && matchesFilter
  })

  const disabledDeactivation = offerStatus !== OfferStatus.DRAFT || opportunityType === OpportunityType.ACQUISITION

  const filteredTpIds = filteredTp?.map((tariffPlan) => tariffPlan.id) || []
  const filteredTpRows =
    filteredTp?.map((tp) => transformTariffPlansIntoTableData(tp, language, disabledDeactivation)) || []

  if (isLoadingGetOfferTP) {
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

  return (
    <Box sx={{ width: '100%' }}>
      <CustomTableActions
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onClearSearch={handleClearSearch}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onChange={handleChange}
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

export default TariffAndBenefitsAccordionItem
