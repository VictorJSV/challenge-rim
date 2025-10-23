import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormValues, schema } from '../../schemes';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuoteMutation } from '@src/services/api';
import { useAppDispatch } from '@src/storeHooks';
import { setUserData } from '../../../../shared/slices/userSlice';
import './QuoteForm.scss';
import Select from '@src/shared/components/Select/Select';
import Input from '@src/shared/components/Input/Input';
import ErrorMessage from '@src/shared/components/ErrorMessage/ErrorMessage';
import Checkbox from '@src/shared/components/Checkbox/Checkbox';
import Button from '@src/shared/components/Button/Button';
import { useEffect } from 'react';

export const QuoteForm: React.FC = () => {
  const navigate = useNavigate();
  const [submitQuote, { isLoading }] = useQuoteMutation();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    reset,
    getValues
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
  const docTypeValue = watch("docType");

  useEffect(() => {
    if (isDirty) {
      reset({ docType: docTypeValue, docNumber: '', cell: '', acceptPrivacy: false, acceptCom: false });
    }
  }, [docTypeValue]);

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

  return (
    <form className="c-quote-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="c-quote-form__inner">
        <div className="c-quote-form__row">
          <div className="c-quote-form__field-group">
            <Select
              id="docType"
              options={[
                { label: 'DNI', value: 'DNI' },
                { label: 'CE', value: 'CE' },
              ]}
              alignToRight
              variant="outlined"
              aria-label="Documento de identidad"
              {...register('docType')}
            />
            <Input
              id="docNumber"
              label="Nro. de documento"
              isError={!!errors.docNumber}
              variant="outlined"
              alignToLeft
              maxLength={docTypeValue === 'DNI' ? 8 : 20}
              aria-describedby={errors.docNumber && 'docNumberError'}
              {...register('docNumber')}
            />
          </div>
          {errors.docNumber && (
            <ErrorMessage id="docNumberError">{errors.docNumber.message}</ErrorMessage>
          )}
        </div>
        <div className="c-quote-form__row">
          <Input
            id="cellphone"
            label="Celular"
            isError={!!errors.cell}
            variant="outlined"
            maxLength={9}
            aria-describedby={errors.cell && 'cellError'}
            {...register('cell')}
          />
          {errors.cell && <ErrorMessage id="cellError">{errors.cell.message}</ErrorMessage>}
        </div>
      </div>
      <div className="c-quote-form__row-politics">
        <div className="c-quote-form__row">
          <Checkbox
            id="acceptPrivacy"
            label="Acepto política de privacidad"
            isError={!!errors.acceptPrivacy}
            variant="outlined"
            aria-describedby="acceptPrivacyError"
            {...register('acceptPrivacy')}
          />
          {errors.acceptPrivacy && (
            <ErrorMessage id="acceptPrivacyError">{errors.acceptPrivacy.message}</ErrorMessage>
          )}
        </div>
        <div className="c-quote-form__row">
          <Checkbox
            id="acceptCom"
            label="Acepto la Política Comunicaciones Comerciales"
            isError={!!errors.acceptCom}
            variant="outlined"
            aria-describedby="acceptComError"
            {...register('acceptCom')}
          />
          {errors.acceptCom && (
            <ErrorMessage id="acceptComError">{errors.acceptCom.message}</ErrorMessage>
          )}
        </div>
        <div className="c-quote-form__row">
          <a href="/" className="c-quote-form__link" target="_blank">
            Aplican Términos y Condiciones.
          </a>
        </div>
      </div>
      <div className="c-quote-form__row">
        <Button type="submit" variant="fill-primary" disabled={isLoading} size="xl">
          {isLoading ? 'Enviando...' : 'Cotiza Aquí'}
        </Button>
      </div>
    </form>
  );
};
