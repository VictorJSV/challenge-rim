import React, { useState } from 'react';
import './Plans.scss';
import { useAppSelector } from '@src/storeHooks';
import Button from '@src/shared/components/Button/Button';
import Card from '@src/shared/components/Card/Card';
import Container from '@src/shared/components/Container/Container';
import IcProtectionLight from '@src/assets/svgs/IcProtectionLight.svg?react';
import IcAddUserLight from '@src/assets/svgs/IcAddUserLight.svg?react';

import IconBack from '@src/assets/svgs/icon-back.svg?react';
import { PlanList } from './components/PlansList/PlansList';
import { useGetPlansQuery } from '@src/services/api';
import { HeaderStep } from '@src/shared/components/HeaderStep/HeaderStep';
import { Navigate } from 'react-router-dom';

const Plans: React.FC = () => {
  const user = useAppSelector((s) => s.user);
  const [planType, setPlanType] = useState<'self' | 'other'>();
  const { data, isLoading, isError } = useGetPlansQuery();

  if (!user.name) {
    return (
      <Container>
        <div className="text-2.5xl text-center mt-4">
          Redirigiendo... <Navigate to="/" replace />
        </div>
      </Container>
    );
  }

  return (
    <>
      <HeaderStep numberSelected={1} />
      <Container>
        <div className="c-plans">
          <div className="c-plans__back-container">
            <Button variant="text" onClick={() => window.history.back()}>
              <IconBack />
              Volver
            </Button>
          </div>
          <div className="c-plans__container">
            <h1 className="c-plans__title">{user.name} ¿Para quién deseas cotizar?</h1>
            <p className="c-plans__description">
              Selecciona la opción que se ajuste más a tus necesidades.
            </p>
            <ul className="c-plans__selector" aria-label="Selector de tipo de plan">
              <li>
                <Card
                  type="button"
                  isActive={planType === 'self'}
                  onClick={() => setPlanType('self')}
                >
                  <div className="c-plans__item">
                    <IcProtectionLight className="c-plans__item-icon" />
                    <h2 className="c-plans__item-text">Para mi</h2>
                  </div>
                  <p className="c-plans__item-description">
                    Cotiza tu seguro de salud y agrega familiares si así lo deseas.
                  </p>
                </Card>
              </li>
              <li>
                <Card
                  type="button"
                  isActive={planType === 'other'}
                  onClick={() => setPlanType('other')}
                >
                  <div className="c-plans__item">
                    <IcAddUserLight className="c-plans__item-icon" />
                    <h2 className="c-plans__item-text">Para alguien más</h2>
                  </div>
                  <p className="c-plans__item-description">
                    Realiza una cotización para uno de tus familiares o cualquier persona.
                  </p>
                </Card>
              </li>
            </ul>
          </div>
          {planType && (
            <PlanList planType={planType} data={data} isLoading={isLoading} isError={isError} />
          )}
        </div>
      </Container>
    </>
  );
};

export default Plans;
