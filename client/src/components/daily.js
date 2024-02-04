import { TableBody } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Table from '@mui/material/Table';
import { BarChart } from '@mui/x-charts/BarChart';



export default function Daily() {
    const [data, setData] = useState(0);
    const [settingsData, setSettingsData] = useState(0);
    useEffect(() => {
        async function fetchData() {
          var response = await Promise.all([
            fetch('http://localhost:5000/entries/today/sum').then((response) => response.json()),
            fetch('http://localhost:5000/settings/mainsettings').then((response) => response.json())
          ]);
          // const response = await fetch(`http://localhost:5000/entries/today/sum`);
          //  if (!response.ok) {
          //   const message = `An error has occurred: ${response.statusText}`;
          //   window.alert(message);
          //   return;
          // }
          // const record = await response.json();
          // if (!record) {
          //   const message = `An error has occurred: ${response.statusText}`;
          //   window.alert(message);
          //   return;
          // }
          setData(response[0]);
          setSettingsData(response[1]);
        }
         fetchData();
         return;
      }, []);

    
    return (
        <div>
            <h5>Today</h5>
            <h6>
                <b>Calories: </b> {[data[0], '/', settingsData.goalCalories]}
                <b> Protein: </b> {[data[1], '/', settingsData.goalProtein]} 
                <b> Carbs: </b> {[data[2], '/', settingsData.goalCarbs]}
                <b> Fat: </b> {[data[3], '/', settingsData.goalFat]}
            </h6>

            
            <BarChart 
              series={[
                  { label: "Protein", data: [data[1]], stack: 'B'},
                  { label: "Protein until goal", data: [settingsData.goalProtein-data[1]], stack: 'B'},
                  { label: "Carbs ", data: [data[2]], stack: 'C'},
                  { label: "Carbs until goal", data: [settingsData.goalCarbs-data[2]], stack: 'C'},
                  { label: "Fat", data: [data[3]], stack: 'D'},
                  { label: "Fat until goal", data: [settingsData.goalFat-data[3]], stack: 'D'},
                  

              ]}
              slotProps={{
                legend: {
                  direction: 'column',
                  position: { vertical: 'middle', horizontal: 'right' },
                  padding: 0,

                  hidden: true
                },
              }}
              height={200}
              width = {600}
              yAxis={[{ data: [''], scaleType: 'band',categoryGapRatio: 0.1, barGapRatio: 0.7 }]}
              margin={{ top: 10, bottom: 30, left: 70, right: 10 }}
              layout="horizontal"
            />
              
        </div>

    );
}
