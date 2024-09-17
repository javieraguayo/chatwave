import React from 'react';
import { Link } from 'react-router-dom';
import { FaComments, FaUserFriends, FaLock, FaCommentDots } from 'react-icons/fa'; // Importa el nuevo ícono
import './HomePage.css'; // Asegúrate de crear un archivo CSS para estilos

const HomePage = () => {
    return (
        <div className="home-container">
            <h1>Bienvenido a ChatWave, la Aplicación de Chat en Tiempo Real</h1>
            <p>Conéctate y chatea con amigos y familiares al instante.</p>
            
            <div className="features">
                <div className="feature-card">
                    <FaComments className="icon" />
                    <h2>Chat en Tiempo Real</h2>
                    <p>Envía y recibe mensajes instantáneamente.</p>
                </div>
                <div className="feature-card">
                    <FaUserFriends className="icon" />
                    <h2>Conéctate con Amigos</h2>
                    <p>Agrega amigos y comienza a chatear.</p>
                </div>
                <div className="feature-card">
                    <FaLock className="icon" />
                    <h2>Seguridad y Privacidad</h2>
                    <p>Tu información está protegida y segura.</p>
                </div>
            </div>

            <Link to="/login">
                <button className="login-button">
                    Comenzar a Chatear
                    <FaCommentDots className="button-icon" />
                </button>
            </Link>
        </div>
    );
};

export default HomePage;
