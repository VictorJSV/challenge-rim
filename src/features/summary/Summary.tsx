import React from 'react';
import { useAppSelector } from '../../storeHooks';
import { useLocation, Navigate } from 'react-router-dom';
import Button from '@src/shared/components/Button/Button';
import Card from '@src/shared/components/Card/Card';
import { HeaderStep } from '@src/shared/components/HeaderStep/HeaderStep';
import Container from '@src/shared/components/Container/Container';
import IconBack from '@src/assets/svgs/icon-back.svg?react';
import IconFamily from '@src/assets/svgs/icon-family.svg?react';
import './Summary.scss';

const Summary: React.FC = () => {
  const { state } = useLocation();
  const user = useAppSelector((s) => s.user);

  if (!state || !user.name) {
    return (
      <Container>
        <div className="text-md text-center mt-4">
          Redirigiendo... <Navigate to="/" replace />
        </div>
      </Container>
    );
  }

  return (
    <div className="c-summary">
      <div className="c-summary__header">
        <HeaderStep numberSelected={2} />
      </div>
      <Container>
        <div className="c-summary__body">
          <div className="c-summary__back">
            <Button variant="text" onClick={() => window.history.back()}>
              <IconBack />
              Volver
            </Button>
          </div>
          <h1 className="c-summary__title">
            Resumen del Seguro
          </h1>
          <Card>
            <p className="c-summary__price-label"> Precios calculados para: </p>
            <div className="c-summary__person-container">
              <IconFamily aria-hidden="true" />
              <p className="c-summary__person-name">
                {`${user.name} ${user.lastName}`}
              </p>
            </div>
            <hr className="c-summary__divider" />

            <h2 className="c-summary__responsable-title" id="summaryResponsable">
              Responsable de pago
            </h2>
            <ul
              className="c-summary__responsable-list"
              aria-labelledby="summaryResponsable"
            >
              <li>DNI: {user.docNumber ?? '-'}</li>
              <li>Celular: {user.cell ?? '-'}</li>
            </ul>

            <h2 className="c-summary__plan-title" id="summaryPlan">
              Plan elegido
            </h2>
            <ul className="c-summary__plan-list" aria-labelledby="summaryPlan">
              <li>{state?.plan.name}</li>
              <li>Costo del plan: ${state?.plan.price} al mes</li>
            </ul>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Summary;
