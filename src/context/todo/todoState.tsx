import React, { PropsWithChildren, useReducer, useContext } from 'react';
import {Alert} from 'react-native';
import { infTodo } from '../../MainLayout';
import { ScreenContext } from '../screen/screenContext';
import {TodoContext} from './todoContext';
import {todoReducer} from './todoReducer';
import {ADD_TODO, UPDATE_TODO, REMOVE_TODO} from './types';


    interface TodoStateProp{
        children: any
    }

export const TodoState = ({ children }: PropsWithChildren<TodoStateProp>) => {

    const initialState ={
        todos: []
    }

        const {changeScreen} = useContext(ScreenContext)

   const [state, dispatch] = useReducer(todoReducer, initialState)

    const addTodo = (title: string) => dispatch({type: ADD_TODO, title})
    

    const removeTodo = (key: string) => {
        
    const todo = state.todos.find((i: infTodo) => i.key === key);

      Alert.alert(
        "Удаление элемента",
        `Уверен, что хочешь удалить ${todo!.title} ?`,
        [
          {
            text: "Отмена",
            style: "cancel"
          },
          { 
            text: "Удалить", 
            onPress: () => {              
        changeScreen(null)
        dispatch({type: REMOVE_TODO, key})
            }
          }
        ]
      );
  
   
    }
 

    const updateTodo = (key: string, title: string) => dispatch({type: UPDATE_TODO, key, title})
  

    return (
        <TodoContext.Provider value={{
            todos: state.todos,
            addTodo,
            removeTodo,
            updateTodo
                    }}>
            {children}
        </TodoContext.Provider>
    )
}