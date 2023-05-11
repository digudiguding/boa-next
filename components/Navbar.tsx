"use client"

import React from "react";
import Link from "next/link";
import { Box, Container, AppBar, Toolbar, Typography, Menu } from "@mui/material";
import { Button, MenuItem, IconButton } from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MenuIcon from '@mui/icons-material/Menu';

const pages = [
    ['Dashboard','/'], 
    ['Market Data Producer','mkt'], 
    ['Trade Data Producer','trade'],
    ['Report Generator','report']
]
//const pages : { [name: string]: [link: string];} = {};


const Navbar = () => {

    const [anchorElNav, setAnchorElNav] = 
    React.useState<null | HTMLElement>(null);
    
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
      };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }

  return (
    <AppBar position="static">
        <Container >
            <Toolbar disableGutters>
                <AttachMoneyIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    gF1
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                    {pages.map((page) => (
                        <MenuItem key={page[0]} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
                <AttachMoneyIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    gF1
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
                    {pages.map((page) => (
                    <Link href={page[1]} passHref>
                    <Button
                        key={page[0]}
                        onClick={handleCloseNavMenu}
                        sx={{ ml: 2, mr: 2, my: 2, color: 'white', display: 'block' }}
                    >
                        {page[0]}
                    </Button>
                    </Link>
                    ))}
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
  );
};
export default Navbar;