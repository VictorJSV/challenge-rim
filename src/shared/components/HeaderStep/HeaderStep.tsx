import Steps from "@src/shared/components/Steps/Steps";
import IconBack from '@src/assets/svgs/icon-back.svg?react';
import Button from "@src/shared/components/Button/Button";
import Container from "@src/shared/components/Container/Container";
import './HeaderStep.scss';

export const HeaderStep = ({ numberSelected }: { numberSelected: number }) => {
  return (
    <div className="c-plans-header">
      <Container>
        <div className="c-plans-header__container">
          <div className="c-plans-header__back-button">
            <Button
              variant="text"
              onClick={() => window.history.back()}
              aria-label="Volver"
            >
              <IconBack className="fill-neutral-500" />
            </Button>
          </div>
          <div className="c-plans-header__steps">
            <Steps id="plan-selection-steps">
              <Steps.Item title="Planes y coberturas" isSelected={numberSelected === 1} />
              <Steps.Item title="Resumen" isSelected={numberSelected === 2} />
            </Steps>
          </div>
        </div>
      </Container>
    </div>
  );
};
