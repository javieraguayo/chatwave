// src/components/AuthStatus.js
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { ListItem, ListItemText } from '@mui/material';
import { logout } from '../api/authService'; // Importa la función logout

const AuthStatus = () => {
    const { user, setUser } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await logout(); // Usa logout para cerrar sesión
            setUser(null); // Actualiza el estado de usuario en el contexto
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <>
            {user ? (
                <ListItem
                    button
                    onClick={handleLogout}
                    sx={{
                        justifyContent: 'center',
                        width: '100%', // Asegurarse que ListItem ocupa todo el ancho
                        background: 'linear-gradient(to right, #4a90e2, #50e3c2)', // Gradiente para ListItem
                        padding: '10px 0', // Ajustar el padding para los items
                        '&:hover': {
                            background: 'linear-gradient(to right, #50e3c2, #4a90e2)', // Cambiar gradiente al pasar el mouse
                        },
                        textDecoration: 'none', // Eliminar subrayado de los enlaces
                    }}
                >
                    <ListItemText
                        primary="Cerrar sesión"
                        sx={{
                            color: 'white',
                            textAlign: 'center',
                        }}
                    />
                </ListItem>
            ) : (
                <ListItem
                    button
                    component="a"
                    href="/login"
                    sx={{
                        justifyContent: 'center',
                        width: '100%', // Asegurarse que ListItem ocupa todo el ancho
                        background: 'linear-gradient(to right, #4a90e2, #50e3c2)', // Gradiente para ListItem
                        padding: '10px 0', // Ajustar el padding para los items
                        '&:hover': {
                            background: 'linear-gradient(to right, #50e3c2, #4a90e2)', // Cambiar gradiente al pasar el mouse
                        },
                        textDecoration: 'none', // Eliminar subrayado de los enlaces
                    }}
                >
                    <ListItemText
                        primary="Iniciar sesión"
                        sx={{
                            color: 'white',
                            textAlign: 'center',
                        }}
                    />
                </ListItem>
            )}
        </>
    );
};

export default AuthStatus;
