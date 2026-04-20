import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Grid,
  MenuItem,
  Avatar,
  IconButton,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useHistory, useParams } from 'react-router-dom';

import Layout from '../../../shared/components/Layout';
import { ROUTES } from '../../../constants/routes';
import { useNotification } from '../../../shared/context/NotificationContext';

function ClientMaintenancePage() {
  const history = useHistory();
  const notification = useNotification();
  const { id } = useParams();
  const isEdit = Boolean(id);

  // Form State
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    identificacion: '',
    telefonoCelular: '',
    otroTelefono: '',
    direccion: '',
    fNacimiento: '',
    fAfiliacion: '',
    sexo: '',
    resenaPersonal: '',
    imagen: '', // base64
    interesesId: '',
  });

  // Mock interests (would come from API)
  const interests = [
    { id: '1', descripcion: 'Deportes' },
    { id: '2', descripcion: 'Tecnología' },
    { id: '3', descripcion: 'Música' },
  ];

  useEffect(() => {
    if (isEdit) {
      console.log('Loading client data for ID:', id);
      // Mock loading data
      setFormData({
        nombre: 'Allen Rivel',
        apellidos: 'Villalobos',
        identificacion: '504440333',
        telefonoCelular: '88888888',
        otroTelefono: '22222222',
        direccion: 'San José, Costa Rica',
        fNacimiento: '1990-01-01',
        fAfiliacion: '2022-04-26',
        sexo: 'M',
        resenaPersonal: 'Cliente preferencial',
        imagen: '',
        interesesId: '1',
      });
    }
  }, [id, isEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imagen: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    try {
      console.log('Saving client data:', formData);
      // Logic for Create/Update API call
      notification.success('El proceso se realizó correctamente.');
      history.push(ROUTES.CLIENTS);
    } catch (err) {
      notification.error('Hubo un inconveniente con la transacción.');
    }
  };

  return (
    <Layout>
      <Paper elevation={1} sx={{ p: 4, borderRadius: 2 }}>
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={formData.imagen}
                sx={{ width: 80, height: 80, bgcolor: '#cfd8dc' }}
              >
                {!formData.imagen && <PhotoCamera />}
              </Avatar>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="icon-button-file"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  component="span"
                  sx={{
                    position: 'absolute',
                    bottom: -5,
                    right: -5,
                    bgcolor: '#fff',
                    boxShadow: 1,
                    '&:hover': { bgcolor: '#f5f5f5' }
                  }}
                  size="small"
                >
                  <PhotoCamera fontSize="small" />
                </IconButton>
              </label>
            </Box>
            <Typography variant="h5" fontWeight={700} sx={{ color: '#263238' }}>
              Mantenimiento de clientes
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{
                bgcolor: '#eceff1',
                color: '#546e7a',
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: 'none',
                '&:hover': { bgcolor: '#cfd8dc', boxShadow: 'none' },
              }}
              onClick={handleSave}
            >
              Guardar
            </Button>
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              sx={{
                bgcolor: '#eceff1',
                color: '#546e7a',
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: 'none',
                '&:hover': { bgcolor: '#cfd8dc', boxShadow: 'none' },
              }}
              onClick={() => history.push(ROUTES.CLIENTS)}
            >
              Regresar
            </Button>
          </Box>
        </Box>

        {/* Form Grid */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              required
              fullWidth
              label="Identificación"
              name="identificacion"
              value={formData.identificacion}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              fullWidth
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              fullWidth
              label="Apellidos"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              required
              fullWidth
              select
              label="Género"
              name="sexo"
              value={formData.sexo}
              onChange={handleInputChange}
            >
              <MenuItem value="F">Femenino</MenuItem>
              <MenuItem value="M">Masculino</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              fullWidth
              label="Fecha de nacimiento"
              name="fNacimiento"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.fNacimiento}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              fullWidth
              label="Fecha de afiliación"
              name="fAfiliacion"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.fAfiliacion}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              required
              fullWidth
              label="Teléfono Celular"
              name="telefonoCelular"
              value={formData.telefonoCelular}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              fullWidth
              label="Teléfono Otro"
              name="otroTelefono"
              value={formData.otroTelefono}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              fullWidth
              select
              label="Interés"
              name="interesesId"
              value={formData.interesesId}
              onChange={handleInputChange}
            >
              <MenuItem value="">Seleccione</MenuItem>
              {interests.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.descripcion}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Dirección"
              name="direccion"
              multiline
              rows={2}
              value={formData.direccion}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Reseña"
              name="resenaPersonal"
              multiline
              rows={2}
              value={formData.resenaPersonal}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
}

export default ClientMaintenancePage;
