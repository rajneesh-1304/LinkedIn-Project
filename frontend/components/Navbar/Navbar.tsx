'use client'
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArticleIcon from "@mui/icons-material/ArticleOutlined";
import PeopleIcon from "@mui/icons-material/PeopleOutline";
import SchoolIcon from "@mui/icons-material/SchoolOutlined";
import WorkIcon from "@mui/icons-material/WorkOutline";
import ExtensionIcon from "@mui/icons-material/ExtensionOutlined";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => setMobileOpen((prev) => !prev);

  const navItems = [
    { label: "Articles", icon: <ArticleIcon /> },
    { label: "People", icon: <PeopleIcon /> },
    { label: "Learning", icon: <SchoolIcon /> },
    { label: "Jobs", icon: <WorkIcon /> },
    { label: "Games", icon: <ExtensionIcon /> },
    { label: "Get the app", icon: <PhoneIphoneIcon /> },
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
        <ListItem sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Button fullWidth variant="outlined" sx={{ mb: 1 }}>
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
    <Box sx={{ borderBottom: "1px solid #e0e0e0" }}>
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          py={2}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Linked
            <Box component="span" sx={{ color: "#0a66c2" }}>
              in
            </Box>
          </Typography>

          <Stack
            direction="row"
            spacing={4}
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            {navItems.map((item) => (
              <Stack key={item.label} alignItems="center" spacing={0.5}>
                <Box>{item.icon}</Box>
                <Typography variant="caption">{item.label}</Typography>
              </Stack>
            ))}
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" sx={{ textTransform: "none" }}>
                Sign in
              </Button>
              <Button
                variant="contained"
                sx={{ textTransform: "none", backgroundColor: "#0a66c2" }}
              >
                Join now
              </Button>
            </Stack>
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