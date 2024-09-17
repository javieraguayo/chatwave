import { useState } from 'react';
import { signUp } from '../api/authService'; // Si no estás usando authService, asegúrate de ajustar el import
import { TextField, Button, Container, Typography, Snackbar, Box, Grid, Paper, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }
    try {
      const response = await signUp(email, password);
      console.log('Respuesta de signUp:', response);
      if (response.message) {
        setMessage(response.message);
        setOpenSnackbar(true);
        setError(''); // Limpiar errores en caso de éxito
        setEmail(''); // Limpia el campo de email
        setPassword(''); // Limpia el campo de contraseña
      } else {
        setError('Error al registrarse. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error en handleSubmit:', error);
      setError(error.message || 'Error al registrarse. Inténtalo de nuevo.');
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
          backgroundColor: '#f5f5f5',
          borderRadius: '30px'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Crea tu Cuenta
        </Typography>
        {error && (
          <Typography color="error" variant="body2" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
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
                Registrarse
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

export default SignUp;
