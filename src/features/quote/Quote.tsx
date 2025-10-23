import './Quote.scss';
import Tag from '@src/shared/components/Tag/Tag';
import familyImg from '@src/assets/images/family.png';
import familyWebp from '@src/assets/images/family.webp';
import familyAvif from '@src/assets/images/family.avif';
import familyMobileImg from '@src/assets/images/family-mobile.png';
import familyMobileWebp from '@src/assets/images/family-mobile.webp';
import familyMobileAvif from '@src/assets/images/family-mobile.avif';
import Container from '@src/shared/components/Container/Container';
import { QuoteForm } from './components/QuoteForm/QuoteForm';

const Quote: React.FC = () => {
  return (
    <div className="c-quote">
      <div className="c-quote__background-right" />
      <div className="c-quote__background-left" />
      <div className="c-quote__background-mobile-right" />
      <div className="c-quote__background-mobile-left" />
      <Container>
        <div className="c-quote__container">
          <div className="c-quote__image">
            <picture>
              <source srcSet={familyAvif} type="image/avif" />
              <source srcSet={familyWebp} type="image/webp" />
              <img
                className="hidden md:block"
                src={familyImg}
                alt="Familia sonriendo compuesta por padre, madre y un hijo"
                width={480}
                height={560}
                fetchPriority="high"
                decoding="async"
              />
            </picture>
            <picture>
              <source srcSet={familyMobileAvif} type="image/avif" />
              <source srcSet={familyMobileWebp} type="image/webp" />
              <img
                className="block md:hidden"
                src={familyMobileImg}
                alt="Familia sonriendo compuesta por padre, madre y un hijo"
                width={136}
                height={160}
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
          <div className="c-quote__info">
            <Tag type="accent">Seguro Salud Flexible</Tag>
            <h1 className="c-quote__title">Creado para ti y tu familia</h1>
            <hr className="c-quote__divider" />
            <p className="c-quote__description">
              Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría, 100%
              online.
            </p>
            <QuoteForm />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Quote;
