import './TaskPage.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck, faSquare } from '@fortawesome/free-regular-svg-icons';
import {
  changeNewTaskValue,
  toggleDoneState,
} from '../../../store/featureSlice';
import Header from '../../Header/Header';
import FeatureMenu from '../../FeatureMenu/FeatureMenu';
import Footer from '../../Footer/Footer';

const getRandomColor = () => {
  // Générer une couleur hexadécimale aléatoire
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

export default function TaskPage() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.feature.tasks);
  const doneTasks = useSelector((state) => state.feature.doneTasks);
  const newTaskDescription = useSelector(
    (state) => state.feature.newTaskDescription
  );
  useEffect(() => {
    // Discover tasks list
    dispatch({ type: 'GET_TASKS_LIST' });
  }, []);
  return (
    <div className="container">
      <div className="container__nav">
        <FeatureMenu />
      </div>
      <div className="container__T">
        <div className="container__header">
          <Header />
        </div>
        <div className="container__T__title">
          <h2 className="container__T__title__page">Tâches Ménagères</h2>
          <h3 className="container__R__title__h3">
            On relève ses manches, et on se met au boulot!
          </h3>
        </div>
        <form
          className="container__T__form"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(' console.log : CREATE_TASK');
            dispatch({
              type: 'CREATE_TASK',
              payload: {
                color: getRandomColor(),
              },
            });
            dispatch({ type: 'GET_TASKS_LIST' });
            dispatch(
              changeNewTaskValue({ input: 'newTaskDescription', value: '' })
            );
          }}
        >
          <input
            className="container__T__form__input"
            type="text"
            name="newTaskDescription"
            value={newTaskDescription}
            // className="container__form__new__task"
            placeholder="Ajouter une tâche"
            onChange={(e) => {
              // dispatch the action to update the newtask value in the store
              const action = changeNewTaskValue({
                input: 'newTaskDescription',
                value: e.target.value,
              });
              dispatch(action);
            }}
          />
          <button type="submit" aria-label="add task button">
            <FontAwesomeIcon
              icon={faCirclePlus}
              size="xl"
              className="container__T__form__icone"
            />
          </button>
        </form>
        <div className="container__T__list">
          {tasks.map((task) => (
            <li
              className="container__T__list__card"
              key={task.id}
              style={{ backgroundColor: task.color }}
            >
              <div className="container__T__list__card__check">
                <FontAwesomeIcon
                  icon={
                    doneTasks[task.id] && doneTasks[task.id].done
                      ? faSquareCheck
                      : faSquare
                  }
                  onClick={() => {
                    console.log('Clicked on icon', task.id);
                    const action = toggleDoneState({ taskId: task.id });
                    dispatch(action);
                    dispatch({ type: 'UPDATE_TASK' });
                    dispatch({ type: 'GET_TASKS_LIST' });
                  }}
                  className="container__T__list__card__check__icone"
                />
                <span className="container__T__list__card__check__done">
                  {task.done ? 'Fait' : 'À faire'}
                </span>
                <button type="button" aria-label="delete task button">
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    onClick={() => {
                      // Wait for the task removal to complete before requesting the updated task list
                      dispatch({
                        type: 'DELETE_TASK',
                        payload: { taskId: task.id },
                      });
                      // After the task is deleted, request the updated list of tasks
                      dispatch({ type: 'GET_TASKS_LIST' });
                    }}
                    className="container__T__list__card__trash"
                  />
                </button>
              </div>
              <label
                htmlFor={`task${task.id}`}
                className="container__T__list__card__label"
                style={{
                  textDecoration: task.done ? 'line-through' : 'none',
                }}
              >
                <input
                  id={`task${task.id}`}
                  type="text"
                  className="container__T__list__card__label__input"
                />
                {task.description}
              </label>
              {/* <button type="button" aria-label="delete task button">
                <FontAwesomeIcon
                  icon={faTrashCan}
                  onClick={() => {
                    // Wait for the task removal to complete before requesting the updated task list
                    dispatch({
                      type: 'DELETE_TASK',
                      payload: { taskId: task.id },
                    });
                    // After the task is deleted, request the updated list of tasks
                    dispatch({ type: 'GET_TASKS_LIST' });
                  }}
                  className="container__T__list__card__trash"
                />
              </button> */}
            </li>
          ))}
        </div>
        <div className="container__content__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
