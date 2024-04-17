import React from "react";
import Parse from "parse";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import SchoolIcon from "@mui/icons-material/School";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const pages = ["Events", "Create", "Manage"];

function ResponsiveAppBar({ onPageChange }) {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const handleSignOut = () => {
    Parse.User.logOut()
      .then(() => {
        console.log("User signed out successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SchoolIcon />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Menu id="menu-appbar">
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handlePageChange(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handlePageChange(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Button color="inherit" onClick={handleSignOut}>
            <ExitToAppIcon></ExitToAppIcon>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
