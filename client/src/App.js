import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 // We import all the components we need in our app
import Navbar from "./components/navbar";
import EntryList from "./components/entryList";
import Edit from "./components/edit";
import Create from "./components/create";
import Dashboard from "./dashboard/Dashboard.js";
import Reports from "./dashboard/Reports.js";

 const App = () => {
 return (
   <div>
     <Routes>
      <Route path="/" element={<Dashboard />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/Reports" element={<Reports />} />
     </Routes>
   </div>
 );
};
export default App;