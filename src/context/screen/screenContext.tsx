import React from 'react';


interface ContextScreenProp {
    todoKey: string,
    changeScreen: (key: string) => void
}
export const ScreenContext = React.createContext<ContextScreenProp>(null!)