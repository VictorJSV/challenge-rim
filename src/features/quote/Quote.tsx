import './Quote.scss';
import Tag from '@src/shared/components/Tag/Tag';
import familyImg from '@src/assets/images/family.png';
import familyMobileImg from '@src/assets/images/family-mobile.png';
import Container from '@src/shared/components/Container/Container';
import { QuoteForm } from './components/QuoteForm';

const Quote: React.FC = () => {
  return (
    <Container>
      <div className="c-quote">
        <div className="c-quote__image">
          <img
            className='hidden md:block'
            src={familyImg}
            alt="Familia sonriendo compuesta por padre, madre y un hijo"
            width={480}
            height={560}
            loading="lazy"
            decoding="async"
          />
          <img
            className='block md:hidden'
            src={familyMobileImg}
            alt="Familia sonriendo compuesta por padre, madre y un hijo"
            width={136}
            height={160}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="c-quote__info">
          <Tag type="accent">Seguro Salud Flexible</Tag>
          <h1 className="c-quote__title">
            Creado para ti y tu familia
          </h1>
          <hr className="c-quote__divider" />
          <p className="c-quote__description">
            Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría, 100%
            online.
          </p>
          <QuoteForm />
        </div>
      </div>
    </Container>
  );
};

export default Quote;
