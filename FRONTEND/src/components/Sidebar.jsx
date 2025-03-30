import { Drawer, List, ListItem, ListItemText, IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PetsIcon from "@mui/icons-material/Pets";
import { useState } from "react";
import { Link } from "react-router-dom";
//import logoImage from 'C:\Users\LENOVO\Desktop\GitHub\Pet_Adoption_Disease_prediction\FRONTEND\src\logo.png.png';  // Import your logo image here
import logoImage from '../asset/logo.png'; // Correct path with forward slashes


const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Adopt", path: "/adopt" },
    { name: "Shop", path: "/shop" },
    { name: "Donate", path: "/donate" }
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 240, backgroundColor: "#351409", color: "#fff", height: "100%" },
        }}
      >
        {/* Logo Image */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <img src={logoImage} alt="Pet Care Logo" style={{ maxWidth: '200px', height: 'auto' }} />
      </Box>

        {/* Navigation Links */}
        <List>
          {navItems.map((item) => (
            <ListItem
              button
              key={item.name}
              sx={{
                "&:hover": { backgroundColor: "#774C3A" }, // Change color on hover
                "&:active": { backgroundColor: "#A56E50" }, // Change color when touched/clicked
                transition: "0.3s",
              }}
            >
              <Link to={item.path} style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
                <ListItemText primary={item.name} />
              </Link>
            </ListItem>
          ))}
        </List>

        {/* Footer */}
        <Box sx={{ marginTop: "auto", padding: 2 }}>
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            © {new Date().getFullYear()} PetCare. All rights reserved.
          </Typography>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
