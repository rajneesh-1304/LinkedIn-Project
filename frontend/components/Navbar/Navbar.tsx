'use client';
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArticleIcon from "@mui/icons-material/ArticleOutlined";
import PeopleIcon from "@mui/icons-material/PeopleOutline";
import SchoolIcon from "@mui/icons-material/SchoolOutlined";
import WorkIcon from "@mui/icons-material/WorkOutline";
import ExtensionIcon from "@mui/icons-material/ExtensionOutlined";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import SearchIcon from "@mui/icons-material/Search";
import './Navbar.css';
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
const router = useRouter();
  const toggleDrawer = () => setMobileOpen(!mobileOpen);
  const currentUser = useAppSelector((state) => state.users.currentUser);

  const navItems = [
    { label: "Home", icon: <PeopleIcon /> },
    { label: "My Network", icon: <PeopleIcon /> },
    { label: "Jobs", icon: <WorkIcon /> },
    { label: "Messaging", icon: <ArticleIcon /> },
    { label: "Notifications", icon: <ExtensionIcon /> },
    { label: "Me", icon: <PhoneIphoneIcon /> },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.label}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        <Divider sx={{ my: 1 }} />
        <ListItem sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Button fullWidth variant="outlined">
            Sign in
          </Button>
          <Button fullWidth variant="contained" sx={{ backgroundColor: "#0a66c2" }}>
            Join now
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ borderBottom: "1px solid #e0e0e0", backgroundColor: "#fff", position: "sticky", top: 0, zIndex: 1100 }}>
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          py={1}
        >
          <Typography variant="h6" className="logo-text" sx={{ cursor: "pointer", fontWeight: 700 }}>
            Linked
            <Box component="span" className="logo-in">
              in
            </Box>
          </Typography>

          <Box
            sx={{
              mx: 2,
              display: { xs: "none", md: "flex" },
              backgroundColor: "#eef3f8",
              borderRadius: 20,
              px: 2,
              py: 0.5,
              alignItems: "center",
            }}
          >
            <SearchIcon sx={{ color: "#5a5a5a", mr: 1 }} />
            <input
              type="text"
              placeholder="Search"
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                width: "100%",
                fontSize: 14,
              }}
            />
          </Box>

          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            {navItems.map((item) => (
              <Stack key={item.label} alignItems="center" spacing={0.3} sx={{ cursor: "pointer" }}>
                <Box onClick={() => router.push(item.label.toLowerCase())}>{item.icon}</Box>
                <Typography variant="caption">{item.label}</Typography>
              </Stack>
            ))}
            {!currentUser ? <Stack direction="row" spacing={1}>
              <Button variant="outlined" sx={{ textTransform: "none" }} onClick={()=>router.push('/login')}>
                Sign in
              </Button>
              <Button variant="contained" sx={{ textTransform: "none", backgroundColor: "#0a66c2" }} onClick={()=>router.push('/register')}>
                Join now
              </Button>
            </Stack> : <></>}
          </Stack>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={toggleDrawer}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Stack>
      </Container>

      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navbar;