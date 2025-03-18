import { Box, Container, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, Pets } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#6D4C41",
        color: "#fff",
        py: 3,
        mt: 5,
        textAlign: "center",
      }}
    >
      <Container>
        {/* Logo */}
        <Pets sx={{ fontSize: 40, mb: 1 }} />

        {/* Navigation Links */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
          {["Adopt", "Shop", "Donate", "Contact"].map((item) => (
            <Typography key={item} sx={{ cursor: "pointer", fontSize: 16 }}>
              {item}
            </Typography>
          ))}
        </Box>

        {/* Social Media Icons */}
        <Box>
          <IconButton sx={{ color: "#fff" }}><Facebook /></IconButton>
          <IconButton sx={{ color: "#fff" }}><Twitter /></IconButton>
          <IconButton sx={{ color: "#fff" }}><Instagram /></IconButton>
        </Box>

        {/* Copyright */}
        <Typography variant="body2" sx={{ mt: 2 }}>
          © {new Date().getFullYear()} PetCare. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
