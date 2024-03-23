import './ShoppingPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from 'react';

import Header from '../../Header/Header';
import FeatureMenu from '../../FeatureMenu/FeatureMenu';
import Footer from '../../Footer/Footer';

export default function ShoppingPage() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.feature.articles);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    // Discover tasks list
    dispatch({ type: 'GET_ARTICLES_LIST' });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    /*   // Dispatch de l'action pour créer un article
    dispatch({
      type: 'CREATE_ARTICLE',
      payload: {
        name: newTask,
      },
    }); */

    // Réinitialiser le champ de saisie après la création
    setNewTask('');
  };

  const handleDelete = (taskId) => {
    // Ajoutez le code pour gérer la suppression d'une tâche
    // dispatch({
    //   type: 'DELETE_TASK',
    //   payload: {
    //     taskId,
    //   },
    // });
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
          <h2 className="container__R__title__page">
            Liste des Courses Commune
          </h2>
          <h3 className="container__R__title__h3">
            C'est l'heure d'ouvrir le portefeuille
          </h3>
        </div>
        <div className="app">
          {/* Form for creating a new article */}
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={newTask}
              className="form-item"
              placeholder="Ajouter une nouvelle tâche"
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button type="submit">Ajouter</button>
          </form>
          {/* List of articles */}
          <div className="list">
            <ul className="list">
              {articles.map((article) => (
                <li key={article.id}>
                  <div className="task-container">
                    <label
                      htmlFor={article.id}
                      className={`list-item ${
                        article.done ? 'list-item--done' : ''
                      }`}
                    >
                      {/* Modify the following line to display the correct content */}
                      <span>{article.name}</span>
                    </label>
                    <div className="delete-button-container">
                      {/* Modify the following line to handle delete action */}
                      <button
                        aria-label="delete task button"
                        type="button"
                        className="delete-button"
                        onClick={() => handleDelete(article.id)}
                      >
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="delete-button__icone"
                        />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container__content__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
