import React, {createContext} from 'react';
import {infTodo} from '../../MainLayout';




type ContextProp = {
    todos: Array<infTodo>,
    addTodo: (title: string) => void,
    removeTodo: (key: string) => void,
    updateTodo: (title: string, key: string) => void,
    loading: boolean,
    error: string,
    fetchTodos: () => void,
    clearError: () => void
}



export const TodoContext =  createContext<ContextProp>(null!);