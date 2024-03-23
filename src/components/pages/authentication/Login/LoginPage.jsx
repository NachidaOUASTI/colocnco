import './LoginPage.scss';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  changeLoginInputValue,
  resetCreatedColocation,
  resetError,
} from '../../../../store/userSlice';
import HeaderSign from '../../../HeaderSign/HeaderSign';
import HeaderSignTitle from '../../../HeaderSignTitle/HeaderSignTitle';
import {
  faEye,
  faEyeSlash,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../../Modal/Modal';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createdColocation = useSelector(
    (state) => state.user.createdColocation
  );
  // add a useState to show/hide the password/confirmaPassword when the eye icon is clicked
  const [showPassword, setShowPassword] = useState(false);
  const joinedColocation = useSelector((state) => state.user.joinedColocation);

  // Import email, password, logged state, error, joinedColocation from the store using useSelector
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const logged = useSelector((state) => state.user.logged);

  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    // Effacer le message d'erreur lorsque le composant est démonté (changement de page)
    return () => {
      dispatch(resetError());
    };
  }, []);

  useEffect(() => {
    // When changing pages, reset all input values to their initial state
    return () => {
      dispatch(changeLoginInputValue({ input: 'email', value: '' }));
      dispatch(changeLoginInputValue({ input: 'password', value: '' }));
    };
  }, []);

  useEffect(() => {
    // Redirect to /home if the user is logged in
    if (logged) {
      navigate('/');
    }
  }, [logged]);

  return (
    <div>
      <div className="headerSign">
        <NavLink to="/welcome">
          <FontAwesomeIcon icon={faArrowLeft} />
        </NavLink>
        <HeaderSign />
      </div>
      <div className="containerSign">
        <HeaderSignTitle />
        <div className="containerSign__main">
          <div className="containerSign__main__header">
            <h2 className="containerSign__main__titleSign">Connexion</h2>
            <form
              className="containerSign__main__form"
              onSubmit={(e) => {
                e.preventDefault(); // Prevents the default form submission
                // Dispatch the 'SUBMIT_LOGIN' action to loginMiddleware when the form is submitted
                dispatch({ type: 'SUBMIT_LOGIN' });
                // Réinitialise createdColocation à false lors du changement de page
                dispatch(resetCreatedColocation());
              }}
            >
              <label
                htmlFor="email"
                className="containerSign__main__form__label"
              >
                {' '}
                Email :
                <input
                  className="containerSign__main__form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    // Dispatch the action to update the email value in the store
                    const action = changeLoginInputValue({
                      input: 'email',
                      value: e.target.value,
                    });
                    dispatch(action);
                  }}
                />
              </label>
              <label
                htmlFor="password"
                className="containerSign__main__form__label"
              >
                {' '}
                Mot de passe:
                <input
                  className="containerSign__main__form__input"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => {
                    // Dispatch the action to update the password value in the store
                    const action = changeLoginInputValue({
                      input: 'password',
                      value: e.target.value,
                    });
                    dispatch(action);
                  }}
                />
                <div className="containerSign__main__form__input__toggle__eye">
                  {/* Use showPassword to toggle between the icons */}
                  {showPassword ? (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEye}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
              </label>
              {/* Show the error message if there is any */}
              {error && (
                <p className="containerSign__main__form__error">{error}</p>
              )}

              {/* modal s'affiche si created colocation est tru et pareil pour joincoloc */}
              {(createdColocation && <Modal />) ||
                (joinedColocation && <Modal />)}
              <button
                type="submit"
                className="containerSign__main__form__button"
              >
                Connexion
              </button>
            </form>
            <NavLink to="/signup" className="containerSign__main__link">
              Nouveau sur Coloc&co? Créer ton Compte!
            </NavLink>

            {/*     {(createdColocation && <Modal />) || (joinedColocation && <Modal />)} */}
          </div>
        </div>
      </div>
    </div>
  );
}

/*  We are using propTypes which gives informations about what is expected by a component 
LoginPage.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
 */
