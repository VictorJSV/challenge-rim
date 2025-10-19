import React, { useState } from 'react';
import './plans.scss';
import { useGetPlansQuery } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@src/storeHooks';
import { selectUserAge } from './plans.selectors';
import { useSelector } from 'react-redux';
import Button from '@src/shared/components/Button/Button';
import Card from '@src/shared/components/Card/Card';
import Steps from '@src/shared/components/Steps/Steps';

const PlanSelector: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.user);
  const userAge = useSelector(selectUserAge);
  const [planType, setPlanType] = useState<'self' | 'other'>();

  const { data, isLoading, isError } = useGetPlansQuery();
  const list = data ? data.list.filter((plan) => userAge && plan.age >= userAge) : [];

  return (
    <>
      <Steps id="plan-selection-steps">
        <Steps.Item title="Planes y coberturas" isSelected />
        <Steps.Item title="Resumen" />
      </Steps>
      <div className="plans__container">
        <Button
          variant="text"
          onClick={() => {
            window.history.back();
          }}
        >
          ← Volver
        </Button>
        <h1 className="plans__title">{user.name} ¿Para quién deseas cotizar?</h1>
        <p>Selecciona la opción que se ajuste más a tus necesidades</p>

        <div className="plans__selector">
          <Card
            type="button"
            isActive={planType === 'self'}
            onClick={() => {
              setPlanType('self');
            }}
          >
            <span>icon</span>
            <p>Para mi</p>
            <p>Cotiza tu seguro de salud y agrega familiares si así lo deseas.</p>
          </Card>
          <Card
            type="button"
            isActive={planType === 'other'}
            onClick={() => {
              setPlanType('other');
            }}
          >
            <span>icon</span>
            <p>Para alguien más</p>
            <p>Realiza una cotización para uno de tus familiares o cualquier persona.</p>
          </Card>
        </div>

        {planType && (
          <div className="plans__list">
            {isLoading && <div>Cargando planes...</div>}
            {isError && <div>Error cargando planes</div>}
            {!isLoading &&
              !isError &&
              list.map((plan, i) => (
                <Card key={i}>
                  <div className="c-plans-list">
                    <div>
                      <h2 className="plans__cardName">{plan.name}</h2>
                      <span className="plans__cardIcon">icon</span>
                    </div>
                    <p>
                      Costo del plan <br />
                      <b className="plans__cardPrice"> {plan.price} </b>
                      al mes
                    </p>
                    <ul>
                      {plan.description.map((desc, j) => (
                        <li key={j} className="plans__cardDesc">
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    variant="fill-accent"
                    onClick={() => {
                      navigate('/resumen', {
                        state: { plan: { name: plan.name, price: plan.price } },
                      });
                    }}
                  >
                    Seleccionar Plan
                  </Button>
                </Card>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PlanSelector;
