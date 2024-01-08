import React, { useState } from "react";
import { useNavigate } from "react-router";
export default function Create() {
 const [form, setForm] = useState({
   name: "",
   calories: "",
   protein: "",
   carbs: "",
   fat: "",
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
    setForm({ name: "", calories: "", protein: "", carbs: "", fat: "" });
   navigate("/");
 }
  // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Entry</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Entry</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="Calories">Calories</label>
         <input
           type="number"
           className="form-control"
           id="calories"
           value={form.calories}
           onChange={(e) => updateForm({ calories: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="protein">Protein: </label>
         <input
           type="number"
           className="form-control"
           id="protein"
           value={form.protein}
           onChange={(e) => updateForm({ protein: e.target.value })}
         />
        </div>
        <div className="form-group">
        <label htmlFor="carbs">Carbs: </label>
         <input
           type="number"
           className="form-control"
           id="carbs"
           value={form.carbs}
           onChange={(e) => updateForm({ carbs: e.target.value })}
         />
         </div>
        <div className="form-group">
          <label htmlFor="fat">Fat: </label>
         <input
           type="number"
           className="form-control"
           id="fat"
           value={form.fat}
           onChange={(e) => updateForm({ fat: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create Entry"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}