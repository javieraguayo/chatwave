// src/api/authService.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } from 'firebase/auth';
import { app } from '../firebase/firebaseConfig'; // Asegúrate de que tu configuración de Firebase esté correcta

const auth = getAuth(app);
// Registro de usuario
export const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Enviar correo de verificación
        await sendEmailVerification(user);

        // Retorna un mensaje de éxito si se ha enviado el correo de verificación
        return { message: 'Registro exitoso. Por favor, verifica tu correo electrónico.' };
    } catch (error) {
        // Captura y retorna el mensaje de error de Firebase
        return { message: error.message || 'Error al registrarse. Inténtalo de nuevo.' };
    }
};

// Iniciar sesión
export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Verificar si el correo está verificado
        if (user.emailVerified) {
            // Si el usuario está verificado
            return { verified: true, user };
        } else {
            // Si el usuario no está verificado
            return { verified: false };
        }

        return user;
    } catch (error) {
        throw error;
    }
};
// Función para cerrar sesión
export const logout = async () => {
    try {
        // Llama al método signOut de Firebase para cerrar la sesión
        await signOut(auth);

        // Opcional: Limpiar el almacenamiento local si se guarda información del usuario
        localStorage.removeItem('user');
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
};

// Verificación de sesión (devuelve el usuario actual)
export const getCurrentUser = () => {
    return auth.currentUser;
};
