import React from 'react';
import { useAppSelector } from '../../storeHooks';
import { useLocation } from 'react-router-dom';
import Steps from '@src/shared/components/Steps/Steps';
import Button from '@src/shared/components/Button/Button';
import Card from '@src/shared/components/Card/Card';

const QuoteSummary: React.FC = () => {
  const { state } = useLocation(); // o useNavigation?
  const user = useAppSelector((s) => s.user);

  return (
    <div>
      <Steps id="planSelection">
        <Steps.Item title="Planes y coberturas" />
        <Steps.Item title="Resumen" isSelected />
      </Steps>
      <Button
        variant="text"
        onClick={() => {
          window.history.back();
        }}
      >
        ← Volver
      </Button>
      <h1> Resumen del Seguro</h1>
      <Card>
        <p> Precios calculados para: </p>
        <p>
          {user.name} {user.lastName}
        </p>

        <h2>Responsable del pago</h2>
        <div>DNI: {user.docNumber ?? '-'}</div>
        <div>Celular: {user.cell ?? '-'}</div>

        <h2> Plan elegido </h2>
        <p> {state.plan.name} </p>
        <p> Costo del plan: ${state.plan.price} al mes </p>
      </Card>
    </div>
  );
};

export default QuoteSummary;
