import Grid from '@mui/material/Grid'
import { CenteredCircularProgress } from '../styles/common'

const Spinner = () => {
  return (
    <Grid container justifyContent='center' alignItems='center' style={{ height: '100vh' }}>
      <CenteredCircularProgress />
    </Grid>
  )
}

export default Spinner
