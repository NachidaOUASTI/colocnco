import './SettingPage.scss';
import Header from '../../Header/Header';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FeatureMenu from '../../FeatureMenu/FeatureMenu';
import Footer from '../../Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { updateEditedParamData } from '../../../store/userSlice';

export default function SettingPage() {
  const dispatch = useDispatch();
  // const [toggleReact, setToggleReact] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [editingParamData, setEditingParamData] = useState({});
  // console.log('----> editing', editingParamData);

  const settingUser = useSelector((state) => state.user.settingUser);
  console.log('settingUser dans settinPage', settingUser);
  /*  useEffect(() => {
    // Récupérer le règlement lors du chargement du composant
    dispatch({ type: 'GET_USER_PARAMETER' });
  }, []); */

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // faire apparaitre les données après modification
  useEffect(() => {
    // console.log('Useeffect', userData[0]);
    if (settingUser) {
      console.log('Setting', settingUser);
      setEditingParamData(settingUser);
    }
  }, [settingUser]);

  const handleParameterChange = (event) => {
    const { name, value } = event.target;
    setEditingParamData((prevParamData) => ({
      ...prevParamData,
      settingInfo: {
        ...prevParamData.settingInfo,
        userInfo: {
          ...prevParamData.settingInfo?.userInfo,
          [name]: value,
        },
        colocInfo: {
          ...prevParamData.settingInfo?.colocInfo,
          [name]: value,
        },
      },
    }));
    console.log('---> handleParameterChange', name, value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('editingData handlesave===>', editingParamData);
    dispatch({ type: 'PATCH_USER_PARAM', payload: editingParamData });
    setEditingParamData(settingUser);
    console.log('editingData AFTER handlesave===>', editingParamData);
    setEditMode(false);
  };

  return (
    <div className="container">
      <div className="container__nav">
        <FeatureMenu />
      </div>
      <div className="container__header">
        <Header />
      </div>
      <div className="container__S">
        <div className="container__S__title">
          <h5 className="container__S__title__page">Mon compte</h5>
          <p className="container__S__title__p">
            Préservez la confidentialité de vos données personnelles.
          </p>
          <div className="container__S__title__edit">
            <button
              type="button"
              className="container__S__title__button"
              onClick={toggleEditMode}
            >
              <FontAwesomeIcon icon={faPen} />
              {editMode ? 'Annuler' : 'Modifier les paramètres'}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={handleSave}
                className="container__S__title__edit__buttonSave"
              >
                Sauvegarder
              </button>
            )}
          </div>
        </div>
        <div className="container__S__main">
          {/* userInfo */}
          <div className="container__S__main__section">
            <div className="container__S__main__section__article">
              <h5 className="container__S__main__section__article__infos">
                Personnelle
              </h5>
              <div className="container__S__main__section__article__header">
                <h5 className="container__S__main__section__article__header__title">
                  Prénom
                </h5>
              </div>
              {editMode ? (
                <input
                  className="container__S__main__section__article__input"
                  type="text"
                  name="firstname"
                  value={
                    editingParamData.settingInfo?.userInfo?.firstname || ''
                  }
                  placeholder="Marcel"
                  onChange={handleParameterChange}
                />
              ) : (
                <p className="container__S__main__section__article__paraph">
                  {settingUser.settingInfo?.userInfo?.firstname || ''}
                </p>
              )}
            </div>
            <div className="container__S__main__section__article">
              <div className="container__S__main__section__article__header">
                <h5 className="container__S__main__section__article__header__title">
                  Nom
                </h5>
              </div>
              {editMode ? (
                <input
                  className="container__S__main__section__article__input"
                  type="text"
                  name="lastname"
                  value={editingParamData.settingInfo?.userInfo?.lastname || ''}
                  placeholder="Dupont"
                  onChange={handleParameterChange}
                />
              ) : (
                <p className="container__S__main__section__article__paraph">
                  {settingUser.settingInfo?.userInfo?.lastname || ''}
                </p>
              )}
            </div>
            <div className="container__S__main__section__article">
              <div className="container__S__main__section__article__header">
                <h5 className="container__S__main__section__article__header__title">
                  Adresse mail
                </h5>
              </div>
              {editMode ? (
                <input
                  className="container__S__main__section__article__input"
                  type="email"
                  name="email"
                  value={editingParamData.settingInfo?.userInfo?.email || ''}
                  placeholder="coloc@gmail.com"
                  onChange={handleParameterChange}
                />
              ) : (
                <p className="container__S__main__section__article__paraph">
                  {settingUser.settingInfo?.userInfo?.email || ''}
                </p>
              )}
            </div>
            {/*
            <div className="container__S__main__section__article">
              <div className="container__S__main__section__article__header">
                <h5 className="container__S__main__section__article__header__title">
                  Mot de passe
                </h5>
              </div>
              {editMode ? (
                <>
                  <input
                    className="container__S__main__section__article__input"
                    type="password"
                    name="password"
                    value={
                      editingParamData.settingInfo?.userInfo?.password || ''
                    }
                    placeholder=""
                    onChange={handleParameterChange}
                  />
                   <input
                    className="container__S__main__section__article__input"
                    type="password"
                    name="confirmPassword"
                    value={editingParamData.confirmPassword || ''}
                    placeholder=""
                    onChange={handleParameterChange}
                  />
                 
                </>
              ) : (
                <div>
                  <p className="container__S__main__section__article__paraph">
                    {settingUser.settingInfo?.userInfo?.password || ''}
                  </p>
                </div>
              )}
            </div>
             */}
          </div>
          {/* colocInfo */}
          <div className="container__S__main__section">
            <div className="container__S__main__section__article">
              <h5 className="container__S__main__section__article__infos">
                Colocation
              </h5>
              <div className="container__S__main__section__article__header">
                <h5 className="container__S__main__section__article__header__title">
                  Nom de la Colocation
                </h5>
              </div>
              {editMode ? (
                <input
                  className="container__S__main__section__article__input"
                  type="text"
                  name="group_name"
                  value={
                    editingParamData.settingInfo?.colocInfo?.group_name || ''
                  }
                  placeholder="Coloc"
                  onChange={handleParameterChange}
                />
              ) : (
                <p className="container__S__main__section__article__paraph">
                  {settingUser.settingInfo?.colocInfo?.group_name || ''}
                </p>
              )}
            </div>
            <div className="container__S__main__section__article">
              <div className="container__S__main__section__article__header">
                <h5 className="container__S__main__section__article__header__title">
                  Adresse
                </h5>
              </div>
              {editMode ? (
                <textarea
                  className="container__S__main__section__article__description"
                  type="text"
                  name="address"
                  value={editingParamData.settingInfo?.colocInfo?.address || ''}
                  placeholder=""
                  onChange={handleParameterChange}
                />
              ) : (
                <p className="container__S__main__section__article__paraph">
                  {settingUser.settingInfo?.colocInfo?.address || ''}
                </p>
              )}
            </div>
            <div className="container__S__main__section__article">
              <div className="container__S__main__section__article__header">
                <h5 className="container__S__main__section__article__header__title">
                  Code Colocation
                </h5>
              </div>

              <p className="container__S__main__section__article__paraph">
                {settingUser.settingInfo?.colocInfo?.code_coloc || ''}
              </p>
            </div>
          </div>
        </div>

        <div className="container__S__delete">
          <button
            type="button"
            onClick={(e) => console.log('Supprimer', e.target.value)}
            className="container__S__delete__button"
          >
            Supprimer le compte
          </button>
        </div>
        <div className="container__S__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
