import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import featureSlice from './featureSlice';
import loginMiddleware from './loginMiddleware';
import SignJoinColocMiddleware from './SignJoinColocMiddleware';
import SignUpColocMiddleware from './SignUpColocMiddleware';
import createProfileMiddleware from './CreateProfileMiddleware';
import rulesMiddleware from './rulesMiddleware';
import rulesMiddlewareUpdate from './rulesMiddlewareUpdate';
import profileMiddleware from './ProfileMiddleware';
import profileMiddlewareUpdate from './ProfileMiddlewareUpdate';
import colocUsersMiddleware from './colocUsersMiddleware';
import TaskMiddleware from './TaskMiddleware';
import ArticleMiddleware from './ArticleMiddleware';
import CreateTaskMiddleware from './CreateTaskMiddleware';
import UpdateTaskMiddleware from './UpdateTaskMiddleware';
import DeleteTaskMiddleware from './DeleteTaskMiddleware';
import paramMiddleware from './ParamMiddleware';
import ParamUpdateMiddleware from './ParamUpdateMiddleware';

// Configure the Redux store
const store = configureStore({
  reducer: {
    user: userSlice,
    feature: featureSlice,
  },
  // Apply middleware to the store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginMiddleware,
      SignJoinColocMiddleware,
      SignUpColocMiddleware,
      createProfileMiddleware,
      rulesMiddleware,
      rulesMiddlewareUpdate,
      profileMiddleware,
      profileMiddlewareUpdate,
      colocUsersMiddleware,
      TaskMiddleware,
      CreateTaskMiddleware,
      UpdateTaskMiddleware,
      DeleteTaskMiddleware,
      colocUsersMiddleware,
      paramMiddleware,
      ParamUpdateMiddleware,
      ArticleMiddleware
    ),
});

export default store;
