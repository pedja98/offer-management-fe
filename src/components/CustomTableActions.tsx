import { Box, IconButton, InputAdornment, Menu, MenuItem, TextField, Toolbar } from '@mui/material'
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  SwapVerticalCircleOutlined,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { OfferStatus } from '../types/offer'
import { useAppSelector } from '../app/hooks'
import { CustomTableActionsProps } from '../types/common'
import { useState, useRef, useCallback } from 'react'
import CustomAddAction from './CustomAddAction'

const CustomTableActions = ({
  searchTerm,
  onSearchChange,
  onClearSearch,
  onDelete,
  onChange,
  selectedCount,
  filterAnchorEl,
  onFilterClick,
  onFilterClose,
  onFilterSelect,
  module,
}: CustomTableActionsProps) => {
  const { t } = useTranslation()
  const offerStatus = useAppSelector((state) => state.offer).status
  const addButtonRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)

  const handleClick = useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <Toolbar sx={{ pl: 2, pr: 1, bgcolor: 'background.paper', borderRadius: 1, mb: 2 }}>
      <Box sx={{ display: 'flex' }}>
        <TextField
          size='small'
          placeholder={t('search')}
          value={searchTerm}
          onChange={onSearchChange}
          sx={{ minWidth: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position='end'>
                <IconButton size='small' onClick={onClearSearch}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <IconButton onClick={onFilterClick}>
          <FilterIcon />
        </IconButton>
        <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={onFilterClose}>
          <MenuItem onClick={() => onFilterSelect('all')}>{t('tariffPlan:allTariffPlans')}</MenuItem>
          <MenuItem onClick={() => onFilterSelect('planned')}>{t('tariffPlan:plannedTariffPlans')}</MenuItem>
          <MenuItem onClick={() => onFilterSelect('actual')}>{t('tariffPlan:actualTariffPlans')}</MenuItem>
        </Menu>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton
          ref={addButtonRef}
          onClick={handleClick}
          color='primary'
          disabled={offerStatus !== OfferStatus.DRAFT}
        >
          <AddIcon />
        </IconButton>

        <Menu
          anchorEl={addButtonRef.current}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          disableAutoFocusItem
          MenuListProps={{
            sx: { p: 0 },
          }}
          PaperProps={{
            sx: {
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(0, 0, 0, 0.12)',
              borderRadius: 1,
              mt: 0.5,
            },
          }}
        >
          <CustomAddAction module={module} />
        </Menu>

        <IconButton
          onClick={onDelete}
          color='primary'
          disabled={selectedCount === 0 || offerStatus !== OfferStatus.DRAFT}
        >
          <DeleteIcon />
        </IconButton>

        <IconButton
          onClick={onChange}
          color='primary'
          disabled={selectedCount === 0 || offerStatus !== OfferStatus.DRAFT}
        >
          <SwapVerticalCircleOutlined />
        </IconButton>
      </Box>
    </Toolbar>
  )
}

export default CustomTableActions
