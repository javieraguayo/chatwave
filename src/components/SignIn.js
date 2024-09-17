import { useState } from 'react';
import { signIn } from '../api/authService';
import { TextField, Button, Container, Typography, Snackbar, Box, Paper, Grid, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }
    try {
      const response = await signIn(email, password);
      if (response.verified) {
        setMessage('¡Bienvenido!');
        setOpenSnackbar(true);
        setError('');
        navigate('/');
      } else {
        setMessage('Tu cuenta no está verificada. Por favor, revisa tu correo para verificar tu cuenta.');
        setOpenSnackbar(true);
      }
    } catch (error) {
      setMessage(error.message || 'Error al iniciar sesión. Verifica tus credenciales.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '91.2vh',
        background: 'linear-gradient(to right, #4a90e2, #50e3c2)',
      }}
    >
      <Container
        component={Paper}
        elevation={4}
        maxWidth="xs"
        sx={{
          padding: 4,
          borderRadius: 2,
          boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
          borderRadius: '30px',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Acceder a tu Cuenta
        </Typography>
        {error && (
          <Typography color="error" variant="body2" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSignIn}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contraseña"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      edge="end"
                      onClick={togglePasswordVisibility}
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ padding: '12px', fontSize: '16px', borderRadius: '30px' }}
              >
                Iniciar Sesión
              </Button>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={openSnackbar}
          onClose={handleCloseSnackbar}
          message={message}
          autoHideDuration={3000}
        />
      </Container>
    </Box>
  );
};

export default SignIn;
