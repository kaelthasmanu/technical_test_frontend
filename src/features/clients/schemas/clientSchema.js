import { z } from 'zod';

export const clientSchema = z.object({
  nombre: z.string()
    .min(1, 'El nombre es obligatorio')
    .max(50, 'Máximo 50 caracteres'),
  apellidos: z.string()
    .min(1, 'Los apellidos son obligatorios')
    .max(100, 'Máximo 100 caracteres'),
  identificacion: z.string()
    .min(1, 'La identificación es obligatoria')
    .max(20, 'Máximo 20 caracteres'),
  celular: z.string()
    .min(1, 'El teléfono celular es obligatorio')
    .max(20, 'Máximo 20 caracteres'),
  otroTelefono: z.string()
    .min(1, 'El otro teléfono es obligatorio')
    .max(20, 'Máximo 20 caracteres'),
  direccion: z.string()
    .min(1, 'La dirección es obligatoria')
    .max(200, 'Máximo 200 caracteres'),
  fNacimiento: z.string()
    .min(1, 'La fecha de nacimiento es obligatoria')
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      return selectedDate <= today;
    }, 'La fecha de nacimiento no puede ser futura')
    .refine((date) => {
      const selectedDate = new Date(date);
      const minDate = new Date('1900-01-01');
      return selectedDate >= minDate;
    }, 'Fecha de nacimiento no válida'),
  fAfiliacion: z.string()
    .min(1, 'La fecha de afiliación es obligatoria')
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      return selectedDate <= today;
    }, 'La fecha de afiliación no puede ser futura'),
}).refine((data) => {
  const birthDate = new Date(data.fNacimiento);
  const hireDate = new Date(data.fAfiliacion);
  return hireDate >= birthDate;
}, {
  message: "La fecha de afiliación no puede ser anterior a la de nacimiento",
  path: ["fAfiliacion"],
});

