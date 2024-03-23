import './HomeMenu.scss';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleUser,
  faToggleOn,
  faToggleOff,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAvailableProfile } from '../../store/userSlice';

export default function HomeMenu() {
  const dispatch = useDispatch();
  const [menuClose, setMenuClose] = useState(false);
  // const [toggleReact, setToggleReact] = useState(true);
  const [userToggleState, setUserToggleState] = useState({});

  useEffect(() => {
    // Récupérer le règlement lors du chargement du composant
    dispatch({ type: 'GET_ALL_USERS' });
  }, []);

  const userData = useSelector((state) => state.user.userData);
  console.log('userId', userData);
  const users = useSelector((state) => state.user.users);

  const avatarFile = useSelector((state) => state.user.avatarFile);
  const firstname = useSelector((state) => state.user.firstname);

  const colocs = users.filter((user) => user.id !== userData.id);

  const toggleMenu = () => {
    setMenuClose(!menuClose);
  };
  // const colocsToDisplay = colocs.filter(
  //   (coloc) => coloc.id !== userData.userId
  // );
  console.log('colocs', colocs);
  console.log('userdata', userData);
  const connectedUser = users.find((user) => user.id === userData.userId);
  console.log('TEST', connectedUser && connectedUser.available);

  /*   const toggleToggle = (userId) => {
    setUserToggleState((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  }; */

  return (
    <div className={`homeMenu ${menuClose ? 'homeMenu--close' : ''}`}>
      <div
        className="homeMenu__menuBurger"
        role="button"
        tabIndex={0}
        onClick={toggleMenu}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleMenu();
          }
        }}
      >
        {menuClose ? (
          <FontAwesomeIcon icon={faBars} />
        ) : (
          <FontAwesomeIcon icon={faTimes} />
        )}
      </div>
      <div
        className={`homeMenu__profile ${
          menuClose ? 'homeMenu__profile--close' : ''
        }`}
      >
        <NavLink to="/profile" className="homeMenu__profile__avatar">
          {userData.avatar_file ? (
            <img
              src={userData.avatar_file}
              alt="Avatar"
              className="homeMenu__profile__file"
            />
          ) : (
            <FontAwesomeIcon
              icon={faCircleUser}
              size="2em"
              className="homeMenu__profile__avatar"
            />
          )}
        </NavLink>
        <h3 className="homeMenu__profile__user">
          {userData.firstname ? `${userData.firstname}` : 'Bienvenue'}
        </h3>
        <div
          className="homeMenu__profile__toggle"
          role="button"
          tabIndex={0}
          onClick={() => {
            const action = toggleAvailableProfile(userData.available);
            console.log('action HOME MENU', action);
            dispatch(action);
            dispatch({ type: 'PATCH_USER_INFORMATIONS' });
            /*  dispatch({ type: 'GET_ALL_USERS' }); */
          }}
        >
          {userToggleState[userData.id] ? (
            <FontAwesomeIcon icon={faToggleOn} size="xl" />
          ) : (
            <FontAwesomeIcon icon={faToggleOff} size="xl" />
          )}
        </div>
      </div>

      {colocs.length ? (
        <div className="homeMenu__profileUser">
          {colocs.map((coloc) => (
            <div key={coloc.id} className="homeMenu__profileUser__single">
              <NavLink
                to={`/profile/${coloc.id}`}
                className="homeMenu__profileUser__single__avatar"
              >
                {coloc.avatar_file ? (
                  <img
                    src={coloc.avatar_file}
                    alt="Avatar"
                    className="homeMenu__profileUser__single__file"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    size="2em"
                    className="homeMenu__profileUser__single__avatar"
                  />
                )}
              </NavLink>
              <h4 className="homeMenu__profileUser__single__user">
                {coloc.firstname}
              </h4>
              <div
                className="homeMenu__profileUser__single__toggle"
                role="button"
                tabIndex={0}
                onClick={() => {
                  const action = toggleAvailableStatusState({
                    id: coloc.id,
                    available: coloc.available,
                  });
                  console.log('action HOME MENU', action);
                  dispatch(action);
                  /* dispatch({ type: 'PATCH_USER_INFORMATIONS' });
                     dispatch({ type: 'PATCH_USER_PARAM' });
                  dispatch({ type: 'GET_ALL_USERS' }); */
                }}
              >
                {coloc.available ? (
                  <FontAwesomeIcon icon={faToggleOn} size="lg" />
                ) : (
                  <FontAwesomeIcon icon={faToggleOff} size="lg" />
                )}

                {/*    {userToggleState[coloc.id] ? (
                  <FontAwesomeIcon icon={faToggleOn} size="lg" />
                ) : (
                  <FontAwesomeIcon icon={faToggleOff} size="lg" />
                )} */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun colocataire trouvé.</p>
      )}
      <div
        className={`homeMenu__footer ${
          menuClose ? 'homeMenu__footer--close' : ''
        }`}
      >
        <NavLink to="/rules">Réglement Intérieur</NavLink>
      </div>
    </div>
  );
}
