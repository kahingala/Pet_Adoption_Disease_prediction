import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Campaigns from "./components/Campaigns/Campaigns";
import TopDonors from "./components/Donate/TopDonors";
import DonationHistory from "./components/Donate/DonationHistory";
import DonationForm from "./components/Donate/DonationForm";


function App() {
  

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/fundraising" element={<Campaigns />} />
        <Route path="/top-donors" element={<TopDonors />}/>
        <Route path="/d-history" element={<DonationHistory />}/>
        <Route path="/d-form" element={<DonationForm />}/>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
