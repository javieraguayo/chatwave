// src/components/Profile.js
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { Container, Typography, Button, Box } from '@mui/material';
import { logout } from '../api/authService';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            setUser(null); // Actualiza el estado de usuario después de cerrar sesión
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    if (!user) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(to right, #4a90e2, #50e3c2)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden', // Evita el scroll si hay contenido que desborda
                }}
            >
                <Typography variant="h6" color="white" align="center">
                    No has iniciado sesión.
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: '91.2vh', // Asegura que el fondo cubra toda la pantalla
                background: 'linear-gradient(to right, #4a90e2, #50e3c2)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2,
                overflow: 'hidden', // Evita el scroll si hay contenido que desborda
                p: 0,
            }}
        >
            <Container
                maxWidth="sm"
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 3,
                    boxShadow: 3,
                    padding: 4,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Perfil de Usuario
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Email:</strong> {user.email}
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Email verificado:</strong> {user.emailVerified ? 'Sí' : 'No'}
                </Typography>
                
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                    onClick={handleLogout}
                >
                    Cerrar sesión
                </Button>
            </Container>
        </Box>
    );
};

export default Profile;
