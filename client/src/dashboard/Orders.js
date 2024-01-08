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


const Record = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.calories}</td>
    <td>{props.record.protein}</td>
    <td>{props.record.carbs}</td>
    <td>{props.record.fat}</td>
    <td>{props.record.dateadded}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
 );

 export default function RecordList() {
  const [records, setRecords] = useState([]);
   // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/entries/`);
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
      <h3>Entry List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
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
      </table>
    </div>
  );
 }

// // Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }

// const rows = [
//   createData(
//     0,
//     '16 Mar, 2019',
//     'Elvis Presley',
//     'Tupelo, MS',
//     'VISA ⠀•••• 3719',
//     312.44,
//   ),
//   createData(
//     1,
//     '16 Mar, 2019',
//     'Paul McCartney',
//     'London, UK',
//     'VISA ⠀•••• 2574',
//     866.99,
//   ),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
//   createData(
//     3,
//     '16 Mar, 2019',
//     'Michael Jackson',
//     'Gary, IN',
//     'AMEX ⠀•••• 2000',
//     654.39,
//   ),
//   createData(
//     4,
//     '15 Mar, 2019',
//     'Bruce Springsteen',
//     'Long Branch, NJ',
//     'VISA ⠀•••• 5919',
//     212.79,
//   ),
// ];

// function preventDefault(event) {
//   event.preventDefault();
// }

// export default function Orders() {
//   return (
//     <React.Fragment>
//       <Title>Recent Orders</Title>
//       <Table size="small">
//         <TableHead>
//           <TableRow>
//             <TableCell>Date</TableCell>
//             <TableCell>Name</TableCell>
//             <TableCell>Ship To</TableCell>
//             <TableCell>Payment Method</TableCell>
//             <TableCell align="right">Sale Amount</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow key={row.id}>
//               <TableCell>{row.date}</TableCell>
//               <TableCell>{row.name}</TableCell>
//               <TableCell>{row.shipTo}</TableCell>
//               <TableCell>{row.paymentMethod}</TableCell>
//               <TableCell align="right">{`$${row.amount}`}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
//         See more orders
//       </Link>
//     </React.Fragment>
//   );
// }
