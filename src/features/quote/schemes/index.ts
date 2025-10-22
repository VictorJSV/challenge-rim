import * as yup from 'yup';

export type FormValues = {
  docType: 'DNI' | 'CE';
  docNumber: string;
  cell: string;
  acceptPrivacy: boolean;
  acceptCom: boolean;
};

export const schema: yup.ObjectSchema<FormValues> = yup.object({
  docType: yup.string<'DNI' | 'CE'>().oneOf(['DNI', 'CE']).required(),
  docNumber: yup
    .string()
    .when('docType', {
      is: (value: string) => value === 'DNI',
      then: (schema) =>
        schema
          .required('El DNI es requerido')
          .matches(/^[0-9]{8}$/, 'El DNI debe tener 8 dígitos'),
      otherwise: (schema) =>
        schema
          .required('El número de documento es requerido')
          .matches(/^[0-9]{6,20}$/, 'El número de documento debe tener entre 6 y 20 dígitos'),
    })
    .defined(),
  cell: yup
    .string()
    .required('El celular es requerido')
    .matches(/^[0-9]{9}$/, 'El celular debe tener 9 dígitos'),
  acceptPrivacy: yup.boolean().oneOf([true], 'El campo es requerido').required(),
  acceptCom: yup.boolean().oneOf([true], 'El campo es requerido').required(),
});
