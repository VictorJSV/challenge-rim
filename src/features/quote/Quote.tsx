import './Quote.scss';
import Tag from '@src/shared/components/Tag/Tag';
import familyImg from '@src/assets/images/family.png';
import Container from '@src/shared/components/Container/Container';
import { QuoteForm } from './components/QuoteForm';

const Quote: React.FC = () => {
  return (
    <Container>
      <div className="c-quote">
        <img
          className="c-quote__image"
          src={familyImg}
          alt="Familia sonriendo compuesta por padre, madre y un hijo"
          width={480}
          height={560}
        />
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
