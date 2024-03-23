import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { useSelector, useDispatch } from 'react-redux';
import './RulesPage.scss';
import Header from '../../Header/Header';
import FeatureMenu from '../../FeatureMenu/FeatureMenu';
import Footer from '../../Footer/Footer';
import { updateRulesContent } from '../../../store/featureSlice';

export default function RulesPage() {
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);

  const [showRulesContent, setShowRulesContent] = useState([]);

  // faire apparaitre les données du réglement intérieur
  useEffect(() => {
    // Récupérer le règlement lors du chargement du composant
    dispatch({ type: 'GET_RULES_CONTENT' });
  }, []);

  const content = useSelector((state) => state.feature.content);

  // faire apparaitre les données après modification
  useEffect(() => {
    if (content[0]?.content) {
      console.log('rules', content[0].content);
      setShowRulesContent(content[0].content);
    }
  }, [content]);

  // toogle edit mode pour modifier
  const toggleEditMode = () => {
    setEditMode(!editMode);
    console.log('toggleEditMode');
  };

  // modification dans l'input
  const handleRulesChange = (event) => {
    setShowRulesContent(event.target.value);
  };

  // validation du form envoie modification a la base de donnée et erfresh donnée modifier
  const handleValidation = (e) => {
    e.preventDefault();
    dispatch({ type: 'PATCH_RULES', payload: showRulesContent });
    dispatch({ type: 'GET_RULES', payload: showRulesContent });
    setEditMode(false);
  };

  return (
    <div className="container">
      <div className="container__nav">
        <FeatureMenu />
      </div>
      <div className="container__R">
        <div className="container__header">
          <Header />
        </div>
        <div className="container__R__title">
          <h2 className="container__R__title__page">Règlement Intérieur</h2>
          <h3 className="container__R__title__h3">
            Etablissez vos règles de vie commune
          </h3>
        </div>
        <div className="container__R__main">
          {/* <h3> Règlement Intérieur de la Colocation</h3> */}
          <button
            type="button"
            className="container__R__title__button"
            onClick={toggleEditMode}
          >
            {editMode ? 'Annuler' : 'Modifier'}
            <FontAwesomeIcon
              icon={faPen}
              className="container__P__title__edit__button__icone"
            />
          </button>

          {editMode ? (
            <form
              className="container__R__main__form"
              onSubmit={handleValidation}
            >
              <textarea
                className="container__R__main__form__rules"
                onChange={handleRulesChange}
                value={showRulesContent}
              />

              <button
                type="submit"
                className="container__R__main__form__rules__button"
              >
                Valider
              </button>
            </form>
          ) : (
            <div className="container__R__main__form__rules">
              {content.length > 0 &&
                content.map((rule) => (
                  <div key="1">
                    {rule.content.split('\n').map((article, index) => (
                      <p key={index}> {article} </p>
                    ))}
                  </div>
                ))}
            </div>
          )}
          <div className="container__content__footer">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
