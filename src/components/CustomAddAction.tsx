import { Grid } from '@mui/material'
import { CustomAddActionProps } from '../types/common'
import { getAddActionContext } from '../helpers/common'

const CustomAddAction = ({ module, additionalData }: CustomAddActionProps) => {
  const addActionContext = getAddActionContext(module, additionalData)
  return <Grid>{addActionContext}</Grid>
}

export default CustomAddAction
