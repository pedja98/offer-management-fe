import { Grid } from '@mui/material'
import { CustomChangeActionProps } from '../types/common'
import { getChangeActionContext } from '../helpers/common'

const CustomChangeAction = ({ module, selectedIds }: CustomChangeActionProps) => {
  const changeActionContext = getChangeActionContext(module, selectedIds)
  return <Grid>{changeActionContext}</Grid>
}

export default CustomChangeAction
