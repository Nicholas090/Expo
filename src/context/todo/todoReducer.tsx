import {ADD_TODO, UPDATE_TODO, REMOVE_TODO, SHOW_LOADER, HIDE_LOADER,CLEAR_ERROR, SHOW_ERROR, FETCH_TODOS} from './types';
import {infTodo} from '../../MainLayout';

    interface ErrorProp {
        error: string
    }

const handlers = {
    [ADD_TODO]: (state : any, {title, key}: infTodo) => ({...state,
        todos: [
            ...state.todos, { key , title }
    ]}),
    
    [REMOVE_TODO]: (state : any, {key}: any) => ({...state, 
    todos: state.todos.filter((todo: infTodo) => todo.key !== key)}),

    [UPDATE_TODO]: (state : any, {title, key}: infTodo) => ({...state,
        todos: state.todos.map((todo: infTodo) => {
            if (todo.key === key) {
                todo.title = title
            }
            return todo
        })}),
        [SHOW_LOADER]: (state: any) => ({...state, loading: true}),
        [HIDE_LOADER]: (state: any) => ({...state, loading: false}),
        [CLEAR_ERROR]: (state: any) => ({...state, error: null}),
        [SHOW_ERROR]: (state: any, {error}: ErrorProp) => ({...state, error}),
        [FETCH_TODOS]: (state: any, {todos}: any) => ({...state, todos}),
        DEFAULT: (state: any) => state


}


export const todoReducer = (state: any, action: any) => {
        const handler = handlers[action.type] || handlers.DEFAULT
        return handler(state, action)
    }