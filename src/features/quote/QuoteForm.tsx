import { useNavigate } from 'react-router-dom';
import { useQuoteMutation } from '../../services/api';
import './quote.scss';
import { useForm } from 'react-hook-form';
import { setUserData } from './userSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '@src/storeHooks';
import Input from '@src/shared/components/Input/Input';
import ErrorMessage from '@src/shared/components/ErrorMessage/ErrorMessage';
import Select from '@src/shared/components/Select/Select';
import Checkbox from '@src/shared/components/Checkbox/Checkbox';
import Tag from '@src/shared/components/Tag/Tag';
import Button from '@src/shared/components/Button/Button';
import familyImg from '@src/assets/images/family.png';
import Container from '@src/shared/components/Container/Container';

type FormValues = {
  docType: 'DNI' | 'CE';
  docNumber: string;
  cell: string;
  acceptPrivacy: boolean;
  acceptCom: boolean;
};

const schema: yup.ObjectSchema<FormValues> = yup.object({
  docType: yup.string<'DNI' | 'CE'>().oneOf(['DNI', 'CE']).required(),
  docNumber: yup
    .string()
    .when('docType', {
      is: (value: string) => value === 'DNI',
      then: (schema) =>
        schema.required('El DNI es requerido').matches(/^[0-9]{8}$/, 'El DNI debe tener 8 dígitos'),
      otherwise: (schema) => schema.required('El número de documento es requerido'),
    })
    .defined(),
  cell: yup
    .string()
    .required('El celular es requerido')
    .matches(/^[0-9]{9}$/, 'El celular debe tener 9 dígitos'),
  acceptPrivacy: yup.boolean().oneOf([true], 'Debes aceptar la política de privacidad').required(),
  acceptCom: yup.boolean().oneOf([true], 'Debes aceptar Comercial').required(),
});

const QuoteForm: React.FC = () => {
  const navigate = useNavigate();
  const [submitQuote, { isLoading }] = useQuoteMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      docType: 'DNI',
      docNumber: '',
      cell: '',
      acceptPrivacy: false,
      acceptCom: false,
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await submitQuote({
        docType: data.docType,
        docNumber: data.docNumber,
        cell: data.cell,
      }).unwrap();

      dispatch(
        setUserData({
          docNumber: data.docNumber,
          cell: data.cell,
          name: res.name,
          lastName: res.lastName,
          birthDay: res.birthDay,
        })
      );
      navigate('/planes');
    } catch (err) {
      console.error('Error submitting quote', err);
      alert('Error al cotizar');
    }
  };
  /* max-w-[352px] */
  return (
    <Container>
      <div className="c-quote">
        <div className=''>
          <img className='inline' src={familyImg} alt="Familia de 3 miembros" width={480} height={560} />
        </div>
        <div className=''>
          <Tag type="accent">Seguro Salud Flexible</Tag>
          <h1 className="c-quote__title">Creado para ti y tu familia</h1>
          <p className='text-sm font-semibold pb-6'>
            Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría, 100%
            online.
          </p>
        </div>
        <div className=''>
          <form className="c-quote__form" onSubmit={handleSubmit(onSubmit)}>
            <div className="c-quote__row">
              <div className="flex">
                <div>
                  <Select
                    id="docType"
                    options={[
                      { label: 'DNI', value: 'DNI' },
                      { label: 'CE', value: 'CE' },
                    ]}
                    alignToRight
                    variant="outlined"
                    {...register('docType')}
                  />
                </div>
                <div className="ml-[-1px] grow">
                  <Input
                    id="docNumber"
                    label="Nro. de documento"
                    isError={!!errors.docNumber}
                    variant="outlined"
                    alignToLeft
                    aria-describedby={errors.docNumber && 'docNumberError'}
                    {...register('docNumber')}
                  />
                </div>
              </div>
              {errors.docNumber && (
                <ErrorMessage id="docNumberError">{errors.docNumber.message}</ErrorMessage>
              )}
            </div>

            <div className="c-quote__row">
              <Input
                id="cellphone"
                label="Celular"
                isError={!!errors.cell}
                variant="outlined"
                aria-describedby={errors.cell && 'cellError'}
                {...register('cell')}
              />
              {errors.cell && <ErrorMessage id="cellError">{errors.cell.message}</ErrorMessage>}
            </div>

            <div className="c-quote__row">
              <Checkbox
                id="acceptPrivacy"
                label="Acepto politica de privacidad"
                isError={!!errors.acceptPrivacy}
                variant="outlined"
                aria-describedby="acceptPrivacyError"
                {...register('acceptPrivacy')}
              />
              {errors.acceptPrivacy && (
                <ErrorMessage id="acceptPrivacyError">{errors.acceptPrivacy.message}</ErrorMessage>
              )}
            </div>

            <div className="c-quote__row">
              <Checkbox
                id="acceptCom"
                label="Acepto Comercial"
                isError={!!errors.acceptCom}
                variant="outlined"
                aria-describedby="acceptComError"
                {...register('acceptCom')}
              />
              {errors.acceptCom && (
                <ErrorMessage id="acceptComError">{errors.acceptCom.message}</ErrorMessage>
              )}
            </div>

            <div className="c-quote__row">
              <Button type="submit" variant="fill-primary" disabled={isLoading}>
                {isLoading ? 'Enviando...' : 'Cotiza Aquí'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default QuoteForm;
