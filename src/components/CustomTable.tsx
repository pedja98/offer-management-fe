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
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { getTariffPlanTableFieldValue } from '../helpers/tariffPlan'
import { useAppSelector } from '../app/hooks'
import { TableRowPerPage } from '../consts/common'
import { CustomTableProps } from '../types/common'

const CustomTable = ({
  data,
  page,
  onPageChange,
  selectedIds,
  onSelectAll,
  onSelectItem,
  columns,
}: CustomTableProps) => {
  const language = useAppSelector((state) => state.auth).language
  const { t } = useTranslation()
  const paginatedRows = data.slice(page * TableRowPerPage, (page + 1) * TableRowPerPage)
  const isAllSelected = paginatedRows.length > 0 && paginatedRows.every((plan) => selectedIds.has(plan.id))
  const isIndeterminate = paginatedRows.some((plan) => selectedIds.has(plan.id)) && !isAllSelected

  return (
    <TableContainer component={Paper} sx={{ mt: 1, mb: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding='checkbox'>
              <Checkbox
                checked={isAllSelected}
                indeterminate={isIndeterminate}
                onChange={(e) => onSelectAll(e.target.checked)}
                color='primary'
              />
            </TableCell>
            {columns.map((col) => (
              <TableCell key={col.key}>
                <Typography variant='subtitle1' fontWeight='bold'>
                  {col.text}
                </Typography>
              </TableCell>
            ))}
            <TableCell align='center'>
              <Typography variant='subtitle1' fontWeight='bold'>
                {t('tariffPlan:deactivate')}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedRows.map((rowData) => (
            <TableRow key={rowData.id} hover>
              <TableCell padding='checkbox'>
                <Checkbox
                  checked={selectedIds.has(rowData.id)}
                  onChange={(e) => onSelectItem(rowData.id, e.target.checked)}
                  color='primary'
                />
              </TableCell>
              {columns.map((col) => (
                <TableCell key={col.key}>
                  <Typography variant='body2'>{getTariffPlanTableFieldValue(rowData, language, col.key)}</Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component='div'
        count={data.length}
        rowsPerPage={TableRowPerPage}
        page={page}
        onPageChange={onPageChange}
        rowsPerPageOptions={[]}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} ${t('of')} ${count !== -1 ? count : `${t('moreThan')} ${to}`}`
        }
      />
    </TableContainer>
  )
}

export default CustomTable
