import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import api from '../../../shared/api/axiosInstance';
import { ENDPOINTS } from '../../../shared/api/endpoints';
import { useAuth } from './useAuth';
import { loginSchema } from '../schemas/authSchemas';

export function useLoginForm() {
  const history = useHistory();
  const { login, isAuthenticated } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    },
    mode: 'onBlur'
  });

  const { setValue } = form;

  useEffect(() => {
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedUsername) {
      setValue('username', savedUsername, { shouldValidate: true });
      setRememberMe(true);
    }
  }, [setValue]);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/home');
    }
  }, [history, isAuthenticated]);

  const onSubmit = async (data) => {
    setError('');
    setLoading(true);

    try {
      if (rememberMe) {
        localStorage.setItem('savedUsername', data.username);
      } else {
        localStorage.removeItem('savedUsername');
      }

      const response = await api.post(ENDPOINTS.LOGIN, data);
      const { token, userid, username, expiration } = response.data;

      login({ token, userid, username, expiration });
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
      setLoading(false);
    }
  };

  return {
    ...form,
    error,
    loading,
    onSubmit,
    rememberMe,
    setRememberMe
  };
}

export default useLoginForm;
