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
import { EmptyValue, GridFieldTypes, TableRowPerPage } from '../consts/common'
import { CustomTableProps } from '../types/common'

const CustomTable = ({
  data,
  page,
  onPageChange,
  selectedIds,
  onSelectAll,
  onSelectItem,
  columns,
  rowIds,
}: CustomTableProps) => {
  const { t } = useTranslation()

  const paginatedRows = data.slice(page * TableRowPerPage, (page + 1) * TableRowPerPage)
  const isAllSelected =
    paginatedRows.length > 0 &&
    paginatedRows.every((_, idx) => selectedIds.has(String(rowIds[page * TableRowPerPage + idx])))
  const isIndeterminate =
    paginatedRows.some((_, idx) => selectedIds.has(String(rowIds[page * TableRowPerPage + idx]))) && !isAllSelected

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
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedRows.map((rowData, index) => {
            const rowId = String(rowIds[page * TableRowPerPage + index])
            return (
              <TableRow key={rowId} hover>
                <TableCell padding='checkbox'>
                  <Checkbox
                    checked={selectedIds.has(rowId)}
                    onChange={(e) => onSelectItem(rowId, e.target.checked)}
                    color='primary'
                  />
                </TableCell>
                {columns.map((col) => {
                  const row = rowData[col.key]
                  if (row.type === GridFieldTypes.NON_EDITABLE) {
                    return (
                      <TableCell key={col.key}>
                        <Typography variant='body2'>{row?.value ?? ''}</Typography>
                      </TableCell>
                    )
                  } else if (row.type === GridFieldTypes.CHECKBOX) {
                    return (
                      <TableCell
                        key={col.key}
                        sx={{
                          cursor: row.disabled ? 'not-allowed' : 'pointer',
                        }}
                      >
                        <Checkbox
                          checked={!!row.value}
                          disabled={row.disabled}
                          // onChange={(e) => onSelectItem(rowId, e.target.checked)}
                          color='primary'
                        />
                      </TableCell>
                    )
                  }
                  return (
                    <TableCell key={col.key}>
                      <Typography variant='body2'>{EmptyValue}</Typography>
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
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
