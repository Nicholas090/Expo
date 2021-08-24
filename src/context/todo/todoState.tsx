import React, { PropsWithChildren, useReducer, useContext } from 'react';
import {Alert} from 'react-native';
import { infTodo } from '../../MainLayout';
import { ScreenContext } from '../screen/screenContext';
import {TodoContext} from './todoContext';
import {todoReducer} from './todoReducer';
import {ADD_TODO, UPDATE_TODO, REMOVE_TODO, SHOW_LOADER, HIDE_LOADER, SHOW_ERROR, CHANGE_SCREEN, CLEAR_ERROR, FETCH_TODOS} from './types';
import {Http} from '../../http';

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
      clearError()
        try {
          const data = await Http.post('https://react-native-expo-d0205-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
         { title }
        )
         dispatch({type: ADD_TODO, title, key: data.name})
        } catch (error) {
          showError('Что-то погло не так')
        }
       }
    

      const fetchTodos = async () => {
        showLoader();
        clearError();
        try {              
        const data = await Http.get('https://react-native-expo-d0205-default-rtdb.europe-west1.firebasedatabase.app/todos.json')
          const todos = Object.keys(data).map(key => ({ ...data[key], key: key }));
         dispatch({type: FETCH_TODOS, todos});
        } catch (e) {
          // showError('Что-то пошло не так!!');
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
            onPress: async () => {              
        changeScreen(null!)
        await Http.delete(
          `https://react-native-expo-d0205-default-rtdb.europe-west1.firebasedatabase.app/todos/${key}.json`
        )
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
        //  await  fetch(
        //   `https://react-native-expo-d0205-default-rtdb.europe-west1.firebasedatabase.app/todos/${key}.json`,
        //   {
        //     method: 'PATCH',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({title})
        //   }  
        // )
        // dispatch({type: UPDATE_TODO, key, title})
        await  Http.patch(
          `https://react-native-expo-d0205-default-rtdb.europe-west1.firebasedatabase.app/todos/${key}.json`
        )
        dispatch({type: UPDATE_TODO, key, title})

      } catch (error) {
        console.log(error);
        showError('Что-то пошло не так...');
      }
      
    }
  

    return (
        <TodoContext.Provider value={{
            todos: state.todos,
            loading: state.loading,
            error: state.error,
            addTodo,
            removeTodo,
            updateTodo,
            fetchTodos,
            clearError
                    }}>
            {children}
        </TodoContext.Provider>
    )
}