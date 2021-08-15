import React, { PropsWithChildren, useReducer, useContext } from 'react';
import {Alert} from 'react-native';
import { infTodo } from '../../MainLayout';
import { ScreenContext } from '../screen/screenContext';
import {TodoContext} from './todoContext';
import {todoReducer} from './todoReducer';
import {ADD_TODO, UPDATE_TODO, REMOVE_TODO, SHOW_LOADER, HIDE_LOADER, SHOW_ERROR, CHANGE_SCREEN, CLEAR_ERROR, FETCH_TODOS} from './types';


    interface TodoStateProp{
        children: any
    }

export const TodoState = ({ children }: PropsWithChildren<TodoStateProp>) => {

    const initialState ={
        todos: [],
        loading: false,
        error: null
    }

        const {changeScreen} = useContext(ScreenContext)

   const [state, dispatch] = useReducer(todoReducer, initialState)

    const addTodo = async (title: string) => {
     const response = 
      await fetch(
        'https://react-native-expo-d0205-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
      {
        method: 'POST',
        headers: {'Content-Type': 'aplication/json'},
        body: JSON.stringify({ title })
      })
      const data = await response.json()
      console.log('Data', data.name)
       dispatch({type: ADD_TODO, title, key: data.name})
      }
    

      const fetchTodos = async () => {
        showLoader();
        clearError();
        try {
                
         const response = await fetch(
          'https://react-native-expo-d0205-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
            {
              method: 'GET',
              headers: {'Content-Type': 'application/json'}
            }
          )
          const data = await response.json();
          // console.log('Data',data)
          const todos = Object.keys(data).map(key => ({ ...data[key], key: key }));
         setTimeout( dispatch({type: FETCH_TODOS, todos}), 50000);
        } catch (e) {
          showError('Что-то пошло не так!!!');
          console.log(e);
        } finally {
          hideLoader();
        }

        
      }


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
 
      const showLoader = () => {
        dispatch({type: SHOW_LOADER})
      };

      const hideLoader = () => {
        dispatch({type: HIDE_LOADER})
      };

      const showError = (error: string ) => {
        dispatch({type: SHOW_ERROR, error})
      };

      const clearError = () => {
        dispatch({type: CLEAR_ERROR})
      };

    const updateTodo = async (key: string, title: string) => {
      clearError();
      try {
        const response = await  fetch(
          `https://react-native-expo-d0205-default-rtdb.europe-west1.firebasedatabase.app/todos${key}.json`,
          {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title})
          }  
        )
        dispatch({type: UPDATE_TODO, key, title})

      } catch (error) {
        console.log(error);
        showError('Что-то пошло не так...');
      }
      ;}
  

    return (
        <TodoContext.Provider value={{
            todos: state.todos,
            loading: state.loading,
            error: state.error,
            addTodo,
            removeTodo,
            updateTodo,
            fetchTodos
                    }}>
            {children}
        </TodoContext.Provider>
    )
}