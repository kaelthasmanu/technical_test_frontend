import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { useNotification } from '../../../shared/context/NotificationContext';
import { useAuth } from '../../auth/hooks/useAuth';
import * as clientsService from '../services/clientsService';

export const useClients = () => {
  const history = useHistory();
  const notification = useNotification();
  const { userId } = useAuth();

  // State for search filters
  const [filters, setFilters] = useState({ nombre: '', identificacion: '' });
  
  // State for delete modal
  const [deleteId, setDeleteId] = useState(null);
  const [clientToDelete, setClientToDelete] = useState('');

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await clientsService.getClients({
        ...filters,
        usuarioId: userId
      });
      setClients(results);
    } catch (err) {
      notification.error('Hubo un inconveniente con la transacción.');
    } finally {
      setLoading(false);
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

  const confirmDelete = async () => {
    try {
      await clientsService.deleteClient(deleteId);
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
    loading,
    handleSearch,
    handleEdit,
    handleAdd,
    handleBack,
    handleDeleteClick,
    confirmDelete,
    closeDeleteDialog,
  };
};