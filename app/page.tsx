"use client"

import { useEffect, useState } from 'react';
import Layout from '../components/Layout'
import { Box, Typography, TextField, Stack } from '@mui/material/'

export default function Home() {

  var fxTextValue: string = "";
  var tradeTextValue: string = "";
  var configTextValue: string = "";

  const [fxT, setFxT] = useState("No Data yet!");
  const [cfT, setCfT] = useState("No Data yet!");
  const [trT, settrT] = useState("No Data yet!");
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState<any[]>([]);
  const oldData: any[] = [];

  const callAPI = async () => {
    try {
        const res = await fetch(
            `http://localhost:3000/api/dashboard`,
            {
                method: 'POST',
                headers: {},
            }
        );
        setFullData(await res.json());
        console.log("Received full data");
        console.log(index);
    } catch (err) {
        console.log(err);
    }
  };

  useEffect(() => { 
    callAPI();
    if (index < fullData.length) { 
      const timer = setTimeout(() => { 
        console.log(data);
        setData(oldData => [...oldData, fullData[index]]); 
        
        if (data[index].EventType == "ConfigEvent"){
          configTextValue = configTextValue +  
          "=======================================\n"+
          "Event ID: " + data[index].EventID + "\n" +
          "EventType: "+ data[index].EventType + "\n" +
          "Config: " + JSON.stringify(data[index].Config) + "\n" +
          "Fx: " + JSON.stringify(data[index].fx) + "\n"
          console.log(configTextValue);
          setCfT(configTextValue);
        }else if (data[index].EventType == "TradeEvent") {
          tradeTextValue += 
          "=======================================\n"+
          "Event ID: " + data[index].EventID + "\n" +
          "EventType: "+ data[index].EventType + "\n" +
          "Config: " + JSON.stringify(data[index].Config) + "\n" +
          "Fx: " + JSON.stringify(data[index].fx) + "\n"
          settrT(tradeTextValue);
          console.log(tradeTextValue);
        }else if (data[index].EventType == "FXMidEvent") {
          fxTextValue += 
          "=======================================\n"+
          "Event ID: " + data[index].EventID + "\n" +
          "EventType: "+ data[index].EventType + "\n" +
          "Config: " + JSON.stringify(data[index].Config) + "\n" +
          "Fx: " + JSON.stringify(data[index].fx) + "\n"
          setFxT(fxTextValue);
        }
        setIndex(index + 1); 
      }, 2500); 
 
      // Clear the timeout if the component is unmounted 
      return () => clearTimeout(timer); 
    } 
  }, [index]); // Re-run the effect when the 'index' state changes 
  console.log(fxT)

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
          maxRows={10}
          multiline
          defaultValue={fxT}
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
