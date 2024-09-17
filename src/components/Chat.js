import React, { useState, useEffect, useRef } from 'react';
import { firestore } from '../firebase/firebaseConfig';
import { collection, addDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { TextField, IconButton, Box, Typography, Avatar } from '@mui/material';
import { deepOrange, lightBlue } from '@mui/material/colors';
import SendIcon from '@mui/icons-material/Send';
import { getAuth } from 'firebase/auth';

const messagesRef = collection(firestore, 'messages');

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [user, setUser] = useState(null);
    const messagesEndRef = useRef(null); // Ref para el final del contenedor de mensajes

    useEffect(() => {
        // Obtener el usuario autenticado
        const auth = getAuth();
        const currentUser = auth.currentUser;
        setUser(currentUser);

        // Consulta de mensajes ordenados por timestamp
        const qMessages = query(messagesRef, orderBy('timestamp'));
        const unsubscribeMessages = onSnapshot(qMessages, snapshot => {
            const messagesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(messagesData);
        }, error => {
            console.error('Error al obtener mensajes:', error);
        });

        // Limpiar suscripciones al desmontar el componente
        return () => {
            unsubscribeMessages();
        };
    }, []);

    useEffect(() => {
        // Scroll hacia el final cuando se reciben nuevos mensajes
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (newMessage.trim() && user) {
            try {
                await addDoc(messagesRef, {
                    text: newMessage,
                    user: user.email || 'Anónimo',
                    timestamp: new Date()
                });
                setNewMessage(''); // Limpiar el campo de mensaje
            } catch (error) {
                console.error('Error al enviar mensaje:', error);
            }
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '87vh',
                background: 'linear-gradient(to bottom, #e0f7fa, #80deea)',
                padding: 2,
                overflow: 'hidden', // Evita el scroll adicional en el contenedor principal
            }}
        >
            <Typography variant="h3" sx={{ mb: 2, textAlign: 'center' }}>Chat</Typography>
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto', // Permite el scroll dentro de este contenedor
                    marginBottom: 2,
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        overflowY: 'auto', // Permite el scroll dentro de este contenedor
                        paddingBottom: 2, // Asegura que el contenido no esté oculto debajo del campo de entrada
                    }}
                >
                    {messages.map(msg => (
                        <Box
                            key={msg.id}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: 2,
                                padding: 2,
                                backgroundColor: msg.user === (user ? user.email : 'Anónimo') ? lightBlue[100] : '#fff',
                                borderRadius: 2,
                                boxShadow: 1,
                            }}
                        >
                            <Avatar sx={{ bgcolor: deepOrange[500], marginRight: 2 }}>
                                {msg.user[0].toUpperCase()}
                            </Avatar>
                            <Box>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{msg.user}:</Typography>
                                <Typography variant="body1">{msg.text}</Typography>
                            </Box>
                        </Box>
                    ))}
                    <div ref={messagesEndRef} /> {/* Elemento para scroll automático */}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, paddingTop: 2 }}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        sx={{
                            borderRadius: 20,
                            backgroundColor: '#fff',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 20,
                                '& fieldset': {
                                    borderColor: '#ddd',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#aaa',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#66bb6a',
                                }
                            },
                        }}
                    />
                    <IconButton
                        variant="contained"
                        color="primary"
                        onClick={handleSend}
                        sx={{
                            backgroundColor: '#4caf50',
                            color: '#fff',
                            borderRadius: 20,
                            boxShadow: 3,
                            '&:hover': {
                                backgroundColor: '#388e3c',
                                boxShadow: 6,
                            },
                        }}
                    >
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default Chat;
