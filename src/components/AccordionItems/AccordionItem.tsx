import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Box, Grid } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'
import { AccordionOptions, AdditionalData } from '../../types/common'
import { getAccordionContext } from '../../helpers/common'
import { TernaryColor, WhiteTeamColor } from '../../consts/common'

const AccordionItem = ({
  accordionKey,
  accordionTitle,
  accordionExpanded = true,
  additionalData,
}: {
  accordionKey: string
  accordionTitle: string
  accordionExpanded?: boolean
  additionalData?: AdditionalData
}) => {
  const [expanded, setExpanded] = useState(accordionExpanded)

  const handleToggle = () => {
    setExpanded(!expanded)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setExpanded(false)
  }

  const accordionContext = getAccordionContext(accordionKey as AccordionOptions, additionalData)

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
          {accordionTitle}
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
