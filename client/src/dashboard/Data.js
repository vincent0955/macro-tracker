import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from "react";


export default function ChartsOverview() {
const [macros, setMacros] = useState([[0, 0, 0, 0, 0, 0, 0],
                                        [0, 0, 0, 0, 0, 0, 0],
                                        [0, 0, 0, 0, 0, 0, 0],   
                                        [0, 0, 0, 0, 0, 0, 0]]);
useEffect(() => {
    async function fetchData() {
        const response = await fetch(`http://localhost:5000/entries/weeklyreport`);
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
    }, []);

  return (
    <div>
        <h3>Weekly</h3>
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