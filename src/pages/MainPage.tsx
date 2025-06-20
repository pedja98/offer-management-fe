import { AccordionItems } from '../consts/common'
import AccordionItem from '../components/AccordionItem'
import { Grid } from '@mui/material'

const MainPage = () => {
  return (
    <Grid container direction='column' spacing={2} sx={{ width: '100%' }} alignItems='center'>
      {AccordionItems.map((accordionKey) => (
        <Grid item key={accordionKey} sx={{ width: '95%', mt: 2 }}>
          <AccordionItem accordionKey={accordionKey} />
        </Grid>
      ))}
    </Grid>
  )
}

export default MainPage
