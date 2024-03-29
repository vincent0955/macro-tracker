import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 export default function Edit() {
 const [form, setForm] = useState({
   name: "",
   calories: 0,
   protein: 0,
   carbs: 0, 
   fat: 0,
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
  useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/entries/id/${params.id.toString()}`);
      if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
      const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
      setForm(record);
   }
    fetchData();
    return;
 }, [params.id, navigate]);
  // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
  async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     name: form.name,
     calories: form.calories,
     protein: form.protein,
     carbs: form.carbs, 
     fat: form.fat,
   };
    // This will send a patch request to update the data in the database.
   await fetch(`http://localhost:5000/entries/${params.id}`, {
     method: "PATCH",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
    navigate("/");
 }
  // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Entry</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name: </label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="calories">Calories: </label>
         <input
           type="number"
           className="form-control"
           id="calories"
           value={form.calories}
           onChange={(e) => updateForm({ calories: parseInt(e.target.value) })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="calories">Protein: </label>
         <input
           type="number"
           className="form-control"
           id="protein"
           value={form.protein}
           onChange={(e) => updateForm({ protein: parseInt(e.target.value) })}
         />
       </div>
       <div className="form-group">
        <label htmlFor="carbs">Carbs: </label>
         <input
           type="number"
           className="form-control"
           id="carbs"
           value={form.carbs}
           onChange={(e) => updateForm({ carbs: parseInt(e.target.value) })}
         />
         </div>
        <div className="form-group">
          <label htmlFor="fat">Fat: </label>
         <input
           type="number"
           className="form-control"
           id="fat"
           value={form.fat}
           onChange={(e) => updateForm({ fat: parseInt(e.target.value) })}
         />
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Entry"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}