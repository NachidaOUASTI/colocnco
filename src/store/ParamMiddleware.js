// Profile
import { handleSuccessfullParam } from './userSlice';

export const paramMiddleware = (store) => (next) => (action) => {
  const token = localStorage.getItem('token');
  // console.log(token);

  if (action.type === 'GET_USER_PARAMETER') {
    fetch(`http://localhost:3000/setting`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log('Paramètre middleware - Server Response:', res);
        if (!res.ok) {
          throw new Error("les infos paramètres user n'ont pas été récupérer");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const paramAction = handleSuccessfullParam(data);
        console.log('paramAction:', paramAction);
        store.dispatch(paramAction);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des informations paramètre sur l'utilisateur",
          error
        );
        throw error;
      });
  }

  // Call the next middleware or the reducer in the chain
  return next(action);
};

export default paramMiddleware;
