import { Box, Grid, IconButton, InputAdornment, Menu, MenuItem, TextField, Toolbar } from '@mui/material'
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  SwapVerticalCircleOutlined,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { CustomTableActionsProps, CustomTableModule } from '../types/common'
import { useState, useRef, useCallback } from 'react'
import CustomAddAction from './AddActionItems/CustomAddAction'
import { ChangeVisibleModules } from '../consts/common'
import CustomChangeAction from './ChangeActionItems/CustomChangeAction'

const CustomTableActions = ({
  actionsDisabled,
  searchTerm,
  onSearchChange,
  onClearSearch,
  onDelete,
  selectedCount,
  filterAnchorEl,
  onFilterClick,
  onFilterClose,
  onFilterSelect,
  selectedIds,
  module,
  additionalData,
}: CustomTableActionsProps) => {
  const { t } = useTranslation()

  const addButtonRef = useRef<HTMLButtonElement>(null)
  const changeButtonRef = useRef<HTMLButtonElement>(null)
  const [addMenuOpen, setAddMenuOpen] = useState(false)
  const [changeMenuOpen, setChangeMenuOpen] = useState(false)

  const handleAddClick = useCallback(() => {
    setChangeMenuOpen(false)
    setAddMenuOpen((prev) => !prev)
  }, [])

  const handleAddClose = useCallback(() => {
    setAddMenuOpen(false)
  }, [])

  const handleChangeClick = useCallback(() => {
    setAddMenuOpen(false)
    setChangeMenuOpen((prev) => !prev)
  }, [])

  const handleChangeClose = useCallback(() => {
    setChangeMenuOpen(false)
  }, [])

  const filterOption =
    module === CustomTableModule.TariffPlan ? (
      <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={onFilterClose}>
        <MenuItem onClick={() => onFilterSelect('all')}>{t('tariffPlan:allTariffPlans')}</MenuItem>
        <MenuItem onClick={() => onFilterSelect('planned')}>{t('tariffPlan:plannedTariffPlans')}</MenuItem>
        <MenuItem onClick={() => onFilterSelect('actual')}>{t('tariffPlan:actualTariffPlans')}</MenuItem>
      </Menu>
    ) : (
      <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={onFilterClose}>
        <MenuItem onClick={() => onFilterSelect('all')}>{t('addon:addonName')}</MenuItem>
      </Menu>
    )

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
        {filterOption}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Grid>
          <IconButton ref={addButtonRef} onClick={handleAddClick} color='primary' disabled={actionsDisabled}>
            <AddIcon />
          </IconButton>

          <Menu
            anchorEl={addButtonRef.current}
            open={addMenuOpen}
            onClose={handleAddClose}
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
          >
            <CustomAddAction module={module} additionalData={additionalData} />
          </Menu>
        </Grid>

        <IconButton onClick={onDelete} color='primary' disabled={selectedCount === 0 || actionsDisabled}>
          <DeleteIcon />
        </IconButton>

        {ChangeVisibleModules.includes(module) && (
          <Grid>
            <IconButton
              ref={changeButtonRef}
              onClick={handleChangeClick}
              color='primary'
              disabled={selectedCount === 0 || actionsDisabled}
            >
              <SwapVerticalCircleOutlined />
            </IconButton>
            <Menu
              anchorEl={changeButtonRef.current}
              open={changeMenuOpen}
              onClose={handleChangeClose}
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
            >
              <CustomChangeAction module={module} selectedIds={selectedIds} />
            </Menu>
          </Grid>
        )}
      </Box>
    </Toolbar>
  )
}

export default CustomTableActions
