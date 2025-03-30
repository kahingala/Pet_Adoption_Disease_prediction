import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import AddCaretakers from './components/AddCaretakers';
import AllCaretakers from './components/AllCaretakers';
import EditCaretaker from './components/EditCaretaker'; 
import UsersReport from './components/UsersReport';
//import PackageReport from './components/packageReport'; // Corrected import name
//import AddNewpackages from './components/AddNewpackages'; 
//import EditNewpackage from './components/EditNewPackage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path='/' element={<AllCaretakers />} />
            <Route path='/add' element={<AddCaretakers />} />
            <Route path='/update/:id' element={<EditCaretaker />} />
            <Route path="/UserReport" element={<UsersReport />} /> {/* Render UsersReport component at /UserReport route */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
