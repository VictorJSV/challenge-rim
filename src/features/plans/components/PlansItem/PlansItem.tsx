import Card from "@src/shared/components/Card/Card";
import Tag from "@src/shared/components/Tag/Tag";
import GlMedicalAttentionSolid from '@src/assets/svgs/GlMedicalAttentionSolid.svg?react';
import GlLaptopSolid from '@src/assets/svgs/GlLaptopSolid.svg?react';
import GlHospitalSolid from '@src/assets/svgs/GlHospitalSolid.svg?react';
import { markBoldWords } from "@src/shared/utils";
import { EnhancedPlan } from "../PlansList/PlansList";
import { useNavigate } from "react-router-dom";
import Button from "@src/shared/components/Button/Button";
import './PlansItem.scss';

export const PlansItem = ({ plan }: { plan: EnhancedPlan }) => {
  const navigate = useNavigate();

  const onClickSelectPlan = (plan: EnhancedPlan) => {
    navigate('/resumen', {
      state: { plan: { name: plan.name, price: plan.price } },
    });
  };
  return (
    <div className="c-plans-item">
      <Card>
        <div className="c-plans-item__container">
          <div className="c-plans-item__tag">
            {plan.recommended && <Tag>Plan recomendado</Tag>}
          </div>
          <div className="c-plans-item__name-container">
            <h2 className="c-plans-item__name">{plan.name}</h2>
            {plan.icon}
          </div>
          <p className="c-plans-item__text-plan">Costo del plan</p>
          { plan.prevPrice && <p className="c-plans-item__prev-price">{`$${plan.prevPrice} antes`}</p> }
          <p className="c-plans-item__price">{`$${plan.price} al mes`}</p>
          <hr className="c-plans-item__line" />
          <ul className="c-plans-item__benefit-container">
            {plan.description.map((benefit, j) => (
              <li key={j} className="c-plans-item__benefit" aria-label={benefit.text}>
                {j === 0 && <GlMedicalAttentionSolid className="c-plans-item__mark" />}
                {j === 1 && <GlLaptopSolid className="c-plans-item__mark" />}
                {j === 2 && <GlHospitalSolid className="c-plans-item__mark" />}
                <p className="c-plans-item__text" aria-hidden="true">
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
    </div>
  );
};
