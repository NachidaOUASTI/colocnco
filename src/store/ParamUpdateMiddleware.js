import { handleSuccessfullParam } from './userSlice';

export const ParamUpdateMiddleware = (store) => (next) => (action) => {
  const token = localStorage.getItem('token');
  if (action.type === 'PATCH_USER_PARAM') {
    fetch('http://localhost:3000/setting', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(action.payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("les informations user n'ont pas été récupérer");
        }
        return res.json();
      })
      .then((data) => {
        console.log('data', data);
        const colocInfo = data.colocInfo.result[0];
        const userInfo = data.userInfo.result[0];
        const aggUserColoc = { settingInfo: { colocInfo, userInfo } };
        store.dispatch(handleSuccessfullParam(aggUserColoc));
        console.log(
          'Data dans le middleware after UPDATE Param----> : ',
          aggUserColoc
        );
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

export default ParamUpdateMiddleware;
