// src/contexts/AuthProvider.js
import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase/firebaseConfig';

// Obtén la instancia de auth desde Firebase
const auth = getAuth(app);
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Añadir estado de carga

    useEffect(() => {
        // Suscribirse a los cambios en el estado de autenticación
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Verificar si el correo está verificado
                if (user.emailVerified) {
                    setUser(user);
                    // Opcional: Guardar usuario en localStorage si es necesario
                    localStorage.setItem('user', JSON.stringify(user));
                } else {
                    setUser(null); // No mostrar usuario si el correo no está verificado
                }
            } else {
                setUser(null);
                localStorage.removeItem('user');
            }
            setLoading(false); // Terminar el estado de carga
        });

        // Limpiar la suscripción en caso de que el componente se desmonte
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
