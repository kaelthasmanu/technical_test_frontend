import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { useNotification } from '../../../shared/context/NotificationContext';
import { useAuth } from '../../auth/hooks/useAuth';
import { getClientById, createClient, updateClient, getInterests } from '../services/clientsService';

export const useClientMaintenance = () => {
  const history = useHistory();
  const notification = useNotification();
  const { userId } = useAuth();
  const { id } = useParams();
  const isEdit = Boolean(id);

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
    imagen: '',
    interesesId: '',
  });

  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load interests dropdown on mount
  useEffect(() => {
    getInterests()
      .then(setInterests)
      .catch(() => {});
  }, []);

  // Load client data when editing
  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    getClientById(id)
      .then((data) => {
        setFormData({
          nombre: data.nombre || '',
          apellidos: data.apellidos || '',
          identificacion: data.identificacion || '',
          telefonoCelular: data.telefonoCelular || '',
          otroTelefono: data.otroTelefono || '',
          direccion: data.direccion || '',
          fNacimiento: data.fNacimiento ? data.fNacimiento.split('T')[0] : '',
          fAfiliacion: data.fAfiliacion ? data.fAfiliacion.split('T')[0] : '',
          sexo: data.sexo || '',
          resenaPersonal: data.resenaPersonal || '',
          imagen: data.imagen || '',
          interesesId: data.interesesId || '',
        });
      })
      .catch(() => notification.error('Error al cargar los datos del cliente.'))
      .finally(() => setLoading(false));
  }, [id, isEdit]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, imagen: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      // Map form fields to API payload (field names differ between GET and CREATE/UPDATE)
      const payload = {
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        identificacion: formData.identificacion,
        celular: formData.telefonoCelular,
        otroTelefono: formData.otroTelefono,
        direccion: formData.direccion,
        fNacimiento: formData.fNacimiento ? new Date(formData.fNacimiento).toISOString() : null,
        fAfiliacion: formData.fAfiliacion ? new Date(formData.fAfiliacion).toISOString() : null,
        sexo: formData.sexo,
        resennaPersonal: formData.resenaPersonal,
        imagen: formData.imagen,
        interesFK: formData.interesesId,
        usuarioId: userId,
      };

      if (isEdit) {
        await updateClient({ id, ...payload });
      } else {
        await createClient(payload);
      }

      notification.success('El proceso se realizó correctamente.');
      history.push(ROUTES.CLIENTS);
    } catch (err) {
      notification.error('Hubo un inconveniente con la transacción.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    history.push(ROUTES.CLIENTS);
  };

  return {
    formData,
    isEdit,
    interests,
    loading,
    handleInputChange,
    handleImageChange,
    handleSave,
    handleBack,
  };
};