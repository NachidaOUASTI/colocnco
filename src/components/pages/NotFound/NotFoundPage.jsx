import './NotFoundPage.scss';
import Header from '../../Header/Header';
import FeatureMenu from '../../FeatureMenu/FeatureMenu';
import Footer from '../../Footer/Footer';

export default function NotFoundPage() {
  return (
    <div className="container">
      {/*    <div className="container__nav">
        <FeatureMenu />
      </div> */}
      <div className="container__content">
        <img src="/404BIS.jpg" alt="404" className="container__content__404" />
        <div className="container__content__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
