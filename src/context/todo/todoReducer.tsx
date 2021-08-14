import {ADD_TODO, UPDATE_TODO, REMOVE_TODO} from './types';
import {infTodo} from '../../MainLayout';

const handlers = {
    [ADD_TODO]: (state : any, {title}: any) => ({...state,
        todos: [
            ...state.todos, 
            {
        key: Date.now().toString(),
        title
   }
]}),
    [REMOVE_TODO]: (state : any, {key}: any) => ({...state, 
    todos: state.todos.filter((todo: infTodo) => todo.key !== key)}),

    [UPDATE_TODO]: (state : any, {title, key}: any) => ({...state,
        todos: state.todos.map((todo: infTodo) => {
            if (todo.key === key) {
                todo.title = title
            }
            return todo
        })}),
        DEFAULT: (state: any) => state


}


export const todoReducer = (state: any, action: any) => {
        const handler = handlers[action.type] || handlers.DEFAULT
        return handler(state, action)
    }