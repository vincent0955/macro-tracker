import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';


const Record = (props) => (
    <tr>
      <TableCell component="th" scope="row">{props.record.name}</TableCell>
      <TableCell align="right">{props.record.calories}</TableCell>
      <TableCell align="right">{props.record.protein}</TableCell>
      <TableCell align="right">{props.record.carbs}</TableCell>
      <TableCell align="right">{props.record.fat}</TableCell>
      <TableCell align="right">{props.record.dateadded}</TableCell>
      <TableCell align="right">
        <Link className="btn btn-link" to={`/edit/${props.record._id}`}>
          <Button variant="outlined" className="btn btn-link">Edit</Button>
        </Link>
        <Button variant="outlined" className="btn btn-link"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          Delete
        </Button>
  
        </TableCell>
    </tr>
   );

export default function ChartsOverview() {
const [value, setValue] = React.useState(dayjs());
const [data, setData] = useState(0);
const [settingsData, setSettingsData] = useState(0);
const [records, setRecords] = useState([]);
var serialized = JSON.stringify(value);
var result = serialized.substring(1, serialized.length-1)
console.log(result);

async function deleteRecord(id) {
    await fetch(`http://localhost:5000/entries/${id}`, {
      method: "DELETE"
    });
     const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }


useEffect(() => {
    async function fetchData() {
        var response = await Promise.all([
            fetch('http://localhost:5000/entries/report/'+result).then((response) => response.json()),
            fetch('http://localhost:5000/settings/mainsettings').then((response) => response.json()),
            fetch('http://localhost:5000/entries/today/'+result).then((response) => response.json()),

          ]);
          setData(response[0]);
          setSettingsData(response[1]);
          setRecords(response[2]);
    }
        fetchData();
        return;
    }, [value]);

    function recordList() {
        return records.map((record) => {
          return (
            <Record
              record={record}
              deleteRecord={() => deleteRecord(record._id)}
              key={record._id}
            />
          );
        });
      }

  return (
    <div>
        <h3>Day</h3>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker 
                label="Pick Date" 
                value={value}
                onChange={(newValue) => setValue(newValue)}
                />
            </DemoContainer>
        </LocalizationProvider>
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
        
        {/* Table */}
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Entry Name</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                {recordList()}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  );
}