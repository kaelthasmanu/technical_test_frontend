import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from 'react-router-dom';

import Layout from '../../../shared/components/Layout';
import { ROUTES } from '../../../constants/routes';

function ClientsPage() {
  const history = useHistory();

  // Mock data for visual matching based on the image
  const clients = [
    { id: '1', identificacion: '504440333', nombre: 'Allen Rivel Villalobos' },
    { id: '2', identificacion: '503330333', nombre: 'Jose Rivel Villa' },
    { id: '3', identificacion: '503330333', nombre: 'Luis Corrales Espinoza' },
    { id: '4', identificacion: '501110111', nombre: 'Test Test Test' },
    { id: '5', identificacion: '111111111', nombre: 'Virtual Virtual Virtual' },
  ];

  return (
    <Layout>
      <Paper elevation={1} sx={{ p: 0, borderRadius: 2, overflow: 'hidden' }}>
        {/* Header Section */}
        <Box
          sx={{
            p: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" fontWeight={700} sx={{ color: '#263238' }}>
            Consulta de clientes
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                bgcolor: '#eceff1',
                color: '#546e7a',
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: 'none',
                '&:hover': { bgcolor: '#cfd8dc', boxShadow: 'none' },
              }}
              onClick={() => history.push(ROUTES.CLIENT_MAINTENANCE)}
            >
              Agregar
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
              onClick={() => history.push(ROUTES.HOME)}
            >
              Regresar
            </Button>
          </Box>
        </Box>

        <Box sx={{ px: 3, pb: 4 }}>
          {/* Search Section */}
          <Box
            sx={{
              p: 3,
              mb: 3,
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <TextField
              label="Nombre"
              variant="outlined"
              size="small"
              sx={{ flexGrow: 1 }}
            />
            <TextField
              label="Identificación"
              variant="outlined"
              size="small"
              sx={{ flexGrow: 1 }}
            />
            <IconButton
              sx={{
                border: '1px solid #b0bec5',
                borderRadius: '50%',
                p: 1,
              }}
            >
              <SearchIcon sx={{ color: '#546e7a' }} />
            </IconButton>
          </Box>

          {/* Table Section */}
          <TableContainer component={Box} sx={{ border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#2979ff' }}>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, py: 1.5 }}>Identificación</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, py: 1.5 }}>Nombre completo</TableCell>
                  <TableCell align="right" sx={{ color: '#fff', fontWeight: 700, py: 1.5, pr: 4 }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell sx={{ color: '#78909c', py: 2 }}>{client.identificacion}</TableCell>
                    <TableCell sx={{ color: '#78909c', py: 2 }}>{client.nombre}</TableCell>
                    <TableCell align="right" sx={{ py: 1, pr: 2 }}>
                      <IconButton size="small" sx={{ mr: 1 }}>
                        <EditIcon sx={{ fontSize: 20, color: '#546e7a' }} />
                      </IconButton>
                      <IconButton size="small">
                        <DeleteIcon sx={{ fontSize: 20, color: '#546e7a' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Layout>
  );
}

export default ClientsPage;
