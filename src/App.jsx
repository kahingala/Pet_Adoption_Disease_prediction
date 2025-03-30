import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Campaigns from "./components/Campaigns/Campaigns";
import TopDonors from "./components/Donate/TopDonors";
import DonationHistory from "./components/Donate/DonationHistory";
import DonationForm from "./components/Donate/DonationForm";
import CampaignList from './components/Campaigns/CampaignList';
import CampaignDetails from './components/Campaigns/CampaignDetails';
import AdminDashboard from './components/AdminDashboard';
import CampaignForm from './components/Campaigns/CampaignForm';
import EditCampaign from './components/Campaigns/EditCampaign';


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

        <Route path="/campaignlist" element={<CampaignList />} />
          <Route path="/campaigns/:id" element={<CampaignDetails />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/campaigns/create" element={<CampaignForm onSubmit={() => console.log('Create submitted')} isEdit={false} />} />
          {/* Example Edit Route: */}
           <Route path="/admin/campaigns/edit/:id" element={<EditCampaign />} /> 
        
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
