import React, { PropsWithChildren , useReducer, useContext} from 'react';
import {ScreenContext} from './screenContext';
import {screenReducer} from './screenReducer';
import {CHANGE_SCREEN} from '../todo/types';

export const ScreenState = ({children}: PropsWithChildren<any>) => {

    const [state, dispatch] = useReducer(screenReducer, null);

    const changeScreen = (key: string) => dispatch({type: CHANGE_SCREEN , payload: key})

    return (
         <ScreenContext.Provider value={{
             changeScreen,
             todoKey: state
         }}>
         {children}
         </ScreenContext.Provider>
         )

    
}

