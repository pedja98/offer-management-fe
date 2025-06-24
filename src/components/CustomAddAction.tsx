import { Grid } from '@mui/material'
import { CustomAddActionProps } from '../types/common'
import { getAddActionContext } from '../helpers/common'

const CustomAddAction = ({ module }: CustomAddActionProps) => {
  const addActionContext = getAddActionContext(module)
  return <Grid>{addActionContext}</Grid>
}

export default CustomAddAction
