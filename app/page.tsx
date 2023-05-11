"use client"

import Layout from '../components/Layout'
import { Box, Typography, TextField, Stack } from '@mui/material/'

export default function Home() {

  const fxTextValue = "Default Value";
  const tradeTextValue = "Default Value";
  const configTextValue = "Default Value";
  return (
    <Layout>
    <Typography variant="h2" pt={5} align={'center'} gutterBottom> 
      Dashboard 
    </Typography>
    <Box display="flex" justifyContent="center"
  alignItems="center" minHeight="vh" pt={2} pb={2}>
      <Stack>
          <Typography variant="h5" pb={2} align="center">
        FXMidEvent Live Update
          </Typography>
        <TextField
          id="filled-multiline-static"
          label=""
          multiline
          defaultValue={fxTextValue}
          variant="filled"
          disabled

          sx={{
            minHeight: '30vh',
            backgroundColor: 'white',
            width: '70vw',
            input: { color: 'black' }
          }}
          />
      </Stack>
      </Box>

      <Box display="flex" justifyContent="center"
  alignItems="center" minHeight="vh" pt={2} pb={2}>
      <Stack>
      <Typography variant="h5" pb={2} align="center">
        TradeEvent Live Update
      </Typography>
        <TextField
          id="filled-multiline-static"
          label=""
          multiline
          defaultValue={tradeTextValue}
          variant="filled"
          disabled

          sx={{
            minHeight: '30vh',
            backgroundColor: 'white',
            width: '70vw',
            input: { color: 'black' }
          }}
          />
      </Stack>
      </Box>
    
      <Box display="flex" justifyContent="center"
  alignItems="center" minHeight="vh" pt={2} pb={2}>
      <Stack>
      <Typography variant="h5" pb={2} align="center">
        ConfigEvent Live Update
      </Typography>
        <TextField
          id="filled-multiline-static"
          label=""
          multiline
          defaultValue={configTextValue}
          variant="filled"
          disabled

          sx={{
            minHeight: '30vh',
            backgroundColor: 'white',
            width: '70vw',
            input: { color: 'black' }
          }}
          />
      </Stack>
      </Box>

    
    </Layout>
  )
}
