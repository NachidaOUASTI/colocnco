import { handleSuccessfullProfile } from './userSlice';

export const DeleteParamMiddleware = (store) => (next) => (action) => {
  const token = localStorage.getItem('token');
  if (action.type === 'PATCH_USER_INFORMATIONS') {
    console.log('action.payload', action.payload);
    fetch('http://localhost:3000/user/update_profile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(action.payload),
    })
      .then((res) => {
        // console.log(res);
        if (!res.ok) {
          throw new Error("les informations user n'ont pas été récupérer");
        }
        return res.json();
      })

      .then((data) => {
        // console.log('Réponse du backend :', data);
        const { result } = data;
        store.dispatch(handleSuccessfullProfile(result[0]));
        console.log('Data dans le middleware after UPDATE USER----> : ', data);
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la récupération des infos utilisateur',
          error
        );
        throw error;
      });
  }
  return next(action);
};

export default DeleteParamMiddleware;
