import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import BookIcon from "@mui/icons-material/Book";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink, Outlet } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { resetStaffState } from "../features/staffSlice";
import { resetUser } from "../features/userSlice";
import { resetCompanyState } from "../features/companySlice";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar className="bg-slate-800" position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Box className="flex gap-y-2 flex-col pl-5 mb-5">
          <Typography variant="h6">Dashboard</Typography>
          <Typography variant="h7">{user.staff.email}</Typography>
          {user.company && <p>{user.company.name}</p>}
        </Box>
        <Divider />
        <List>
          {!user.staff.roles.admin && (
            <NavLink to="/dashboard/company">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          )}
          {user.staff.roles.admin && (
            <NavLink to="/dashboard/companies">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          )}
          <NavLink to="/dashboard/profile">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={"Profile"} />
              </ListItemButton>
            </ListItem>
          </NavLink>

          {user.staff.roles.admin && (
            <NavLink to="/dashboard/bookings">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <BookmarkIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Oyaanow Bookings"} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          )}
          {user.staff.roles.admin && (
            <NavLink to="/dashboard/dubai">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <BookmarkAddedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Dubai Bookings"} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          )}

          {user.staff.roles.admin && (
            <NavLink to="/dashboard/charter">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <BookmarkAddIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Bus Charter"} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          )}
          {user.staff.roles.admin && (
            <NavLink to="/dashboard/nysc">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <BookmarksIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Nysc Bookings"} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          )}
          {!user.staff.roles.admin && (
            <NavLink to="/dashboard/staffbookings">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <BookIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Bookings"} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          )}

          {user.staff.roles.superAdmin && (
            <NavLink to="/dashboard/admin">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ImProfile />
                  </ListItemIcon>
                  <ListItemText primary={" Details"} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          )}

          <ListItem
            onClick={() => {
              navigate("/");
              dispatch(resetUser());
              dispatch(resetStaffState());
              dispatch(resetCompanyState());
            }}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography>
          <Outlet />
        </Typography>
      </Main>
    </Box>
  );
}
