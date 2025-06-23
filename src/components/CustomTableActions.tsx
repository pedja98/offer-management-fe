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

const CustomTableActions = ({
  searchTerm,
  onSearchChange,
  onClearSearch,
  onAdd,
  onDelete,
  onChange,
  selectedCount,
  filterAnchorEl,
  onFilterClick,
  onFilterClose,
  onFilterSelect,
}: CustomTableActionsProps) => {
  const { t } = useTranslation()

  const offerStatus = useAppSelector((state) => state.offer).status

  return (
    <Toolbar sx={{ pl: 2, pr: 1, bgcolor: 'background.paper', borderRadius: 1, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
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
        <IconButton onClick={onAdd} color='primary' disabled={offerStatus !== OfferStatus.DRAFT}>
          <AddIcon />
        </IconButton>
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
