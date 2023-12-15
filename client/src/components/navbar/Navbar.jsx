import * as React from "react"; // Import the React library
import AppBar from "@mui/material/AppBar"; // Import the AppBar component from Material UI
import Box from "@mui/material/Box"; //Import the Box component from Material UI
import Toolbar from "@mui/material/Toolbar"; // Import the Toolbar component from Material UI
import IconButton from "@mui/material/IconButton"; // Import the IconButton component from Material UI
import Typography from "@mui/material/Typography"; // Import the Typography component from Material UI
import Menu from "@mui/material/Menu"; // Import the Menu component from Material UI
import MenuIcon from "@mui/icons-material/Menu"; // Import the MenuIcon component from Material UI
import Container from "@mui/material/Container"; // Import the Container component from Material UI
import Button from "@mui/material/Button"; // Import the Button component from Material UI
import MenuItem from "@mui/material/MenuItem"; // Import the MenuItem component from Material UI
import { NavLink, useNavigate } from "react-router-dom"; // Import the NavLink and useNavigate components from React Router DOM
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled"; // Import the DirectionsBusFilledIcon component from Material UI

// Define the ResponsiveAppBar component
function ResponsiveAppBar() {
  // Define the pages array to store the navigation links
  const pages = ["Home", "Contact"];
  // Initialize the navigate variable using useNavigate
  let navigate = useNavigate();

  // Define the state variable to handle the anchorElNav
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  // Define the handleOpenNavMenu function to open the navigation menu
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  // Define the handleCloseNavMenu function to close the navigation menu
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Return the ResponsiveAppBar component
  return (
    <AppBar position="static" style={{ backgroundColor: "white" }}>
      {/* Create the AppBar container with a maximum width of xl */}
      <Container maxWidth="xl">
        {/* Create the Toolbar component */}
        <Toolbar disableGutters>
          {/* Display the ViaBook logo using the DirectionsBusFilledIcon with a margin-right of 1 and a color of #3f51b5 */}
          <DirectionsBusFilledIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            style={{ color: "#3f51b5" }}
          />
          {/* Display the ViaBook text with a variant of h6, noWrap, a component of "a", a margin-right of 2, a display flex for medium and up devices, a monospace font family, a font weight of 700, a letter spacing of ".3rem", a color of #3f51b5, and a text decoration of none */}

          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#3f51b5",
              textDecoration: "none",
            }}
            onClick={(e) => {
              navigate("/");
            }}
          >
            ViaBook
          </Typography>
          {/* Create a Box component for the navigation menu on small and extra small devices */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {/* Create an IconButton component with a size of "large" to open the navigation menu */}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#3f51b5"
            >
              <MenuIcon />
            </IconButton>
            {/* Create a Menu component for the navigation menu */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* Create a MenuItem component for each page in the pages array */}
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  {/* Display the page name in a Typography component with a textAlign of "center" */}
                  <Typography textAlign="center">
                    {/* Create a NavLink component for each page with a relative URL and a style of "color: black; text-decoration: none;" */}
                    <NavLink
                      to={`${page === "Home" ? "/" : `/${page}`}`}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      {page}
                    </NavLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Display the ViaBook logo using the DirectionsBusFilledIcon with a margin-right of 1 and a color of #3f51b5 for small and extra small devices */}
          <DirectionsBusFilledIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            style={{ color: "#3f51b5" }}
          />

          {/* Display the ViaBook text with a variant of h5, noWrap, a component of "a", a margin-right of 2, a display flex for small and extra small devices, a flexGrow of 1, a monospace font family, a font weight of 700, a letter spacing of ".3rem", a color of #3f51b5, and a text decoration of none */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            // href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#3f51b5",
              textDecoration: "none",
            }}
            onClick={(e) => {
              navigate("/");
            }}
          >
            ViaBook
          </Typography>

          {/* Create a Box component for the navigation menu on medium and up devices */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* Create a Button component for each page in the pages array */}
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {/* Create a NavLink component for each page with a relative URL and a style of "color: black; text-decoration: none;" */}
                <NavLink
                  to={`${page === "Home" ? "/" : `/${page}`}`}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  {page}
                </NavLink>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
