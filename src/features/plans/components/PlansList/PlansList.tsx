import { PlanDTO, PlansListDTO } from '@src/__mocks__/msw/model';
import { markBoldWords } from '@src/shared/utils';
import Card from '@src/shared/components/Card/Card';
import GlMedicalAttentionSolid from '@src/assets/svgs/GlMedicalAttentionSolid.svg?react';
import GlLaptopSolid from '@src/assets/svgs/GlLaptopSolid.svg?react';
import GlHospitalSolid from '@src/assets/svgs/GlHospitalSolid.svg?react';
import IcHomeLight from '@src/assets/svgs/IcHomeLight.svg?react';
import IcHospitalLight from '@src/assets/svgs/IcHospitalLight.svg?react';
import Button from '@src/shared/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserAge } from '../../selectors/plans.selectors';
import Tag from '@src/shared/components/Tag/Tag';
import './PlansList.scss';

const ConfigBold = [
  {
    if: 'Plan en Casa',
    then: [ [0, 3], [0, 1], [0, 1] ],
  },
  {
    if: 'Plan en Casa y Clínica',
    then: [ [0, 2], [0, 2], [3, 8] ],
  },
  {
    if: 'Plan en Casa + Chequeo',
    then: [[0, 3], [2, 3], 'all']
  },
];

interface EnhancedPlan extends Omit<PlanDTO, 'description'> {
  recommended: boolean;
  icon: React.ReactNode;
  description: {
    text: string;
    toBold: number[] | 'all';
  }[];
}

interface PlanListProps {
  planType: 'self' | 'other';
  data?: PlansListDTO;
  isLoading: boolean;
  isError: boolean;
}

export const PlanList: React.FC<PlanListProps> = ({ planType, data, isLoading, isError }) => {
  const navigate = useNavigate();
  const userAge = useSelector(selectUserAge);

  const enhancedList = (): EnhancedPlan[] => {
    return data
      ? data.list
          .filter((plan) => userAge && plan.age >= userAge)
          .map((plan) => {
            const config = ConfigBold.find((cfg) => cfg.if.trim() === plan.name.trim());
            return {
              ...plan,
              price: plan.price * (planType === 'self' ? 1 : 0.95),
              recommended: plan.name === 'Plan en Casa y Clínica',
              icon: plan.name === 'Plan en Casa y Clínica' ? <IcHospitalLight /> : <IcHomeLight />,
              description: plan.description.map((text, j) => ({
                text,
                toBold: (config?.then[j] ?? []) as number[] | 'all',
              })),
            };
          })
      : [];
  };

  const onClickSelectPlan = (plan: EnhancedPlan) => {
    navigate('/resumen', {
      state: { plan: { name: plan.name, price: plan.price } },
    });
  };

  return (
    <ul className="c-plans-list" aria-label="Lista de planes disponibles">
      {isLoading && <div>Cargando planes...</div>}
      {isError && <div>Error</div>}
      {!isLoading &&
        !isError &&
        enhancedList().map((plan, i) => (
          <li key={i} className="c-plans-list__item">
            <Card>
              <div className="c-plans-list__item-container">
                <div className="c-plans-list__item-tag">
                  {plan.recommended && <Tag>Plan recomendado</Tag>}
                </div>
                <div className="c-plans-list__item-name-container">
                  <h2 className="c-plans-list__item-name">{plan.name}</h2>
                  {plan.icon}
                </div>
                <p className="c-plans-list__item-text-plan">Costo del plan</p>
                <p className="c-plans-list__item-price">${plan.price} al mes</p>
                <hr className="c-plans-list__item-line" />
                <ul className="c-plans-list__item-benefit-container">
                  {plan.description.map((benefit, j) => (
                    <li key={j} className="c-plans-list__item-benefit">
                      {j === 0 && <GlMedicalAttentionSolid className="c-plans-list__item-mark" />}
                      {j === 1 && <GlLaptopSolid className="c-plans-list__item-mark" />}
                      {j === 2 && <GlHospitalSolid className="c-plans-list__item-mark" />}
                      <p className="c-plans-list__item-text">
                        {markBoldWords(benefit.text, benefit.toBold)}
                      </p>
                    </li>
                  ))}
                </ul>
                <Button variant="fill-accent" size="md" onClick={() => onClickSelectPlan(plan)}>
                  Seleccionar Plan
                </Button>
              </div>
            </Card>
          </li>
        ))}
    </ul>
  );
};
