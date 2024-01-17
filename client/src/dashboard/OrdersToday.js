import * as React from 'react';
import { useEffect, useState } from "react";
// import Link from '@mui/material/Link';
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';

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

 export default function RecordList() {
  const [records, setRecords] = useState([]);
   // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/entries/today`);
       if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
       const records = await response.json();
      setRecords(records);
    }
     getRecords();
     return;
  }, [records.length]);
   // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/entries/${id}`, {
      method: "DELETE"
    });
     const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }
// This method will map out the records on the table
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
  
   // This following section will display the table with the records of individuals.
  return (
    <div>
      {/* <Popup trigger = {openPopup} setTrigger = {setOpenPopup}>
          <h1>my popup</h1>
        </Popup> */}
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
    
      {/* <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
            <tr>
              <th>Entry</th>
              <th>Calories</th>
              <th>Protein</th>
              <th>Carbs</th>
              <th>Fat</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
        <tbody>{recordList()}</tbody>
      </table> */}
    </div>
  );
 }