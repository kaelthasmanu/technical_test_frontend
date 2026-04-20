import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { useNotification } from '../../../shared/context/NotificationContext';

export const useClients = () => {
  const history = useHistory();
  const notification = useNotification();

  // State for search filters
  const [filters, setFilters] = useState({ nombre: '', identificacion: '' });
  
  // State for delete modal
  const [deleteId, setDeleteId] = useState(null);
  const [clientToDelete, setClientToDelete] = useState('');

  // Mock data for visual matching based on the image
  const [clients, setClients] = useState([
    { id: '1', identificacion: '504440333', nombre: 'Allen Rivel Villalobos' },
    { id: '2', identificacion: '503330333', nombre: 'Jose Rivel Villa' },
    { id: '3', identificacion: '503330333', nombre: 'Luis Corrales Espinoza' },
    { id: '4', identificacion: '501110111', nombre: 'Test Test Test' },
    { id: '5', identificacion: '111111111', nombre: 'Virtual Virtual Virtual' },
  ]);

  const handleSearch = () => {
    try {
      console.log('Searching with filters:', filters);
      // Logic for API search would go here
    } catch (err) {
      notification.error('Hubo un inconveniente con la transacción.');
    }
  };

  const handleEdit = (id) => {
    history.push(`${ROUTES.CLIENT_MAINTENANCE}/${id}`);
  };

  const handleAdd = () => {
    history.push(ROUTES.CLIENT_MAINTENANCE);
  };

  const handleBack = () => {
    history.push(ROUTES.HOME);
  };

  const handleDeleteClick = (client) => {
    setDeleteId(client.id);
    setClientToDelete(client.nombre);
  };

  const confirmDelete = () => {
    try {
      console.log('Deleting client with ID:', deleteId);
      setClients(clients.filter(c => c.id !== deleteId));
      setDeleteId(null);
      notification.success('El proceso se realizó correctamente.');
    } catch (err) {
      notification.error('Hubo un inconveniente con la transacción.');
    }
  };

  const closeDeleteDialog = () => {
    setDeleteId(null);
    setClientToDelete('');
  };

  return {
    clients,
    filters,
    setFilters,
    deleteId,
    clientToDelete,
    handleSearch,
    handleEdit,
    handleAdd,
    handleBack,
    handleDeleteClick,
    confirmDelete,
    closeDeleteDialog,
  };
};