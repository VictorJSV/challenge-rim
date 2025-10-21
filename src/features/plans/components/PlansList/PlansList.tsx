import { PlanDTO, PlansListDTO } from '@src/__mocks__/msw/model';
import IcHomeLight from '@src/assets/svgs/IcHomeLight.svg?react';
import IcHospitalLight from '@src/assets/svgs/IcHospitalLight.svg?react';
import { useSelector } from 'react-redux';
import { selectUserAge } from '../../selectors/plans.selectors';
import './PlansList.scss';
import Carousel from '@src/shared/components/Carousel/Carousel';
import { PlansItem } from '../PlansItem/PlansItem';

const ConfigBold = [
  {
    if: 'Plan en Casa',
    then: [
      [0, 3],
      [0, 1],
      [0, 1],
    ],
  },
  {
    if: 'Plan en Casa y Clínica',
    then: [
      [0, 2],
      [0, 2],
      [3, 8],
    ],
  },
  {
    if: 'Plan en Casa + Chequeo',
    then: [[0, 3], [2, 3], 'all'],
  },
];

export interface EnhancedPlan extends Omit<PlanDTO, 'description'> {
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
              icon:
                plan.name === 'Plan en Casa y Clínica' ? (
                  <IcHospitalLight className="shrink-0" />
                ) : (
                  <IcHomeLight className="shrink-0" />
                ),
              description: plan.description.map((text, j) => ({
                text,
                toBold: (config?.then[j] ?? []) as number[] | 'all',
              })),
            };
          })
      : [];
  };

  return (
    <div className="c-plans-list">
      {isLoading && <div>Cargando planes...</div>}
      {isError && <div>Error</div>}
      {!isLoading && !isError && (
        <Carousel>
          {enhancedList().map((plan, i) => (
            <Carousel.Item key={i} index={i} width="304px">
              <div className="pl-4 py-6 flex md:pt-5 md:pb-0 md:pl-0">
                <PlansItem key={i} plan={plan} />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
};
