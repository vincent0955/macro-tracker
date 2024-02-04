import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import EntryList from "./components/entryList";
import Edit from "./components/edit";
import Create from "./components/create";
import Dashboard from "./dashboard/Dashboard.js";
import Reports from "./dashboard/Reports.js";
import Settings from "./dashboard/Settings.js";

 const App = () => {
 return (
   <div>
     <Routes>
      <Route path="/" element={<Dashboard />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/Reports" element={<Reports />} />
       <Route path="/Settings" element={<Settings />} />
     </Routes>
   </div>
 );
};
export default App;