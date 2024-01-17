import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 // We import all the components we need in our app
import Navbar from "./components/navbar";
import EntryList from "./components/entryList";
import Edit from "./components/edit";
import Create from "./components/create";
import Dashboard from "./dashboard/Dashboard.js";
 const App = () => {
 return (
   <div>
    <Dashboard />
     {/* <Navbar /> */}
     <Routes>
       <Route path="/edit/:id" element={<Edit />} />
       {/* <Route exact path="/" element={<EntryList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} /> */}
     </Routes>
   </div>
 );
};
export default App;