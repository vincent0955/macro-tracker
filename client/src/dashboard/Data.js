import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


export default function ChartsOverview() {
const [macros, setMacros] = useState([[0, 0, 0, 0, 0, 0, 0],
                                        [0, 0, 0, 0, 0, 0, 0],
                                        [0, 0, 0, 0, 0, 0, 0],   
                                        [0, 0, 0, 0, 0, 0, 0]]);
const [value, setValue] = React.useState(dayjs());
var serialized = JSON.stringify(value);
var result = serialized.substring(1, serialized.length-1)
console.log(result);
useEffect(() => {
    async function fetchData() {
        const response = await fetch(`http://localhost:5000/entries/weeklyreport/` + result);
        if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
        }
        const record = await response.json();
        if (!record) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
        }
        setMacros(record);
    }
        fetchData();
        return;
    }, [value]);


  return (
    <div>
        <h3>Weekly</h3>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker 
                label="Pick Date" 
                value={value}
                onChange={(newValue) => setValue(newValue)}
                />
            </DemoContainer>
        </LocalizationProvider>

        <BarChart
        series={[
            { label: "Calories", data: macros[0] },
            { label: "Protein", data: macros[1] },
            { label: "Carbs", data: macros[2] },
            { label: "Fat", data: macros[3] },

        ]}
        height={500}
        xAxis={[{ data: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], scaleType: 'band' }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
    </div>
        
        
  );
}