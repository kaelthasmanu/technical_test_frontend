import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { useNotification } from '../../../shared/context/NotificationContext';

export const useClientMaintenance = () => {
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imagen: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    try {
      console.log('Saving client data:', formData);
      // Logic for Create/Update API call
      notification.success('El proceso se realizó correctamente.');
      history.push(ROUTES.CLIENTS);
    } catch (err) {
      notification.error('Hubo un inconveniente con la transacción.');
    }
  };

  const handleBack = () => {
    history.push(ROUTES.CLIENTS);
  };

  return {
    formData,
    isEdit,
    interests,
    handleInputChange,
    handleImageChange,
    handleSave,
    handleBack,
  };
};