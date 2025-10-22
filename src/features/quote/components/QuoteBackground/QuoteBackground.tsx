import moleculeBlurRightImg from '@src/assets/images/molecule-blur-right.png';
import moleculeBlurRightWebp from '@src/assets/images/molecule-blur-right.webp';
import moleculeBlurLeftImg from '@src/assets/images/molecule-blur-left.png';
import moleculeBlurLeftWebp from '@src/assets/images/molecule-blur-left.webp';
import moleculeBlurMobileRightImg from '@src/assets/images/molecule-blur-mobile-right.png';
import moleculeBlurMobileRightWebp from '@src/assets/images/molecule-blur-mobile-right.webp';
import moleculeBlurMobileLeftImg from '@src/assets/images/molecule-blur-mobile-left.png';
import moleculeBlurMobileLeftWebp from '@src/assets/images/molecule-blur-mobile-left.webp';
import './QuoteBackground.scss';

export const QuoteBackground: React.FC = () => {
  return (
    <>
      <picture>
        <source srcSet={moleculeBlurRightWebp} type="image/webp" />
        <img className='c-quote-background__right' src={moleculeBlurRightImg} loading="lazy" aria-hidden='true' />
      </picture>
      <picture>
        <source srcSet={moleculeBlurLeftWebp} type="image/webp" />
        <img className='c-quote-background__left' src={moleculeBlurLeftImg} loading="lazy" aria-hidden='true' />
      </picture>
      <picture>
        <source srcSet={moleculeBlurMobileRightWebp} type="image/webp" />
        <img className='c-quote-background__mobile-right' src={moleculeBlurMobileRightImg} loading="lazy" aria-hidden='true' />
      </picture>
      <picture>
        <source srcSet={moleculeBlurMobileLeftWebp} type="image/webp" />
        <img className='c-quote-background__mobile-left' src={moleculeBlurMobileLeftImg} loading="lazy" aria-hidden='true' />
      </picture>
    </>
  );
};
