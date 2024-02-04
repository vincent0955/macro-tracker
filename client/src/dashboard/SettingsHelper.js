import * as React from 'react';
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useParams, useNavigate } from "react-router";
import Button from '@mui/material/Button';

export default function Settings() {
    const [form, setForm] = useState({
        goalCalories: 0,
        goalProtein: 0,
        goalCarbs: 0, 
        goalFat: 0,
        records: [],
      });
      const navigate = useNavigate();
       useEffect(() => {
        async function fetchData() {
          const response = await fetch(`http://localhost:5000/settings/mainsettings`);
           if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
           const record = await response.json();
          if (!record) {
            window.alert(`Record not found`);
            navigate("/");
            return;
          }
           setForm(record);
        }
         fetchData();
         return;
      }, [navigate]);
       // These methods will update the state properties.
      function updateForm(value) {
        return setForm((prev) => {
          return { ...prev, ...value };
        });
      }
       async function onSubmit(e) {
        e.preventDefault();
        const editedPerson = {
          goalCalories: form.goalCalories,
          goalProtein: form.goalProtein,
          goalCarbs: form.goalCarbs, 
          goalFat: form.goalFat,
        };
         // This will send a patch request to update the data in the database.
        await fetch(`http://localhost:5000/settings/mainsettings`, {
          method: "PATCH",
          body: JSON.stringify(editedPerson),
          headers: {
            'Content-Type': 'application/json'
          },
        });
      }

    return (
        
    <div>
        <h5>Set Daily Goal</h5>
            <br />
            <Stack
            component="form"
            sx={{
                width: '25ch',
                height: '37ch'
            }}
            spacing={2}
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}>
                <TextField id="goalCalories" label="Calories" variant="outlined" 
                type="number"
                className="form-control"
                value={form.goalCalories}
                onChange={(e) => updateForm({ goalCalories: parseInt(e.target.value) })}/>

                <TextField id="goalProtein" label="Protein" variant="outlined" 
                type="number"
                className="form-control"
                value={form.goalProtein}
                onChange={(e) => updateForm({ goalProtein: parseInt(e.target.value) })}/>

                <TextField id="goalCarbs" label="Carbs" variant="outlined" 
                type="number"
                className="form-control"
                value={form.goalCarbs}
                onChange={(e) => updateForm({ goalCarbs: parseInt(e.target.value) })}/>

                <TextField id="goalFat" label="Fat" variant="outlined" 
                type="number"
                className="form-control"
                value={form.goalFat}
                onChange={(e) => updateForm({ goalFat: parseInt(e.target.value) })}/>
                
                <Button variant="contained" type="submit" className="btn btn-primary">Save</Button>
            </Stack>
    </div>
    )
}
