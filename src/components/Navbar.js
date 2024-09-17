// src/components/Navbar.js
import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Collapse, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { logout } from '../api/authService';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log("Navbar.js:", user);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleLogout = async () => {
        try {
            await logout();
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const publicMenuItems = [
        { text: 'Inicio', link: '/' },
        { text: 'Registro', link: '/register' },
        { text: 'Inicio de sesión', link: '/login' },
    ];

    const privateMenuItems = [
        { text: 'Inicio', link: '/' },
        { text: 'Perfil', link: '/profile' },
        { text: 'Chat', link: '/chat' },
        { text: 'Cerrar sesión', action: handleLogout },
    ];

    const menuItems = user ? privateMenuItems : publicMenuItems;

    return (
        <div>
            <AppBar
                position="static"
                sx={{
                    background: 'linear-gradient(to right, #4a90e2, #50e3c2)',
                }}
            >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ChatWave
                    </Typography>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleMenu}
                    >
                        {menuOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Collapse in={menuOpen}>
                <List
                    sx={{
                        padding: 0,
                        margin: 0,
                        width: '100%',
                    }}
                >
                    {menuItems.map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            component={item.link ? Link : 'div'} // Si es un enlace, usa Link; si no, un div
                            to={item.link ? item.link : undefined} // Si tiene link, asignarlo
                            onClick={item.action ? () => { item.action(); closeMenu(); } : closeMenu} // Si es una acción, ejecutarla
                            sx={{
                                justifyContent: 'center',
                                width: '100%',
                                background: 'linear-gradient(to right, #4a90e2, #50e3c2)',
                                padding: '10px 0',
                                '&:hover': {
                                    background: 'linear-gradient(to right, #50e3c2, #4a90e2)',
                                },
                                textDecoration: 'none',
                            }}
                        >
                            <ListItemText
                                primary={item.text}
                                sx={{
                                    color: 'white',
                                    textAlign: 'center',
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Collapse>
        </div>
    );
};

export default Navbar;
