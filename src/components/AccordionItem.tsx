import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Box, Grid } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { TernaryColor, WhiteTeamColor } from '../consts/common'
import { getAccordionContext } from '../helpers/common'
import { AccordionOptions } from '../types/common'

const AccordionItem = ({ accordionKey }: { accordionKey: string }) => {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(true)

  const handleToggle = () => {
    setExpanded(!expanded)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setExpanded(false)
  }

  const accordionContext = getAccordionContext(accordionKey as AccordionOptions)

  return (
    <Accordion expanded={expanded} onChange={handleToggle}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
        sx={{
          backgroundColor: TernaryColor,
          color: 'white',
          fontSize: '1.2rem',
          '& .MuiTypography-root': {
            fontSize: '1.2rem',
            fontWeight: 'bold',
          },
        }}
      >
        <Typography variant='h6' sx={{ color: WhiteTeamColor }}>
          {t(`accordionOptions.${accordionKey}`)}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: 'white' }}>
        <Grid>{accordionContext}</Grid>
        <Box mt={2} display='flex' justifyContent='flex-end'>
          <Button variant='text' onClick={handleClose}>
            Close
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default AccordionItem
