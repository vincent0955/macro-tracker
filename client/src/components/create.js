import React, { useState } from "react";
import { useNavigate } from "react-router";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


export default function Create() {
 const [form, setForm] = useState({
   name: "",
   calories: 0,
   protein: 0,
   carbs: 0,
   fat: 0,
 });
 const navigate = useNavigate();
  // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
  // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
    // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
    await fetch("http://localhost:5000/entries", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
    setForm({ name: "", calories: 0, protein: 0, carbs: 0, fat: 0 });
    navigate("/");
 }
  // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Track</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <TextField id="name" label="Entry" variant="standard" 
          sx={{ m: 1, width: '66ch'}}
          type="text"
          className="form-control"
          value={form.name}
          onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <TextField id="calories" label="Calories" variant="standard" 
            sx={{ m: 1, width: '15ch' }}
            type="number"
            className="form-control"
            value={form.calories}
            onChange={(e) => updateForm({ calories: parseInt(e.target.value) })}
         />
        
        <TextField id="protein" label="Protein" variant="standard" 
            sx={{ m: 1, width: '15ch' }}
            type="number"
            className="form-control"
            value={form.protein}
            onChange={(e) => updateForm({ protein: parseInt(e.target.value) })}
          />
        
          <TextField id="carbs" label="Carbs" variant="standard" 
            sx={{ m: 1, width: '15ch' }}
            type="number"
            className="form-control"
            value={form.carbs}
            onChange={(e) => updateForm({ carbs: parseInt(e.target.value) })}
          />
        
          <TextField id="fat" label="Fat" variant="standard" 
            sx={{ m: 1, width: '15ch' }}
            type="number"
            className="form-control"
            value={form.fat}
            onChange={(e) => updateForm({ fat: parseInt(e.target.value) })}
          />
       </div>
       <div className="form-group">
        <Button variant="contained" onClick={onSubmit} sx={{ m: 1 }}>Create Entry</Button>
       </div>
     </form>
   </div>
 );
}