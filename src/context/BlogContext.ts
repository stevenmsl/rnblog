import {BlogPost} from '../service';
import createDataContext from './createDataContext';
export type ActionTypes = 'EDIT' | 'DEL' | 'ADD';
export type AddAction = {
  type: 'ADD';
  payload: {
    title: string;
    content: string;
  };
};

export type DelAction = {
  type: 'DEL';
  payload: {
    id: number;
  };
};

export type EditAction = {
  type: 'EDIT';
  payload: BlogPost;
};

export type Action = AddAction | DelAction | EditAction;
export type dispatchFunc = (action: Action) => void;
export type callbackFunc = () => void;
export type BoundActions = {
  addPost: (title: string, content: string, callback?: callbackFunc) => void;
  delPost: (id: number, callback?: callbackFunc) => void;
  editPost: (
    id: number,
    title: string,
    content: string,
    callback?: callbackFunc,
  ) => void;
};

/*reducer
 - modify the state
*/
const blogReducer = (state: BlogPost[], action: Action) => {
  switch (action.type) {
    case 'EDIT':
      return state.map(post => {
        return post.id === action.payload.id ? action.payload : post;
      });
    case 'DEL':
      return state.filter(post => post.id !== action.payload.id);
    case 'ADD':
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    default:
      return state;
  }
};

/*
  - the dispatch will be pre-configured. The context will then
    expose a function with the same name but with this signature
    (title: string, content: string, callback: callbackFunc) => void
*/
const addPost = (dispatch: dispatchFunc) => {
  return (title: string, content: string, callback?: callbackFunc) => {
    dispatch({
      type: 'ADD',
      payload: {
        title,
        content,
      },
    });
    if (callback) {
      callback();
    }
  };
};

const delPost = (dispatch: dispatchFunc) => {
  return (id: number, callback?: callbackFunc) => {
    dispatch({
      type: 'DEL',
      payload: {
        id,
      },
    });
    if (callback) {
      callback();
    }
  };
};

const editPost = (dispatch: dispatchFunc) => {
  return (
    id: number,
    title: string,
    content: string,
    callback?: callbackFunc,
  ) => {
    dispatch({
      type: 'EDIT',
      payload: {
        id,
        title,
        content,
      },
    });
    if (callback) {
      callback();
    }
  };
};

export const {Context, Provider} = createDataContext<
  BlogPost[],
  Action,
  BoundActions
>(blogReducer, {addPost, delPost, editPost}, [
  {title: 'Test Post', content: 'Test Content', id: 1},
]);
