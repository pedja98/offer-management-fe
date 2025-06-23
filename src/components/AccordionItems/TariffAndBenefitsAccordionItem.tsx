import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Checkbox,
  Box,
  Typography,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useGetOfferTariffPlansByOfferIdQuery } from '../../app/apis/om/tariff-plans.api'
import Spinner from '../Spinner'
import { getTariffPlansTableColumnsLabels } from '../../transformers/tariffPlans'
import { OmTariffPlanDto } from '../../types/tariffPlans'
import { EmptyValue } from '../../consts/common'

export const TableRowPerPage = 10

const TariffAndBenefitsAccordionItem = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const omOfferId = useAppSelector((state) => state.offer).id
  const language = useAppSelector((state) => state.auth).language

  const { data: tariffPlans, isLoading: isLoadingGetOfferTP } = useGetOfferTariffPlansByOfferIdQuery(String(omOfferId))

  // State for checkboxes and pagination
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [page, setPage] = useState(0)

  // Checkbox handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(tariffPlans?.map((plan) => plan.id) || [])
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

  const getFieldValue = (tariffPlan: OmTariffPlanDto, key: string): string => {
    switch (key) {
      case 'plannedTpName':
        return tariffPlan.plannedTpName[language] || tariffPlan.plannedTpName['en'] || EmptyValue
      case 'plannedTpPrice':
        return tariffPlan.plannedTpPrice?.toLocaleString() || EmptyValue
      case 'actualTpName':
        return tariffPlan.actualTpName[language] || tariffPlan.actualTpName['en'] || EmptyValue
      case 'actualTpPrice':
        return tariffPlan.actualTpPrice?.toLocaleString() || EmptyValue
      default:
        return EmptyValue
    }
  }

  if (isLoadingGetOfferTP) {
    return <Spinner />
  }

  if (!tariffPlans || tariffPlans.length === 0) {
    return (
      <Box display='flex' justifyContent='center' py={4}>
        <Typography variant='body2' color='text.secondary'>
          {t('noTariffPlansFound')}
        </Typography>
      </Box>
    )
  }

  const columns = getTariffPlansTableColumnsLabels(t)
  const paginatedRows = tariffPlans.slice(page * TableRowPerPage, (page + 1) * TableRowPerPage)
  const isAllSelected = paginatedRows.length > 0 && paginatedRows.every((plan) => selectedIds.has(plan.id))
  const isIndeterminate = paginatedRows.some((plan) => selectedIds.has(plan.id)) && !isAllSelected

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer component={Paper} sx={{ mt: 1, mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox'>
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  color='primary'
                  sx={{
                    '&:not(.Mui-checked) .MuiSvgIcon-root': {
                      backgroundColor: 'white',
                      borderRadius: '2px',
                    },
                  }}
                />
              </TableCell>
              {columns.map((col) => (
                <TableCell key={col.key}>
                  <Typography variant='subtitle1' fontWeight='medium' sx={{ fontWeight: 'bold' }}>
                    {col.text}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((tariffPlan) => (
              <TableRow key={tariffPlan.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell padding='checkbox'>
                  <Checkbox
                    checked={selectedIds.has(tariffPlan.id)}
                    onChange={(e) => handleSelectItem(tariffPlan.id, e.target.checked)}
                    color='primary'
                    sx={{
                      '&:not(.Mui-checked) .MuiSvgIcon-root': {
                        backgroundColor: 'white',
                        borderRadius: '2px',
                      },
                    }}
                  />
                </TableCell>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    <Typography variant='body2'>{getFieldValue(tariffPlan, col.key)}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component='div'
          count={tariffPlans.length}
          rowsPerPage={TableRowPerPage}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[]}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} ${t('of')} ${count !== -1 ? count : `${t('moreThan')} ${to}`}`
          }
        />
      </TableContainer>
      {selectedIds.size > 0 && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'primary.light', borderRadius: 1 }}>
          <Typography variant='body2' color='primary.contrastText'>
            {selectedIds.size} {t('itemsSelected')}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default TariffAndBenefitsAccordionItem
