import { TableBody } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Table from '@mui/material/Table';


export default function Daily() {
    const [data, setData] = useState(0);
    useEffect(() => {
        async function fetchData() {
          const response = await fetch(`http://localhost:5000/entries/today/sum`);
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
          setData(record);
        }
         fetchData();
         return;
      }, []);
    return (
        <div>
            <h5>Today</h5>
            <h6>
                <b>Calories: </b> {data[0]}
                <b> Protein: </b> {data[1]} 
                <b> Carbs: </b> {data[2]}
                <b> Fat: </b> {data[3]}
            </h6>
        </div>

    );
}
