import React from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Checkbox,
  FormControlLabel,
  Box,
  Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useLoginForm } from '../hooks/useLoginForm';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    error,
    loading,
    rememberMe,
    setRememberMe,
    formState: { errors, isValid }
  } = useLoginForm();

  return (
    <Container maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper sx={{ p: 4, width: '100%', borderRadius: 1 }}>
        <Typography variant="h5" align="center" gutterBottom fontWeight="medium">
          Iniciar Sesión
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            label="Usuario *"
            variant="outlined"
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
            disabled={loading}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Contraseña *"
            variant="outlined"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={loading}
            sx={{ mb: 1 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label="Recuérdame"
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading || !isValid}
            sx={{
              py: 1.2,
              textTransform: 'none',
              fontWeight: 600,
              bgcolor: '#1F86AD',
              mb: 2
            }}
          >
            {loading ? 'Iniciando...' : 'INICIAR SESIÓN'}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              ¿No tiene una cuenta?{' '}
              <Link component={RouterLink} to="/registro" underline="hover">
                Regístrese
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
