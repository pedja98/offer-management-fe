import { Grid } from '@mui/material'
import { CustomTableModule } from '../types/common'
import { getAddActionContext } from '../helpers/common'

export interface CustomAddActionProps {
  module: CustomTableModule
}

const CustomAddAction = ({ module }: CustomAddActionProps) => {
  const addActionContext = getAddActionContext(module)
  return <Grid>{addActionContext}</Grid>
}

export default CustomAddAction
